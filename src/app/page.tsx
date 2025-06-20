"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { duration: 0.8 } }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-amber-100">  
      

      
      <motion.section 
        initial="hidden"
        animate={isMounted ? "show" : "hidden"}
        variants={container}
        className="py-16 md:py-24 px-4 text-center relative overflow-hidden"
      >
        
        <motion.div 
          animate={{
            x: [0, 10, 0],
            y: [0, -10, 0],
            transition: { duration: 15, repeat: Infinity, ease: "linear" }
          }}
          className="absolute top-20 left-10 w-32 h-32 bg-amber-200 rounded-full opacity-20 blur-xl -z-10"
        />
        <motion.div 
          animate={{
            x: [0, -15, 0],
            y: [0, 15, 0],
            transition: { duration: 20, repeat: Infinity, ease: "linear" }
          }}
          className="absolute bottom-10 right-10 w-40 h-40 bg-amber-300 rounded-full opacity-20 blur-xl -z-10"
        />

        <div className="max-w-4xl mx-auto relative">
          <motion.h2 variants={item} className="text-4xl md:text-6xl font-bold text-amber-900 mb-6">
            Democratizing <span className="text-amber-600">Startup</span> Investments
          </motion.h2>
          <motion.p variants={item} className="text-xl md:text-2xl text-amber-800 mb-10 max-w-2xl mx-auto">
            StockSplit enables micro-investments into startups through tokenized equity shares.
          </motion.p>
          <motion.div variants={item} className="flex flex-col md:flex-row justify-center gap-4">
            <Link 
              href="/marketplace" 
              className="relative w-full md:w-auto bg-amber-600 text-white px-8 py-4 rounded-lg hover:bg-amber-700 transition text-center font-medium group"
            >
              <span className="relative z-10">Browse Startups</span>
              <span className="absolute inset-0 bg-gradient-to-r from-amber-600 to-amber-500 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></span>
            </Link>
            <Link 
              href="/create-token" 
              className="w-full md:w-auto bg-white/90 text-amber-700 px-8 py-4 rounded-lg border border-amber-300 hover:bg-white hover:shadow-md transition text-center font-medium"
            >
              List Your Startup
            </Link>
          </motion.div>
        </div>
      </motion.section>

     
      <motion.section 
        initial="hidden"
        animate={isMounted ? "show" : "hidden"}
        variants={fadeIn}
        className="py-16 md:py-20 bg-white/50 backdrop-blur-sm"
      >
        <div className="container mx-auto px-4">
          <motion.h3 
            variants={item}
            className="text-3xl font-bold text-amber-900 mb-12 md:mb-16 text-center"
          >
            How It Works
          </motion.h3>
          <motion.ul 
            variants={container}
            className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto"
          >
            <motion.li 
              variants={item}
              whileHover={{ y: -5 }}
              className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-14 h-14 bg-amber-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h4 className="text-xl font-semibold text-amber-800 mb-3 text-center">Discover Startups</h4>
              <p className="text-amber-700 text-center">
                Browse our curated marketplace of vetted startups and find investment opportunities.
              </p>
            </motion.li>
            <motion.li 
              variants={item}
              whileHover={{ y: -5 }}
              className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-14 h-14 bg-amber-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="text-xl font-semibold text-amber-800 mb-3 text-center">Invest with Tokens</h4>
              <p className="text-amber-700 text-center">
                Purchase SPL tokens representing equity shares with as little as $10.
              </p>
            </motion.li>
            <motion.li 
              variants={item}
              whileHover={{ y: -5 }}
              className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-14 h-14 bg-amber-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h4 className="text-xl font-semibold text-amber-800 mb-3 text-center">Track Portfolio</h4>
              <p className="text-amber-700 text-center">
                Monitor your investments and payouts through your personal dashboard.
              </p>
            </motion.li>
          </motion.ul>
        </div>
      </motion.section>

      
      <motion.section 
        initial="hidden"
        animate={isMounted ? "show" : "hidden"}
        variants={container}
        className="py-16 md:py-24 bg-gradient-to-br from-amber-500 to-amber-600"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h3 variants={item} className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Start Investing?
            </motion.h3>
            <motion.p variants={item} className="text-xl text-amber-100 mb-10">
              Join our community of investors and entrepreneurs. Create your first token or explore existing opportunities today.
            </motion.p>
            <motion.div variants={item} className="flex flex-col md:flex-row justify-center gap-4">
              <Link 
                href="/marketplace" 
                className="w-full md:w-auto bg-white text-amber-700 px-8 py-4 rounded-lg hover:bg-amber-50 hover:shadow-lg transition font-medium"
              >
                Explore Marketplace
              </Link>
              <Link 
                href="/create-token" 
                className="w-full md:w-auto bg-transparent text-white px-8 py-4 rounded-lg border-2 border-white hover:bg-white/10 transition font-medium"
              >
                Create Your Token
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.section>     
      
    </div>
  );
}