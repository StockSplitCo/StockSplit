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
        <div className="container mx-auto px-4 py-8 md:py-12">
            <h1 className="text-2xl md:text-3xl font-bold text-amber-900 mb-6 md:mb-8 text-center md:text-left">
                Startup Marketplace
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {startups.map(startup => (
                    <div 
                        key={startup.id} 
                        className="bg-white shadow-md rounded-lg p-4 md:p-6 border border-amber-100 hover:shadow-lg transition-shadow"
                    > 
                        <h2 className="text-lg md:text-xl font-bold text-amber-800 mb-2">{startup.name}</h2> 
                        <p className="text-sm md:text-base text-amber-700 mb-4">{startup.description}</p> 
                        <div className="space-y-2 mb-4">
                            <p className="text-sm md:text-base text-black">
                                <span className="font-semibold text-amber-800">Price:</span> {startup.price}
                            </p>
                            <p className="text-sm md:text-base text-black">
                                <span className="font-semibold text-amber-800">Raised:</span> {startup.raised}
                            </p> 
                        </div>
                        <Link
                            href={`/tokens/${startup.tokenAddress}`}
                            className="inline-block w-full text-center bg-amber-600 hover:bg-amber-700 text-white font-medium py-2 px-4 rounded transition-colors text-sm md:text-base" 
                        >
                            View Details
                        </Link>
                    </div>
                ))}
            </div>

            <div className="mt-8 md:mt-12 text-center">
                <Link 
                    href="/create-token" 
                    className="inline-block bg-white text-amber-700 px-6 py-3 rounded-lg border border-amber-600 hover:bg-amber-50 transition-colors text-sm md:text-base"
                >
                    List Your Startup
                </Link>
            </div>
        </div>
    );
}