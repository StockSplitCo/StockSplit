'use client';

import { useEffect, useState } from 'react';
import { supabase, TokenRecord } from '../lib/supabase';
import { requestTokens, TokenRequest } from '../lib/tokenRequest';
import { useWallet } from '@solana/wallet-adapter-react';
import { transferTokens } from '../lib/solana';

export default function TokensPage() {
  const [tokens, setTokens] = useState<TokenRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [requesting, setRequesting] = useState<number | null>(null);
  const { publicKey } = useWallet();

  useEffect(() => {
    async function fetchTokens() {
      try {
        const { data, error } = await supabase
          .from('tokens')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          throw error;
        }

        setTokens(data || []);
      } catch (error) {
        console.error('Error fetching tokens:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchTokens();
  }, []);

  const handleRequestTokens = async (token: TokenRecord) => {
    if (!publicKey) {
      alert('Please connect your wallet first');
      return;
    }

    setRequesting(Number(token.id));
    try {
      const transferSuccess = await transferTokens(
        token.token_address,
        1, 
        9  
      );

      if (transferSuccess) {
        alert('Tokens transferred successfully!');
        return;
      }

      const result = await requestTokens(Number(token.id), publicKey.toString());
      if (result) {
        alert('Token request submitted successfully!');
      } else {
        alert('Failed to submit token request. Please try again.');
      }
    } catch (error) {
      console.error('Error requesting tokens:', error);
      alert('An error occurred while requesting tokens.');
    } finally {
      setRequesting(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-80px)]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-600"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6 md:py-8">
      <h1 className="text-2xl md:text-3xl font-bold text-amber-800 mb-6 md:mb-8 text-center md:text-left">
        Created Tokens
      </h1>
      <div className="grid gap-4 md:gap-6">
        {tokens.map((token) => (
          <div
            key={token.id}
            className="bg-white rounded-lg shadow-md p-4 md:p-6 hover:shadow-lg transition-shadow border border-amber-100"
          >
            <div className="flex flex-col md:flex-row md:justify-between md:items-start space-y-4 md:space-y-0">
              <div>
                <h2 className="text-lg md:text-xl font-semibold text-amber-800">{token.token_name}</h2>
                <p className="text-sm md:text-base text-amber-700">Symbol: {token.token_symbol}</p>
                <p className="text-xs md:text-sm text-amber-600 mt-2">
                  Created by: {token.creator_address}
                </p>
              </div>
              <div className="text-left md:text-right">
                <p className="text-xs md:text-sm text-amber-600 break-all">
                  Token Address: {token.token_address}
                </p>
                <p className="text-xs md:text-sm text-amber-600 mt-2">
                  Created: {new Date(token.created_at).toLocaleDateString()}
                </p>
                <button
                  onClick={() => handleRequestTokens(token)}
                  disabled={requesting === Number(token.id)}
                  className={`mt-4 w-full md:w-auto px-4 py-2 rounded-md text-white font-medium text-sm md:text-base transition-colors ${
                    requesting === Number(token.id)
                      ? 'bg-amber-400 cursor-not-allowed'
                      : 'bg-amber-600 hover:bg-amber-700'
                  }`}
                >
                  {requesting === Number(token.id) ? 'Requesting...' : 'Request Tokens'}
                </button>
              </div>
            </div>
          </div>
        ))}
        {tokens.length === 0 && (
          <div className="text-center text-amber-700 py-8 bg-white rounded-lg shadow-md p-6 border border-amber-100 text-sm md:text-base">
            No tokens have been created yet.
          </div>
        )}
      </div>
    </div>
  );
} 