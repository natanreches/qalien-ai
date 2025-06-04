
import React from 'react';
import { AssetModalHeader } from './AssetModalHeader';
import { AssetContent } from './AssetContent';
import { ComplianceScore } from './ComplianceScore';
import { ExecutiveSummary } from './ExecutiveSummary';
import { ComplianceDetails } from './ComplianceDetails';
import { FeedbackWidget } from './FeedbackWidget';
import { CampaignMetadata } from './CampaignMetadata';

export const AssetModal = ({ asset, onClose }) => {
  const handleFeedbackSubmitted = (feedback) => {
    console.log('Feedback submitted:', feedback);
    // In a real app, this would send the feedback to an API
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-5xl w-full max-h-[90vh] overflow-hidden">
        <AssetModalHeader asset={asset} onClose={onClose} />

        <div className="flex h-[calc(90vh-80px)]">
          <AssetContent asset={asset} />

          {/* Right side - Compliance Details */}
          <div className="w-3/5 p-6 overflow-y-auto">
            {/* Campaign Metadata */}
            {asset.campaignMetadata && (
              <CampaignMetadata campaignMetadata={asset.campaignMetadata} />
            )}

            <ComplianceScore compliance={asset.compliance} />
            <ExecutiveSummary compliance={asset.compliance} />
            
            {/* Feedback Widget */}
            <div className="mb-6">
              <FeedbackWidget onFeedbackSubmitted={handleFeedbackSubmitted} />
            </div>

            <ComplianceDetails compliance={asset.compliance} />
          </div>
        </div>
      </div>
    </div>
  );
};
