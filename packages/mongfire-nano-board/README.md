# mongfire-nano-board

A plug-and-play React dashboard for managing MongoDB and Firestore collections inside your own app.

---

## ✨ Features

- 📁 View collections (MongoDB or Firestore)
- 🧾 View documents inside a selected collection
- 🖊️ MongoDB document update (basic)
- 🔌 Easy integration into any React project

---

## 🚀 Installation

```bash
pnpm add mongfire-nano-board
````

---

## 🔧 Usage

```tsx
import { MongFireDashboard } from 'mongfire-nano-board';

<MongFireDashboard
  mode="mongodb"
  mongoApiUrl="http://localhost:4000/api"
/>

// Or for Firestore
<MongFireDashboard
  mode="firestore"
  firestore={yourFirestoreInstance}
/>
```

---

## 📦 API

### Props

| Prop          | Type                | Required      | Description                 |                    |
| ------------- | ------------------- | ------------- | --------------------------- | ------------------ |
| `mode`        | \`'mongodb'         | 'firestore'\` | ✅                           | Data source to use |
| `mongoApiUrl` | `string`            | ❌             | Required for MongoDB mode   |                    |
| `firestore`   | `FirebaseFirestore` | ❌             | Required for Firestore mode |                    |

---

## 🛠 Mongo API Server (Optional)

If using MongoDB mode, you can use the included Express server:

```bash
pnpm --filter mongfire-nano-board dev:server
```

It exposes:

* `GET /api/collections` – list collection names
* `GET /api/:collection` – list documents
* `POST /api/:collection/:id` – update a document

---

## 📄 License

MIT © [Yeshan Perera](https://github.com/your-username)

