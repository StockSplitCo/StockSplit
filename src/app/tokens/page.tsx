'use client';

import { useEffect, useState } from 'react';
import { supabase, TokenRecord } from '../lib/supabase';

export default function TokensPage() {
  const [tokens, setTokens] = useState<TokenRecord[]>([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Created Tokens</h1>
      <div className="grid gap-6">
        {tokens.map((token) => (
          <div
            key={token.id}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-semibold">{token.token_name}</h2>
                <p className="text-gray-600">Symbol: {token.token_symbol}</p>
                <p className="text-sm text-gray-500 mt-2">
                  Created by: {token.creator_address}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500 break-all">
                  Token Address: {token.token_address}
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  Created: {new Date(token.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        ))}
        {tokens.length === 0 && (
          <div className="text-center text-gray-500 py-8">
            No tokens have been created yet.
          </div>
        )}
      </div>
    </div>
  );
} 