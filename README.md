# Europe trip website (Barcelona · Madrid · Paris)

Static site for your **Mar 31 – Apr 8** trip: itinerary, explore lists, logistics, map embed, and **KML** download for Google My Maps.

## Run locally with Docker

Requires [Docker Desktop](https://www.docker.com/products/docker-desktop/) (Mac mini friendly).

```bash
cd /Users/srikar/Documents/Sandbox/europe-trip-site
docker compose up
```

Open **http://localhost:8080**

Stop: `Ctrl+C` or `docker compose down`.

## Run without Docker

From the `public` folder:

```bash
cd public
python3 -m http.server 8080
```

Open **http://localhost:8080** (paths like `/css/main.css` need this root = `public`).

## Project layout

| Path | Purpose |
|------|---------|
| `public/index.html` | Home |
| `public/itinerary.html` | Day-by-day |
| `public/explore.html` | Coffee, food, wander, shopping |
| `public/logistics.html` | Flights, trains, checklist |
| `public/map.html` | OSM embed, Google links, KML download |
| `public/css/main.css` | Styles |
| `public/js/main.js` | Mobile nav |
| `public/downloads/trip-route.kml` | Import into Google My Maps |
| `docker-compose.yml` | nginx:alpine on port 8080 |
| `nginx/default.conf` | Static file server |

## Deploy to GitHub Pages (free)

See **[GITHUB-PAGES.md](./GITHUB-PAGES.md)** — push this repo to GitHub, set **Pages → GitHub Actions**, site at `https://USER.github.io/REPO/`.

## Deploy elsewhere (free)

Upload **`public/`** to **Cloudflare Pages** or **Netlify** if you prefer.

## Source notes

Content is aligned with `../trip-research/` (itinerary, spots, flights). Edit HTML directly to update the trip.
