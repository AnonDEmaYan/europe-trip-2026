#!/usr/bin/env node
/**
 * Fetch Unsplash oEmbed metadata for a photo page URL (no API key).
 *
 * Usage:
 *   node scripts/fetch-unsplash-oembed.mjs "https://unsplash.com/photos/abcd1234_something"
 *
 * Copy the photo URL from the browser when viewing a shot on unsplash.com.
 */

const pageUrl = process.argv[2];
if (!pageUrl || !pageUrl.includes("unsplash.com")) {
  console.error('Usage: node scripts/fetch-unsplash-oembed.mjs "https://unsplash.com/photos/..."');
  process.exit(1);
}

const embedUrl =
  "https://api.unsplash.com/oembed?format=json&url=" + encodeURIComponent(pageUrl);

const res = await fetch(embedUrl);
if (!res.ok) {
  console.error("oEmbed failed:", res.status, await res.text());
  process.exit(1);
}

const data = await res.json();
console.log(JSON.stringify(data, null, 2));
console.log("\n--- paste-friendly ---");
console.log("Title:", data.title || "(none)");
console.log("Author:", data.author_name);
console.log("Author URL:", data.author_url);
console.log("HTML credit snippet:", data.html || "(none)");
