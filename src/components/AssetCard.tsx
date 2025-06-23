
import React from 'react';
import { Eye, Clock, CheckCircle, AlertCircle, XCircle, Video, Trash2 } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { AssetApprovalButton } from './AssetApprovalButton';

export const AssetCard = ({ asset, onClick, onApprove, onRemove }) => {
  const getComplianceColor = (score) => {
    if (score >= 80) return 'text-green-600 bg-green-100';
    if (score >= 60) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'needs-review':
        return <AlertCircle className="h-4 w-4 text-yellow-600" />;
      case 'rejected':
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'approved':
        return 'Approved';
      case 'needs-review':
        return 'Needs Review';
      case 'rejected':
        return 'Rejected';
      default:
        return 'Pending';
    }
  };

  const getComplianceDetails = (score) => {
    if (score >= 80) {
      return {
        status: 'High Compliance',
        details: 'Asset meets all brand guidelines and regulatory requirements',
        color: 'text-green-600'
      };
    }
    if (score >= 60) {
      return {
        status: 'Moderate Compliance',
        details: 'Asset has minor issues that may need attention',
        color: 'text-yellow-600'
      };
    }
    return {
      status: 'Low Compliance',
      details: 'Asset requires significant updates to meet requirements',
      color: 'text-red-600'
    };
  };

  const renderAssetPreview = () => {
    if (asset.type === 'video') {
      return (
        <div className="relative w-full h-full bg-black flex items-center justify-center">
          <video
            src={asset.url}
            className="w-full h-full object-cover"
            muted
            onMouseEnter={(e) => e.currentTarget.play()}
            onMouseLeave={(e) => {
              e.currentTarget.pause();
              e.currentTarget.currentTime = 0;
            }}
          />
          <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
            <div className="p-3 bg-white bg-opacity-90 rounded-full">
              <Video className="h-6 w-6 text-gray-700" />
            </div>
          </div>
        </div>
      );
    }

    return (
      <img
        src={asset.url}
        alt={asset.name}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
      />
    );
  };

  const complianceDetails = getComplianceDetails(asset.compliance);

  const handleApprove = (assetId) => {
    if (onApprove) {
      onApprove(assetId);
    }
  };

  const handleRemove = (e) => {
    e.stopPropagation(); // Prevent triggering the card click
    if (onRemove && window.confirm('Are you sure you want to remove this asset?')) {
      onRemove(asset.id);
    }
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="group bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-200">
            <div 
              className="relative aspect-video bg-gray-100 overflow-hidden cursor-pointer"
              onClick={onClick}
            >
              {renderAssetPreview()}
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-opacity duration-200" />
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <div className="p-2 bg-white bg-opacity-90 rounded-full">
                  <Eye className="h-4 w-4 text-gray-700" />
                </div>
              </div>
              <div className="absolute top-2 left-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  asset.type === 'video' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                }`}>
                  {asset.type === 'video' ? 'Video' : 'Image'}
                </span>
              </div>
              {onRemove && (
                <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={handleRemove}
                    className="h-8 w-8 p-0"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
            
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-gray-900 truncate">{asset.name}</h3>
                <div className="flex items-center space-x-1">
                  {getStatusIcon(asset.status)}
                </div>
              </div>
              
              <div className="flex items-center justify-between mb-3">
                <div 
                  className={`px-2 py-1 rounded-full text-sm font-medium ${getComplianceColor(asset.compliance)}`}
                >
                  {asset.compliance}%
                </div>
                <span className="text-xs text-gray-500">{getStatusText(asset.status)}</span>
              </div>

              <div className="mb-3">
                <AssetApprovalButton 
                  asset={asset}
                  onApprove={handleApprove}
                  variant="small"
                />
              </div>
              
              <div className="text-xs text-gray-400">
                Uploaded {new Date(asset.uploadDate).toLocaleDateString()}
              </div>
            </div>
          </div>
        </TooltipTrigger>
        <TooltipContent side="top" className="max-w-xs">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-semibold">Compliance Check</span>
              <span className={`font-bold ${complianceDetails.color}`}>
                {asset.compliance}%
              </span>
            </div>
            <div className="space-y-1">
              <div className={`font-medium ${complianceDetails.color}`}>
                {complianceDetails.status}
              </div>
              <p className="text-sm text-gray-600">
                {complianceDetails.details}
              </p>
            </div>
            <div className="text-xs text-gray-500 pt-1 border-t">
              Status: {getStatusText(asset.status)}
            </div>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
