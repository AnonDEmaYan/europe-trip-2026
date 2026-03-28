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
  console.log(
    "::error::Deploy blocked: set repository secrets PAGES_SITE_USER and PAGES_SITE_PASSWORD (Settings → Secrets and variables → Actions). Pages login is required for this workflow."
  );
  console.log("write-pages-auth: refusing to publish without auth digest.");
  process.exit(1);
}

const digest = createHash("sha256").update(`${user}:${pass}`, "utf8").digest("hex");
const body =
  "/* Generated in CI from repo secrets — do not edit. */\n" +
  `window.__TRIP_PAGES_EXPECTED_DIGEST__ = ${JSON.stringify(digest)};\n`;

writeFileSync(out, body, "utf8");
console.log("write-pages-auth: wrote public/js/auth-config.js (SHA-256 digest only; no plaintext password in the file).");
console.log("::notice::GitHub Pages browser login is ON for this deploy (Europe trip gate).");
