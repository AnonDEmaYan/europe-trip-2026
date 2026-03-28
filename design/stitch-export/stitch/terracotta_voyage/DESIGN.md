# Design System Document

## 1. Overview & Creative North Star: "The Curated Voyager"

This design system is built to transform a travel itinerary into a high-end editorial experience. Moving away from the utilitarian "app" feel, our North Star is **The Curated Voyager**. We treat digital space like the pages of a premium travel journal: expansive, intentional, and tactile.

To break the "template" look, we utilize **intentional asymmetry**. Hero elements are rarely centered; instead, they sit with generous, uneven breathing room. We employ **High-Contrast Typography Scales**—pairing oversized, soft-serif headlines with tight, utilitarian labels—to create an authoritative yet welcoming hierarchy. The experience should feel less like a database and more like a private invitation.

---

## 2. Colors: Sophisticated Tonalism

Our palette is grounded in warm neutrals and deep charcoals, punctuated by a signature Terracotta that evokes sun-drenched masonry and aged maps.

### Color Tokens (Material Design Mapping)
*   **Primary (`#9f3c18`):** Our signature Terracotta orange. Use for high-intent actions and key brand moments.
*   **Surface (`#fcf9f8`):** A warm, "Paper White" base. 
*   **On-Surface (`#1b1c1c`):** Deep charcoal for maximum legibility. Avoid true black (`#000000`) to maintain the editorial softness.
*   **Secondary (`#095eb0`):** A sophisticated "Voyager Blue" for links and secondary interactive elements.

### The Rules of Engagement
*   **The "No-Line" Rule:** 1px solid borders are strictly prohibited for sectioning. Boundaries must be defined solely through background color shifts. For example, a `surface-container-low` section sitting on a `surface` background creates a clear but soft structural break without visual "noise."
*   **Surface Hierarchy & Nesting:** Treat the UI as layers of fine paper. Use `surface-container` tiers (Lowest to Highest) to define importance. An information card should be `surface-container-lowest` when placed on a `surface-container-low` background to provide a subtle "lift."
*   **Signature Textures:** For main CTAs and hero backgrounds, use a subtle linear gradient transitioning from `primary` (`#9f3c18`) to `primary-container` (`#bf542e`). This adds a "soul" and depth that flat color cannot provide.

---

## 3. Typography: The Editorial Voice

We pair the expressive, high-personality **Noto Serif** (heading) with the functional, modern **Manrope** (sans-serif) to balance charm with utility.

| Level | Token | Font Family | Size | Character |
| :--- | :--- | :--- | :--- | :--- |
| **Display** | `display-lg` | Noto Serif | 3.5rem | Dramatic, high-contrast, used for key titles. |
| **Headline**| `headline-lg`| Noto Serif | 2.0rem | The primary storytelling voice. |
| **Title**   | `title-lg`   | Manrope    | 1.375rem| Clear, bold, navigational. |
| **Body**    | `body-lg`    | Manrope    | 1.0rem  | Highly legible, generous line height. |
| **Label**   | `label-md`   | Manrope    | 0.75rem | Utilitarian, often all-caps for metadata. |

---

## 4. Elevation & Depth: Tonal Layering

We reject the "drop shadow" defaults of the web. Depth is an atmosphere, not a structural tool.

*   **The Layering Principle:** Stack surfaces. Use `surface-container-lowest` cards on `surface-container-low` sections. The contrast is minimal, creating a "quiet" hierarchy that feels premium.
*   **Ambient Shadows:** If an element must float (e.g., a modal or floating action button), use an extra-diffused shadow with a 4%–8% opacity. The shadow color must be a tinted version of `on-surface` (`#1b1c1c`) rather than grey, mimicking natural light.
*   **Glassmorphism:** For overlays or navigation bars, use semi-transparent surface colors with a `20px` backdrop-blur. This allows background imagery to "bleed" through, softening edges and making the UI feel integrated.
*   **The "Ghost Border" Fallback:** If a border is required for accessibility, use the `outline-variant` token at **15% opacity**. Never use 100% opaque, high-contrast borders.

---

## 5. Components

### Buttons
*   **Primary:** Terracotta gradient (`primary` to `primary-container`), white text, `xl` (0.75rem) roundedness.
*   **Secondary:** Voyager Blue (`secondary`), ghost-style with a subtle `surface-variant` background on hover.
*   **Tertiary:** Manrope text with a custom 2px underline in Terracotta, no background.

### Cards & Lists
*   **The Divider Rule:** Forbid the use of horizontal divider lines. Use vertical white space (`spacing.8` or `spacing.10`) or subtle background color shifts to separate content blocks. 
*   **Card Style:** Use `surface-container-lowest` with `xl` (0.75rem) corners.

### Custom Component: The "Route Chip"
*   For travel states (e.g., "Paris to Madrid"), use a `surface-container-high` background with `full` (9999px) roundedness and `label-md` typography. These should feel like tactile physical tabs.

### Input Fields
*   Minimalist style. No bottom border. Instead, use a very light `surface-variant` background with a `md` (0.375rem) corner radius. On focus, the background shifts to `surface-container-highest` with a 2px `primary` left-accent bar.

---

## 6. Do's and Don'ts

### Do
*   **Do** use asymmetrical margins (e.g., a 15% left margin and a 5% right margin) for long-form editorial text to create visual interest.
*   **Do** leverage the `monospace` font for technical data (coordinates, timestamps, flight numbers) to add a "travel document" aesthetic.
*   **Do** prioritize white space. If you think there is enough space, add 20% more.

### Don't
*   **Don't** use 1px solid lines to separate content. Use the spacing scale (`spacing.12` or `spacing.16`) to create "islands" of information.
*   **Don't** use pure black or pure grey. Every neutral in this system is slightly warmed by the `#F8F6F2` base.
*   **Don't** use standard "drop shadows." If it looks like a shadow, it’s too dark; it should look like a soft glow or a natural lift.