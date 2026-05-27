'use client';

import { useCart } from '@/app/lib/CartContext';

export default function AddToCartButton({
  gameId,
  title,
  price,
  imageUrl,
}: {
  gameId: string;
  title: string;
  price: number;
  imageUrl?: string;
}) {
  const { dispatch } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch({
      type: 'ADD_TO_CART',
      payload: { id: gameId, title, price, imageUrl },
    });
    alert(`${title} added to cart!`);
  };

  return (
    <button
      onClick={handleAddToCart}
      className="flex-1 bg-gray-200 text-gray-900 py-2 rounded-full text-m font-bold hover:bg-gray-300 transition"
    >
      Add to Cart
    </button>
  );
}