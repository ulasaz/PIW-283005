import { BoardGame } from '@/app/lib/definitions';
import Search from '@/app/ui/search';
import Filter from '@/app/ui/filter';
import GameCard from '@/app/ui/game-card';
import Pagination from '@/app/ui/pagination';

export default async function Home(props: {
  searchParams?: Promise<{ 
    search?: string; 
    type?: string;
    players?: string;
    publisher?: string;
    min_price?: string;
    max_price?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  
  const searchQuery = searchParams?.search?.toLowerCase() || '';
  const typeQuery = searchParams?.type || '';
  const playersQuery = parseInt(searchParams?.players || '0', 10);
  const publisherQuery = searchParams?.publisher || '';
  const minPriceQuery = parseFloat(searchParams?.min_price || '0');
  const maxPriceQuery = parseFloat(searchParams?.max_price || '0');
  
  const currentPage = parseInt(searchParams?.page || '1', 10);

  const res = await fetch('https://szandala.github.io/piwo-api/board-games.json');
  const data = await res.json();
  const games: BoardGame[] = data.board_games;

  const filteredGames = games.filter((game) => {
    const matchesSearch = game.title.toLowerCase().includes(searchQuery);
    const matchesType = typeQuery ? game.type === typeQuery : true;
    const matchesPlayers = playersQuery > 0 
      ? (playersQuery >= game.min_players && playersQuery <= game.max_players) 
      : true;
    const matchesPublisher = publisherQuery ? game.publisher === publisherQuery : true;
    const matchesMinPrice = minPriceQuery > 0 ? game.price_pln >= minPriceQuery : true;
    const matchesMaxPrice = maxPriceQuery > 0 ? game.price_pln <= maxPriceQuery : true;

    return matchesSearch && matchesType && matchesPlayers && matchesPublisher && matchesMinPrice && matchesMaxPrice;
  });

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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-max">
            {paginatedGames.length > 0 ? (
              paginatedGames.map((game) => (
                <GameCard key={game.id} game={game} />
              ))
            ) : (
              <div className="col-span-full bg-white p-8 rounded-2xl text-center border border-gray-200">
                <p className="text-lg text-gray-500">Nie znaleziono gier spełniających kryteria.</p>
              </div>
            )}
          </div>

          <Pagination totalPages={totalPages} />

        </div>
      </div>
    </main>
  );
}