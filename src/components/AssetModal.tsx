
import React, { useState } from 'react';
import { X, CheckCircle, AlertTriangle, XCircle, Download, Share2, Video, ChevronDown, ChevronRight } from 'lucide-react';

export const AssetModal = ({ asset, onClose }) => {
  const [expandedCategory, setExpandedCategory] = useState(null);

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

  // Mock compliance details with expanded analysis
  const complianceDetails = {
    summary: asset.compliance >= 80 
      ? "This asset demonstrates strong brand compliance with minor areas for improvement."
      : asset.compliance >= 60
      ? "This asset shows moderate compliance but requires attention in several key areas."
      : "This asset has significant compliance issues that need immediate attention before approval.",
    executiveSummary: asset.compliance >= 80
      ? "Overall, this asset maintains high brand standards with excellent logo usage and color consistency. Minor adjustments to typography sizing could further enhance brand alignment."
      : asset.compliance >= 60
      ? "This asset requires moderate improvements across multiple brand elements. Priority should be given to color palette consistency and layout adjustments to meet brand guidelines. Logo placement and messaging tone are within acceptable ranges but could be optimized."
      : "This asset requires significant revision before approval. Critical issues include unauthorized color usage, non-brand typography, and layout violations. Logo placement violates clear space requirements and overall composition doesn't follow brand grid guidelines. Immediate attention needed across all brand elements.",
    categories: [
      {
        name: "Logo Usage",
        score: asset.compliance >= 80 ? 95 : asset.compliance >= 60 ? 72 : 40,
        issues: asset.compliance < 80 ? ["Logo placement violates minimum clear space requirements"] : [],
        detailedAnalysis: asset.compliance >= 80
          ? "Logo implementation is excellent with proper clear space, correct sizing ratios, and appropriate placement. The logo maintains its visual integrity and follows all brand guidelines. Positioning creates strong brand presence without overwhelming other design elements."
          : asset.compliance >= 60
          ? "Logo usage is generally acceptable but shows some minor violations. Clear space requirements are mostly met with slight encroachment on the left side. Logo sizing is appropriate for the format. Consider adjusting placement to ensure full compliance with brand standards."
          : "Logo placement significantly violates brand guidelines. Clear space requirements are not met on multiple sides, with text and graphics encroaching within the minimum safety zone. Logo size may be too small for optimal brand recognition. Immediate correction required to meet brand standards.",
        recommendations: asset.compliance < 80 ? [
          "Increase clear space around logo by 25%",
          "Reposition logo to avoid text overlap",
          "Ensure logo size meets minimum requirements for this format"
        ] : ["Continue current logo implementation practices"]
      },
      {
        name: "Color Palette",
        score: asset.compliance >= 80 ? 90 : asset.compliance >= 60 ? 65 : 50,
        issues: asset.compliance < 60 ? ["Unauthorized color variations detected", "Brand colors not used consistently"] : asset.compliance < 80 ? ["Minor color inconsistencies"] : [],
        detailedAnalysis: asset.compliance >= 80
          ? "Excellent color palette implementation with consistent use of primary and secondary brand colors. Color ratios are well-balanced and create strong visual hierarchy. All colors used are within approved brand specifications."
          : asset.compliance >= 60
          ? "Color usage is mostly on-brand with some minor inconsistencies detected. Primary brand colors are used correctly, but some secondary elements use colors slightly outside approved ranges. Overall color harmony is maintained but could be optimized."
          : "Significant color palette violations detected. Multiple unauthorized color variations are present throughout the design. Brand colors are not used consistently, and some elements use colors that are not part of the approved brand palette. This creates confusion and weakens brand recognition.",
        recommendations: asset.compliance < 60 ? [
          "Replace all unauthorized colors with approved brand palette",
          "Ensure consistent color usage across all design elements",
          "Review brand color guidelines for proper implementation"
        ] : asset.compliance < 80 ? [
          "Adjust secondary colors to match approved specifications",
          "Maintain current primary color implementation"
        ] : ["Maintain current excellent color implementation"]
      },
      {
        name: "Typography",
        score: asset.compliance >= 80 ? 88 : asset.compliance >= 60 ? 75 : 35,
        issues: asset.compliance < 60 ? ["Non-brand fonts used", "Incorrect font weights"] : asset.compliance < 80 ? ["Font sizing needs adjustment"] : [],
        detailedAnalysis: asset.compliance >= 80
          ? "Typography implementation is strong with consistent use of brand fonts. Font hierarchy is clear and effective. Font sizes are appropriate for readability and brand standards. Weight variations are used correctly to create visual emphasis."
          : asset.compliance >= 60
          ? "Typography mostly follows brand guidelines with approved fonts used throughout. However, some font sizing inconsistencies are present that affect the overall hierarchy. Font weights are generally correct but could be optimized for better visual impact."
          : "Typography has significant compliance issues. Non-brand fonts are used in several areas, creating inconsistency with brand standards. Font weights don't follow approved guidelines, and sizing doesn't maintain proper hierarchy. This affects both brand consistency and readability.",
        recommendations: asset.compliance < 60 ? [
          "Replace all non-brand fonts with approved typography",
          "Correct font weights according to brand guidelines",
          "Establish proper typographic hierarchy"
        ] : asset.compliance < 80 ? [
          "Adjust font sizing for better hierarchy",
          "Maintain current font family usage"
        ] : ["Continue current typography implementation"]
      },
      {
        name: "Messaging Tone",
        score: asset.compliance >= 80 ? 94 : asset.compliance >= 60 ? 80 : 60,
        issues: asset.compliance < 80 ? ["Tone doesn't match brand voice guidelines"] : [],
        detailedAnalysis: asset.compliance >= 80
          ? "Messaging perfectly captures the brand voice with appropriate tone, style, and personality. Language is consistent with brand guidelines and effectively communicates the intended message while maintaining brand authenticity."
          : asset.compliance >= 60
          ? "Messaging is generally aligned with brand voice but shows some deviation from preferred tone. The core message is appropriate, but certain phrases or word choices don't fully align with brand personality guidelines. Overall communication is effective but could be optimized."
          : "Messaging tone significantly deviates from brand voice guidelines. Language and style don't reflect brand personality, potentially confusing brand perception. Word choices and communication style need adjustment to align with established brand voice standards.",
        recommendations: asset.compliance < 80 ? [
          "Revise messaging to better reflect brand personality",
          "Review brand voice guidelines for tone alignment",
          "Consider alternative word choices that better match brand voice"
        ] : ["Messaging tone is well-aligned with brand voice"]
      },
      {
        name: "Layout & Composition",
        score: asset.compliance >= 80 ? 92 : asset.compliance >= 60 ? 68 : 45,
        issues: asset.compliance < 60 ? ["Layout hierarchy conflicts with brand standards", "Composition doesn't follow grid guidelines"] : asset.compliance < 80 ? ["Minor layout adjustments needed"] : [],
        detailedAnalysis: asset.compliance >= 80
          ? "Layout and composition excel with proper use of brand grid system. Visual hierarchy is clear and effective, guiding viewer attention appropriately. Spacing and proportions follow brand standards, creating a cohesive and professional appearance."
          : asset.compliance >= 60
          ? "Layout generally follows brand guidelines but has some areas that need refinement. Grid system is mostly respected with minor deviations. Visual hierarchy is present but could be strengthened through better spacing and element positioning."
          : "Layout and composition have significant issues that conflict with brand standards. Grid guidelines are not followed consistently, creating visual confusion. Hierarchy is unclear, and spacing doesn't follow brand specifications. This affects both aesthetic appeal and brand consistency.",
        recommendations: asset.compliance < 60 ? [
          "Restructure layout to follow brand grid system",
          "Establish clear visual hierarchy",
          "Adjust spacing to meet brand specifications"
        ] : asset.compliance < 80 ? [
          "Fine-tune spacing for better hierarchy",
          "Minor adjustments to grid alignment"
        ] : ["Layout and composition are well-executed"]
      }
    ]
  };

  const toggleCategory = (index) => {
    setExpandedCategory(expandedCategory === index ? null : index);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-5xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
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
          {/* Left side - Asset Content */}
          <div className="w-2/5 p-6 bg-gray-50 flex items-center justify-center">
            {renderAssetContent()}
          </div>

          {/* Right side - Compliance Details */}
          <div className="w-3/5 p-6 overflow-y-auto">
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

            {/* Executive Summary */}
            <div className="mb-6 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                <AlertTriangle className="h-5 w-5 text-blue-600 mr-2" />
                Executive Summary
              </h3>
              <p className="text-gray-700 text-sm leading-relaxed">{complianceDetails.executiveSummary}</p>
            </div>

            {/* Detailed Breakdown */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Detailed Analysis</h3>
              <div className="space-y-3">
                {complianceDetails.categories.map((category, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                    <div 
                      className="p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                      onClick={() => toggleCategory(index)}
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
                          {expandedCategory === index ? (
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

                    {expandedCategory === index && (
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
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
