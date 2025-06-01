
import React from 'react';

interface AssetContentProps {
  asset: {
    type: string;
    url: string;
    name: string;
  };
}

export const AssetContent = ({ asset }: AssetContentProps) => {
  const renderAssetContent = () => {
    if (asset.type === 'video') {
      return (
        <div className="relative w-full h-full bg-black flex items-center justify-center">
          <video
            src={asset.url}
            className="max-w-full max-h-full object-contain"
            controls
            preload="metadata"
          />
        </div>
      );
    }

    return (
      <img
        src={asset.url}
        alt={asset.name}
        className="max-w-full max-h-full object-contain rounded-lg shadow-sm"
      />
    );
  };

  return (
    <div className="w-2/5 p-6 bg-gray-50 flex items-center justify-center">
      {renderAssetContent()}
    </div>
  );
};
