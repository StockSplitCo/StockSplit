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

      
      <section className="py-12 md:py-20 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-amber-900 mb-4 md:mb-6">
            Democratizing Startup Investments
          </h2>
          <p className="text-lg md:text-xl text-amber-800 mb-8 md:mb-10">
            StockSplit enables micro-investments into startups through tokenized equity shares.
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <Link 
              href="/marketplace" 
              className="w-full md:w-auto bg-amber-600 text-white px-6 py-3 rounded-lg hover:bg-amber-700 transition text-center"
            >
              Browse Startups
            </Link>
            <Link 
              href="/create-token" 
              className="w-full md:w-auto bg-white text-amber-700 px-6 py-3 rounded-lg border border-amber-600 hover:bg-amber-50 transition text-center"
            >
              List Your Startup
            </Link>
          </div>
        </div>
      </section>

      
      <section className="py-12 md:py-16 bg-amber-100">
        <div className="container mx-auto px-4">
          <h3 className="text-2xl font-bold text-amber-900 mb-8 md:mb-12 text-center">How It Works</h3>
          <ul className="max-w-2xl mx-auto flex flex-col gap-8">
            <li>
              <h4 className="text-xl font-semibold text-amber-800 mb-2">Discover Startups</h4>
              <p className="text-amber-700">
                Browse our curated marketplace of vetted startups and find investment opportunities.
              </p>
            </li>
            <li>
              <h4 className="text-xl font-semibold text-amber-800 mb-2">Invest with Tokens</h4>
              <p className="text-amber-700">
                Purchase SPL tokens representing equity shares with as little as $10.
              </p>
            </li>
            <li>
              <h4 className="text-xl font-semibold text-amber-800 mb-2">Track Portfolio</h4>
              <p className="text-amber-700">
                Monitor your investments and payouts through your personal dashboard.
              </p>
            </li>
          </ul>
        </div>
      </section>

      <div className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-amber-900 mb-6">
              Ready to Start Investing?
            </h3>
            <p className="text-lg text-amber-800 mb-8">
              Join our community of investors and entrepreneurs. Create your first token or explore existing opportunities today.
            </p>
            <div className="flex flex-col md:flex-row justify-center gap-4">
              <Link 
                href="/marketplace" 
                className="w-full md:w-auto bg-amber-600 text-white px-6 py-3 rounded-lg hover:bg-amber-700 transition text-center"
              >
                Explore Marketplace
              </Link>
              <Link 
                href="/create-token" 
                className="w-full md:w-auto bg-white text-amber-700 px-6 py-3 rounded-lg border border-amber-600 hover:bg-amber-50 transition text-center"
              >
                Create Your Token
              </Link>
            </div>
          </div>
        </div>
      </div>

      <footer className="bg-amber-200 py-6 md:py-8">
        <div className="container mx-auto px-4 text-center text-amber-800">
          <p>© {new Date().getFullYear()} StockSplit. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}