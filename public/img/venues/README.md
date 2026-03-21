# Your venue photos (optional)

Drop **JPEG / WebP / PNG / SVG** files here and point spots at them from `js/places-data.js`.

## How to override Unsplash for a spot

On any object in `TRIP_SPOTS`, add:

```js
{
  city: "barcelona",
  cat: "coffee",
  name: "Satan's Coffee Corner",
  note: "Gothic · specialty",
  maps: "https://...",
  localImage: "img/venues/satan-corner.jpg",
  localCredit: "Our photo, Mar 2026",
  localCreditUrl: "https://example.com", // optional
}
```

- **`localImage`** — path from the site root (`public/`), e.g. `img/venues/my-shot.webp`.
- **`localCredit`** — shown in the lightbox (required for your own work).
- **`localCreditUrl`** — optional link (e.g. your Instagram).

Remove those three fields to use the thematic Unsplash pool again.

## `example.svg`

A placeholder graphic you can delete or replace. To try it on one spot, add `localImage: "img/venues/example.svg"` and reload **Visuals**.

## Unsplash attribution (for stock photos)

If you add a new Unsplash image ID to `TRIP_IMAGE_POOLS`, open the photo’s page on [unsplash.com](https://unsplash.com) and copy the photographer line. From the repo root you can also run:

```bash
node scripts/fetch-unsplash-oembed.mjs "https://unsplash.com/photos/<slug-from-site>"
```

(No API key — uses Unsplash’s oEmbed endpoint.)
