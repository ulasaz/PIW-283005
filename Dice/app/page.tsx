'use client';

import { useState, useEffect, Suspense, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import Search from '@/app/ui/search';
import Filter from '@/app/ui/filter';
import GameCard from '@/app/ui/game-card';
import Pagination from '@/app/ui/pagination';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './lib/firebase';

function HomeContent() {
  const searchParams = useSearchParams();
  const [gamesFromDb, setGamesFromDb] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "games"));
        const games: any[] = [];
        querySnapshot.forEach((doc) => {
          games.push({ id: doc.id, ...doc.data() });
        });
        setGamesFromDb(games);
      } catch (error) {
        console.error("Error loading games", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  const searchQuery = searchParams.get('search')?.toLowerCase() || '';
  const typeQuery = searchParams.get('type') || '';
  const playersQuery = parseInt(searchParams.get('players') || '0', 10);
  const publisherQuery = searchParams.get('publisher') || '';
  const minPriceQuery = parseFloat(searchParams.get('min_price') || '0');
  const maxPriceQuery = parseFloat(searchParams.get('max_price') || '0');
  const currentPage = parseInt(searchParams.get('page') || '1', 10);

  const filteredGames = useMemo(() => gamesFromDb.filter((game) => {
      if (!game.title) return false;
      if (game.isAvailable === false) return false;
  
      const matchesSearch = game.title.toLowerCase().includes(searchQuery);
      const matchesType = typeQuery ? game.type === typeQuery : true;
      const matchesPlayers = playersQuery > 0 
        ? (playersQuery >= (game.minPlayers || 0) && playersQuery <= (game.maxPlayers || 99)) 
        : true;
      const matchesPublisher = publisherQuery ? game.publisher === publisherQuery : true;
      const matchesMinPrice = minPriceQuery > 0 ? (game.price || 0) >= minPriceQuery : true;
      const matchesMaxPrice = maxPriceQuery > 0 ? (game.price || 0) <= maxPriceQuery : true;
  
      return matchesSearch && matchesType && matchesPlayers && matchesPublisher && matchesMinPrice && matchesMaxPrice;
  }), [gamesFromDb, searchQuery, typeQuery, playersQuery, publisherQuery, minPriceQuery, maxPriceQuery]);

  const ITEMS_PER_PAGE = 6;
  const totalPages = Math.ceil(filteredGames.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  
  const paginatedGames = filteredGames.slice(startIndex, endIndex);

  return (
    <main className="p-8 max-w-[1400px] mx-auto">
      <div className="flex flex-col md:flex-row gap-10">
        
        <aside className="w-full md:w-64 flex-shrink-0">
          <h1 className="text-4xl font-black text-black mb-10 leading-tight">Give all you need</h1>
          <h2 className="text-xl font-bold text-black mb-6">Filters</h2>
          
          <div className="space-y-6">
            <div><Filter /></div>
            
            <div className="pt-4 space-y-4">
              <a href="/add" className="w-full block text-center bg-black text-white text-sm font-bold py-3.5 rounded-full hover:bg-gray-800 transition">
                Add item
              </a>
            </div>
          </div>
        </aside>

        <div className="flex-1 flex flex-col">
          
          <div className="w-full mb-10">
            <Search />
          </div>

          {loading ? (
            <div className="flex-1 flex items-center justify-center min-h-[400px]">
              <p className="text-xl text-gray-500 font-bold animate-pulse">Loading games...</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-max">
                {paginatedGames.length > 0 ? (
                  paginatedGames.map((game) => (
                    <GameCard key={game.id} game={game} />
                  ))
                ) : (
                  <div className="col-span-full bg-white p-8 rounded-2xl text-center border border-gray-200">
                    <p className="text-lg text-gray-500">No games found matching your criteria.</p>
                  </div>
                )}
              </div>

              {totalPages > 0 && <Pagination totalPages={totalPages} />}
            </>
          )}

        </div>
      </div>
    </main>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div className="p-8 text-center">Loading...</div>}>
      <HomeContent />
    </Suspense>
  );
}