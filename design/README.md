# Stitch design reference (`stitch.zip`)

This folder holds the **canonical Google Stitch export** for the trip site UI direction.

## Files

| Path | Purpose |
|------|--------|
| **`stitch.zip`** | Copy of the export (same archive as `~/Downloads/stitch.zip` when synced). Re-copy from Downloads after a new Stitch export if you refresh the design. |
| **`stitch-export/`** | Unpacked contents — use these when merging into `public/`. |

## Inside `stitch-export/`

| Asset | Notes |
|--------|--------|
| **`europe_trip_2026_design_plan.html`** | PRD-style outline: interactive map hub, itinerary sidebar, city views, explore cards (markdown-ish content). |
| **`stitch/terracotta_voyage/DESIGN.md`** | **Design system** — “Curated Voyager”: terracotta primary `#9f3c18`, voyager blue links `#095eb0`, Noto Serif + Manrope, no 1px section borders, asymmetry, route chips. |
| **`stitch/interactive_trip_map_hub/`** | `code.html` + `screen.png` — map hub concept. |
| **`stitch/barcelona_spotlight/`** | City spotlight screen. |
| **`stitch/full_trip_itinerary/`** | Full itinerary screen. |

## How to use in Cursor

1. When changing **layout, typography, or color story**, read **`stitch-export/stitch/terracotta_voyage/DESIGN.md`** first.  
2. For **feature scope** (map + itinerary integration), skim **`stitch-export/europe_trip_2026_design_plan.html`**.  
3. **`code.html`** files are **reference implementations** — port ideas into existing `public/*.html` and `css/main.css` (keep nav, translator, GeoJSON map, etc.) rather than replacing the whole site in one shot.

See also **`docs/GOOGLE-STITCH.md`**.
