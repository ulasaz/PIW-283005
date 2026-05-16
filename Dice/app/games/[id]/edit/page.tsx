'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import EditForm from '@/app/ui/edit-form';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/app/lib/firebase';
import { usePathname } from 'next/navigation';

export default function EditGamePage() {
  const pathname = usePathname(); 

  const gameId = pathname.split('/')[2];

  const [game, setGame] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSingleGame = async () => {
      if (!gameId) return;

      try {
        const docRef = doc(db, "games", gameId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setGame({ id: docSnap.id, ...docSnap.data() });
        } else {
          console.log("Document not found");
        }
      } catch (error) {
        console.error("Error loading game", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSingleGame();
  }, [gameId]);

  if (loading) {
    return <div className="pt-32 text-center text-lg font-bold text-gray-500 animate-pulse">Loading game data...</div>;
  }

  if (!game) {
    return (
      <main className="p-8 text-center pt-32">
        <h1 className="text-2xl font-bold">Game not found</h1>
      </main>
    );
  }

  return (
    <main className="p-8 max-w-3xl mx-auto pt-32">
      <div className="mb-10 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-black text-black">Edit item</h1>
          <p className="text-gray-500 font-medium mt-2">{game.title}</p>
        </div>
        <Link href={`/games/${game.id}`} className="text-sm font-bold text-gray-500 hover:text-black transition">
          &larr; Cancel
        </Link>
      </div>

      <EditForm game={game} />
      
    </main>
  );
}