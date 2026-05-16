import Link from 'next/link';
import AddToCartButton from '@/app/ui/add-to-cart-button';

export default function GameCard({ game }: { game: any }) {
  const mainImage = game.imageUrl;
  const minPlayers = game.minPlayers || game.min_players || '?';
  const maxPlayers = game.maxPlayers || game.max_players || '?';
  const price = game.price || game.price_pln || 0;

  return (
    <div className="border border-gray-100 p-4 rounded-[24px] shadow-sm hover:shadow-md transition-all bg-white flex flex-col h-full group">
      
      <Link href={`/games/${game.id}`} className="flex flex-col flex-grow">
        <div className="h-48 overflow-hidden bg-white flex items-center justify-center rounded-[16px] mb-4">
          {mainImage ? (
            <img src={mainImage} alt={game.title} className="w-full h-full object-contain" />
          ) : (
            <span className="text-gray-400">Brak zdjęcia</span>
          )}
        </div>
        
        <h2 className="text-lg font-bold text-black mb-1 leading-tight group-hover:text-gray-600 transition-colors">{game.title}</h2>
        <span className="text-sm font-bold text-gray-900 mb-3 capitalize">{game.type}</span>
        
        <div className="mt-auto flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-800 font-medium">
            <span className="text-black text-lg">👥</span>
            <span>{minPlayers}-{maxPlayers} os.</span>
          </div>
          <div className="text-lg font-extrabold text-black">
            {Number(price).toFixed(0)} PLN
          </div>
        </div>
      </Link>

      <div className="flex gap-2 mt-2">
        <button className="bg-black text-white text-sm font-bold py-2.5 rounded-full flex-1 text-center hover:bg-gray-800 transition-colors">
          Buy Now
        </button>
        <AddToCartButton 
          gameId={game.id} 
          title={game.title} 
          price={Number(price)} 
          imageUrl={mainImage}
          />
      </div>
    </div>
  );
}