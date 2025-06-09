"use client"
import Link from 'next/link';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useState } from 'react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-amber-100 shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-8">
            <Link href="/" className="text-2xl font-bold text-amber-800">
              StockSplit
            </Link>
            <nav className={`${isMenuOpen ? 'flex' : 'hidden'} md:flex flex-col md:flex-row absolute md:relative top-16 md:top-0 left-0 right-0 md:space-x-6 bg-amber-100 md:bg-transparent p-4 md:p-0 space-y-4 md:space-y-0 shadow-md md:shadow-none`}>
              <Link 
                href="/marketplace" 
                className="text-amber-700 hover:text-amber-900 transition"
                onClick={() => setIsMenuOpen(false)}
              >
                Marketplace
              </Link>
              <Link 
                href="/tokens" 
                className="text-amber-700 hover:text-amber-900 transition"
                onClick={() => setIsMenuOpen(false)}
              >
                Tokens
              </Link>
              <Link 
                href="/create-token" 
                className="text-amber-700 hover:text-amber-900 transition"
                onClick={() => setIsMenuOpen(false)}
              >
                Create Token
              </Link>
              <div className="md:hidden">
                <WalletMultiButton className="w-full bg-amber-600 hover:bg-amber-700" />
              </div>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <div className="hidden md:block">
              <WalletMultiButton className="bg-amber-600 hover:bg-amber-700" />
            </div>
            <button 
              className="md:hidden text-amber-800"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
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