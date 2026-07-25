#!/usr/bin/env python3
"""Ideator Labs — GitHub banner + LinkedIn cover: black/gold, node-network bg, full brand lines."""
import cairosvg, random, math
from PIL import ImageFont
BG="#060607"; INK="#F4F5F7"; SILVER="#AEB3BE"; MUTED="#8A8F9B"; GOLD="#E7C878"
FSANS="/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"
def esc(s): return s.replace("&","&amp;")
def tw(t,f,s): return ImageFont.truetype(f,s).getbbox(t)[2]
def wrap(t,f,s,maxw):
    words=t.split(); out=[]; cur=""
    for w in words:
        x=(cur+" "+w).strip()
        if tw(x,f,s)<=maxw: cur=x
        else: out.append(cur); cur=w
    if cur: out.append(cur)
    return out
DEFS='''<defs>
<linearGradient id="goldv" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#F6E3A8"/><stop offset="1" stop-color="#B4883A"/></linearGradient>
<radialGradient id="glow" cx="85%" cy="18%" r="85%"><stop offset="0" stop-color="#E7C878" stop-opacity=".18"/><stop offset="55%" stop-color="#E7C878" stop-opacity=".04"/><stop offset="100%" stop-color="#E7C878" stop-opacity="0"/></radialGradient>
</defs>'''
def shield(x,y,s):
    return f'<g transform="translate({x},{y}) scale({s})"><path d="M29 2 L54 11 V32 C54 48 43 59 29 64 C15 59 4 48 4 32 V11 Z" stroke="url(#goldv)" stroke-width="2.6" fill="rgba(231,200,120,.07)" stroke-linejoin="round"/><path d="M18 32 L26 40 L41 23" stroke="url(#goldv)" stroke-width="3.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g>'
def network(W,H,n,seed):
    random.seed(seed); pts=[(W*(0.30+0.70*random.random()**0.75), random.random()*H) for _ in range(n)]
    thr=W*0.15; edges=[]
    for i in range(len(pts)):
        for j in range(i+1,len(pts)):
            d=math.hypot(pts[i][0]-pts[j][0],pts[i][1]-pts[j][1])
            if d<thr:
                o=max(.05,0.18*(1-d/thr))
                edges.append(f'<line x1="{pts[i][0]:.1f}" y1="{pts[i][1]:.1f}" x2="{pts[j][0]:.1f}" y2="{pts[j][1]:.1f}" stroke="{GOLD}" stroke-width="1" opacity="{o:.2f}"/>')
    nodes=[f'<circle cx="{x:.1f}" cy="{y:.1f}" r="{random.uniform(2,3.4):.1f}" fill="{GOLD}" opacity="{random.uniform(.3,.65):.2f}"/>' for (x,y) in pts]
    return "".join(edges)+"".join(nodes)
def ticks(W,H,L,p):
    return "".join(f'<path d="M{x} {y+dy*L} L{x} {y} L{x+dx*L} {y}" stroke="{GOLD}" stroke-width="1.8" fill="none" opacity=".5"/>'
      for (x,y,dx,dy) in [(p,p,1,1),(W-p,p,-1,1),(p,H-p,1,-1),(W-p,H-p,-1,-1)])
def frame(W,H,inner,seed,nn,netop=0.9):
    return f'<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}" viewBox="0 0 {W} {H}"><rect width="{W}" height="{H}" fill="{BG}"/>{DEFS}<g opacity="{netop}">{network(W,H,nn,seed)}</g><rect width="{W}" height="{H}" fill="url(#glow)"/>{ticks(W,H,22,34)}{inner}</svg>'
def render(svg,w,h,out): cairosvg.svg2png(bytestring=svg.encode(),write_to=out,output_width=w,output_height=h); print("ok",out)

DESC="AI & DATA CONSULTING · TECHNOLOGY ADVISORY · VENTURE LAB"
TAG="Your business is leaking profit. We find where — then build the AI, data & software that stops it."
SIG="We find the margin. Then we build the machine."
MOTTO="FIND → PROVE → BUILD → COMPOUND"

# ---- GitHub banner 1280x320 ----
W,H=1280,320; P=70
inner=[shield(P,72,0.92)]
tx=P+58*0.92+30
inner += [
 f'<text x="{tx}" y="106" font-family="DejaVu Sans Mono" font-weight="bold" font-size="44" fill="{INK}" letter-spacing="4">IDEATOR LABS</text>',
 f'<text x="{tx}" y="134" font-family="DejaVu Sans Mono" font-size="16" fill="{GOLD}" letter-spacing="2">{esc(DESC)}</text>',
 f'<text x="{P}" y="188" font-family="DejaVu Sans" font-size="20" fill="{SILVER}">{esc(TAG)}</text>',
 f'<text x="{P}" y="224" font-family="DejaVu Sans" font-weight="bold" font-size="21" fill="{INK}">{esc(SIG)}</text>',
 f'<text x="{P}" y="284" font-family="DejaVu Sans Mono" font-size="15" fill="{GOLD}" letter-spacing="6">{MOTTO}</text>',
 f'<text x="{W-P}" y="284" text-anchor="end" font-family="DejaVu Sans Mono" font-size="14" fill="{MUTED}" letter-spacing="2">ideatorlabs.github.io</text>',
]
render(frame(W,H,"".join(inner),7,34),W,H,"ideator-banner.png")

# ---- LinkedIn cover 1128x191 ----
W,H=1128,191; P=48
inner=[shield(P,60,0.72)]
tx=P+58*0.72+20
rx=W-P
inner += [
 f'<text x="{tx}" y="90" font-family="DejaVu Sans Mono" font-weight="bold" font-size="29" fill="{INK}" letter-spacing="3">IDEATOR LABS</text>',
 f'<text x="{tx}" y="114" font-family="DejaVu Sans Mono" font-size="11.5" fill="{GOLD}" letter-spacing="1.4">{esc(DESC)}</text>',
 f'<text x="{rx}" y="86" text-anchor="end" font-family="DejaVu Sans" font-weight="bold" font-size="18" fill="{INK}">{esc(SIG)}</text>',
 f'<text x="{rx}" y="114" text-anchor="end" font-family="DejaVu Sans Mono" font-size="12" fill="{GOLD}" letter-spacing="3.5">{MOTTO}</text>',
]
render(frame(W,H,"".join(inner),4,24,netop=0.6),W,H,"ideator-linkedin-cover.png")
