import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import { Header } from '@/components/Header';
import { AssetCard } from '@/components/AssetCard';
import { AssetModal } from '@/components/AssetModal';
import { UploadButton } from '@/components/UploadButton';
import { BatchUploadModal } from '@/components/BatchUploadModal';
import { CreativeBriefUpload } from '@/components/CreativeBriefUpload';
import { BriefAnalysis } from '@/components/BriefAnalysis';
import { CreateCampaignDialog } from '@/components/CreateCampaignDialog';
import { ArrowLeft, Calendar, Folder, FileText, ChevronDown, ChevronUp, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

// Mock data - in a real app this would come from an API
const baseMockCampaigns = [
  {
    id: '1',
    name: 'Summer 2024 Collection',
    brandId: 'jello',
    brief: '',
    briefAnalysis: undefined,
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
    briefAnalysis: undefined,
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
    briefAnalysis: undefined,
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
  const location = useLocation();
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [campaigns, setCampaigns] = useState(baseMockCampaigns);
  const [isLoading, setIsLoading] = useState(true);
  const [isBriefExpanded, setIsBriefExpanded] = useState(false);
  
  // Store the referring brand ID when component mounts
  const [referringBrandId, setReferringBrandId] = useState<string | null>(null);
  
  useEffect(() => {
    // Try to get the brand ID from location state first
    if (location.state?.brandId) {
      setReferringBrandId(location.state.brandId);
    } else {
      // Try to extract from the current URL or referrer
      const urlParams = new URLSearchParams(window.location.search);
      const brandFromUrl = urlParams.get('brand');
      if (brandFromUrl) {
        setReferringBrandId(brandFromUrl);
      } else {
        // Check if we came from a brand page via document.referrer
        const referrer = document.referrer;
        const brandMatch = referrer.match(/\/brand\/([^\/\?]+)/);
        if (brandMatch) {
          setReferringBrandId(brandMatch[1]);
        }
      }
    }
  }, [location.state]);

  // Load campaigns from localStorage and merge with base campaigns
  useEffect(() => {
    const storedCampaigns = localStorage.getItem('campaigns');
    if (storedCampaigns) {
      try {
        const parsed = JSON.parse(storedCampaigns);
        // Merge stored campaigns with base campaigns, avoiding duplicates
        const mergedCampaigns = [...baseMockCampaigns];
        parsed.forEach(storedCampaign => {
          const existingIndex = mergedCampaigns.findIndex(c => c.id === storedCampaign.id);
          if (existingIndex >= 0) {
            // Update existing campaign
            mergedCampaigns[existingIndex] = storedCampaign;
          } else {
            // Add new campaign
            mergedCampaigns.push(storedCampaign);
          }
        });
        setCampaigns(mergedCampaigns);
      } catch (error) {
        console.error('Error parsing stored campaigns:', error);
      }
    }
    setIsLoading(false);
  }, []);

  // Save campaigns to localStorage whenever campaigns state changes
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('campaigns', JSON.stringify(campaigns));
    }
  }, [campaigns, isLoading]);
  
  const campaign = campaigns.find(c => c.id === id);
  
  // If campaign not found and not loading, create a new one with the given ID
  if (!campaign && !isLoading) {
    const newCampaign = {
      id: id,
      name: `Campaign ${id}`,
      brandId: referringBrandId || 'jello', // Use referring brand ID if available
      brief: '',
      briefAnalysis: undefined,
      assets: []
    };
    
    // Immediately update both state and localStorage
    const updatedCampaigns = [...campaigns, newCampaign];
    setCampaigns(updatedCampaigns);
    localStorage.setItem('campaigns', JSON.stringify(updatedCampaigns));
    
    // Show loading while the campaign is being created
    return (
      <div className="min-h-screen bg-gray-900 text-white">
        <Header />
        <main className="container mx-auto px-6 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-white mb-4">Creating campaign...</h1>
          </div>
        </main>
      </div>
    );
  }

  // Show loading if still loading initial data
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white">
        <Header />
        <main className="container mx-auto px-6 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-white mb-4">Loading campaign...</h1>
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

  const handleAssetApproval = (assetId) => {
    const updatedCampaigns = campaigns.map(c => 
      c.id === campaign.id 
        ? {
            ...c,
            assets: c.assets.map(asset => 
              asset.id === assetId 
                ? { ...asset, status: 'approved' }
                : asset
            )
          }
        : c
    );
    setCampaigns(updatedCampaigns);
    localStorage.setItem('campaigns', JSON.stringify(updatedCampaigns));
  };

  const handleAssetRemoval = (assetId) => {
    const updatedCampaigns = campaigns.map(c => 
      c.id === campaign.id 
        ? {
            ...c,
            assets: c.assets.filter(asset => asset.id !== assetId)
          }
        : c
    );
    setCampaigns(updatedCampaigns);
    localStorage.setItem('campaigns', JSON.stringify(updatedCampaigns));
  };

  const handleBriefUploaded = (briefContent: string, analysis) => {
    const updatedCampaigns = campaigns.map(c => 
      c.id === campaign.id 
        ? { ...c, brief: briefContent, briefAnalysis: analysis }
        : c
    );
    setCampaigns(updatedCampaigns);
    localStorage.setItem('campaigns', JSON.stringify(updatedCampaigns));
  };

  const handleBackToDashboard = () => {
    // Priority order for determining which brand dashboard to navigate to:
    // 1. The referring brand ID we stored when component mounted
    // 2. The campaign's brand ID
    // 3. Extract from current campaign if it exists
    const brandId = referringBrandId || campaign?.brandId;
    
    console.log('Navigating back to brand dashboard:', { 
      referringBrandId, 
      campaignBrandId: campaign?.brandId, 
      finalBrandId: brandId 
    });
    
    if (brandId) {
      navigate(`/brand/${brandId}`);
    } else {
      // If we still can't determine the brand, go to business center
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

    const updatedCampaigns = campaigns.map(c => 
      c.id === campaign.id 
        ? { ...c, assets: [...c.assets, ...newAssets] }
        : c
    );
    setCampaigns(updatedCampaigns);
    localStorage.setItem('campaigns', JSON.stringify(updatedCampaigns));
  };

  const avgCompliance = campaign.assets.length > 0 ? Math.round(
    campaign.assets.reduce((acc, asset) => acc + asset.compliance, 0) / campaign.assets.length
  ) : 0;

  // Extract brief summary (first 200 characters)
  const briefSummary = campaign.brief ? campaign.brief.substring(0, 200) + (campaign.brief.length > 200 ? '...' : '') : '';

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
              
              <div className="text-right">
                <div className="text-sm text-gray-400">Avg. Compliance</div>
                <div className="text-2xl font-bold text-white">{avgCompliance}%</div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Creative Brief Section */}
        <Card className="bg-gray-800 border-gray-700 mb-8">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-white flex items-center">
                <FileText className="h-5 w-5 mr-2" />
                Creative Brief
              </CardTitle>
              <div className="flex items-center space-x-2">
                {campaign.brief && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsBriefExpanded(!isBriefExpanded)}
                    className="border-gray-600 text-gray-300"
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    {isBriefExpanded ? 'Hide Brief' : 'View Brief'}
                    {isBriefExpanded ? (
                      <ChevronUp className="h-4 w-4 ml-2" />
                    ) : (
                      <ChevronDown className="h-4 w-4 ml-2" />
                    )}
                  </Button>
                )}
                <CreativeBriefUpload 
                  campaignId={campaign.id}
                  onBriefUploaded={handleBriefUploaded}
                  hasExistingBrief={!!campaign.brief}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {campaign.brief ? (
              <div className="space-y-4">
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  Brief Available
                </Badge>
                
                {/* Always show brief summary */}
                <div className="p-4 bg-gray-700 rounded-lg">
                  <h4 className="text-sm font-semibold text-white mb-2">Brief Summary</h4>
                  <p className="text-gray-300 text-sm leading-relaxed">{briefSummary}</p>
                </div>
                
                <Collapsible open={isBriefExpanded} onOpenChange={setIsBriefExpanded}>
                  <CollapsibleContent className="space-y-4">
                    <div className="p-4 bg-gray-700 rounded-lg">
                      <h4 className="text-sm font-semibold text-white mb-2">Full Brief Content</h4>
                      <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap">{campaign.brief}</p>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </div>
            ) : (
              <p className="text-gray-400 text-sm">No creative brief uploaded yet. Upload one to provide guidance for this campaign.</p>
            )}
          </CardContent>
        </Card>

        {/* Campaign Assets section */}
        <div className="bg-gray-800 rounded-xl shadow-sm border border-gray-700 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-white">Campaign Assets</h2>
            <BatchUploadModal
              campaigns={[{ id: campaign.id, name: campaign.name }]}
              onUploadComplete={handleBatchUploadComplete}
            />
          </div>
          
          {campaign.assets.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {campaign.assets.map((asset) => (
                <AssetCard
                  key={asset.id}
                  asset={asset}
                  onClick={() => handleAssetClick(asset)}
                  onApprove={handleAssetApproval}
                  onRemove={handleAssetRemoval}
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
          onApprove={handleAssetApproval}
        />
      )}
    </div>
  );
};

export default Campaign;
