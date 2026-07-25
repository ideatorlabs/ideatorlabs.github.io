#!/usr/bin/env python3
"""Ideator Labs — branded LinkedIn post-image generator (black + gold).
Emits 1080x1080 SVG cards and renders crisp PNGs. Reusable: edit CARDS at bottom."""
import os, cairosvg
from PIL import ImageFont

W = H = 1080
PAD = 88
BG = "#060607"
INK = "#F4F5F7"; SILVER="#AEB3BE"; MUTED="#8A8F9B"; FAINT="#4A4F5A"
GOLD = "#E7C878"

FSANS = "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"
FSANSB = "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"
FMONO = "/usr/share/fonts/truetype/dejavu/DejaVuSansMono.ttf"

def esc(s): return s.replace("&","&amp;").replace("<","&lt;").replace(">","&gt;")

def wrap(text, font_path, size, max_w):
    f = ImageFont.truetype(font_path, size)
    words = text.split(); lines=[]; cur=""
    for w in words:
        t=(cur+" "+w).strip()
        if f.getbbox(t)[2] <= max_w: cur=t
        else:
            if cur: lines.append(cur)
            cur=w
    if cur: lines.append(cur)
    return lines

DEFS = f'''
<defs>
 <linearGradient id="gold" x1="0" y1="0" x2="1" y2="1">
   <stop offset="0" stop-color="#F6E3A8"/><stop offset=".48" stop-color="#E7C878"/><stop offset="1" stop-color="#B4883A"/>
 </linearGradient>
 <linearGradient id="goldv" x1="0" y1="0" x2="0" y2="1">
   <stop offset="0" stop-color="#F6E3A8"/><stop offset="1" stop-color="#B4883A"/>
 </linearGradient>
 <radialGradient id="glow" cx="78%" cy="16%" r="72%">
   <stop offset="0" stop-color="#E7C878" stop-opacity=".16"/>
   <stop offset="45%" stop-color="#E7C878" stop-opacity=".05"/>
   <stop offset="100%" stop-color="#E7C878" stop-opacity="0"/>
 </radialGradient>
</defs>'''

def corner_ticks():
    g=GOLD; o=".55"; L=26; p=42; t=[]
    for (x,y,dx,dy) in [(p,p,1,1),(W-p,p,-1,1),(p,H-p,1,-1),(W-p,H-p,-1,-1)]:
        t.append(f'<path d="M{x} {y+dy*L} L{x} {y} L{x+dx*L} {y}" stroke="{g}" stroke-width="2" fill="none" opacity="{o}"/>')
    return "".join(t)

def header(y=138):
    sx, sy, s = PAD, y-46, 0.82
    shield = f'''<g transform="translate({sx},{sy}) scale({s})">
      <path d="M29 2 L54 11 V32 C54 48 43 59 29 64 C15 59 4 48 4 32 V11 Z" stroke="url(#goldv)" stroke-width="2.6" fill="rgba(231,200,120,.06)" stroke-linejoin="round"/>
      <path d="M18 32 L26 40 L41 23" stroke="url(#goldv)" stroke-width="3.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
    </g>'''
    tx = sx + 58*s + 26
    word = f'<text x="{tx}" y="{y-8}" font-family="DejaVu Sans Mono" font-weight="bold" font-size="27" fill="{INK}" letter-spacing="3">IDEATOR LABS</text>'
    sub = f'<text x="{tx}" y="{y+20}" font-family="DejaVu Sans Mono" font-size="12" fill="{GOLD}" letter-spacing="2">AI &amp; DATA CONSULTING · TECHNOLOGY ADVISORY</text>'
    return shield+word+sub

def eyebrow(text, y):
    return f'<text x="{PAD}" y="{y}" font-family="DejaVu Sans Mono" font-size="17" fill="{GOLD}" letter-spacing="5">{esc(text.upper())}</text>'

def footer():
    y=H-92
    line=f'<line x1="{PAD}" y1="{y-30}" x2="{W-PAD}" y2="{y-30}" stroke="#FFFFFF" stroke-opacity=".12" stroke-width="1"/>'
    url=f'<text x="{PAD}" y="{y+6}" font-family="DejaVu Sans Mono" font-size="19" fill="{GOLD}" letter-spacing="1">ideatorlabs.github.io</text>'
    tag=f'<text x="{W-PAD}" y="{y+6}" text-anchor="end" font-family="DejaVu Sans Mono" font-size="14.5" fill="{MUTED}" letter-spacing="3">CONSULTING · AI · DATA · SOFTWARE</text>'
    return line+url+tag

def base(inner):
    return f'''<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}" viewBox="0 0 {W} {H}">
    {DEFS}
    <rect width="{W}" height="{H}" fill="{BG}"/>
    <rect width="{W}" height="{H}" fill="url(#glow)"/>
    {corner_ticks()}
    {header()}
    {inner}
    {footer()}
    </svg>'''

def text_block(lines, x, y, size, fill, lh, font="DejaVu Sans", weight="normal", anchor="start"):
    out=[]
    for i,ln in enumerate(lines):
        out.append(f'<text x="{x}" y="{y+i*lh}" font-family="{font}" font-weight="{weight}" font-size="{size}" fill="{fill}" text-anchor="{anchor}">{ln}</text>')
    return "".join(out)

