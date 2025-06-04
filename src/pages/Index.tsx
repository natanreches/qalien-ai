import React, { useState } from 'react';
import { CampaignGrid } from '@/components/CampaignGrid';
import { AssetModal } from '@/components/AssetModal';
import { Header } from '@/components/Header';
import { CreateCampaignDialog } from '@/components/CreateCampaignDialog';

// Mock data for campaigns and assets
const initialCampaigns = [
  {
    id: '1',
    name: 'Summer 2024 Collection',
    assets: [
      {
        id: '1',
        name: 'Hero Banner',
        type: 'static',
        url: '/lovable-uploads/a8091acd-6027-42fa-b4b6-4b1171819e6f.png',
        compliance: 92,
        uploadDate: '2024-01-15',
        status: 'approved',
        campaignMetadata: {
          campaignId: '1',
          campaignName: 'Summer 2024 Collection',
          brandName: 'Kraft Heinz',
          createdDate: '2024-01-01',
          status: 'active',
          tags: ['summer', 'hero', 'banner'],
          assignedTo: 'Marketing Team'
        }
      },
      {
        id: '2',
        name: 'Social Media Post',
        type: 'static',
        url: '/lovable-uploads/a8091acd-6027-42fa-b4b6-4b1171819e6f.png',
        compliance: 78,
        uploadDate: '2024-01-14',
        status: 'needs-review',
        campaignMetadata: {
          campaignId: '1',
          campaignName: 'Summer 2024 Collection',
          brandName: 'Kraft Heinz',
          createdDate: '2024-01-01',
          status: 'active',
          tags: ['social', 'post', 'engagement'],
          assignedTo: 'Social Media Team'
        }
      },
      {
        id: '3',
        name: 'Product Video',
        type: 'video',
        url: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
        compliance: 85,
        uploadDate: '2024-01-13',
        status: 'approved',
        campaignMetadata: {
          campaignId: '1',
          campaignName: 'Summer 2024 Collection',
          brandName: 'Kraft Heinz',
          createdDate: '2024-01-01',
          status: 'active',
          tags: ['video', 'product', 'demo'],
          assignedTo: 'Video Production Team'
        }
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
        type: 'static',
        url: '/lovable-uploads/a8091acd-6027-42fa-b4b6-4b1171819e6f.png',
        compliance: 88,
        uploadDate: '2023-12-01',
        status: 'approved',
        campaignMetadata: {
          campaignId: '2',
          campaignName: 'Holiday Campaign 2023',
          brandName: 'Kraft Heinz',
          createdDate: '2023-11-01',
          status: 'completed',
          tags: ['holiday', 'landing', 'hero'],
          assignedTo: 'Creative Team'
        }
      },
      {
        id: '5',
        name: 'Holiday Commercial',
        type: 'video',
        url: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4',
        compliance: 95,
        uploadDate: '2023-11-28',
        status: 'approved',
        campaignMetadata: {
          campaignId: '2',
          campaignName: 'Holiday Campaign 2023',
          brandName: 'Kraft Heinz',
          createdDate: '2023-11-01',
          status: 'completed',
          tags: ['holiday', 'commercial', 'tv'],
          assignedTo: 'Video Production Team'
        }
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
        type: 'static',
        url: '/lovable-uploads/a8091acd-6027-42fa-b4b6-4b1171819e6f.png',
        compliance: 67,
        uploadDate: '2024-03-01',
        status: 'needs-review',
        campaignMetadata: {
          campaignId: '3',
          campaignName: 'Spring Launch 2024',
          brandName: 'Kraft Heinz',
          createdDate: '2024-02-15',
          status: 'active',
          tags: ['spring', 'launch', 'announcement'],
          assignedTo: 'Launch Team'
        }
      },
      {
        id: '7',
        name: 'Launch Teaser',
        type: 'video',
        url: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
        compliance: 72,
        uploadDate: '2024-02-28',
        status: 'needs-review',
        campaignMetadata: {
          campaignId: '3',
          campaignName: 'Spring Launch 2024',
          brandName: 'Kraft Heinz',
          createdDate: '2024-02-15',
          status: 'active',
          tags: ['spring', 'teaser', 'launch'],
          assignedTo: 'Video Team'
        }
      }
    ]
  }
];

const Index = () => {
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [campaigns, setCampaigns] = useState(initialCampaigns);

  const handleAssetClick = (asset, campaignName) => {
    setSelectedAsset({ ...asset, campaignName });
  };

  const closeModal = () => {
    setSelectedAsset(null);
  };

  const handleCreateCampaign = (campaignName) => {
    const newCampaign = {
      id: Date.now().toString(),
      name: campaignName,
      assets: []
    };
    setCampaigns([newCampaign, ...campaigns]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Brand Asset Library</h1>
            <p className="text-gray-600">Browse and manage your creative assets organized by campaign</p>
          </div>
          <CreateCampaignDialog onCreateCampaign={handleCreateCampaign} />
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
