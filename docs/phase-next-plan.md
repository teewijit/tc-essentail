# TEE CULTURE FABRIC - Next Phase Plan

This phase plan intentionally starts after Module 1-3. The current implementation covers Home, Fabric Catalog, and Fabric Detail with static client-side data.

## Phase 2: Discovery Expansion

- Module 4 Shop By Color
  - Color palette and color list page.
  - Similar-color matching logic using color metadata.
  - Deep links from Home color swatches and Catalog filters.
- Module 5 Shop By Usage
  - Usage landing page for T-Shirt, Sportswear, Polo, Uniform, and Streetwear.
  - Curated collections by use case.
  - SEO-friendly static routes if the deployment remains static.

## Phase 3: Customer Account And Library

- Module 6 Customer Account
  - Register customer as individual or company.
  - Session-based login using PHP backend.
  - Dashboard showing favorites, folders, reservations, orders, and credit.
- Module 7 Fabric Library
  - Saved fabric list.
  - Folder create, rename, delete.
  - Add or remove fabric from folders.
- Module 8 Recently Viewed
  - Track latest 20 viewed fabrics.
  - Persist for guests in local storage, then migrate to account after login.

## Phase 4: Reservation And Order

- Module 9 Reservation
  - Reserve product for 48 hours.
  - Show reservation date, expire date, and remaining time.
  - Status lifecycle: Active, Expired, Converted To Order.
- Module 10 Order
  - Order submission and status tracking.
  - Status lifecycle: Submitted, Credit Check, Payment Pending, Processing, Ready For Pickup, Shipping, Completed.

## Phase 5: Customer Finance And History

- Module 11 Credit Control
  - Credit limit, used credit, and available credit.
  - Additional cash required message when credit is insufficient.
- Module 12 Purchase History
  - Order, product, color, and lot history.
- Module 13 Delivery Address
  - Multiple saved delivery addresses.
  - Labels such as Office, Factory, Cutting Table, and Garment.

## Phase 6: Review, Back Office, Reports

- Module 14 Customer Review
  - Product rating and review submission.
  - Review display on Home and Fabric Detail.
- Back Office
  - Product, color, category, and stock management.
  - Customer profile, credit limit, reservation, order, payment, tracking, and review management.
- Reports
  - Sales reports by daily, monthly, yearly.
  - Top product and top color reports.
  - Top customer and purchase trend reports.
  - Reservation conversion rate report.

## Backend Readiness

- PHP Native architecture: Controller, Service, Repository.
- MySQL 8 schema planning for fabrics, colors, customers, folders, reservations, orders, reviews, and reports.
- File logging under `storage/logs/`.
- Apache shared-hosting compatible deployment.
