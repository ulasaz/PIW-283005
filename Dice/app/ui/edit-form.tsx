'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@/app/lib/firebase';
import { BoardGame } from '@/app/lib/definitions';

export default function EditForm({ game }: { game: BoardGame }) {
  const router = useRouter();

  const [title, setTitle] = useState(game.title || '');
  const [type, setType] = useState(game.type || 'ekonomiczna');
  const [publisher, setPublisher] = useState(game.publisher || '');
  const [minPlayers, setMinPlayers] = useState(game.minPlayers || 0);
  const [maxPlayers, setMaxPlayers] = useState(game.maxPlayers || 0);
  const [time, setTime] = useState(game.time || 0);
  const [price, setPrice] = useState(game.price || 0);
  const [isExpansion, setIsExpansion] = useState(game.isExpansion || false);
  const [description, setDescription] = useState(
    Array.isArray(game.description) ? game.description.join('\n') : (game.description || '')
  );
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      await updateDoc(doc(db, 'games', game.id), {
        title,
        type,
        publisher,
        minPlayers,
        maxPlayers,
        time,
        price,
        isExpansion,
        description,
      });
      alert('Changes saved!');
      router.push(`/games/${game.id}`);
    } catch (error) {
      console.error('Error while saving the game', error);
      alert('Failed to save changes');
    } finally {
      setSaving(false);
    }
  }

  const inputCls =
    'w-full rounded-xl border border-gray-300 py-3.5 px-4 outline-none focus:border-black focus:ring-2 focus:ring-black bg-gray-50 focus:bg-white transition-all text-sm';

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 sm:p-10 rounded-[32px] shadow-sm border border-gray-100 flex flex-col gap-6">

      <div>
        <label className="block text-sm font-bold text-black mb-2">Title</label>
        <input required type="text" value={title} onChange={(e) => setTitle(e.target.value)} className={inputCls} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-bold text-black mb-2">Game type</label>
          <select value={type} onChange={(e) => setType(e.target.value)} className={inputCls}>
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
          <input required type="text" value={publisher} onChange={(e) => setPublisher(e.target.value)} className={inputCls} />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-bold text-black mb-2">Min. players</label>
          <input required type="number" min="1" value={minPlayers} onChange={(e) => setMinPlayers(Number(e.target.value))} className={inputCls} />
        </div>
        <div>
          <label className="block text-sm font-bold text-black mb-2">Max. players</label>
          <input required type="number" min="1" value={maxPlayers} onChange={(e) => setMaxPlayers(Number(e.target.value))} className={inputCls} />
        </div>
        <div>
          <label className="block text-sm font-bold text-black mb-2">Time (min)</label>
          <input required type="number" min="1" step="5" value={time} onChange={(e) => setTime(Number(e.target.value))} className={inputCls} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-end">
        <div>
          <label className="block text-sm font-bold text-black mb-2">Price (PLN)</label>
          <input required type="number" step="0.01" min="0" value={price} onChange={(e) => setPrice(Number(e.target.value))} className={inputCls} />
        </div>
        <div className="flex items-center h-[50px] px-2">
          <input type="checkbox" id="is_expansion" checked={isExpansion} onChange={(e) => setIsExpansion(e.target.checked)} className="w-5 h-5 accent-black border-gray-300 rounded cursor-pointer" />
          <label htmlFor="is_expansion" className="ml-3 text-sm font-bold text-black cursor-pointer">Is expansion?</label>
        </div>
      </div>

      <div>
        <label className="block text-sm font-bold text-black mb-2">Description</label>
        <textarea required rows={5} value={description} onChange={(e) => setDescription(e.target.value)} className={inputCls + ' resize-none'} />
      </div>

      <button type="submit" disabled={saving} className="mt-4 w-full bg-black text-white text-lg font-bold py-4 rounded-full hover:bg-gray-800 transition disabled:opacity-50">
        {saving ? 'Saving...' : 'Save Changes'}
      </button>

    </form>
  );
}