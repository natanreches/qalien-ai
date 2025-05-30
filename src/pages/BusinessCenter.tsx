
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Card } from '@/components/ui/card';
import { Building2, ChevronRight } from 'lucide-react';

interface BrandAffiliate {
  id: string;
  name: string;
  parent: string;
  color: string;
  description: string;
}

const brandAffiliates: BrandAffiliate[] = [
  {
    id: 'jello',
    name: 'Jell-O',
    parent: 'Kraft Heinz',
    color: 'bg-red-500',
    description: 'America\'s most famous gelatin brand'
  },
  {
    id: 'philadelphia',
    name: 'Philadelphia Cream Cheese',
    parent: 'Kraft Heinz',
    color: 'bg-blue-500',
    description: 'Premium cream cheese products'
  },
  {
    id: 'caprisun',
    name: 'Capri Sun',
    parent: 'Kraft Heinz',
    color: 'bg-orange-500',
    description: 'Fruit-flavored drink pouches'
  },
  {
    id: 'kraft',
    name: 'Kraft Mac & Cheese',
    parent: 'Kraft Heinz',
    color: 'bg-yellow-500',
    description: 'Classic macaroni and cheese'
  },
  {
    id: 'heinz',
    name: 'Heinz Ketchup',
    parent: 'Kraft Heinz',
    color: 'bg-red-600',
    description: 'World\'s favorite ketchup'
  },
  {
    id: 'oscar',
    name: 'Oscar Mayer',
    parent: 'Kraft Heinz',
    color: 'bg-amber-600',
    description: 'Premium deli meats and hot dogs'
  }
];

const BusinessCenter = () => {
  const navigate = useNavigate();

  const handleBrandClick = (brandId: string) => {
    navigate(`/brand/${brandId}`);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />
      
      <main className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Business Center</h1>
          <p className="text-gray-400">Select a brand to manage assets and guidelines</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {brandAffiliates.map((brand) => (
            <Card 
              key={brand.id}
              className="p-6 cursor-pointer hover:shadow-lg transition-shadow bg-gray-800 border-gray-700 hover:bg-gray-750"
              onClick={() => handleBrandClick(brand.id)}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${brand.color}`}>
                  <Building2 className="h-6 w-6 text-white" />
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </div>
              
              <h3 className="text-lg font-semibold text-white mb-2">{brand.name}</h3>
              <p className="text-sm text-gray-400 mb-2">{brand.parent}</p>
              <p className="text-sm text-gray-300">{brand.description}</p>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default BusinessCenter;
