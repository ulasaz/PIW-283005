import { BoardGame } from '@/app/lib/definitions';
import Link from 'next/link';
import Image from 'next/image';

export default async function GameDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const gameId = parseInt(id, 10);

  const res = await fetch('https://szandala.github.io/piwo-api/board-games.json');
  const data = await res.json();
  const games: BoardGame[] = data.board_games;

  const game = games.find((g) => g.id === gameId);

  if (!game) {
    return (
      <main className="p-8 text-center">
        <h1 className="text-2xl font-bold">Gra не найдена</h1>
        <Link href="/" className="text-blue-600 hover:underline">Return to stroe</Link>
      </main>
    );
  }

  const baseUrl = 'https://szandala.github.io/piwo-api/';
  const mainImage = game.images.length > 0 ? `${baseUrl}${game.images[0]}` : null;

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
            <img 
              src={mainImage} 
              alt={game.title} 
              className="w-full h-auto object-contain max-h-[450px]"
            />
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
              <span className="text-black">👥</span> {game.min_players}-{game.max_players} os.
            </div>
            <div className="flex items-center gap-2">
              <span className="text-black">⏱️</span> {game.avg_play_time_minutes} min
            </div>
          </div>

          <div className="mb-10">
            <h3 className="text-lg font-bold text-black mb-4">O grze:</h3>
            <div className="space-y-4">
              {game.description.map((text, index) => (
                <p key={index} className="text-gray-600 leading-relaxed">
                  {text}
                </p>
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
              <p className="text-4xl font-black text-black">{game.price_pln.toFixed(2)} PLN</p>
            </div>
          </div>

          <div className="flex gap-4 mt-10">
            <button className="flex-1 bg-black text-white py-2 rounded-full text-m font-bold hover:bg-gray-800 transition shadow-lg">
              Buy Now
            </button>
            <button className="flex-1 bg-white border-2 border-black text-black py-2 rounded-full text-m font-bold hover:bg-gray-50 transition">
              Add to cart
            </button>
          </div>
        </div>

      </div>
    </main>
  );
}