"use client";

import { useEffect, useState } from "react";
import { auth, db } from "../lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { collection, query, where, getDocs, deleteDoc, doc } from "firebase/firestore";
import Link from "next/link";

export default function MyCartPage() {
  const [games, setGames] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        await fetchMyGames(user.uid);
      } else {
        setGames([]);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchMyGames = async (userId: string) => {
    try {
      const gamesRef = collection(db, "cart");
      const q = query(gamesRef, where("userId", "==", userId));
      const querySnapshot = await getDocs(q);
      
      const myGamesData: any[] = [];
      querySnapshot.forEach((doc) => {
        myGamesData.push({ id: doc.id, ...doc.data() });
      });
      
      setGames(myGamesData);
    } catch (error) {
      console.error("An error has occured during loading a cart", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFromCart = async (itemId: string) => {
    try {
      await deleteDoc(doc(db, "cart", itemId));
      setGames((prev) => prev.filter(game => game.id !== itemId));
    } catch (error) {
      console.error("Error durning deleting", error);
      alert("An error was occured while deleting");
    }
  };

  if (loading) {
    return <div className="pt-32 text-center text-lg font-bold text-gray-500 animate-pulse">Cart loading...</div>;
  }

  const totalPrice = games.reduce((sum, game) => sum + (Number(game.price) || 0), 0);

  return (
    <div className="pt-32 max-w-[1400px] mx-auto px-8 pb-10">
      <div className="flex justify-between items-end mb-8">
        <h1 className="text-4xl font-black text-black">My cart</h1>
        {games.length > 0 && (
          <p className="text-xl font-bold text-gray-600">Total: <span className="text-black text-2xl">{totalPrice.toFixed(2)} PLN</span></p>
        )}
      </div>
      
      {games.length === 0 ? (
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-10 text-center">
          <p className="text-gray-500 text-lg mb-4">Your cart is empty.</p>
          <Link href="/" className="inline-block bg-black text-white px-8 py-3 rounded-full font-bold hover:bg-gray-800 transition">
            Start buying !
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {games.map((game) => {
            const price = game.price || 0;
            const gameLink = `/games/${game.gameId}`;

            return (
              <div key={game.id} className="border border-gray-100 p-4 rounded-[24px] shadow-sm hover:shadow-md transition-all bg-white flex flex-col h-full group">
                
                <Link href={gameLink} className="flex flex-col flex-grow">
                <div className="h-48 overflow-hidden bg-white flex items-center justify-center rounded-[16px] mb-4 border border-gray-100">
                {game.imageUrl ? (
                  <img src={game.imageUrl} alt={game.title} className="w-full h-full object-contain p-2" />
                ) : (
                  <span className="text-gray-400">🎲 Brak zdjęcia</span>
                )}
              </div>
                  
                  <h2 className="text-lg font-bold text-black mb-1 leading-tight group-hover:text-gray-600 transition-colors">
                    {game.title}
                  </h2>
                  
                  <div className="mt-auto flex items-center justify-between mb-4 pt-4">
                    <div className="text-xl font-extrabold text-black">
                      {Number(price).toFixed(2)} PLN
                    </div>
                  </div>
                </Link>

                <button 
                  onClick={() => handleRemoveFromCart(game.id)}
                  className="mt-2 bg-red-50 text-red-600 text-sm font-bold py-2.5 rounded-full w-full text-center hover:bg-red-100 transition-colors"
                >
                  Remove from cart
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}