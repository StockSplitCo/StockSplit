"use client";

import Link from 'next/link';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useState } from 'react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-amber-100 shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-8">
            <Link href="/" className="text-2xl font-bold text-amber-800">
              StockSplit
            </Link>
           
            <nav className={`${isMenuOpen ? 'flex' : 'hidden'} md:flex flex-col md:flex-row fixed md:relative inset-0 md:inset-auto mt-16 md:mt-0 md:top-0 left-0 right-0 md:space-x-6 bg-amber-100 md:bg-transparent p-4 md:p-0 space-y-4 md:space-y-0 shadow-md md:shadow-none z-40 h-screen md:h-auto`}>
              <Link 
                href="/marketplace" 
                className="text-amber-700 hover:text-amber-900 transition py-2 md:py-0"
                onClick={() => setIsMenuOpen(false)}
              >
                Marketplace
              </Link>
              <Link 
                href="/tokens" 
                className="text-amber-700 hover:text-amber-900 transition py-2 md:py-0"
                onClick={() => setIsMenuOpen(false)}
              >
                Tokens
              </Link>
              <Link 
                href="/create-token" 
                className="text-amber-700 hover:text-amber-900 transition py-2 md:py-0"
                onClick={() => setIsMenuOpen(false)}
              >
                Create Token
              </Link>
              <div className="md:hidden mt-4">
                <WalletMultiButton className="w-full bg-amber-600 hover:bg-amber-700 text-white py-2 px-4 rounded" />
              </div>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <div className="hidden md:block">
              <WalletMultiButton className="bg-amber-600 hover:bg-amber-700 text-white py-2 px-4 rounded" />
            </div>
            <button 
              className="md:hidden text-amber-800 z-50"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}