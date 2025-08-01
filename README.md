# 🧪 MongFireNanoBoard Monorepo

This is a monorepo for building and testing the `mongfire-nano-board` package — a plug-and-play React dashboard for managing MongoDB and Firestore collections.  

---

## 📁 Structure

```

mongfire-nanoboard/
├── demo/                    # Local app to test and showcase the UI
├── packages/
│   └── mongfire-nano-board/ # Reusable package (React component + Express API)
├── pnpm-workspace.yaml      # Workspace definition
├── tsconfig.json            # Shared TS config

````

---

## 🛠 Development Setup

### 1. Install dependencies

```bash
pnpm install
````

This will install packages for both `demo` and `packages/mongfire-nano-board`.

---

### 2. Run the MongoDB API Server (optional)

```bash
pnpm --filter mongfire-nano-board dev:server
```

The server will be available at `http://localhost:4000/api`.

---

### 3. Run the demo app

```bash
pnpm --filter demo dev
```

Then open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📦 Package Publishing

To publish `mongfire-nano-board` to npm:

```bash
cd packages/mongfire-nano-board
pnpm publish --access public
```

Make sure to update version number in `package.json`.

---

## 📄 License

MIT © [Yeshan Perera](https://github.com/your-username)
