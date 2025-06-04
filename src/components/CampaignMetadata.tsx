
import React from 'react';
import { Calendar, Folder, Tag, User } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface CampaignMetadataProps {
  campaignMetadata: {
    campaignId: string;
    campaignName: string;
    brandName?: string;
    createdDate?: string;
    status?: string;
    tags?: string[];
    assignedTo?: string;
  };
}

export const CampaignMetadata = ({ campaignMetadata }: CampaignMetadataProps) => {
  return (
    <div className="mb-6 p-4 bg-gray-50 rounded-lg border">
      <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
        <Folder className="h-5 w-5 text-gray-600 mr-2" />
        Campaign Details
      </h3>
      
      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-600">Campaign</label>
            <p className="text-sm text-gray-900">{campaignMetadata.campaignName}</p>
          </div>
          
          {campaignMetadata.brandName && (
            <div>
              <label className="text-sm font-medium text-gray-600">Brand</label>
              <p className="text-sm text-gray-900">{campaignMetadata.brandName}</p>
            </div>
          )}
        </div>

        {campaignMetadata.createdDate && (
          <div>
            <label className="text-sm font-medium text-gray-600 flex items-center mb-1">
              <Calendar className="h-4 w-4 mr-1" />
              Created Date
            </label>
            <p className="text-sm text-gray-900">
              {new Date(campaignMetadata.createdDate).toLocaleDateString()}
            </p>
          </div>
        )}

        {campaignMetadata.status && (
          <div>
            <label className="text-sm font-medium text-gray-600">Campaign Status</label>
            <div className="mt-1">
              <Badge variant={campaignMetadata.status === 'active' ? 'default' : 'secondary'}>
                {campaignMetadata.status}
              </Badge>
            </div>
          </div>
        )}

        {campaignMetadata.assignedTo && (
          <div>
            <label className="text-sm font-medium text-gray-600 flex items-center mb-1">
              <User className="h-4 w-4 mr-1" />
              Assigned To
            </label>
            <p className="text-sm text-gray-900">{campaignMetadata.assignedTo}</p>
          </div>
        )}

        {campaignMetadata.tags && campaignMetadata.tags.length > 0 && (
          <div>
            <label className="text-sm font-medium text-gray-600 flex items-center mb-2">
              <Tag className="h-4 w-4 mr-1" />
              Tags
            </label>
            <div className="flex flex-wrap gap-1">
              {campaignMetadata.tags.map((tag, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
