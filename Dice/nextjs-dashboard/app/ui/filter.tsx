'use client';

import { useSearchParams, usePathname, useRouter } from 'next/navigation';

export default function Filter() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  function handleFilterChange(key: string, value: string) {
    const params = new URLSearchParams(searchParams);
    
    if (value && value !== 'all') {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    
    <div className="space-y-6">
      <div className="w-full">
        <label className="block text-sm font-medium text-black mb-2">Price (pln)</label>
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="From"
            min="0"
            className="w-full rounded-lg border border-gray-300 py-2.5 px-4 outline-none focus:border-black focus:ring-1 focus:ring-black bg-white transition-all text-sm"
            onChange={(e) => handleFilterChange('min_price', e.target.value)}
            defaultValue={searchParams.get('min_price')?.toString()}
          />
          <input
            type="number"
            placeholder="To"
            min="0"
            className="w-full rounded-lg border border-gray-300 py-2.5 px-4 outline-none focus:border-black focus:ring-1 focus:ring-black bg-white transition-all text-sm"
            onChange={(e) => handleFilterChange('max_price', e.target.value)}
            defaultValue={searchParams.get('max_price')?.toString()}
          />
        </div>
      </div>
      <div className="w-full">
        <label htmlFor="category" className="block text-sm font-medium text-black mb-2">Game type</label>
        <select
          id="category"
          className="w-full rounded-lg border border-gray-300 py-2.5 px-4 outline-none focus:border-black focus:ring-1 focus:ring-black bg-white transition-all text-sm"
          onChange={(e) => handleFilterChange('type', e.target.value)}
          defaultValue={searchParams.get('type')?.toString() || 'all'}
        >
          <option value="all">Wszystkie kategorie</option>
          <option value="ekonomiczna">Ekonomiczna</option>
          <option value="przygodowa">Przygodowa</option>
          <option value="rodzinna">Rodzinna</option>
          <option value="towarzyska">Towarzyska</option>
          <option value="karciana">Karciana</option>
          <option value="abstrakcyjna">Abstrakcyjna</option>
          <option value="kooperacyjna">Kooperacyjna</option>
          <option value="zręcznościowa">Zręcznościowa</option>
        </select>
      </div>

      <div className="w-full">
        <label htmlFor="players" className="block text-sm font-medium text-black mb-2">Number of players</label>
        <input
          type="number"
          id="players"
          min="1"
          max="12"
          placeholder="np. 4"
          className="w-full rounded-lg border border-gray-300 py-2.5 px-4 outline-none focus:border-black focus:ring-1 focus:ring-black bg-white transition-all text-sm"
          onChange={(e) => handleFilterChange('players', e.target.value)}
          defaultValue={searchParams.get('players')?.toString()}
        />
      </div>

      <div className="w-full">
        <label htmlFor="publisher" className="block text-sm font-medium text-black mb-2">Publishing house</label>
        <select
          id="publisher"
          className="w-full rounded-lg border border-gray-300 py-2.5 px-4 outline-none focus:border-black focus:ring-1 focus:ring-black bg-white transition-all text-sm"
          onChange={(e) => handleFilterChange('publisher', e.target.value)}
          defaultValue={searchParams.get('publisher')?.toString() || 'all'}
        >
          <option value="all">Wszyscy wydawcy</option>
          <option value="Rebel">Rebel</option>
          <option value="Galakta">Galakta</option>
          <option value="Lacerta">Lacerta</option>
          <option value="Awaken Realms">Awaken Realms</option>
          <option value="Cephalofair Games">Cephalofair Games</option>
        </select>
      </div>

    </div>
  );
}