'use client';

import { BoardGame } from '@/app/lib/definitions';
import { useRouter } from 'next/navigation';

export default function EditForm({ game }: { game: BoardGame }) {
  const router = useRouter();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    alert("It is just a simulation");
    router.push(`/games/${game.id}`);
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 sm:p-10 rounded-[32px] shadow-sm border border-gray-100 flex flex-col gap-6">
      
      <div>
        <label className="block text-sm font-bold text-black mb-2">Title</label>
        <input required type="text" defaultValue={game.title} className="w-full rounded-xl border border-gray-300 py-3.5 px-4 outline-none focus:border-black focus:ring-2 focus:ring-black bg-gray-50 focus:bg-white transition-all text-sm" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-bold text-black mb-2">Game type</label>
          <select defaultValue={game.type} className="w-full rounded-xl border border-gray-300 py-3.5 px-4 outline-none focus:border-black focus:ring-2 focus:ring-black bg-gray-50 focus:bg-white transition-all text-sm">
            <option value="ekonomiczna">Ekonomiczna</option>
            <option value="przygodowa">Przygodowa</option>
            <option value="rodzinna">Rodzinna</option>
            <option value="towarzyska">Towarzyska</option>
            <option value="karciana">Karciana</option>
            <option value="abstrakcyjna">Abstrakcyjna</option>
            <option value="kooperacyjna">Kooperacyjna</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-bold text-black mb-2">Publishing house</label>
          <input required type="text" defaultValue={game.publisher} className="w-full rounded-xl border border-gray-300 py-3.5 px-4 outline-none focus:border-black focus:ring-2 focus:ring-black bg-gray-50 focus:bg-white transition-all text-sm" />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-bold text-black mb-2">Min. players</label>
          <input required type="number" min="1" defaultValue={game.min_players} className="w-full rounded-xl border border-gray-300 py-3.5 px-4 outline-none focus:border-black focus:ring-2 focus:ring-black bg-gray-50 focus:bg-white transition-all text-sm" />
        </div>
        <div>
          <label className="block text-sm font-bold text-black mb-2">Max. players</label>
          <input required type="number" min="1" defaultValue={game.max_players} className="w-full rounded-xl border border-gray-300 py-3.5 px-4 outline-none focus:border-black focus:ring-2 focus:ring-black bg-gray-50 focus:bg-white transition-all text-sm" />
        </div>
        <div>
          <label className="block text-sm font-bold text-black mb-2">Time (min)</label>
          <input required type="number" min="1" step="5" defaultValue={game.avg_play_time_minutes} className="w-full rounded-xl border border-gray-300 py-3.5 px-4 outline-none focus:border-black focus:ring-2 focus:ring-black bg-gray-50 focus:bg-white transition-all text-sm" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-end">
        <div>
          <label className="block text-sm font-bold text-black mb-2">Price (PLN)</label>
          <input required type="number" step="0.01" min="0" defaultValue={game.price_pln} className="w-full rounded-xl border border-gray-300 py-3.5 px-4 outline-none focus:border-black focus:ring-2 focus:ring-black bg-gray-50 focus:bg-white transition-all text-sm" />
        </div>
        <div className="flex items-center h-[50px] px-2">
          <input type="checkbox" id="is_expansion" defaultChecked={game.is_expansion} className="w-5 h-5 accent-black border-gray-300 rounded cursor-pointer" />
          <label htmlFor="is_expansion" className="ml-3 text-sm font-bold text-black cursor-pointer">
            Is expansion?
          </label>
        </div>
      </div>

      <div>
        <label className="block text-sm font-bold text-black mb-2">Description</label>
        <textarea required rows={5} defaultValue={game.description.join('\n')} className="w-full rounded-xl border border-gray-300 py-3.5 px-4 outline-none focus:border-black focus:ring-2 focus:ring-black bg-gray-50 focus:bg-white transition-all text-sm resize-none"></textarea>
      </div>

      <button type="submit" className="mt-4 w-full bg-black text-white text-lg font-bold py-4 rounded-full hover:bg-gray-800 transition">
        Save Changes
      </button>

    </form>
  );
}