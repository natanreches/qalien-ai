
import React from 'react';
import { X, Download, Share2 } from 'lucide-react';

interface AssetModalHeaderProps {
  asset: {
    name: string;
    type: string;
    campaignName: string;
  };
  onClose: () => void;
  children?: React.ReactNode;
}

export const AssetModalHeader = ({ asset, onClose, children }: AssetModalHeaderProps) => {
  return (
    <div className="flex items-center justify-between p-6 border-b border-gray-200">
      <div>
        <div className="flex items-center space-x-3 mb-1">
          <h2 className="text-xl font-bold text-gray-900">{asset.name}</h2>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            asset.type === 'video' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
          }`}>
            {asset.type === 'video' ? 'Video Asset' : 'Static Asset'}
          </span>
        </div>
        <p className="text-sm text-gray-500">Campaign: {asset.campaignName}</p>
      </div>
      <div className="flex items-center space-x-3">
        {children}
        <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
          <Download className="h-5 w-5" />
        </button>
        <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
          <Share2 className="h-5 w-5" />
        </button>
        <button 
          onClick={onClose}
          className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};
