
import React from 'react';
import { FileText, Target, Users, CheckCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { BriefAnalysis as BriefAnalysisType } from '@/services/briefAnalysis';

interface BriefAnalysisProps {
  analysis: BriefAnalysisType;
}

export const BriefAnalysis = ({ analysis }: BriefAnalysisProps) => {
  return (
    <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
      <div className="flex items-center space-x-2 mb-3">
        <FileText className="h-5 w-5 text-blue-600" />
        <h4 className="font-semibold text-blue-900">Brief Analysis</h4>
        <Badge variant="secondary" className="bg-blue-100 text-blue-800">
          AI Generated
        </Badge>
      </div>
      
      <div className="space-y-3">
        <div>
          <h5 className="text-sm font-medium text-gray-700 mb-1">Summary</h5>
          <p className="text-sm text-gray-600">{analysis.summary}</p>
        </div>

        <div>
          <h5 className="text-sm font-medium text-gray-700 mb-2">Key Points</h5>
          <ul className="space-y-1">
            {analysis.keyPoints.map((point, index) => (
              <li key={index} className="text-sm text-gray-600 flex items-start">
                <CheckCircle className="h-3 w-3 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                {point}
              </li>
            ))}
          </ul>
        </div>

        {analysis.targetAudience && (
          <div>
            <h5 className="text-sm font-medium text-gray-700 mb-1 flex items-center">
              <Users className="h-4 w-4 mr-1" />
              Target Audience
            </h5>
            <p className="text-sm text-gray-600">{analysis.targetAudience}</p>
          </div>
        )}

        {analysis.objectives && analysis.objectives.length > 0 && (
          <div>
            <h5 className="text-sm font-medium text-gray-700 mb-1 flex items-center">
              <Target className="h-4 w-4 mr-1" />
              Objectives
            </h5>
            <div className="flex flex-wrap gap-1">
              {analysis.objectives.map((objective, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {objective}
                </Badge>
              ))}
            </div>
          </div>
        )}

        <div className="pt-2 border-t border-blue-200">
          <p className="text-xs text-blue-700 bg-blue-100 p-2 rounded">
            <strong>Note:</strong> {analysis.evaluationNote}
          </p>
        </div>
      </div>
    </div>
  );
};
