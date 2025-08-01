// packages/mongfire-nano-board/server/index.ts
import express, { Request, Response } from 'express';
import { MongoClient, ObjectId } from 'mongodb';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 4000;

// Allow custom Mongo URI and DB name via environment
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017';
const DB_NAME = process.env.DB_NAME || 'mongfire_dashboard';

app.use(cors());
app.use(express.json());

let db: any = null;

// Connect to MongoDB once on server start
MongoClient.connect(MONGO_URI)
    .then((client) => {
        db = client.db(DB_NAME);
        console.log(`✅ Connected to MongoDB: ${DB_NAME}`);
    })
    .catch((err) => {
        console.error('❌ MongoDB connection failed:', err);
    });

// Health check route
app.get('/health', (_req: Request, res: Response) => {
    res.send('✅ MongFire API is running');
});

// List all collections
app.get('/api/collections', async (_req: Request, res: Response) => {
    if (!db) return res.status(500).send('❌ MongoDB not ready');
    try {
        const collections = await db.listCollections().toArray();
        res.json(collections.map((c: any) => c.name));
    } catch (err) {
        res.status(500).json({ error: 'Failed to list collections', details: err });
    }
});

// Get all documents in a collection
app.get('/api/:collection', async (req: Request, res: Response) => {
    if (!db) return res.status(500).send('❌ MongoDB not ready');
    const { collection } = req.params;
    try {
        const docs = await db.collection(collection).find().limit(100).toArray();
        res.json(docs);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch documents', details: err });
    }
});

// Update a document by _id
app.post('/api/:collection/:id', async (req: Request, res: Response) => {
    if (!db) return res.status(500).send('❌ MongoDB not ready');
    const { collection, id } = req.params;
    const body = req.body;

    if (!ObjectId.isValid(id)) {
        return res.status(400).send('❌ Invalid document ID');
    }

    try {
        const result = await db
            .collection(collection)
            .updateOne({ _id: new ObjectId(id) }, { $set: body });

        if (result.matchedCount === 0) {
            return res.status(404).send('❌ Document not found');
        }

        res.send({ updated: true });
    } catch (err) {
        res.status(500).json({ error: 'Failed to update document', details: err });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`🚀 MongFire API listening on http://localhost:${port}`);
});
