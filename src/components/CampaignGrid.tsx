
import React from 'react';
import { AssetCard } from './AssetCard';
import { Calendar, Folder } from 'lucide-react';

export const CampaignGrid = ({ campaigns, onAssetClick }) => {
  return (
    <div className="space-y-8">
      {campaigns.map((campaign) => (
        <div key={campaign.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
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
              
              <div className="text-right">
                <div className="text-sm text-gray-500">Avg. Compliance</div>
                <div className="text-lg font-semibold text-gray-900">
                  {Math.round(campaign.assets.reduce((acc, asset) => acc + asset.compliance, 0) / campaign.assets.length)}%
                </div>
              </div>
            </div>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {campaign.assets.map((asset) => (
                <AssetCard
                  key={asset.id}
                  asset={asset}
                  onClick={() => onAssetClick(asset, campaign.name)}
                />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
