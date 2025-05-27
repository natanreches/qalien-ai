
import React from 'react';
import { Eye, Clock, CheckCircle, AlertCircle, XCircle } from 'lucide-react';

export const AssetCard = ({ asset, onClick }) => {
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

  return (
    <div 
      className="group bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-200 cursor-pointer hover:border-blue-300"
      onClick={onClick}
    >
      <div className="relative aspect-video bg-gray-100 overflow-hidden">
        <img
          src={asset.url}
          alt={asset.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-opacity duration-200" />
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <div className="p-2 bg-white bg-opacity-90 rounded-full">
            <Eye className="h-4 w-4 text-gray-700" />
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-medium text-gray-900 truncate">{asset.name}</h3>
          <div className="flex items-center space-x-1">
            {getStatusIcon(asset.status)}
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div 
            className={`px-2 py-1 rounded-full text-sm font-medium ${getComplianceColor(asset.compliance)}`}
          >
            {asset.compliance}%
          </div>
          <span className="text-xs text-gray-500">{getStatusText(asset.status)}</span>
        </div>
        
        <div className="mt-2 text-xs text-gray-400">
          Uploaded {new Date(asset.uploadDate).toLocaleDateString()}
        </div>
      </div>
    </div>
  );
};
