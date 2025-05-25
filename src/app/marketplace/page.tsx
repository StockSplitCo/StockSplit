"use client"
import Link from 'next/link';

const startups = [
    {
        id: 1,
        name: 'EcoTech Solutions',
        description: 'Green technology for sustainable cities',
        tokenAddress: '7xK...9dF',
        price: '$0.50',
        raised: '45%'
    },
    {
        id: 2,
        name: 'HealthAI',
        description: 'AI-powered healthcare diagnostics',
        tokenAddress: '3aP...7hG',
        price: '$1.20',
        raised: '78%'
    },
    {
        id: 3,
        name: 'FoodChain',
        description: 'Blockchain for food supply chain',
        tokenAddress: '9bM...2kL',
        price: '$0.75',
        raised: '32%'
    }
];

export default function Marketplace() {
    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-3xl font-bold text-amber-900 mb-8">Startup Marketplace</h1>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {startups.map(startup => (
                    <div key={startup.id} className="bg-white shadow-md rounded-lg p-6 border border-amber-100"> 
                        <h2 className="text-xl font-bold text-amber-800 mb-2">{startup.name}</h2> 
                        <p className="text-amber-700 mb-4">{startup.description}</p> 
                        <div className="space-y-2 mb-4">
                            <p><span className="font-semibold text-amber-800 ">Price:</span> {startup.price}</p>
                            <p><span className="font-semibold text-amber-800">Raised:</span> {startup.raised}</p> 
                        </div>
                        <Link
                            href={`/tokens/${startup.tokenAddress}`}
                            className="inline-block w-full text-center bg-amber-600 hover:bg-amber-700 text-white font-bold py-2 px-4 rounded transition" 
                        >
                            View Details
                        </Link>
                    </div>
                ))}
            </div>

            <div className="mt-12 text-center">
                <Link href="/create-token" className="bg-white text-amber-700 px-6 py-3 rounded-lg border border-amber-600 hover:bg-amber-50 transition">
                    List Your Startup
                </Link>
            </div>
        </div>
    );
}