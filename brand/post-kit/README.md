# Ideator Labs — branded post-image kit

Every LinkedIn image, same black-and-gold brand as the site. 1080×1080, ready to attach.

## What's here
- `gen_posts.py` — the generator (Python + cairosvg + Pillow). Edit the `CARDS` block at the
  bottom, run it, get PNGs.
- `01_valuegap.png` — stat card (McKinsey value-gap). Pair with the launch/value-gap post.
- `02_positioning.png` — the four service pillars. Pin this; it says what we are.
- `03_process.png` — POV card ("AI won't fix a broken process…").
- matching `.svg` for each (edit vectors directly if you prefer).

## Card types (in gen_posts.py)
- `card_stat(eyebrow, big, big_sub, headline, source)` — one giant gold number + a line.
- `card_statement(eyebrow, headline, sub, emph=None)` — a POV / quote card.
- `card_pillars(eyebrow, title, items[])` — a bulleted list (services, verticals, steps).

## Regenerate / add a card
```bash
pip install cairosvg pillow --break-system-packages   # once
python3 gen_posts.py                                   # writes to ./post_out then copy here
```
Add an entry to `CARDS`, keep copy honest (cite real sources; no invented client numbers).

## Brand tokens (match the site)
- bg `#060607` · ink `#F4F5F7` · silver `#AEB3BE` · muted `#8A8F9B`
- gold `#E7C878`, gradient `#F6E3A8 → #E7C878 → #B4883A`
- type: DejaVu Sans (headlines), DejaVu Sans Mono (eyebrows/labels/url)
