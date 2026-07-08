# Design Documentation: Tee Culture Fabric

This project must follow this reference strictly for all frontend work.

## 1. Color Palette

The UI should feel modern, trustworthy, clean, and user-friendly.

- Primary Color: `#feb80e`
  - Use for action buttons, call-to-action buttons, key accents, important headings, badges, and status icons.
- Neutral Colors:
  - Black: `#000000` or near-black for headings, primary text, nav, and footer.
  - White: `#ffffff` for main backgrounds and card surfaces.
  - Grey scale: `#f4f4f4`, `#e0e0e0`, and dark grey body text for dividers, secondary surfaces, and readable content.

## 2. Layout & Spacing

- Global desktop horizontal padding: `80px - 120px`.
- Section vertical padding: `60px - 80px`.
- Card and grid gaps: `20px - 30px`.
- Layout should be clean and spacious with strong whitespace.

## 3. Card System

Product cards are the core of the site and must remain consistent.

- Background: `#ffffff`.
- Border: `1px solid #e0e0e0`.
- Border radius: `8px - 12px`.
- Content padding: `16px`.
- Hover shadow: `0 4px 6px rgba(0,0,0,0.1)`.
- Hover interaction: scale up slightly with `transform: scale(1.02)`.

## 4. Typography & Buttons

- Buttons:
  - Background: `#feb80e`.
  - Text: `#000000`.
  - Font weight: bold.
  - Border radius: `4px - 6px`.
- Headings:
  - Black.
  - Bold.
- Body text:
  - Dark grey.
  - Clear and readable.

## 5. UI Elements

- Search Bar:
  - Minimal style.
  - White background.
  - Light grey border.
  - Search icon on the right.
- Filter and Tags:
  - Pill-shaped controls for quick category selection.

## 6. Reference Behavior

- Product imagery should have the highest visual hierarchy.
- Hover states must clearly confirm clickability.
- Whitespace should make the product feel premium.
- Product listing should follow the supplied catalog reference: top utility bar, clean nav, breadcrumb/title area, left filter panel, right product grid, compact search/sort controls, and consistent cards.

## 7. shadcn/ui Configuration

- The frontend must use `shadcn/ui` as the UI primitive layer.
- Installed command: `npx shadcn@latest init --template vite --base radix --preset nova --css-variables --pointer`.
- Component config lives in `components.json`.
- UI primitives live in `src/components/ui`.
- Theme tokens live in `src/index.css`.
- Required design token mapping:
  - `--primary`: `#feb80e`
  - `--primary-foreground`: `#000000`
  - `--background`: white
  - `--foreground`: black
  - `--border` and `--input`: `#e0e0e0`
  - `--ring`: `#feb80e`
- Reusable app components should wrap or compose shadcn primitives instead of hand-rolling buttons, cards, inputs, checkboxes, badges, separators, and sliders.
