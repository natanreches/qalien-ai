
import React from 'react';
import { X, CheckCircle, AlertTriangle, XCircle, Download, Share2 } from 'lucide-react';

export const AssetModal = ({ asset, onClose }) => {
  const getComplianceColor = (score) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getComplianceBgColor = (score) => {
    if (score >= 80) return 'bg-green-100';
    if (score >= 60) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  // Mock compliance details
  const complianceDetails = {
    summary: asset.compliance >= 80 
      ? "This asset demonstrates strong brand compliance with minor areas for improvement."
      : asset.compliance >= 60
      ? "This asset shows moderate compliance but requires attention in several key areas."
      : "This asset has significant compliance issues that need immediate attention before approval.",
    categories: [
      {
        name: "Logo Usage",
        score: asset.compliance >= 80 ? 95 : asset.compliance >= 60 ? 72 : 40,
        issues: asset.compliance < 80 ? ["Logo placement violates minimum clear space requirements"] : []
      },
      {
        name: "Color Palette",
        score: asset.compliance >= 80 ? 90 : asset.compliance >= 60 ? 65 : 50,
        issues: asset.compliance < 60 ? ["Unauthorized color variations detected", "Brand colors not used consistently"] : asset.compliance < 80 ? ["Minor color inconsistencies"] : []
      },
      {
        name: "Typography",
        score: asset.compliance >= 80 ? 88 : asset.compliance >= 60 ? 75 : 35,
        issues: asset.compliance < 60 ? ["Non-brand fonts used", "Incorrect font weights"] : asset.compliance < 80 ? ["Font sizing needs adjustment"] : []
      },
      {
        name: "Messaging Tone",
        score: asset.compliance >= 80 ? 94 : asset.compliance >= 60 ? 80 : 60,
        issues: asset.compliance < 80 ? ["Tone doesn't match brand voice guidelines"] : []
      },
      {
        name: "Layout & Composition",
        score: asset.compliance >= 80 ? 92 : asset.compliance >= 60 ? 68 : 45,
        issues: asset.compliance < 60 ? ["Layout hierarchy conflicts with brand standards", "Composition doesn't follow grid guidelines"] : asset.compliance < 80 ? ["Minor layout adjustments needed"] : []
      }
    ]
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-bold text-gray-900">{asset.name}</h2>
            <p className="text-sm text-gray-500">Campaign: {asset.campaignName}</p>
          </div>
          <div className="flex items-center space-x-3">
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

        <div className="flex h-[calc(90vh-80px)]">
          {/* Left side - Image */}
          <div className="w-1/2 p-6 bg-gray-50 flex items-center justify-center">
            <img
              src={asset.url}
              alt={asset.name}
              className="max-w-full max-h-full object-contain rounded-lg shadow-sm"
            />
          </div>

          {/* Right side - Compliance Details */}
          <div className="w-1/2 p-6 overflow-y-auto">
            {/* Compliance Score */}
            <div className={`p-4 rounded-lg mb-6 ${getComplianceBgColor(asset.compliance)}`}>
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-gray-900">Compliance Score</h3>
                <span className={`text-2xl font-bold ${getComplianceColor(asset.compliance)}`}>
                  {asset.compliance}%
                </span>
              </div>
              <div className="w-full bg-white rounded-full h-2 mb-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-300 ${
                    asset.compliance >= 80 ? 'bg-green-500' : 
                    asset.compliance >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${asset.compliance}%` }}
                />
              </div>
            </div>

            {/* Summary */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-3">Compliance Summary</h3>
              <p className="text-gray-700 text-sm leading-relaxed">{complianceDetails.summary}</p>
            </div>

            {/* Detailed Breakdown */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Detailed Analysis</h3>
              <div className="space-y-4">
                {complianceDetails.categories.map((category, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900">{category.name}</h4>
                      <div className="flex items-center space-x-2">
                        {category.issues.length === 0 ? (
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        ) : category.score >= 60 ? (
                          <AlertTriangle className="h-4 w-4 text-yellow-600" />
                        ) : (
                          <XCircle className="h-4 w-4 text-red-600" />
                        )}
                        <span className={`font-semibold ${
                          category.score >= 80 ? 'text-green-600' : 
                          category.score >= 60 ? 'text-yellow-600' : 'text-red-600'
                        }`}>
                          {category.score}%
                        </span>
                      </div>
                    </div>
                    
                    <div className="w-full bg-gray-200 rounded-full h-1.5 mb-3">
                      <div 
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          category.score >= 80 ? 'bg-green-500' : 
                          category.score >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${category.score}%` }}
                      />
                    </div>

                    {category.issues.length > 0 && (
                      <div className="space-y-1">
                        {category.issues.map((issue, issueIndex) => (
                          <div key={issueIndex} className="flex items-start space-x-2 text-sm">
                            <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0" />
                            <span className="text-gray-600">{issue}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
