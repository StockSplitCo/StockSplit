"use client"
import { useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
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

      // Create metadata JSON
      const metadataJson = {
        name,
        symbol,
        description: `${name} token`,
        image: imageUri,
        attributes: []
      };

      // Create metadata file
      const metadataBlob = new Blob([JSON.stringify(metadataJson)], { type: 'application/json' });
      const metadataFile = new File([metadataBlob], 'metadata.json', { type: 'application/json' });

      // Upload metadata to IPFS
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
      <header className="bg-amber-100 shadow-md">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-amber-800">StockSplit</Link>
          <WalletMultiButton />
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md overflow-hidden p-8 border border-amber-100">
          <h1 className="text-3xl font-bold text-amber-900 mb-8 text-center">Create Your Token</h1>
          
          {error && (
            <div className="mb-6 p-4 bg-red-100 border border-red-300 text-red-700 rounded">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-6 p-4 bg-green-100 border border-green-300 text-green-700 rounded">
              <p className="font-bold">Token created successfully!</p>
              <p>Name: {success.name}</p>
              <p>Symbol: {success.symbol}</p>
              <Link 
                href={`/tokens/${success.address}`}
                className="mt-3 inline-block btn-primary"
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