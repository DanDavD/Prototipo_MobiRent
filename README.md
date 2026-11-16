# MobiRent Honduras — Interactive Software Prototype

Digital web marketplace prototype for temporary rental of furniture, appliances, and commercial event equipment in Honduras (San Pedro Sula and Tegucigalpa). Built for investor pitching and business model validation.

- **Live Prototype:** [dandavd.github.io/Prototipo_MobiRent](https://dandavd.github.io/Prototipo_MobiRent/)
- **Author:** Daniel David ([@DanDavD](https://github.com/DanDavD))
- **Stack:** Vue 3 (Composition API & Reactive Store), Tailwind CSS, Vanilla JavaScript, HTML5

---

## Architecture & Modular Structure

The prototype is organized into a modular component-driven architecture separating reactive state management, business rules, mock datasets, and role-based views:

```text
Prototipo_MobiRent/
├── index.html                  # Semantic entry point and CDN script orchestrator
├── css/
│   └── styles.css              # Custom styling, scrollbar behaviors, and design tokens
├── js/
│   ├── data.js                 # Initial catalog items, categories, cities, and presets
│   ├── store.js                # Centralized reactive state store and business logic
│   ├── app.js                  # Vue application initialization and component mounting
│   └── components/
│       ├── LoginView.js        # Authentication portal with credential routing
│       ├── Navbar.js           # Navigation bar with role-specific navigation tabs
│       ├── RenterView.js       # Renter interface (catalog discovery, filters, search)
│       ├── OwnerView.js        # Equipment owner dashboard (earnings, inventory management)
│       ├── AdminView.js        # Operations dashboard (live logistics tracking, financial audit)
│       └── Modals.js           # Dialogs (real-time quoting engine, checkout, order tracking)
├── serve.sh                    # Local static server helper script (port 8888)
└── README.md                   # Technical documentation
```

---

## Authentication & Demo Access

The platform implements role-based authentication separating client and administrator access:

| Role | Email | Password | Access Scope |
| :--- | :--- | :--- | :--- |
| **Client (Renter & Host)** | `cliente@gmail.com` | `contra123` | Catalog discovery, checkout, pricing calculator, and host earnings dashboard |
| **Administrator (Operations)** | `admin@gmail.com` | `contra123` | Live dispatch stepper, platform fee auditing, and security deposit management |

---

## Core Capabilities & User Workflows

### 1. Renter Workflow
- **Catalog & Discovery:** Filter inventory by city (San Pedro Sula / Tegucigalpa) and categories (Living, Appliances, Events, Office, Catering).
- **Real-Time Quoting Engine:** Calculates dynamic rates per day, week, or month with transparent cost breakdowns:
  - Base rental subtotal
  - MobiRent freight logistics
  - Platform service fee
  - Refundable security deposit
- **Checkout & Active Rentals:** Simulated checkout with delivery address selection and a dedicated "My Rentals" tracking modal.

### 2. Equipment Owner (Host) Workflow
- **Earnings Portal:** Real-time visibility into accumulated rental income and pending bank payouts.
- **Listing Management:** Item publishing with customizable pricing tiers (day/week/month) and security deposit requirements.
- **Inventory Control:** Status toggling (active/paused) and order request history.

### 3. Operations & Logistics Admin Workflow
- **Interactive 5-Stage Logistics Stepper:** Step-by-step dispatch workflow tracking the complete equipment lifecycle:
  `[Assign Driver] -> [Pickup in Progress] -> [In Transit] -> [Delivered] -> [Returned & Deposit Released]`
- **Financial Telemetry:** Platform fee margins, active escrow deposits, and catalog moderation.

---

## Running the Project Locally

### Direct in Browser
Open `index.html` directly in any modern browser (Chrome, Edge, Safari, Firefox).

### Using the Local Server Script
```bash
# Make the script executable (if needed)
chmod +x serve.sh

# Run the local server
./serve.sh
```
- Local machine URL: `http://localhost:8888`
- Local network URL (for testing on mobile devices on the same Wi-Fi): `http://<YOUR_LOCAL_IP>:8888`
