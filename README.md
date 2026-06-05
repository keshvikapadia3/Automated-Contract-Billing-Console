# 📄 Automated Contract Billing Console

A modern, responsive **Contract Billing Web Application** built with React, TypeScript, and Redux Toolkit. It enables organizations to track, manage, and monitor contracts with real-time expiry alerts, point-based value tracking, invoice summaries, and a live dashboard — all behind a secure login system.

---

## 📌 Table of Contents

- [Project Description](#-project-description)
- [Tech Stack](#-tech-stack)
- [Core Concepts Used](#-core-concepts-used)
- [Pages & Features](#-pages--features)
- [Getting Started](#-getting-started)
- [Available Scripts](#-available-scripts)
- [Project Structure](#-project-structure)
- [Redux State Management](#-redux-state-management)
- [Contributing](#-contributing)
- [License](#-license)

---

## 📖 Project Description

The **Automated Contract Billing Console** is a multi-page front-end web application that allows teams to:

- Manage contracts with expiry tracking and status indicators
- Add and manage points (with values) linked to each contract
- View invoice summaries showing the total value per contract
- Monitor everything from a live dashboard
- Securely log in and log out (clearing all Redux state on logout)

Whether you're managing vendor agreements, service contracts, or partnerships — this tool keeps you in full control.

---

## 🛠 Tech Stack

| Technology                | Purpose                                           |

| **React 18**              | UI component library                              |
| **TypeScript**            | Type safety and improved developer experience     |
| **Redux Toolkit**         | Global state management across all modules        |
| **React-Redux**           | Connecting React components to the Redux store    |
| **React Router v6**       | Client-side routing between pages                 |
| **Material UI (MUI v5)**  | Pre-built UI components and theming               |
| **MUI Icons**             | Icon set (Edit, Delete, Warning, Dashboard, etc.) |
| **Vite**                  | Fast dev server and production build tool         |

---

## 🧩 Core Concepts Used

| Concept                 | Where Applied                                                      |

| **React-Redux**         | Global state for contracts, points, auth                           |
| **React Router**        | Navigation between Contract, Point, Invoice, Dashboard pages       |
| **Reusable Components** | Header, Footer, StatusChip, FormDialog used across pages           |
| **Props & State**       | Component-level form state, props passed to child components       |
| **Hooks**               | `useState`, `useEffect`, `useDispatch`, `useSelector` throughout   |
| **Material UI**         | All layout, tables, dialogs, cards, chips, and form controls       |

---

## ✨ Pages & Features

### 🔐 Login / Logout
- Simple login page to authenticate and enter the app
- Logout clears all Redux state (contracts, points, auth) and redirects to login
- Protected routes — all pages require login to access

### 📊 Dashboard
- Summary cards showing total contracts, active contracts, and expiring-soon count
- Per-contract breakdown showing contract name and its total points value
- Expiry warning banner when any contract expires within 30 days

### 📄 Contract Page
- View all contracts in a table: **Contract Name, Start Date, End Date, Status**
- ➕ Add new contracts via a dialog form
- ✏️ Edit existing contracts inline via dialog
- 🗑️ Delete contracts with a confirmation prompt
- 🟢 Color-coded status chips: `Active` / `Expires in Xd` / `Expired`
- ⚠️ Row highlighting — orange for expiring soon, red for expired
- 📋 Form validation — contract name is required

### 📍 Point Page
- Select a contract from a dropdown
- ➕ Add points with **Point Name** (text) and **Value** (number) fields
- ✏️ Edit existing points
- 🗑️ Delete points with confirmation
- 📋 View all points for the selected contract in a list below the form

### 🧾 Invoice Page
- Lists all contracts with the **total value** of all their associated points
- Auto-calculates sum of point values per contract
- Quick overview for billing and cost tracking

### 🔝 Header & Footer
- **Header** — displays the project name and logo, present on every page
- **Footer** — displays `Copyright © LEI`, present on every page

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v16 or higher)
- [Git](https://git-scm.com/)

### Clone & Install

```bash
# 1. Clone the repository
git clone https://github.com/keshvikapadia3/Automated-Contract-Billing-Console.git

# 2. Navigate into the project directory
cd Automated-Contract-Billing-Console

# 3. Install dependencies
npm install
```

### Run the Development Server

```bash
npm run dev
```

Open your browser and visit: `http://localhost:5173`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

---

## 📜 Available Scripts

| Command              | Description                           |

| `npm run dev`        | Start local development server (Vite) |
| `npm run build`      | Build the app for production          |
| `npm run preview`    | Preview the production build locally  |
| `npm run lint`       | Run ESLint for code quality checks    |
| `npm run type-check` | Run TypeScript compiler checks        |

---

## 📁 Project Structure

```
Automated-Contract-Billing-Console/
│
├── node_modules/
│
├── public/
│   ├── favicon.svg
│   └── icons.svg
│
├── src/
│   │
│   ├── app/
│   │   └── store.ts
│   │
│   ├── assets/
│   │   ├── hero.png
│   │   ├── Linde-Logo.png
│   │   ├── react.svg
│   │   └── vite.svg
│   │
│   ├── components/
│   │   ├── Footer.tsx
│   │   ├── Header.tsx
│   │   ├── Layout.tsx
│   │   ├── ProtectedRoute.tsx
│   │   └── Sidebar.tsx
│   │
│   ├── features/
│   │   │
│   │   ├── auth/
│   │   │   └── authSlice.ts
│   │   │
│   │   ├── contracts/
│   │   │   └── contractSlice.ts
│   │   │
│   │   └── points/
│   │       └── pointSlice.ts
│   │
│   ├── hooks/
│   │   └── reduxHooks.ts
│   │
│   ├── pages/
│   │   ├── ContractPage.tsx
│   │   ├── Dashboard.tsx
│   │   ├── InvoicePage.tsx
│   │   ├── Login.tsx
│   │   └── PointPage.tsx
│   │
│   ├── routes/
│   │   └── AppRoutes.tsx
│   │
│   ├── types/
│   │   └── index.ts
│   │
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
│
├── .gitignore
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── README.md
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

---

## 🗂 Redux State Management

The app uses **Redux Toolkit** with separate slices for auth, contracts, and points.

### State Shape

```ts
// Auth
interface AuthState {
  isLoggedIn: boolean;
  username: string;
}

// Contracts
interface Contract {
  id: number;
  name: string;
  startDate: string;   // "YYYY-MM-DD"
  endDate: string;     // "YYYY-MM-DD"
}

// Points
interface Point {
  id: number;
  contractId: number;  // links to Contract.id
  name: string;
  value: number;
}
```

### Available Actions

**Auth Slice**

| Action | Description |
|---|---|
| `login` | Sets `isLoggedIn: true` |
| `logout` | Clears all Redux state and redirects to login |

**Contract Slice**

| Action | Payload | Description |
|---|---|---|
| `addContract` | `{ name, startDate, endDate }` | Adds a new contract with auto-generated ID |
| `updateContract` | Full `Contract` object | Updates an existing contract by ID |
| `deleteContract` | `id: number` | Removes a contract and its associated points |

**Point Slice**

| Action | Payload | Description |
|---|---|---|
| `addPoint` | `{ contractId, name, value }` | Adds a point linked to a contract |
| `updatePoint` | Full `Point` object | Updates an existing point by ID |
| `deletePoint` | `id: number` | Removes a point by ID |

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Make your changes and commit: `git commit -m "Add your feature"`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Open a Pull Request

---

## 📃 License

This project is licensed under the [MIT License](LICENSE).

---

> Built with ❤️ using React, TypeScript, Redux Toolkit, React Router, and Material UI.
> Copyright © LEI