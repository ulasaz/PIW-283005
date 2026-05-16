"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { auth } from '../lib/firebase'; 
import { onAuthStateChanged, signOut, User } from 'firebase/auth';

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error exiting", error);
    }
  };

  return (
    <nav className="bg-white fixed w-full z-20 top-0 start-0 border-b border-gray-200 shadow-sm">
      <div className="max-w-[1400px] flex flex-wrap items-center justify-between mx-auto px-8 py-4">
        
        <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-gray-900">
            Dice
          </span>
        </Link>
        
        <div className="inline-flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          {user ? (
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-gray-700 hidden md:block">
                {user.email}
              </span>
              <button 
                onClick={handleLogout}
                className="bg-gray-200 text-black px-6 py-2 rounded-full text-sm font-bold hover:bg-gray-300 transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link href="/login" className="flex items-center space-x-3 rtl:space-x-reverse">
              <button className="bg-black text-white px-10 py-3 rounded-full text-sm font-bold hover:bg-gray-800 transition">
                Login
              </button>
            </Link>
          )}
          
          <button data-collapse-toggle="navbar-cta" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200" aria-controls="navbar-cta" aria-expanded="false">
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
            </svg>
          </button>
        </div>
        
        <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-cta">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white">
            <li>
              <Link href="/my-games" className="block py-2 px-3 text-black font-bold rounded md:bg-transparent md:p-0" aria-current="page">
                My games
              </Link>
            </li>
            <li>
              <Link href="/my-cart" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-gray-500 transition-colors md:p-0">
                My Cart
              </Link>
            </li>
          </ul>
        </div>
        
      </div>
    </nav>
  );
}