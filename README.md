# TEE CULTURE FABRIC

Phase 1 frontend prototype for the TEE CULTURE FABRIC platform.

## Current Scope

- Module 1: Home
  - Hero banner, search fabric, shop by color, shop by fabric type, new arrival, popular fabrics, recommended fabrics, how to order, and customer reviews.
- Module 2: Fabric Catalog
  - Product listing with image swatches, code, name, price, color, filters, and sort.
- Module 3: Fabric Detail
  - Product spec, available color, highlights, stock status, save/folder/reserve actions, and PDF spec export with QR code.

Everything after Module 3 is planned in `docs/phase-next-plan.md`.

## Commands

```bash
npm install
npm run dev
npm run lint
npm run build
```

## API Mapping

Frontend calls the PHP backend at:

```bash
http://localhost/api-tee-culture
```

For a custom backend URL during development:

```bash
VITE_API_BASE_URL=http://127.0.0.1:8088/api-tee-culture npm run dev
```

If the backend is unavailable, the app falls back to local seed data and shows `Using fallback data`.

## Tech Stack

- React
- Vite
- Tailwind CSS
- lucide-react
- jsPDF
- qrcode
