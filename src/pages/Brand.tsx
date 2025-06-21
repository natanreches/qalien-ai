
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Header } from '@/components/Header';
import { CampaignGrid } from '@/components/CampaignGrid';
import { OnboardingGuidelinesView } from '@/components/OnboardingGuidelinesView';
import { AssetModal } from '@/components/AssetModal';
import { BrandComplianceSettings } from '@/components/BrandComplianceSettings';
import { CreateCampaignDialog } from '@/components/CreateCampaignDialog';
import { ArrowLeft, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Mock data for different brands
const brandData = {
  jello: {
    name: 'Jell-O',
    parent: 'Kraft Heinz',
    color: 'bg-red-500',
    campaigns: [
      {
        id: '1',
        name: 'Summer Gelatin Campaign 2024',
        brief: 'Focus on refreshing summer treats and family gatherings',
        assets: [
          {
            id: '1',
            name: 'Summer Hero Banner',
            type: 'static',
            url: '/lovable-uploads/a8091acd-6027-42fa-b4b6-4b1171819e6f.png',
            compliance: 92,
            uploadDate: '2024-01-15',
            status: 'approved'
          }
        ]
      }
    ]
  },
  philadelphia: {
    name: 'Philadelphia Cream Cheese',
    parent: 'Kraft Heinz',
    color: 'bg-blue-500',
    campaigns: [
      {
        id: '2',
        name: 'Holiday Baking Campaign',
        brief: 'Promote Philadelphia cream cheese for holiday baking recipes',
        assets: [
          {
            id: '2',
            name: 'Holiday Recipe Card',
            type: 'static',
            url: '/lovable-uploads/a8091acd-6027-42fa-b4b6-4b1171819e6f.png',
            compliance: 88,
            uploadDate: '2024-01-10',
            status: 'approved'
          }
        ]
      }
    ]
  },
  caprisun: {
    name: 'Capri Sun',
    parent: 'Kraft Heinz',
    color: 'bg-orange-500',
    campaigns: [
      {
        id: '3',
        name: 'Back to School 2024',
        brief: 'Target parents with convenient, fun lunch options for kids',
        assets: [
          {
            id: '3',
            name: 'Lunch Box Hero',
            type: 'static',
            url: '/lovable-uploads/a8091acd-6027-42fa-b4b6-4b1171819e6f.png',
            compliance: 85,
            uploadDate: '2024-01-08',
            status: 'needs-review'
          }
        ]
      }
    ]
  }
};

const Brand = () => {
  const { id } = useParams();
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [campaigns, setCampaigns] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const brand = brandData[id];

  // Load campaigns from localStorage and merge with brand's base campaigns
  useEffect(() => {
    if (!brand) return;

    const storedCampaigns = localStorage.getItem('campaigns');
    let allCampaigns = [...(brand.campaigns || [])];
    
    if (storedCampaigns) {
      try {
        const parsed = JSON.parse(storedCampaigns);
        // Add stored campaigns that aren't already in the brand's base campaigns
        parsed.forEach(storedCampaign => {
          const existingIndex = allCampaigns.findIndex(c => c.id === storedCampaign.id);
          if (existingIndex >= 0) {
            // Update existing campaign with stored version
            allCampaigns[existingIndex] = storedCampaign;
          } else {
            // Add new campaign if it doesn't exist
            allCampaigns.push(storedCampaign);
          }
        });
      } catch (error) {
        console.error('Error parsing stored campaigns:', error);
      }
    }
    
    setCampaigns(allCampaigns);
    setIsLoading(false);
  }, [brand]);

  // Save campaigns to localStorage whenever campaigns state changes
  useEffect(() => {
    if (!isLoading && campaigns.length > 0) {
      localStorage.setItem('campaigns', JSON.stringify(campaigns));
    }
  }, [campaigns, isLoading]);

  if (!brand) {
    return (
      <div className="min-h-screen bg-gray-900 text-white">
        <Header />
        <main className="container mx-auto px-6 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-white mb-4">Brand not found</h1>
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white">
        <Header />
        <main className="container mx-auto px-6 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-white mb-4">Loading campaigns...</h1>
          </div>
        </main>
      </div>
    );
  }

  const handleAssetClick = (asset, campaignName) => {
    setSelectedAsset({ ...asset, campaignName });
  };

  const closeModal = () => {
    setSelectedAsset(null);
  };

  const handleAssetApproval = (assetId) => {
    const updatedCampaigns = campaigns.map(c => ({
      ...c,
      assets: c.assets.map(asset => 
        asset.id === assetId 
          ? { ...asset, status: 'approved' }
          : asset
      )
    }));
    setCampaigns(updatedCampaigns);
    localStorage.setItem('campaigns', JSON.stringify(updatedCampaigns));
  };

  const handleBriefUploaded = (brief, campaignId, analysis) => {
    const updatedCampaigns = campaigns.map(c => 
      c.id === campaignId 
        ? { ...c, brief, briefAnalysis: analysis }
        : c
    );
    setCampaigns(updatedCampaigns);
    // Immediately save to localStorage
    localStorage.setItem('campaigns', JSON.stringify(updatedCampaigns));
  };

  const handleCreateCampaign = (campaignData) => {
    const newCampaign = {
      id: Date.now().toString(),
      name: campaignData.name,
      brief: campaignData.brief || '',
      briefAnalysis: campaignData.briefAnalysis,
      assets: campaignData.assets || []
    };

    const updatedCampaigns = [newCampaign, ...campaigns];
    setCampaigns(updatedCampaigns);
    // Immediately save to localStorage
    localStorage.setItem('campaigns', JSON.stringify(updatedCampaigns));
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />
      
      <main className="container mx-auto px-6 py-8">
        <div className="mb-6">
          <Link to="/business-center">
            <Button variant="outline" className="mb-4 border-gray-600 text-gray-300">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Business Center
            </Button>
          </Link>
        </div>

        <div className="bg-gray-800 rounded-xl shadow-sm border border-gray-700 overflow-hidden mb-8">
          <div className="px-6 py-6 border-b border-gray-700 bg-gray-800">
            <div className="flex items-center space-x-4">
              <div className={`p-3 rounded-lg ${brand.color}`}>
                <Building2 className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">{brand.name}</h1>
                <p className="text-gray-400">{brand.parent}</p>
              </div>
            </div>
          </div>
        </div>

        <Tabs defaultValue="assets" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-gray-800 border-gray-700">
            <TabsTrigger value="assets" className="data-[state=active]:bg-gray-700 data-[state=active]:text-white text-gray-300">Asset Library</TabsTrigger>
            <TabsTrigger value="brand-guidelines" className="data-[state=active]:bg-gray-700 data-[state=active]:text-white text-gray-300">Brand Guidelines</TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-gray-700 data-[state=active]:text-white text-gray-300">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="assets" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold text-white">Campaign Assets</h2>
                <p className="text-gray-400">Manage your brand's creative assets organized by campaign</p>
              </div>
              <CreateCampaignDialog onCreateCampaign={handleCreateCampaign} />
            </div>

            <CampaignGrid 
              campaigns={campaigns} 
              onAssetClick={handleAssetClick}
              showBriefs={true}
              onBriefUploaded={handleBriefUploaded}
              brandId={id}
            />
          </TabsContent>

          <TabsContent value="brand-guidelines">
            <OnboardingGuidelinesView />
          </TabsContent>

          <TabsContent value="settings">
            <BrandComplianceSettings />
          </TabsContent>
        </Tabs>
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

export default Brand;
