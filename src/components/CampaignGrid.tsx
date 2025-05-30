
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Folder, ChevronRight, FileText, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export const CampaignGrid = ({ campaigns, onAssetClick, showBriefs = false }) => {
  const navigate = useNavigate();

  const handleCampaignClick = (campaignId) => {
    navigate(`/campaign/${campaignId}`);
  };

  const handleUploadBrief = (e, campaignId) => {
    e.stopPropagation();
    // In a real app, this would open a file upload dialog
    console.log('Upload brief for campaign:', campaignId);
  };

  return (
    <div className="space-y-4">
      {campaigns.map((campaign) => (
        <div key={campaign.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
          <div 
            className="px-6 py-4 bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors"
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
              
              <div className="flex items-center space-x-3">
                {showBriefs && (
                  <div className="flex items-center space-x-2">
                    {campaign.brief ? (
                      <Badge variant="secondary" className="flex items-center space-x-1">
                        <FileText className="h-3 w-3" />
                        <span>Brief Available</span>
                      </Badge>
                    ) : (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={(e) => handleUploadBrief(e, campaign.id)}
                        className="flex items-center space-x-1"
                      >
                        <Upload className="h-3 w-3" />
                        <span>Upload Brief</span>
                      </Button>
                    )}
                  </div>
                )}
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </div>
            </div>
            
            {showBriefs && campaign.brief && (
              <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-gray-700">
                  <strong>Campaign Brief:</strong> {campaign.brief}
                </p>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
