'use client';

import Link from 'next/link';
import { useCart } from '@/app/lib/CartContext';

export default function MyCartPage() {
  const { state, dispatch, totalPrice } = useCart();

  if (state.items.length === 0) {
    return (
      <div className="pt-32 max-w-[1400px] mx-auto px-8 pb-10">
        <h1 className="text-4xl font-black text-black mb-8">My cart</h1>
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-10 text-center">
          <p className="text-gray-500 text-lg mb-4">Your cart is empty.</p>
          <Link href="/" className="inline-block bg-black text-white px-8 py-3 rounded-full font-bold hover:bg-gray-800 transition">
            Start buying!
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 max-w-[1400px] mx-auto px-8 pb-10">
      <div className="flex justify-between items-end mb-8">
        <h1 className="text-4xl font-black text-black">My cart</h1>
        <p className="text-xl font-bold text-gray-600">
          Total: <span className="text-black text-2xl">{totalPrice.toFixed(2)} PLN</span>
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {state.items.map((item) => (
          <div key={item.id} className="border border-gray-100 p-4 rounded-[24px] shadow-sm hover:shadow-md transition-all bg-white flex flex-col h-full group">

            <div className="h-48 overflow-hidden bg-white flex items-center justify-center rounded-[16px] mb-4 border border-gray-100">
              {item.imageUrl ? (
                <img src={item.imageUrl} alt={item.title} className="w-full h-full object-contain p-2" />
              ) : (
                <span className="text-gray-400">No image</span>
              )}
            </div>

            <h2 className="text-lg font-bold text-black mb-1 leading-tight group-hover:text-gray-600 transition-colors">
              {item.title}
            </h2>

            <div className="mt-auto flex items-center justify-between mb-4 pt-4">
              <div className="text-xl font-extrabold text-black">
                {(item.price * item.quantity).toFixed(2)} PLN
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => dispatch({ type: 'DECREASE_QUANTITY', payload: item.id })}
                  className="w-8 h-8 bg-gray-100 rounded-full font-bold hover:bg-gray-200 transition"
                >
                  −
                </button>
                <span className="font-bold">{item.quantity}</span>
                <button
                  onClick={() => dispatch({ type: 'INCREASE_QUANTITY', payload: item.id })}
                  className="w-8 h-8 bg-gray-100 rounded-full font-bold hover:bg-gray-200 transition"
                >
                  +
                </button>
              </div>
            </div>

            <button
              onClick={() => dispatch({ type: 'REMOVE_FROM_CART', payload: item.id })}
              className="mt-2 bg-red-50 text-red-600 text-sm font-bold py-2.5 rounded-full w-full text-center hover:bg-red-100 transition-colors"
            >
              Remove from cart
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-end">
        <button
          onClick={() => dispatch({ type: 'CLEAR_CART' })}
          className="px-8 py-3 bg-red-600 text-white rounded-full font-bold hover:bg-red-700 transition"
        >
          Clear cart
        </button>
      </div>
    </div>
  );
}