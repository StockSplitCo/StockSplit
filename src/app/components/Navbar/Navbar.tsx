"use client"
import Link from 'next/link';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

export default function Navbar() {
  return (
    <header className="bg-amber-100 shadow-md">
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-8">
            <Link href="/" className="text-2xl font-bold text-amber-800">
              StockSplit
            </Link>
            <nav className="hidden md:flex space-x-6">
              <Link 
                href="/marketplace" 
                className="text-amber-700 hover:text-amber-900 transition"
              >
                Marketplace
              </Link>
              <Link 
                href="/tokens" 
                className="text-amber-700 hover:text-amber-900 transition"
              >
                Tokens
              </Link>
              <Link 
                href="/create-token" 
                className="text-amber-700 hover:text-amber-900 transition"
              >
                Create Token
              </Link>
            </nav>
          </div>
          <WalletMultiButton className="bg-amber-600 hover:bg-amber-700" />
        </div>
      </div>
    </header>
  );
} 