
import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface ExecutiveSummaryProps {
  compliance: number;
}

export const ExecutiveSummary = ({ compliance }: ExecutiveSummaryProps) => {
  const getExecutiveSummary = (score: number) => {
    if (score >= 80) {
      return "Overall, this asset maintains high brand standards with excellent logo usage and color consistency. Minor adjustments to typography sizing could further enhance brand alignment.";
    }
    if (score >= 60) {
      return "This asset requires moderate improvements across multiple brand elements. Priority should be given to color palette consistency and layout adjustments to meet brand guidelines. Logo placement and messaging tone are within acceptable ranges but could be optimized.";
    }
    return "This asset requires significant revision before approval. Critical issues include unauthorized color usage, non-brand typography, and layout violations. Logo placement violates clear space requirements and overall composition doesn't follow brand grid guidelines. Immediate attention needed across all brand elements.";
  };

  return (
    <div className="mb-6 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
      <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
        <AlertTriangle className="h-5 w-5 text-blue-600 mr-2" />
        Executive Summary
      </h3>
      <p className="text-gray-700 text-sm leading-relaxed">{getExecutiveSummary(compliance)}</p>
    </div>
  );
};
