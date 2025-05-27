
import React from 'react';
import { Upload, Plus } from 'lucide-react';

export const UploadButton = () => {
  return (
    <button className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 font-medium">
      <Upload className="h-4 w-4" />
      <span>Upload Asset</span>
    </button>
  );
};
