'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation'; 
import { collection, addDoc } from 'firebase/firestore'; 
import { auth, db } from '../lib/firebase';

export default function AddGamePage() {
    const router = useRouter();

    const [title, setTitle] = useState("");
    const [gameType, setGameType] = useState("ekonomiczna");
    const [publisher, setPublisher] = useState("");
    const [description, setDescription] = useState("");
    const [minPlayers, setMinPlayers] = useState(0);
    const [maxPlayers, setMaxPlayers] = useState(0);
    const [isExpansion, setExpansion] = useState(false);
    const [time, setTime] = useState(0);
    const [price, setPrice] = useState(0);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const user = auth.currentUser;

    if (!user) {
      alert("You need to log in to your account first to add your game");
      return;
    }

    const newGame = {
      userId: user.uid,
      title: title,
      type: gameType,
      publisher: publisher,
      price: price,
      description: description,
      minPlayers: minPlayers,
      maxPlayers: maxPlayers,
      time: time,
      isExpansion: isExpansion,
      isAvailable: true,
      createdAt: new Date()
    };

    try{
      await addDoc(collection(db, "games"), newGame);
      alert("Game was added!");
    }
    catch (error) {
      console.error("Ошибка при загрузке корзины:", error);
    }
    finally{
      router.push("/");
    }
  }

  return (
    <main className="p-8 max-w-3xl mx-auto">
      
      <div className="mb-10 flex items-center justify-between">
        <h1 className="text-4xl font-black text-black">Add new item</h1>
        <Link href="/" className="text-sm font-bold text-gray-500 hover:text-black transition">
          &larr; Back to store
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-8 sm:p-10 rounded-[32px] shadow-sm border border-gray-100 flex flex-col gap-6">
        
        <div>
          <label className="block text-sm font-bold text-black mb-2">Title</label>
          <input required type="text" className="w-full rounded-xl border border-gray-300 py-3.5 px-4 outline-none focus:border-black focus:ring-2 focus:ring-black bg-gray-50 focus:bg-white transition-all text-sm" placeholder="ex. Monopoly" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold text-black mb-2">Game type</label>
            <select 
              className="w-full rounded-xl border border-gray-300 py-3.5 px-4 outline-none focus:border-black focus:ring-2 focus:ring-black bg-gray-50 focus:bg-white transition-all text-sm"
              value={gameType} 
              onChange={(e) => setGameType(e.target.value)}
            >
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
            <input required type="text" className="w-full rounded-xl border border-gray-300 py-3.5 px-4 outline-none focus:border-black focus:ring-2 focus:ring-black bg-gray-50 focus:bg-white transition-all text-sm" placeholder="np. Rebel" 
              value={publisher} 
              onChange={(e) => setPublisher(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-bold text-black mb-2">Min. players</label>
            <input required type="number" min="1" className="w-full rounded-xl border border-gray-300 py-3.5 px-4 outline-none focus:border-black focus:ring-2 focus:ring-black bg-gray-50 focus:bg-white transition-all text-sm" placeholder="1" 
              value={minPlayers} 
              onChange={(e) => setMinPlayers(Number(e.target.value))}
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-black mb-2">Max. players</label>
            <input required type="number" min="1" className="w-full rounded-xl border border-gray-300 py-3.5 px-4 outline-none focus:border-black focus:ring-2 focus:ring-black bg-gray-50 focus:bg-white transition-all text-sm" placeholder="4" 
              value={maxPlayers} 
              onChange={(e) => setMaxPlayers(Number(e.target.value))}
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-black mb-2">Time (min)</label>
            <input required type="number" min="5" className="w-full rounded-xl border border-gray-300 py-3.5 px-4 outline-none focus:border-black focus:ring-2 focus:ring-black bg-gray-50 focus:bg-white transition-all text-sm" placeholder="60" 
              value={time} 
              onChange={(e) => setTime(Number(e.target.value))}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-end">
          <div>
            <label className="block text-sm font-bold text-black mb-2">Price (PLN)</label>
            <input required type="number" step="0.01" min="0" className="w-full rounded-xl border border-gray-300 py-3.5 px-4 outline-none focus:border-black focus:ring-2 focus:ring-black bg-gray-50 focus:bg-white transition-all text-sm" placeholder="199.99" 
              value={price} 
              onChange={(e) => setPrice(Number(e.target.value))}
            />
          </div>
          <div className="flex items-center h-[50px] px-2">
            <input type="checkbox" id="is_expansion" className="w-5 h-5 accent-black border-gray-300 rounded cursor-pointer" 
              checked={isExpansion}
              onChange={(e) => setExpansion(e.target.checked)}
            />
            <label htmlFor="is_expansion" className="ml-3 text-sm font-bold text-black cursor-pointer">
              Is expansion?
            </label>
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-black mb-2">Description</label>
          <textarea 
            required 
            rows={4} 
            className="w-full rounded-xl border border-gray-300 py-3.5 px-4 outline-none focus:border-black focus:ring-2 focus:ring-black bg-gray-50 focus:bg-white transition-all text-sm resize-none" 
            placeholder="Opisz zasady gry..."
            value={description} 
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <button type="submit" className="mt-4 w-full bg-black text-white text-lg font-bold py-4 rounded-full hover:bg-gray-800 transition">
          Add game to store
        </button>

      </form>
    </main>
  );
}