
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AssetCard } from './AssetCard';
import { Calendar, Folder, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const CampaignGrid = ({ campaigns, onAssetClick }) => {
  const navigate = useNavigate();

  const handleCampaignClick = (campaignId) => {
    navigate(`/campaign/${campaignId}`);
  };

  return (
    <div className="space-y-8">
      {campaigns.map((campaign) => (
        <div key={campaign.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
          <div 
            className="px-6 py-4 border-b border-gray-100 bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors"
            onClick={() => handleCampaignClick(campaign.id)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Folder className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">{campaign.name}</h2>
                  <p className="text-sm text-gray-500 flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {campaign.assets.length} assets
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <div className="text-sm text-gray-500">Avg. Compliance</div>
                  <div className="text-lg font-semibold text-gray-900">
                    {Math.round(campaign.assets.reduce((acc, asset) => acc + asset.compliance, 0) / campaign.assets.length)}%
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {campaign.assets.slice(0, 4).map((asset) => (
                <AssetCard
                  key={asset.id}
                  asset={asset}
                  onClick={() => onAssetClick(asset, campaign.name)}
                />
              ))}
              {campaign.assets.length > 4 && (
                <div 
                  className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg aspect-video flex items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={() => handleCampaignClick(campaign.id)}
                >
                  <div className="text-center">
                    <div className="text-sm text-gray-500 font-medium">
                      +{campaign.assets.length - 4} more
                    </div>
                    <div className="text-xs text-gray-400">Click to view all</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
