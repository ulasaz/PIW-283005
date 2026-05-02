'use client';

import Link from 'next/link';

export default function AddGamePage() {
  
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    alert("Game was added! It is just a UI simulation.");
    const form = e.target as HTMLFormElement;
    form.reset();
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
          <input required type="text" className="w-full rounded-xl border border-gray-300 py-3.5 px-4 outline-none focus:border-black focus:ring-2 focus:ring-black bg-gray-50 focus:bg-white transition-all text-sm" placeholder="ex. Monopoly" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold text-black mb-2">Game type</label>
            <select className="w-full rounded-xl border border-gray-300 py-3.5 px-4 outline-none focus:border-black focus:ring-2 focus:ring-black bg-gray-50 focus:bg-white transition-all text-sm">
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
            <input required type="text" className="w-full rounded-xl border border-gray-300 py-3.5 px-4 outline-none focus:border-black focus:ring-2 focus:ring-black bg-gray-50 focus:bg-white transition-all text-sm" placeholder="np. Rebel" />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-bold text-black mb-2">Min. players</label>
            <input required type="number" min="1" className="w-full rounded-xl border border-gray-300 py-3.5 px-4 outline-none focus:border-black focus:ring-2 focus:ring-black bg-gray-50 focus:bg-white transition-all text-sm" placeholder="1" />
          </div>
          <div>
            <label className="block text-sm font-bold text-black mb-2">Max. players</label>
            <input required type="number" min="1" className="w-full rounded-xl border border-gray-300 py-3.5 px-4 outline-none focus:border-black focus:ring-2 focus:ring-black bg-gray-50 focus:bg-white transition-all text-sm" placeholder="4" />
          </div>
          <div>
            <label className="block text-sm font-bold text-black mb-2">Time (min)</label>
            <input required type="number" min="1" step="5" className="w-full rounded-xl border border-gray-300 py-3.5 px-4 outline-none focus:border-black focus:ring-2 focus:ring-black bg-gray-50 focus:bg-white transition-all text-sm" placeholder="60" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-end">
          <div>
            <label className="block text-sm font-bold text-black mb-2">Price (PLN)</label>
            <input required type="number" step="0.01" min="0" className="w-full rounded-xl border border-gray-300 py-3.5 px-4 outline-none focus:border-black focus:ring-2 focus:ring-black bg-gray-50 focus:bg-white transition-all text-sm" placeholder="199.99" />
          </div>
          <div className="flex items-center h-[50px] px-2">
            <input type="checkbox" id="is_expansion" className="w-5 h-5 accent-black border-gray-300 rounded cursor-pointer" />
            <label htmlFor="is_expansion" className="ml-3 text-sm font-bold text-black cursor-pointer">
              Is expansion?
            </label>
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-black mb-2">Description</label>
          <textarea required rows={4} className="w-full rounded-xl border border-gray-300 py-3.5 px-4 outline-none focus:border-black focus:ring-2 focus:ring-black bg-gray-50 focus:bg-white transition-all text-sm resize-none" placeholder="Opisz zasady gry..."></textarea>
        </div>

        <button type="submit" className="mt-4 w-full bg-black text-white text-lg font-bold py-4 rounded-full hover:bg-gray-800 transition">
          Add game to store
        </button>

      </form>
    </main>
  );
}