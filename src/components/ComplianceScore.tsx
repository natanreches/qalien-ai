
import React from 'react';

interface ComplianceScoreProps {
  compliance: number;
}

export const ComplianceScore = ({ compliance }: ComplianceScoreProps) => {
  const getComplianceColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getComplianceBgColor = (score: number) => {
    if (score >= 80) return 'bg-green-100';
    if (score >= 60) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  return (
    <div className={`p-4 rounded-lg mb-6 ${getComplianceBgColor(compliance)}`}>
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-semibold text-gray-900">Compliance Score</h3>
        <span className={`text-2xl font-bold ${getComplianceColor(compliance)}`}>
          {compliance}%
        </span>
      </div>
      <div className="w-full bg-white rounded-full h-2 mb-2">
        <div 
          className={`h-2 rounded-full transition-all duration-300 ${
            compliance >= 80 ? 'bg-green-500' : 
            compliance >= 60 ? 'bg-yellow-500' : 'bg-red-500'
          }`}
          style={{ width: `${compliance}%` }}
        />
      </div>
    </div>
  );
};
