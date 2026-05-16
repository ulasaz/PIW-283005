'use client';

import { auth, db } from '@/app/lib/firebase';
import { collection, addDoc } from 'firebase/firestore';

export default function AddToCartButton({ 
  gameId, 
  title, 
  price,
  imageUrl
}: { 
  gameId: any; 
  title: string; 
  price: number; 
  imageUrl?: string | null;
}) {
  
  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();

    const user = auth.currentUser;

    if (!user) {
      alert("You must log in to your account first to add to cart!");
      return;
    }

    try {
      await addDoc(collection(db, "cart"), {
        userId: user.uid,
        gameId: gameId,
        title: title,
        price: price,
        imageUrl: imageUrl || null,
        addedAt: new Date()
      });
      
      alert("The game has been added to your cart");
    } catch (error) {
      console.error("Error adding to cart", error);
      alert("Something went wrong");
    }
  };

  return (
    <button 
      onClick={handleAddToCart}
      className="flex-1 bg-white border-2 border-black text-black py-2 rounded-full text-m font-bold hover:bg-gray-50 transition"
    >
      Add to cart
    </button>
  );
}