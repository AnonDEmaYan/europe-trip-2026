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
    "::warning::PAGES_SITE_USER or PAGES_SITE_PASSWORD is not set — deployed site will have NO browser login. Add both repository Actions secrets (Settings → Secrets and variables → Actions), then redeploy."
  );
  console.log("write-pages-auth: leaving public/js/auth-config.js unchanged (empty digest).");
  process.exit(0);
}

const digest = createHash("sha256").update(`${user}:${pass}`, "utf8").digest("hex");
const body =
  "/* Generated in CI from repo secrets — do not edit. */\n" +
  `window.__TRIP_PAGES_EXPECTED_DIGEST__ = ${JSON.stringify(digest)};\n`;

writeFileSync(out, body, "utf8");
console.log("write-pages-auth: wrote public/js/auth-config.js (SHA-256 digest only; no plaintext password in the file).");
console.log("::notice::GitHub Pages browser login is ON for this deploy (Europe trip gate).");
