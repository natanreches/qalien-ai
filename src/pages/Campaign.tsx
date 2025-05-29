
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Header } from '@/components/Header';
import { AssetCard } from '@/components/AssetCard';
import { AssetModal } from '@/components/AssetModal';
import { UploadButton } from '@/components/UploadButton';
import { ArrowLeft, Calendar, Folder } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Mock data - in a real app this would come from an API
const mockCampaigns = [
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
        status: 'approved'
      },
      {
        id: '2',
        name: 'Social Media Post',
        type: 'static',
        url: '/lovable-uploads/a8091acd-6027-42fa-b4b6-4b1171819e6f.png',
        compliance: 78,
        uploadDate: '2024-01-14',
        status: 'needs-review'
      },
      {
        id: '3',
        name: 'Product Video',
        type: 'video',
        url: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
        compliance: 85,
        uploadDate: '2024-01-13',
        status: 'approved'
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
        status: 'approved'
      },
      {
        id: '5',
        name: 'Holiday Commercial',
        type: 'video',
        url: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4',
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
        type: 'static',
        url: '/lovable-uploads/a8091acd-6027-42fa-b4b6-4b1171819e6f.png',
        compliance: 67,
        uploadDate: '2024-03-01',
        status: 'needs-review'
      },
      {
        id: '7',
        name: 'Launch Teaser',
        type: 'video',
        url: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
        compliance: 72,
        uploadDate: '2024-02-28',
        status: 'needs-review'
      }
    ]
  }
];

const Campaign = () => {
  const { id } = useParams();
  const [selectedAsset, setSelectedAsset] = useState(null);
  
  const campaign = mockCampaigns.find(c => c.id === id);
  
  if (!campaign) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto px-6 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Campaign not found</h1>
            <Link to="/">
              <Button variant="outline">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
          </div>
        </main>
      </div>
    );
  }

  const handleAssetClick = (asset) => {
    setSelectedAsset({ ...asset, campaignName: campaign.name });
  };

  const closeModal = () => {
    setSelectedAsset(null);
  };

  const avgCompliance = Math.round(
    campaign.assets.reduce((acc, asset) => acc + asset.compliance, 0) / campaign.assets.length
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-6 py-8">
        <div className="mb-6">
          <Link to="/">
            <Button variant="outline" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-8">
          <div className="px-6 py-6 border-b border-gray-100 bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Folder className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{campaign.name}</h1>
                  <p className="text-gray-600 flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {campaign.assets.length} assets
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-6">
                <div className="text-right">
                  <div className="text-sm text-gray-500">Avg. Compliance</div>
                  <div className="text-2xl font-bold text-gray-900">{avgCompliance}%</div>
                </div>
                <UploadButton />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Campaign Assets</h2>
          
          {campaign.assets.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {campaign.assets.map((asset) => (
                <AssetCard
                  key={asset.id}
                  asset={asset}
                  onClick={() => handleAssetClick(asset)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="p-4 bg-gray-100 rounded-full w-16 h-16 mx-auto mb-4">
                <Folder className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No assets yet</h3>
              <p className="text-gray-500 mb-4">Start by uploading your first asset to this campaign</p>
              <UploadButton />
            </div>
          )}
        </div>
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

export default Campaign;
