import { useState, useCallback } from 'react';
import Image from 'next/image';

interface TokenCreationFormProps {
  onSubmit: (name: string, symbol: string, supply: number, image: File | null) => Promise<void>;
  isLoading: boolean;
}

export default function TokenCreationForm({ onSubmit, isLoading }: TokenCreationFormProps) {
  const [name, setName] = useState('');
  const [symbol, setSymbol] = useState('');
  const [supply, setSupply] = useState(1000);
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleImageChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(name, symbol, supply, image);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Token Name
        </label>
        <input
          id="name"
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
        />
      </div>

      <div>
        <label htmlFor="symbol" className="block text-sm font-medium text-gray-700">
          Token Symbol
        </label>
        <input
          id="symbol"
          type="text"
          required
          maxLength={5}
          value={symbol}
          onChange={(e) => setSymbol(e.target.value.toUpperCase())}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
        />
      </div>

      <div>
        <label htmlFor="supply" className="block text-sm font-medium text-gray-700">
          Total Supply
        </label>
        <input
          id="supply"
          type="number"
          min="1"
          required
          value={supply}
          onChange={(e) => setSupply(Number(e.target.value))}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Token Image (Optional)</label>
        <div className="mt-1 flex items-center">
          <label className="inline-block cursor-pointer bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
            {preview ? 'Change Image' : 'Upload Image'}
            <input type="file" className="sr-only" onChange={handleImageChange} accept="image/*" />
          </label>
        </div>
      </div>

      {preview && (
        <div className="flex justify-center">
          <div className="w-32 h-32 relative rounded-full overflow-hidden border-2 border-gray-200">
            <Image
              src={preview}
              alt="Token preview"
              fill
              className="object-cover"
            />
          </div>
        </div>
      )}

      <div>
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${isLoading ? 'bg-purple-400' : 'bg-purple-600 hover:bg-purple-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500`}
        >
          {isLoading ? 'Creating Token...' : 'Create Token'}
        </button>
      </div>
    </form>
  );
}