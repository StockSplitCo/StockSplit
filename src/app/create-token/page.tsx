"use client"
import { useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import TokenCreationForm from '@/app/components/TokenCreationForm/TokenCreationForm';
import createToken from '../lib/solana';
import { uploadToIPFS } from '@/app/lib/ipfs';
import Link from 'next/link';

export default function CreateTokenPage() {  
  const { publicKey } = useWallet();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<{address: string, name: string, symbol: string} | null>(null);

  const handleTokenCreation = async (
    name: string,
    symbol: string,
    supply: number,
    image: File | null,
    decimals: number = 9 
  ) => {
    if (!publicKey) {
      setError('Wallet not connected');
      return;
    }

    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      let imageUri = '';
      if (image) {
        imageUri = await uploadToIPFS(image);
      }
     
      const metadataJson = {
        name,
        symbol,
        description: `${name} token`,
        image: imageUri,
        attributes: []
      };

     
      const metadataBlob = new Blob([JSON.stringify(metadataJson)], { type: 'application/json' });
      const metadataFile = new File([metadataBlob], 'metadata.json', { type: 'application/json' });

     
      const metadataUri = await uploadToIPFS(metadataFile);

      const tokenAddress = await createToken(
        decimals, 
        supply,
        {
          name,
          symbol,
          uri: metadataUri
        }
      );

      setSuccess({
        address: tokenAddress,
        name,
        symbol
      });
    } catch (err) {
      console.error('Token creation failed:', err);
      setError(err instanceof Error ? err.message : 'Failed to create token');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-amber-50">
      <main className="container mx-auto px-4 py-8 md:py-12 text-gray-800">
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md overflow-hidden p-4 md:p-8 border border-amber-100">
          <h1 className="text-2xl md:text-3xl font-bold text-amber-900 mb-6 md:mb-8 text-center">
            Create Your Token
          </h1>
          
          {error && (
            <div className="mb-6 p-4 bg-red-100 border border-red-300 text-red-700 rounded text-sm md:text-base">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-6 p-4 bg-green-100 border border-green-300 text-green-700 rounded text-sm md:text-base">
              <p className="font-bold">Token created successfully!</p>
              <p className="mt-2">Name: {success.name}</p>
              <p className="mt-1">Symbol: {success.symbol}</p>
              <Link 
                href={`/tokens`}
                className="mt-4 inline-block bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded transition-colors text-sm md:text-base"
              >
                View Token Page
              </Link>
            </div>
          )}

          <TokenCreationForm 
            onSubmit={handleTokenCreation} 
            isLoading={isLoading} 
          />
        </div>
      </main>
    </div>
  );
}