# Design System Specification: Cloud Infotech Pte. Ltd.

## 1. Overview & Creative North Star: "The Digital Sentinel"
To move beyond the generic "tech shop" aesthetic, this design system is guided by the Creative North Star of **"The Digital Sentinel."** We are not just selling hardware; we are providing peace of mind through clarity, precision, and technological authority.

The system breaks the "template" look by favoring **intentional asymmetry** and **tonal depth** over rigid grids and lines. By utilizing expansive whitespace (breathing room) and sophisticated editorial typography scales, we create an experience that feels less like a catalog and more like a curated security consultation. The interface should feel like high-end surveillance software: precise, calm, and unfailingly reliable.

---

### 2. Colors: Tonal Architecture
We move away from "flat" design. This system uses color as a structural tool to define hierarchy and focus.

#### The "No-Line" Rule
**Explicit Instruction:** Do not use 1px solid borders to section off content. 
Boundaries must be defined solely through background color shifts or tonal transitions. For example, a `surface-container-low` section sitting on a `surface` background provides all the separation a user needs without the visual clutter of a line.

#### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers. Use the surface-container tiers to create "nested" depth:
*   **Base Layer:** `background` (#f7f9fb)
*   **Primary Content Area:** `surface-container-low` (#f2f4f6)
*   **Elevated Components (Cards):** `surface-container-lowest` (#ffffff)
*   **Overlays/Modals:** `surface-bright` (#f7f9fb)

#### The "Glass & Gradient" Rule
To capture the "Cloud" essence of Cloud Infotech, use **Glassmorphism** for floating elements (Navigation bars, sticky filters). Apply a semi-transparent `surface` color with a `backdrop-blur` of 20px-40px.
*   **Signature Textures:** Use a subtle gradient for primary CTAs: `primary` (#004bca) to `primary_container` (#0061ff) at a 135-degree angle. This adds a "lithic" soul to the buttons that flat blue cannot achieve.

---

### 3. Typography: The Editorial Voice
We utilize a dual-font approach to balance technical precision with human-centric clarity.

*   **Display & Headlines (Manrope):** Chosen for its geometric purity and modern authority. Use `display-lg` for hero value propositions to command attention.
*   **Interface & Body (Inter):** Chosen for its exceptional legibility at small sizes. This is our "utility" face, used for product specs, labels, and descriptions.

**Hierarchy as Brand Identity:**
*   **Authority:** Large, tight-kerning `headline-lg` titles in `on_surface`.
*   **Clarity:** Generous line-height (1.6) for `body-lg` to ensure technical specifications are easily digestible.

---

### 4. Elevation & Depth: Tonal Layering
Traditional shadows and borders are discarded in favor of **Tonal Layering**.

*   **The Layering Principle:** Place a `surface-container-lowest` card on a `surface-container-low` background. This creates a "soft lift" that feels architectural rather than "pasted on."
*   **Ambient Shadows:** Where floating is required (e.g., active product cards), use an extra-diffused shadow: `box-shadow: 0 20px 40px rgba(25, 28, 30, 0.06);`. The shadow is tinted by the `on_surface` color for a natural, ambient light effect.
*   **The "Ghost Border":** If accessibility requires a container edge, use the `outline_variant` (#c2c6d9) at **15% opacity**. Never use 100% opaque borders.

---

### 5. Components: Precision Primitives

#### Buttons (SaaS-Style)
*   **Primary:** Gradient fill (`primary` to `primary_container`), white text, `8px` corner radius. Subtle inner-glow on hover.
*   **Secondary:** `surface-container-high` background with `on_surface` text. No border.
*   **Tertiary:** Ghost style. No background; `primary` color text. Transitions to `surface-container-low` on hover.

#### Cards & Lists
*   **Rule:** Forbid divider lines. Use vertical whitespace (refer to `xl` spacing) to separate product items.
*   **Product Card:** Use `surface-container-lowest` with a `16px` radius. Content should be padded with `24px` internally to give the product imagery room to "breathe."

#### Input Fields
*   **Style:** Minimalist. Background `surface-container-highest`, no border. On focus, transition background to `surface-container-lowest` with a `2px` signature `primary` bottom-glow or subtle "Ghost Border."

#### Security-Specific Components
*   **Status Badges:** Use `tertiary` (#9d3000) for high-alert/out-of-stock and `primary` for "In-Stock/Secure." Badges should use `label-sm` and a pill-shape (`full` roundedness).
*   **Live View Miniature:** For CCTV previews, use a `12px` corner radius and a 20% opacity `on_surface` overlay for text readability.

---

### 6. Do's and Don'ts

#### Do
*   **Do** use asymmetrical layouts for Hero sections (e.g., text left-aligned, product image bleeding off the right edge).
*   **Do** prioritize `primary` gradients for "Cloud" related interactions.
*   **Do** use `surface-container` shifts to guide the eye from the product gallery to the checkout sidebar.

#### Don't
*   **Don't** use black (#000000) for text. Use `on_surface` (#191c1e) to maintain a premium, soft-contrast feel.
*   **Don't** use standard "drop shadows" with high opacity. They look "cheap" and dated.
*   **Don't** use sharp corners. The minimum radius is `sm` (4px), but the standard is `DEFAULT` (8px) for a modern, approachable tech feel.
*   **Don't** use dividers between list items. Use tonal shifts or 16px-24px of white space instead.

---
*Note to Junior Designers: This system is about the "invisible hand." The user shouldn't notice the grid; they should notice the ease of navigation and the authoritative feel of the Cloud Infotech brand.*