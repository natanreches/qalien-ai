
import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Header } from '@/components/Header';
import { AssetCard } from '@/components/AssetCard';
import { AssetModal } from '@/components/AssetModal';
import { UploadButton } from '@/components/UploadButton';
import { BatchUploadModal } from '@/components/BatchUploadModal';
import { CreativeBriefUpload } from '@/components/CreativeBriefUpload';
import { BriefAnalysis } from '@/components/BriefAnalysis';
import { ArrowLeft, Calendar, Folder, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

// Mock data - in a real app this would come from an API
const mockCampaigns = [
  {
    id: '1',
    name: 'Summer 2024 Collection',
    brandId: 'jello',
    brief: '',
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
          brandName: 'Jell-O',
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
          brandName: 'Jell-O',
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
          brandName: 'Jell-O',
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
    brandId: 'philadelphia',
    brief: 'Focus on holiday baking and family traditions',
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
          brandName: 'Philadelphia Cream Cheese',
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
          brandName: 'Philadelphia Cream Cheese',
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
    brandId: 'caprisun',
    brief: '',
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
          brandName: 'Capri Sun',
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
          brandName: 'Capri Sun',
          createdDate: '2024-02-15',
          status: 'active',
          tags: ['spring', 'teaser', 'launch'],
          assignedTo: 'Video Team'
        }
      }
    ]
  }
];

const Campaign = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [campaigns, setCampaigns] = useState(mockCampaigns);
  
  const campaign = campaigns.find(c => c.id === id);
  
  if (!campaign) {
    return (
      <div className="min-h-screen bg-gray-900 text-white">
        <Header />
        <main className="container mx-auto px-6 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-white mb-4">Campaign not found</h1>
            <Link to="/business-center">
              <Button variant="outline" className="border-gray-600 text-gray-300">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Business Center
              </Button>
            </Link>
          </div>
        </main>
      </div>
    );
  }

  const handleAssetClick = (asset) => {
    setSelectedAsset(asset);
  };

  const closeModal = () => {
    setSelectedAsset(null);
  };

  const handleBriefUploaded = (briefContent: string) => {
    setCampaigns(prev => 
      prev.map(c => 
        c.id === campaign.id 
          ? { ...c, brief: briefContent }
          : c
      )
    );
  };

  const handleBackToDashboard = () => {
    if (campaign.brandId) {
      navigate(`/brand/${campaign.brandId}`);
    } else {
      navigate('/business-center');
    }
  };

  const handleBatchUploadComplete = (files, campaignId, campaignName) => {
    const newAssets = files.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      type: file.type,
      url: URL.createObjectURL(file.file), // In a real app, this would be uploaded to a server
      compliance: Math.floor(Math.random() * 30) + 70, // Mock compliance score
      uploadDate: new Date().toISOString().split('T')[0],
      status: 'needs-review',
      campaignMetadata: {
        campaignId: campaign.id,
        campaignName: campaign.name,
        brandName: campaign.brandId === 'jello' ? 'Jell-O' : campaign.brandId === 'philadelphia' ? 'Philadelphia Cream Cheese' : 'Capri Sun',
        createdDate: new Date().toISOString().split('T')[0],
        status: 'active',
        tags: [file.type],
        assignedTo: 'Content Team'
      }
    }));

    setCampaigns(prev => 
      prev.map(c => 
        c.id === campaign.id 
          ? { ...c, assets: [...c.assets, ...newAssets] }
          : c
      )
    );
  };

  const avgCompliance = Math.round(
    campaign.assets.reduce((acc, asset) => acc + asset.compliance, 0) / campaign.assets.length
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />
      
      <main className="container mx-auto px-6 py-8">
        <div className="mb-6">
          <Button variant="outline" className="mb-4 border-gray-600 text-gray-300" onClick={handleBackToDashboard}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>

        <div className="bg-gray-800 rounded-xl shadow-sm border border-gray-700 overflow-hidden mb-8">
          <div className="px-6 py-6 border-b border-gray-700 bg-gray-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-purple-600 rounded-lg">
                  <Folder className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">{campaign.name}</h1>
                  <p className="text-gray-400 flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {campaign.assets.length} assets
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-6">
                <div className="text-right">
                  <div className="text-sm text-gray-400">Avg. Compliance</div>
                  <div className="text-2xl font-bold text-white">{avgCompliance}%</div>
                </div>
                <BatchUploadModal
                  campaigns={[{ id: campaign.id, name: campaign.name }]}
                  onUploadComplete={handleBatchUploadComplete}
                />
              </div>
            </div>

            {/* Creative Brief Section */}
            <div className="mt-6 p-4 bg-gray-700 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-white flex items-center">
                  <FileText className="h-5 w-5 mr-2" />
                  Creative Brief
                </h3>
                <CreativeBriefUpload 
                  campaignId={campaign.id}
                  onBriefUploaded={handleBriefUploaded}
                  hasExistingBrief={!!campaign.brief}
                />
              </div>
              {campaign.brief ? (
                <div className="space-y-2">
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    Brief Available
                  </Badge>
                  <p className="text-gray-300 text-sm">{campaign.brief}</p>
                </div>
              ) : (
                <p className="text-gray-400 text-sm">No creative brief uploaded yet. Upload one to provide guidance for this campaign.</p>
              )}
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl shadow-sm border border-gray-700 p-6">
          <h2 className="text-lg font-semibold text-white mb-6">Campaign Assets</h2>
          
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
              <div className="p-4 bg-gray-700 rounded-full w-16 h-16 mx-auto mb-4">
                <Folder className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-white mb-2">No assets yet</h3>
              <p className="text-gray-400 mb-4">Start by uploading your first assets to this campaign</p>
              <BatchUploadModal
                campaigns={[{ id: campaign.id, name: campaign.name }]}
                onUploadComplete={handleBatchUploadComplete}
              />
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
