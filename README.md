# Europe trip website (Barcelona · Madrid · Paris)

Static site for your **Mar 31 – Apr 8** trip: itinerary, explore lists, logistics, map embed, and **KML** download for Google My Maps.

## Run locally with Docker

Requires [Docker Desktop](https://www.docker.com/products/docker-desktop/) (Mac mini friendly).

```bash
cd /Users/srikar/Documents/Sandbox/europe-trip-site
docker compose up
```

Open **http://localhost:8080** — the browser will ask for a **username and password** (HTTP Basic Auth).

- Default login: user **`Intltravel2k26`**, password **`Intltravel@2k26`** (override in a **`.env`** file next to `docker-compose.yml`, or set `TRIP_SITE_USER` / `TRIP_SITE_PASSWORD` in your shell).
- Copy **`.env.example`** to **`.env`** if you prefer secrets only on disk (not in `docker-compose.yml` defaults), then `docker compose up --build`.

Stop: `Ctrl+C` or `docker compose down`.

## Run without Docker

From the `public` folder:

```bash
cd public
python3 -m http.server 8080
```

Open **http://localhost:8080** (paths like `/css/main.css` need this root = `public`). This mode has **no** login; use **Docker** above if you want username/password protection.

## Project layout

| Path | Purpose |
|------|---------|
| `public/index.html` | Home |
| `public/itinerary.html` | Day-by-day |
| `public/explore.html` | Coffee, food, wander, shopping |
| `public/visuals.html` | **Interactive** photo grid, filters, lightbox (swipe / drag / keys) |
| `public/js/places-data.js` | Spots + Unsplash pools; optional `localImage` → `img/venues/` |
| `public/img/venues/` | Your photos + [README](./public/img/venues/README.md) |
| `scripts/fetch-unsplash-oembed.mjs` | Optional: photographer line from an Unsplash photo URL (no API key) |
| `public/logistics.html` | Flights, trains, checklist |
| `public/map.html` | **Leaflet map** — all Explore pins (`data/explore-places.geojson`) + OSM embed, KML |
| `public/data/explore-places.geojson` | GeoJSON pins (rebuild: `python3 scripts/build-explore-geojson.py`) |
| `scripts/build-explore-geojson.py` | Nominatim geocode for GeoJSON (set `NOMINATIM_INSECURE=0` if SSL certs OK) |
| `public/css/main.css` | Styles |
| `public/js/main.js` | Mobile nav |
| `public/js/auth-config.js` | Pages login: empty locally; CI may set SHA-256 digest from secrets |
| `public/js/site-gate.js` | Optional sign-in overlay when digest is set |
| `scripts/write-pages-auth.mjs` | CI: writes `auth-config.js` from `PAGES_SITE_*` secrets |
| `public/downloads/trip-route.kml` | Import into Google My Maps |
| `docker-compose.yml` | nginx on port 8080 + Basic Auth from env |
| `Dockerfile` | nginx + `htpasswd` for auth file at container start |
| `docker-entrypoint.d/99-trip-auth.sh` | Writes `/tmp/.htpasswd` from `TRIP_SITE_*` |
| `nginx/default.conf` | Static file server + `auth_basic` |
| `.env.example` | Template for `TRIP_SITE_USER` / `TRIP_SITE_PASSWORD` |

## Deploy to GitHub Pages (free)

See **[GITHUB-PAGES.md](./GITHUB-PAGES.md)** — push to **`main`**, enable **Settings → Pages → GitHub Actions**. Optional **browser login**: add Action secrets **`PAGES_SITE_USER`** and **`PAGES_SITE_PASSWORD`**; the deploy workflow bakes a digest into the published `auth-config.js` (details and caveats in that doc). **Docker** still uses nginx Basic Auth locally; the two can use the same username and password.

## Deploy elsewhere (free)

Upload **`public/`** to **Cloudflare Pages** or **Netlify** if you prefer.

## Source notes

Content is aligned with `../trip-research/` (itinerary, spots, flights). Edit HTML directly to update the trip.
