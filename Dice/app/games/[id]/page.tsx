'use client';

import { useEffect, useState } from 'react';
import { useParams, usePathname } from 'next/navigation';
import Link from 'next/link';
import AddToCartButton from '@/app/ui/add-to-cart-button';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/app/lib/firebase';

export default function GameDetailsPage() {
  const pathname = usePathname(); 

  const gameId = pathname.split('/')[2];

  const [game, setGame] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGame = async () => {
      try {
        const docRef = doc(db, "games", gameId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setGame({ id: docSnap.id, ...docSnap.data() });
        } else {
          setGame(null);
        }
      } catch (error) {
        console.error("Ошибка загрузки игры:", error);
      } finally {
        setLoading(false);
      }
    };

    if (gameId) fetchGame();
  }, [gameId]);

  if (loading) {
    return <div className="p-32 text-center text-xl font-bold animate-pulse text-gray-400">Ładowanie gry...</div>;
  }

  if (!game) {
    return (
      <main className="p-8 text-center pt-32">
        <h1 className="text-2xl font-bold mb-4">Game not found</h1>
        <Link href="/" className="text-blue-600 hover:underline">&larr; Return to catalog</Link>
      </main>
    );
  }

  const price = game.price || game.price_pln || 0;
  const minPlayers = game.minPlayers || game.min_players || 1;
  const maxPlayers = game.maxPlayers || game.max_players || 4;
  const playTime = game.time || game.avg_play_time_minutes || 60;
  
  const descriptionBlocks = Array.isArray(game.description) 
    ? game.description 
    : [game.description || "No description"];

  const mainImage = game.imageUrl;

  return (
    <main className="p-8 max-w-[1200px] mx-auto">
      <div className="flex items-center justify-between mb-8">
        <Link href="/" className="inline-flex items-center text-sm font-bold text-gray-500 hover:text-black transition">
          &larr; Back to catalog
        </Link>
        <Link href={`/games/${game.id}/edit`} className="bg-gray-100 text-black px-6 py-2.5 rounded-full text-sm font-bold hover:bg-gray-200 transition">
          ✏️ Edit Game
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        <div className="bg-white p-10 rounded-[40px] border border-gray-100 shadow-sm flex items-center justify-center min-h-[500px]">
          {mainImage ? (
            <img src={mainImage} alt={game.title} className="w-full h-auto object-contain max-h-[450px]" />
          ) : (
            <div className="text-gray-300 text-xl font-medium">Brak zdjęcia</div>
          )}
        </div>

        <div className="flex flex-col h-full">
          <div className="mb-6">
            <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">{game.type}</span>
            <h1 className="text-5xl font-black text-black mt-2 leading-tight">{game.title}</h1>
          </div>

          <div className="flex items-center gap-6 mb-8 text-lg font-medium text-gray-600">
            <div className="flex items-center gap-2">
              <span className="text-black">👥</span> {minPlayers}-{maxPlayers} os.
            </div>
            <div className="flex items-center gap-2">
              <span className="text-black">⏱️</span> {playTime} min
            </div>
          </div>

          <div className="mb-10">
            <h3 className="text-lg font-bold text-black mb-4">O grze:</h3>
            <div className="space-y-4">
              {descriptionBlocks.map((text: string, index: number) => (
                <p key={index} className="text-gray-600 leading-relaxed">{text}</p>
              ))}
            </div>
          </div>

          <div className="mt-auto border-t border-gray-100 pt-8 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400 font-bold uppercase mb-1">Publisher</p>
              <p className="text-xl font-bold text-black">{game.publisher}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-400 font-bold uppercase mb-1">Price</p>
              <p className="text-4xl font-black text-black">{Number(price).toFixed(2)} PLN</p>
            </div>
          </div>

          <div className="flex gap-4 mt-10">
            <button className="flex-1 bg-black text-white py-2 rounded-full text-m font-bold hover:bg-gray-800 transition shadow-lg">
              Buy Now
            </button>
            <AddToCartButton gameId={game.id} title={game.title} price={Number(price)} />
          </div>
        </div>
      </div>
    </main>
  );
}