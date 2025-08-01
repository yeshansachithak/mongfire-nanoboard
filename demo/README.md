# MongFireNanoBoard Demo

This is a local development demo for the `mongfire-nano-board` package.

It showcases how to embed the `MongFireDashboard` component inside any React + Vite application and connect to either a MongoDB or Firestore backend.

---

## 🛠 Setup Instructions

### 1. Install dependencies

Make sure you're in the project root:

```bash
pnpm install
````

---

### 2. Start MongoDB API Server (optional)

If you're testing with MongoDB, start the internal Express API:

```bash
pnpm --filter mongfire-nano-board dev:server
```

By default, it connects to:

* `mongodb://localhost:27017`
* Database: `mongfire_dashboard`

---

### 3. Start the Demo App

```bash
pnpm --filter demo dev
```

It will run on [http://localhost:5173](http://localhost:5173)

---

## 🧪 Modes

The dashboard supports two modes:

* **MongoDB**: Uses a simple API (`/api/collections`, `/api/:collection`)
* **Firestore**: Uses Firestore SDK directly (you must pass an initialized instance)

---

## 📦 Switch Modes

Edit `demo/src/App.tsx` to change the mode:

```tsx
<MongFireDashboard
  mode="mongodb" // or "firestore"
  mongoApiUrl="http://localhost:4000/api" // only needed for MongoDB mode
/>
```

---

## 📁 Folder Structure

```
demo/
├── public/            # Static assets (if any)
├── src/
│   └── App.tsx        # Main demo entry point
├── index.html         # Vite HTML entry
└── vite.config.ts     # Vite config with Tailwind
```

---

## 🧩 Tailwind CSS

Tailwind CSS is pre-configured for styling. You can use utility classes throughout your custom implementations.

---

## 🔥 Live Reload

Changes to the `mongfire-nano-board` package will reflect automatically in the demo app using `pnpm` workspaces.

---

## 📜 License

MIT — see root project license.
