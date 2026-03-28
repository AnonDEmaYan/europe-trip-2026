# Google Stitch — use it as much as possible (**no GCP required**)

**[Stitch](https://stitch.withgoogle.com/)** (Google Labs) is the default path for **big UI moves** on this trip site: layouts, hero variants, page shells. You can use it **fully in the browser** — no Google Cloud project needed.

The **home page** has an iframe + **Open Stitch** / **MCP docs** links; if the iframe is blank, open Stitch in a **new tab**.

---

## 0. Canonical export: `design/stitch.zip`

The repo includes **`europe-trip-site/design/stitch.zip`** (synced from **`~/Downloads/stitch.zip`**) and an unpacked copy **`design/stitch-export/`**.

| What | Where |
|------|--------|
| **Design system** (colors, type, rules) | `design/stitch-export/stitch/terracotta_voyage/DESIGN.md` |
| **Product / screen plan** | `design/stitch-export/europe_trip_2026_design_plan.html` |
| **Reference HTML + screenshots** | `design/stitch-export/stitch/*/code.html` and `screen.png` |

**Agents & humans:** treat this folder as the **source of truth** for Stitch-driven UI work; merge into `public/` incrementally. After a **new** export from Stitch, replace **`design/stitch.zip`** and re-unzip into **`design/stitch-export/`** (see **`design/README.md`**).

---

## 1. Recommended: Stitch in the browser (skip GCP)

1. Go to **https://stitch.withgoogle.com/** and sign in with your **Google account** (normal Labs login — not the same as creating a GCP project).
2. Describe the screen or upload a reference; iterate until you like it.
3. **Export** or **copy** HTML/CSS from Stitch.
4. Paste into Cursor and ask the agent to **merge** into `europe-trip-site/public/` while keeping:
   - Nav, **`translator.js`**, **`css/main.css`** variables, relative `css/` / `js/` paths.

### Prompts that work without MCP

- *“Here’s HTML/CSS from Stitch for a new hero — merge into `index.html` and `main.css`, keep our nav and Telugu widget.”*
- *“I’ll paste Stitch output for Explore cards — wire it to existing classes where possible.”*

---

## 2. Optional: Stitch MCP (requires GCP)

Official **`stitch-mcp`** talks to Google’s API in a way that currently expects a **Google Cloud project** and **ADC / gcloud-style auth**. **API-key-only** setups are often **not** supported for this API (see [Google AI Developers Forum](https://discuss.ai.google.dev/) threads on Stitch MCP).

If you **want** MCP later:

1. Copy **`Sandbox/.cursor/mcp.google-stitch.example.json`** into **`Sandbox/.cursor/mcp.json`** (merge the `google-stitch` block into `mcpServers`), or start from **`docs/mcp.json.example`** in this folder.
2. Set **`GOOGLE_CLOUD_PROJECT`** and follow the current **[Stitch MCP guide](https://stitch.withgoogle.com/docs/mcp/guide/)**.
3. Restart Cursor.

**Default repo state:** **`mcp.json`** has **`mcpServers: {}`** so you don’t need GCP for Cursor to work.

---

## 3. Workspace layout

Open **`/Users/srikar/Documents/Sandbox`** in Cursor (parent folder) so **`.cursor/`** applies.

> **Only `europe-trip-site` as root?** Copy **`Sandbox/.cursor/`** into **`europe-trip-site/.cursor/`** or reopen the **Sandbox** folder.

---

## 4. Merge checklist (after Stitch export)

- [ ] Nav matches other pages · **`translator.js`** if the page had it  
- [ ] Paths **`css/`**, **`js/`** from `public/` root  
- [ ] Reuse **`main.css`** `:root` tokens where possible  
- [ ] Quick check: mobile + print  

---

## 5. Links

- **Stitch app:** https://stitch.withgoogle.com/  
- **Overview:** https://developers.googleblog.com/en/stitch-a-new-way-to-design-uis/  
- **MCP (GCP):** https://stitch.withgoogle.com/docs/mcp/guide/  
- **Example MCP JSON (with GCP):** `docs/mcp.json.example` · **`.cursor/mcp.google-stitch.example.json`**

---

## 6. Troubleshooting

| Issue | What to try |
|--------|-------------|
| Don’t want GCP | Use **browser Stitch** only; leave **`mcp.json`** empty. |
| MCP errors without project | Expected — add GCP per Google’s doc or skip MCP. |
| Iframe empty on site | Use **Open Stitch** on the home page. |

MCP is **IDE-only**; the static site never calls Stitch servers.
