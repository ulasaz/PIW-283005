'use client';

import { usePathname, useSearchParams, useRouter } from 'next/navigation';

export default function Pagination({ totalPages }: { totalPages: number }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  
  const currentPage = Number(searchParams.get('page')) || 1;

  const createPageURL = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center items-center gap-6 mt-12">
      <button
        onClick={() => replace(createPageURL(currentPage - 1))}
        disabled={currentPage <= 1}
        className="px-6 py-3 bg-white border border-gray-200 text-black font-bold rounded-full hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
      >
        &larr; Previous
      </button>

      <span className="text-sm font-bold text-gray-500">
        Page {currentPage} of {totalPages}
      </span>
      
      <button
        onClick={() => replace(createPageURL(currentPage + 1))}
        disabled={currentPage >= totalPages}
        className="px-6 py-3 bg-black text-white font-bold rounded-full hover:bg-gray-800 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed transition"
      >
        Next &rarr;
      </button>
    </div>
  );
}