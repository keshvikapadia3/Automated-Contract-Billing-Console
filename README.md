# 📄 Automated Contract Billing Console (ACBC)

A full-stack web application for managing contracts, tracking billing points, and generating invoice summaries — built with **React + TypeScript** on the frontend and **FastAPI + PostgreSQL** on the backend.

---

## 📌 Table of Contents

- [Project Description](#-project-description)
- [Problem It Solves](#-problem-it-solves)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Redux State Management](#-redux-state-management)
- [Database Design](#-database-design)
- [REST API Documentation](#-rest-api-documentation)
- [Application Workflow](#-application-workflow)
- [Getting Started](#-getting-started)
- [Available Scripts](#-available-scripts)
- [Configuration](#-configuration)
- [Screenshots](#-screenshots)
- [Future Enhancements](#-future-enhancements)
- [Challenges Faced](#-challenges-faced)
- [Contributing](#-contributing)
- [License](#-license)

---

## 📖 Project Description

The **Automated Contract Billing Console** is a multi-page internal tool that enables organizations to track, manage, and monitor contracts and their associated billing points. It provides a live dashboard with expiry alerts, a contract manager, a point-value system, and an invoice summary — all secured behind a login system.

---

## 💡 Problem It Solves

Managing contracts manually across spreadsheets leads to missed expiry dates, inconsistent billing values, and poor visibility. ACBC centralizes all contract and billing data, automatically calculates total values per contract, and alerts teams when contracts are expiring soon — reducing errors and improving financial oversight.

---

## 🛠 Tech Stack

### Frontend

| Technology | Purpose |
|---|---|
| React 19 | UI component library |
| TypeScript | Type safety |
| Redux Toolkit | Global state (`auth`, `contracts`, `points` slices) |
| React-Redux | Typed `useAppDispatch` / `useAppSelector` hooks |
| React Router v7 | Layout-nested routing, `ProtectedRoute` guard |
| Material UI (MUI v9) + Emotion | UI components, theming, sidebar/drawer layout |
| MUI Icons | Sidebar nav icons, password show/hide toggle |
| Vite | Dev server and build tool |
| Axios + Fetch API | `services/api.ts` (Axios CRUD) and native `fetch` (initial/login data load) |
| uuid | Installed, currently unused in active logic |

### Backend

| Technology | Purpose |
|---|---|
| FastAPI 0.138 | REST API framework |
| Python 3.13 | Runtime |
| SQLAlchemy 2.0 | ORM for database interaction |
| PostgreSQL | Relational database |
| psycopg2-binary | PostgreSQL adapter |
| Pydantic | Request body validation |
| Uvicorn | ASGI server |
| python-dotenv | Environment variable management |
| PyJWT | JWT library (installed, not yet active) |
| passlib[bcrypt] | Password hashing (installed, not yet active) |

---
## 📁 Project Structure

```
Automated-Contract-Billing-Console/
│
├── frontend/
│   │
│   ├── public/
│   │   ├── favicon.svg
│   │   └── icons.svg
│   │
│   ├── src/
│   │   │
│   │   ├── app/
│   │   │   └── store.ts
│   │   │
│   │   ├── assets/
│   │   │   ├── hero.png
│   │   │   ├── Linde-Logo.png
│   │   │   ├── react.svg
│   │   │   └── vite.svg
│   │   │
│   │   ├── components/
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Layout.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   └── ProtectedRoute.tsx
│   │   │
│   │   ├── features/
│   │   │   │   
│   │   │   ├── auth/
│   │   │   │   └── authSlice.ts
│   │   │   │
│   │   │   ├── contracts/
│   │   │   │   └── contractSlice.ts
│   │   │   │
│   │   │   └── points/
│   │   │       └── pointSlice.ts
│   │   │
│   │   ├── hooks/
│   │   │   └── reduxHooks.ts
│   │   │
│   │   ├── pages/
│   │   │   ├── Login.tsx
│   │   │   ├── Dashboard.tsx
│   │   │   ├── ContractPage.tsx
│   │   │   ├── PointPage.tsx
│   │   │   └── InvoicePage.tsx
│   │   │
│   │   ├── routes/
│   │   │   └── AppRoutes.tsx
│   │   │
│   │   ├── services/
│   │   │   └── api.ts
│   │   │
│   │   ├── types/
│   │   │   └── index.ts
│   │   │
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   │   
│   ├── .gitignore
│   ├── eslint.config.js
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   ├── README.md
│   ├── tsconfig.app.json
│   ├── tsconfig.json
│   ├── tsconfig.node.json
│   └── vite.config.ts
│
├── backend/
│   │
│   ├── .gitignore
│   ├── requirements.txt
│   ├── .env
│   ├── main.py
│   ├── database.py
│   ├── models.py
│   
└── README.md
```

---

## ✨ Pages & Features

### 🔐 Login
- Username/password form with show/hide password toggle
- On success, stores `username` + a placeholder token in Redux and `localStorage`, then loads contracts/points before redirecting to the dashboard

### 📊 Dashboard
- Summary cards: total contracts, active, expired, total points
- Expiry warning banner for any contract expiring within 30 days, showing days left

### 📄 Contract Page
- Table view: **#, Contract Name, Start Date, End Date, Status**
- Summary cards: total contracts, active, expiring soon
- ➕ Add / ✏️ Edit via dialog form — only **name** is required
- 🗑️ Delete with a `window.confirm` prompt
- 🟢 Color-coded status chips: `Active` / `Expiring Soon` / `Expired`

### 📍 Point Page
- Contract dropdown (defaults to contract ID `1`)
- ➕ Add / ✏️ Edit point with **Point Name** and **Value** (must be > 0)
- 🗑️ Delete with confirmation
- Points table for the selected contract, with a live count chip

### 🧾 Invoice Page
- Summary cards: total contracts, total points, grand total value
- Table of total point value per contract

### 🔝 Sidebar, Header & Footer
- **Sidebar** — collapsible nav drawer (Dashboard/Contracts/Points/Invoice) + Logout
- **Header** — fixed top bar with logo, title, and hamburger toggle (hidden on the login page)
- **Footer** — fixed `Copyright © LEI 2026` bar on every page

---

## 🗄 Database Design

### `contracts` table

| Column | Type | Constraints |
|---|---|---|
| id | INTEGER | Primary Key, auto-increment |
| name | VARCHAR | — |
| start_date | DATE | — |
| end_date | DATE | — |

### `points` table

| Column | Type | Constraints |
|---|---|---|
| id | INTEGER | Primary Key, auto-increment |
| contract_id | INTEGER | Foreign Key → contracts.id |
| point_name | VARCHAR | — |
| value | INTEGER | — |

### `users` table

| Column | Type | Constraints |
|---|---|---|
| id | INTEGER | Primary Key, auto-increment |
| username | VARCHAR | Unique, Not Null |
| password | VARCHAR | Not Null |
| full_name | VARCHAR | — |
| role | VARCHAR | Default: "user" |
| created_at | TIMESTAMP | Server default: now() |

**Relationship:** `points.contract_id` → `contracts.id` (one contract has many points; deleting a contract cascades deletion of its points at the application level).

---

## 🔌 REST API Documentation

### Contracts

| Method | Endpoint | Description | Request Body |
|---|---|---|---|
| GET | `/contracts` | Fetch all contracts | — |
| POST | `/contracts` | Create a new contract | `{ name, start_date, end_date }` |
| PUT | `/contracts/{id}` | Update an existing contract | `{ name, start_date, end_date }` |
| DELETE | `/contracts/{id}` | Delete contract and its points | — |

### Points

| Method | Endpoint | Description | Request Body |
|---|---|---|---|
| GET | `/points` | Fetch all billing points | — |
| POST | `/points` | Create a new point | `{ contract_id, point_name, value }` |
| PUT | `/points/{id}` | Update an existing point | `{ contract_id, point_name, value }` |
| DELETE | `/points/{id}` | Delete a point | — |

### Auth

| Method | Endpoint | Description | Request Body |
|---|---|---|---|
| POST | `/login` | Authenticate a user | `{ username, password }` |

**Dates** use `YYYY-MM-DD` format (ISO 8601). The API returns `start_date` and `end_date` in snake_case; the frontend maps these to `startDate`/`endDate` camelCase fields in Redux.

---

## 🔄 Application Workflow

**1. Login**
User submits credentials to `POST /login`. On success, the frontend dispatches `loginSuccess` with a placeholder token string (`"db-login-token"`) — real JWT issuance is not yet wired up — then fetches all contracts and points in parallel before navigating to the dashboard.

**2. Dashboard**
Reads contracts and points from Redux. Displays summary cards (total contracts, active, expired), per-contract value breakdown, and an expiry warning banner for any contract expiring within 30 days.

**3. Contract Management**
Full CRUD via dialog forms. Only the contract name is validated as required (dates are optional). Status is computed client-side from `endDate`: `Expired` if past, `Expiring Soon` if within 30 days, otherwise `Active` — shown as color-coded chips and reflected in the page's summary cards. Creating, updating, or deleting a contract calls the appropriate API endpoint and re-syncs Redux from the database. Deleting a contract also removes all associated points (handled in the backend before deleting the contract record). Dates are rendered by reversing the `YYYY-MM-DD` string segments to display as `DD-MM-YYYY`.

**4. Billing Points**
Select a contract from a dropdown (defaults to contract ID `1`) to view its points. Add/edit form requires a non-empty point name and a value greater than 0. Add, edit, or delete points via inline forms; each save/delete re-fetches `/points` so Redux always mirrors the database rather than being patched optimistically.

**5. Invoice Calculation**
The invoice page reads contracts and points from Redux and calculates the total value per contract client-side by summing `point.value` for all points linked to each contract, plus a grand total across all contracts. Summary cards show total contracts, total points, and grand total value. No separate invoice endpoint is needed.

**6. Backend Communication**
The frontend uses the native `fetch` API (plus an Axios instance in `services/api.ts`). All data is fetched globally in `App.tsx` on mount and after login. Individual pages re-sync after their own mutations.

**7. Database Storage**
PostgreSQL stores all data. SQLAlchemy ORM handles queries. Tables are auto-created on server start via `Base.metadata.create_all`.

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v16 or higher)
- [Git](https://git-scm.com/)
- [Python 3.10]((https://www.python.org/))

### Clone & Install

```bash
# 1. Clone the repository
git clone https://github.com/keshvikapadia3/Automated-Contract-Billing-Console.git

# 2. Navigate into the project directory
cd Automated-Contract-Billing-Console

# 3. Install dependencies
npm install
```

### Backend Setup

```bash
# 1. Navigate to backend
cd backend

# 2. Create and activate virtual environment
python -m venv venv
venv\Scripts\activate        # Windows
source venv/bin/activate     # macOS/Linux

# 3. Install dependencies
pip install -r requirements.txt

# 4. Configure PostgreSQL
# Create a database named ACBCdb in PostgreSQL
# Update DATABASE_URL in .env and database.py to match your credentials

# 5. Start the server (tables are created automatically on first run)
uvicorn main:app --reload
```

The API will be available at `http://127.0.0.1:8000`
Swagger docs at `http://127.0.0.1:8000/docs`

### Frontend Setup

```bash
# 1. Navigate to frontend
cd frontend

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

---


### Frontend — Backend URL

The base URL is set in `src/services/api.ts`:

```typescript
baseURL: "http://127.0.0.1:8000"
```

Update this if deploying the backend to a different host or port.

---

## 📸 Screenshots

| Page | Description |
|---|---|
| Login | Username/password form with show/hide password toggle |
| Dashboard | Summary cards, expiry warning banners, contract overview table |
| Contracts | Full CRUD table with status chips (Active / Expiring Soon / Expired) |
| Billing Points | Contract selector dropdown with points table and inline add/edit form |
| Invoice Report | Total value per contract with start/end dates in DD-MM-YYYY format |

---

## 🔮 Future Enhancements

- **JWT Authentication** — Replace plain-text password login with token-based auth using the already-installed PyJWT and passlib libraries
- **Password Hashing** — Hash stored passwords with bcrypt (passlib is already installed)
- **Search & Filters** — Filter contracts by status, date range, or name on the contracts page
- **Export Invoice to PDF** — Generate downloadable PDF invoices from the invoice page
- **Pagination** — Add server-side pagination for large contract/point datasets
- **Role-Based Access Control** — Use the existing `role` field on the users table to restrict edit/delete actions
- **Docker Support** — Containerize frontend, backend, and PostgreSQL for one-command setup
- **Unit & Integration Tests** — Add pytest for backend endpoints and React Testing Library for frontend
- **Soft Delete** — Archive contracts instead of hard-deleting them to preserve billing history
- **Dynamic default selection** — Billing Points page currently defaults to contract ID `1`; should default to the first available contract instead

---

## ⚠️ Challenges Faced

- **Redux–DB sync** — Local-only updates caused data to revert on reload; fixed by syncing every mutation with the API before re-fetching from the DB.
- **FK violations on delete** — Deleting a contract with linked points threw `ForeignKeyViolation`; fixed by deleting its points first.
- **Data lost on refresh** — Fetches were scattered across page `useEffect`s; centralized into `App.tsx` and the login handler.
- **snake_case vs camelCase** — Backend returns `start_date`/`end_date`; frontend uses `startDate`/`endDate`, requiring consistent mapping.
- **Stale dev server** — uvicorn occasionally served outdated routes; required manual restarts.
- **Placeholder auth token** — `authSlice` persists a fixed `"db-login-token"` string, not a real JWT — real validation is still a follow-up item.

---

## 🗂 Redux State Management

The app uses **Redux Toolkit** with three slices, accessed via typed `useAppDispatch`/`useAppSelector` hooks (`hooks/reduxHooks.ts`).

**Auth Slice** (`authSlice.ts`) — `{ isLoggedIn, username, token }`, initialized from and synced to `localStorage`.

| Action | Description |
|---|---|
| `loginSuccess` | Sets `isLoggedIn: true`, stores `username`/`token` |
| `logout` | Clears auth state and `localStorage` |

**Contract Slice** (`contractSlice.ts`) — `{ contracts: Contract[] }`, `Contract = { id, name, startDate, endDate }`.

| Action | Payload | Description |
|---|---|---|
| `setContracts` | `Contract[]` | Replaces the list (used after fetch/login) |
| `addContract` | `Omit<Contract, "id">` | Adds locally with `Date.now()` as ID |
| `updateContract` | Full `Contract` | Updates by ID |
| `deleteContract` | `id: number` | Removes by ID |

**Point Slice** (`pointSlice.ts`) — `{ points: Point[] }`, `Point = { id, contractId, pointName, value }`.

| Action | Payload | Description |
|---|---|---|
| `setPoints` | `Point[]` | Replaces the list (used after fetch/login) |
| `addPoint` | `Omit<Point, "id">` | Adds locally with a timestamp-string ID |
| `updatePoint` | Full `Point` | Updates by ID |
| `deletePoint` | `id: string` | Removes by ID |

> All pages re-sync these slices from the database after each mutation, so Redux mirrors the backend rather than being the source of truth.

---

## 🤝 Contributing

Contributions are welcome:

1. Fork the repository
2. Create a branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m "Add your feature"`
4. Push the branch: `git push origin feature/your-feature-name`
5. Open a Pull Request

---

## 📃 License

This project is licensed under the [MIT License](LICENSE).

---

> Built with ❤️ using React, TypeScript, Redux Toolkit, React Router, and Material UI.
> Copyright © LEI