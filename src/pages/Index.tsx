
import React, { useState } from 'react';
import { CampaignGrid } from '@/components/CampaignGrid';
import { AssetModal } from '@/components/AssetModal';
import { Header } from '@/components/Header';
import { UploadButton } from '@/components/UploadButton';

// Mock data for campaigns and assets
const mockCampaigns = [
  {
    id: '1',
    name: 'Summer 2024 Collection',
    assets: [
      {
        id: '1',
        name: 'Hero Banner',
        type: 'image',
        url: '/lovable-uploads/a8091acd-6027-42fa-b4b6-4b1171819e6f.png',
        compliance: 92,
        uploadDate: '2024-01-15',
        status: 'approved'
      },
      {
        id: '2',
        name: 'Social Media Post',
        type: 'image',
        url: '/lovable-uploads/a8091acd-6027-42fa-b4b6-4b1171819e6f.png',
        compliance: 78,
        uploadDate: '2024-01-14',
        status: 'needs-review'
      },
      {
        id: '3',
        name: 'Email Header',
        type: 'image',
        url: '/lovable-uploads/a8091acd-6027-42fa-b4b6-4b1171819e6f.png',
        compliance: 45,
        uploadDate: '2024-01-13',
        status: 'rejected'
      }
    ]
  },
  {
    id: '2',
    name: 'Holiday Campaign 2023',
    assets: [
      {
        id: '4',
        name: 'Landing Page Hero',
        type: 'image',
        url: '/lovable-uploads/a8091acd-6027-42fa-b4b6-4b1171819e6f.png',
        compliance: 88,
        uploadDate: '2023-12-01',
        status: 'approved'
      },
      {
        id: '5',
        name: 'Product Showcase',
        type: 'image',
        url: '/lovable-uploads/a8091acd-6027-42fa-b4b6-4b1171819e6f.png',
        compliance: 95,
        uploadDate: '2023-11-28',
        status: 'approved'
      }
    ]
  },
  {
    id: '3',
    name: 'Spring Launch 2024',
    assets: [
      {
        id: '6',
        name: 'Announcement Banner',
        type: 'image',
        url: '/lovable-uploads/a8091acd-6027-42fa-b4b6-4b1171819e6f.png',
        compliance: 67,
        uploadDate: '2024-03-01',
        status: 'needs-review'
      }
    ]
  }
];

const Index = () => {
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [campaigns] = useState(mockCampaigns);

  const handleAssetClick = (asset, campaignName) => {
    setSelectedAsset({ ...asset, campaignName });
  };

  const closeModal = () => {
    setSelectedAsset(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Brand Asset Management</h1>
            <p className="text-gray-600">Ensure your creative assets meet brand guidelines with AI-powered compliance scoring</p>
          </div>
          <UploadButton />
        </div>

        <CampaignGrid 
          campaigns={campaigns} 
          onAssetClick={handleAssetClick}
        />
      </main>

      {selectedAsset && (
        <AssetModal 
          asset={selectedAsset} 
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default Index;
