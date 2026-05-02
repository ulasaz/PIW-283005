'use client';

import { useSearchParams, usePathname, useRouter } from 'next/navigation';

export default function Search() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  function handleSearch(term: string) {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('search', term);
    } else {
      params.delete('search');
    }
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="w-full relative">
      <label htmlFor="search" className="sr-only">Szukaj gry</label>
      
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>

      <input
        type="text"
        id="search"
        className="w-full bg-gray-100 text-gray-900 rounded-full border-none py-3.5 pl-12 pr-24 focus:ring-2 focus:ring-black outline-none transition-all"
        placeholder="Search a game (ex. Catan)..."
        onChange={(e) => handleSearch(e.target.value)}
        defaultValue={searchParams.get('search')?.toString()}
      />

      <div className="absolute inset-y-0 right-1 flex items-center">
      </div>
    </div>
  );
}