# ---------- CARD TYPES ----------
def card_stat(eyebrow_t, big, big_sub, headline, source):
    inner=[eyebrow(eyebrow_t, 250)]
    inner.append(f'<text x="{PAD}" y="470" font-family="DejaVu Sans" font-weight="bold" font-size="210" fill="url(#gold)" letter-spacing="-4">{esc(big)}</text>')
    if big_sub:
        inner.append(f'<text x="{PAD}" y="520" font-family="DejaVu Sans Mono" font-size="24" fill="{SILVER}" letter-spacing="2">{esc(big_sub)}</text>')
    hl=wrap(headline, FSANSB, 46, W-2*PAD)
    inner.append(text_block([esc(l) for l in hl], PAD, 590, 46, INK, 58, font="DejaVu Sans", weight="bold"))
    if source:
        inner.append(f'<text x="{PAD}" y="{H-150}" font-family="DejaVu Sans Mono" font-size="16" fill="{MUTED}" letter-spacing="1">{esc(source)}</text>')
    return base("".join(inner))

def card_statement(eyebrow_t, headline, sub, emph=None):
    inner=[eyebrow(eyebrow_t, 300)]
    hl=wrap(headline, FSANSB, 66, W-2*PAD)
    y0=430; lines=[]
    for i,l in enumerate(hl):
        fill = "url(#gold)" if (emph and emph in l) else INK
        lines.append(f'<text x="{PAD}" y="{y0+i*82}" font-family="DejaVu Sans" font-weight="bold" font-size="66" fill="{fill}">{esc(l)}</text>')
    inner.append("".join(lines))
    if sub:
        sl=wrap(sub, FSANS, 28, W-2*PAD)
        inner.append(text_block([esc(l) for l in sl], PAD, y0+len(hl)*82+40, 28, SILVER, 42))
    return base("".join(inner))

def card_pillars(eyebrow_t, title, items):
    inner=[eyebrow(eyebrow_t, 270)]
    tl=wrap(title, FSANSB, 52, W-2*PAD)
    inner.append(text_block([esc(l) for l in tl], PAD, 360, 52, INK, 64, font="DejaVu Sans", weight="bold"))
    y=360+len(tl)*64+50
    for it in items:
        inner.append(f'<circle cx="{PAD+7}" cy="{y-10}" r="5" fill="url(#gold)"/>')
        inner.append(f'<text x="{PAD+34}" y="{y}" font-family="DejaVu Sans" font-size="30" fill="{INK}">{esc(it)}</text>')
        y+=64
    return base("".join(inner))

def card_grid(eyebrow_t, title, tiles):
    inner=[eyebrow(eyebrow_t, 250)]
    tl=wrap(title, FSANSB, 46, W-2*PAD)
    inner.append(text_block([esc(l) for l in tl], PAD, 340, 46, INK, 56, font="DejaVu Sans", weight="bold"))
    gy = 340 + len(tl)*56 + 78
    cols=[PAD, PAD+486]; rowh=196
    for i,(big,label) in enumerate(tiles):
        x=cols[i%2]; y=gy+(i//2)*rowh
        inner.append(f'<text x="{x}" y="{y}" font-family="DejaVu Sans" font-weight="bold" font-size="76" fill="url(#gold)" letter-spacing="-2">{esc(big)}</text>')
        ll=wrap(label, FSANS, 23, 430)
        inner.append(text_block([esc(l) for l in ll], x, y+44, 23, SILVER, 32))
    return base("".join(inner))

# ---------- CARDS (edit these) ----------
CARDS = {
 "01_valuegap": card_stat("The value gap","5.5%","of firms see real profit from AI",
    "79% have adopted it. The gap between using AI and capturing value is the whole reason we exist.",
    "Source: McKinsey, The State of AI 2025"),
 "02_positioning": card_pillars("What we do","Consulting-grade strategy, engineered and shipped.",
    ["Business & Management Consulting","AI & Data Engineering","B2B SaaS & Software Services","Industry AI for law, finance & healthcare"]),
 "03_process": card_statement("Point of view","AI won't fix a broken process. It'll just run it faster.",
    "Measure it, fix it, then automate what's left. Automation amplifies whatever you point it at — point it at something clean.",
    emph="faster."),
 "04_icp": card_pillars("Who we're for","Who we do our best work for.",
    ["Established mid-market — ₹25–500 Cr, 20–500 staff",
     "Law · accounting/CA · healthcare · manufacturing",
     "Buyers: founders, partners, COOs & CFOs",
     "Fixed-fee outcomes, measured on your KPI — never hourly"]),
 "05_kpi": card_grid("The numbers we move","We commit to a KPI — yours.",
    [("15–20 hrs","recovered per team, every week"),
     ("20–40%","of admin work is automatable"),
     ("8–12%","profit swing per point of pricing"),
     ("~3 wks","to a priced opportunity map you own")]),
}

os.makedirs("post_out", exist_ok=True)
for name, svg in CARDS.items():
    open(f"post_out/{name}.svg","w").write(svg)
    cairosvg.svg2png(bytestring=svg.encode(), write_to=f"post_out/{name}.png", output_width=1080, output_height=1080)
    print("rendered", name)
print("done")
