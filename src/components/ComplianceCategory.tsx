
import React from 'react';
import { CheckCircle, AlertTriangle, XCircle, ChevronDown, ChevronRight } from 'lucide-react';

interface ComplianceCategoryProps {
  category: {
    name: string;
    score: number;
    issues: string[];
    detailedAnalysis: string;
    recommendations: string[];
  };
  isExpanded: boolean;
  onToggle: () => void;
}

export const ComplianceCategory = ({ category, isExpanded, onToggle }: ComplianceCategoryProps) => {
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <div 
        className="p-4 cursor-pointer hover:bg-gray-50 transition-colors"
        onClick={onToggle}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              {category.issues.length === 0 ? (
                <CheckCircle className="h-4 w-4 text-green-600" />
              ) : category.score >= 60 ? (
                <AlertTriangle className="h-4 w-4 text-yellow-600" />
              ) : (
                <XCircle className="h-4 w-4 text-red-600" />
              )}
              <h4 className="font-medium text-gray-900">{category.name}</h4>
            </div>
            <span className={`font-semibold text-sm ${
              category.score >= 80 ? 'text-green-600' : 
              category.score >= 60 ? 'text-yellow-600' : 'text-red-600'
            }`}>
              {category.score}%
            </span>
          </div>
          
          <div className="flex items-center space-x-2">
            {isExpanded ? (
              <ChevronDown className="h-4 w-4 text-gray-400" />
            ) : (
              <ChevronRight className="h-4 w-4 text-gray-400" />
            )}
          </div>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-1.5 mt-3">
          <div 
            className={`h-1.5 rounded-full transition-all duration-300 ${
              category.score >= 80 ? 'bg-green-500' : 
              category.score >= 60 ? 'bg-yellow-500' : 'bg-red-500'
            }`}
            style={{ width: `${category.score}%` }}
          />
        </div>
      </div>

      {isExpanded && (
        <div className="px-4 pb-4 border-t border-gray-100 bg-gray-50">
          <div className="pt-4 space-y-4">
            <div>
              <h5 className="font-medium text-gray-900 mb-2">Analysis</h5>
              <p className="text-sm text-gray-700 leading-relaxed">{category.detailedAnalysis}</p>
            </div>
            
            {category.recommendations && category.recommendations.length > 0 && (
              <div>
                <h5 className="font-medium text-gray-900 mb-2">Recommendations</h5>
                <ul className="space-y-1">
                  {category.recommendations.map((rec, recIndex) => (
                    <li key={recIndex} className="flex items-start space-x-2 text-sm">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                      <span className="text-gray-600">{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {category.issues.length > 0 && (
              <div>
                <h5 className="font-medium text-gray-900 mb-2">Issues Identified</h5>
                <ul className="space-y-1">
                  {category.issues.map((issue, issueIndex) => (
                    <li key={issueIndex} className="flex items-start space-x-2 text-sm">
                      <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0" />
                      <span className="text-gray-600">{issue}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
