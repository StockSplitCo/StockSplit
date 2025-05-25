"use client"
import Link from 'next/link';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

export default function Home() {
  return (
    <div className="min-h-screen bg-amber-50">
     
      <header className="bg-amber-100 shadow-md">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">              
        </div>
      </header>

      
      <section className="py-20 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-amber-900 mb-6">
            Democratizing Startup Investments
          </h2>
          <p className="text-xl text-amber-800 mb-10">
            StockSplit enables micro-investments into startups through tokenized equity shares.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/marketplace" className="bg-amber-600 text-white px-6 py-3 rounded-lg hover:bg-amber-700 transition">
              Browse Startups
            </Link>
            <Link href="/create-token" className="bg-white text-amber-700 px-6 py-3 rounded-lg border border-amber-600 hover:bg-amber-50 transition">
              List Your Startup
            </Link>
          </div>
        </div>
      </section>

      
      <section className="py-16 bg-amber-100">
        <div className="container mx-auto px-4">
          <h3 className="text-2xl font-bold text-amber-900 mb-12 text-center">How It Works</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h4 className="text-xl font-semibold text-amber-800 mb-3">Discover Startups</h4>
              <p className="text-amber-700">
                Browse our curated marketplace of vetted startups and find investment opportunities.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h4 className="text-xl font-semibold text-amber-800 mb-3">Invest with Tokens</h4>
              <p className="text-amber-700">
                Purchase SPL tokens representing equity shares with as little as $10.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h4 className="text-xl font-semibold text-amber-800 mb-3">Track Portfolio</h4>
              <p className="text-amber-700">
                Monitor your investments and payouts through your personal dashboard.
              </p>
            </div>
          </div>
        </div>
      </section>

      
      <footer className="bg-amber-200 py-8 mt-12">
        <div className="container mx-auto px-4 text-center text-amber-800">
          <p>© {new Date().getFullYear()} StockSplit. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}