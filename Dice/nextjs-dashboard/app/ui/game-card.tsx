import Link from 'next/link';
import { BoardGame } from '@/app/lib/definitions';

export default function GameCard({ game }: { game: BoardGame }) {
  const baseUrl = 'https://szandala.github.io/piwo-api/';
  const mainImage = game?.images?.length > 0 ? `${baseUrl}${game.images[0]}` : null;

  return (
    <Link 
      href={`/games/${game.id}`} 
      className="border border-gray-100 p-4 rounded-[24px] shadow-sm hover:shadow-md transition-all bg-white flex flex-col h-full group"
    >
      <div className="h-48 overflow-hidden bg-white flex items-center justify-center rounded-[16px] mb-4">
        {mainImage ? (
          <img src={mainImage} alt={game.title} className="w-full h-full object-contain" />
        ) : (
          <span className="text-gray-400">Brak zdjęcia</span>
        )}
      </div>
      
      <div className="flex flex-col flex-grow">
        <h2 className="text-lg font-bold text-black mb-1 leading-tight">{game.title}</h2>
        <span className="text-sm font-bold text-gray-900 mb-3 capitalize">{game.type}</span>
        
        <div className="mt-auto flex items-center justify-between mb-4">
          <div className="flex items-center text-sm text-gray-800 font-medium">
          <div className="flex items-center gap-2 text-sm text-gray-800 font-medium">
                <span className="text-black text-lg">👥</span>
                <span>{game.min_players}-{game.max_players} os.</span>
            </div>
          </div>
          <div className="text-lg font-extrabold text-black">
            {game.price_pln?.toFixed(0)} PLN
          </div>
        </div>

        <div className="flex gap-2 mt-2">
          <div className="bg-black text-white text-sm font-bold py-2.5 rounded-full flex-1 text-center group-hover:bg-gray-800 transition-colors">
            Buy Now
          </div>
          <div className="bg-white border border-gray-200 text-black text-sm font-bold py-2.5 rounded-full flex-1 text-center hover:bg-gray-50 transition-colors">
            Add to cart
          </div>
        </div>
      </div>
    </Link>
  );
}