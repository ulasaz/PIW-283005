'use client';

import { useState } from 'react';
import { auth, db } from '@/app/lib/firebase';
import { doc, updateDoc } from 'firebase/firestore';

export default function BuyButton({
  gameId,
  isAvailable,
}: {
  gameId: string;
  isAvailable?: boolean;
}) {
  const [sold, setSold] = useState(isAvailable === false);
  const [loading, setLoading] = useState(false);

  const handleBuy = async (e: React.MouseEvent) => {
    e.preventDefault();

    const user = auth.currentUser;
    if (!user) {
      alert('You must be logged in to buy a game.');
      return;
    }

    if (!confirm('Do you want to buy this game?')) return;

    setLoading(true);
    try {
      await updateDoc(doc(db, 'games', gameId), { isAvailable: false });
      setSold(true);
      alert('Game purchased! It is no longer available.');
    } catch (error) {
      console.error('Error while buying the game', error);
      alert('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  if (sold) {
    return (
      <button
        disabled
        className="flex-1 bg-gray-200 text-gray-400 py-2 rounded-full text-m font-bold cursor-not-allowed"
      >
        Sold out
      </button>
    );
  }

  return (
    <button
      onClick={handleBuy}
      disabled={loading}
      className="flex-1 bg-black text-white py-2 rounded-full text-m font-bold hover:bg-gray-800 transition disabled:opacity-50"
    >
      {loading ? 'Processing...' : 'Buy Now'}
    </button>
  );
}