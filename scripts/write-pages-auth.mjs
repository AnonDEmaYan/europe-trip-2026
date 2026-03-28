#!/usr/bin/env node
import { createHash } from "node:crypto";
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const out = join(__dirname, "..", "public", "js", "auth-config.js");

const user = process.env.PAGES_SITE_USER || "";
const pass = process.env.PAGES_SITE_PASSWORD || "";

if (!user || !pass) {
  console.log("write-pages-auth: PAGES_SITE_USER or PAGES_SITE_PASSWORD empty; leaving auth-config.js unchanged.");
  process.exit(0);
}

const digest = createHash("sha256").update(`${user}:${pass}`, "utf8").digest("hex");
const body =
  "/* Generated in CI from repo secrets — do not edit. */\n" +
  `window.__TRIP_PAGES_EXPECTED_DIGEST__ = ${JSON.stringify(digest)};\n`;

writeFileSync(out, body, "utf8");
console.log("write-pages-auth: wrote public/js/auth-config.js (digest only, no plaintext credentials).");
