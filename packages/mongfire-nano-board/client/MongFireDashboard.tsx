// packages/mongfire-nano-board/client/MongFireDashboard.tsx
import { useEffect, useState } from 'react';

export interface MongFireDashboardProps {
    mode: 'mongodb' | 'firestore';
    mongoApiUrl?: string;
    firestore?: any; // Firestore instance (for mode === 'firestore')
}

export const MongFireDashboard = ({
    mode,
    mongoApiUrl = 'http://localhost:4000/api',
    firestore,
}: MongFireDashboardProps) => {
    const [collections, setCollections] = useState<string[]>([]);
    const [selectedCollection, setSelectedCollection] = useState<string | null>(null);
    const [documents, setDocuments] = useState<any[]>([]);

    useEffect(() => {
        if (mode === 'mongodb') {
            fetch(`${mongoApiUrl}/collections`)
                .then((res) => res.json())
                .then(setCollections);
        } else if (mode === 'firestore' && firestore) {
            firestore.listCollections().then((colls: any[]) => {
                setCollections(colls.map((c) => c.id));
            });
        }
    }, [mode]);

    useEffect(() => {
        if (!selectedCollection) return;

        if (mode === 'mongodb') {
            fetch(`${mongoApiUrl}/${selectedCollection}`)
                .then((res) => res.json())
                .then(setDocuments);
        } else if (mode === 'firestore' && firestore) {
            firestore
                .collection(selectedCollection)
                .get()
                .then((snap: any) => {
                    const docs = snap.docs.map((doc: any) => ({ id: doc.id, ...doc.data() }));
                    setDocuments(docs);
                });
        }
    }, [selectedCollection]);

    return (
        <div style={{ padding: '1rem' }}>
            <h2>MongFire Dashboard ({mode})</h2>

            <div>
                <h3>Collections</h3>
                <ul>
                    {collections.map((name) => (
                        <li key={name}>
                            <button onClick={() => setSelectedCollection(name)}>{name}</button>
                        </li>
                    ))}
                </ul>
            </div>

            {selectedCollection && (
                <div>
                    <h3>Documents in {selectedCollection}</h3>
                    <pre style={{ background: '#eee', padding: '1rem', overflowX: 'auto' }}>
                        {JSON.stringify(documents, null, 2)}
                    </pre>
                </div>
            )}
        </div>
    );
};
