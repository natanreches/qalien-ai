import React, { useState } from 'react';
import { ComplianceCategory } from './ComplianceCategory';

interface ComplianceDetailsProps {
  compliance: number;
}

export const ComplianceDetails = ({ compliance }: ComplianceDetailsProps) => {
  const [expandedCategory, setExpandedCategory] = useState<number | null>(null);

  const toggleCategory = (index: number) => {
    setExpandedCategory(expandedCategory === index ? null : index);
  };

  const handleCategoryFeedback = (categoryName: string, feedback: { helpful: boolean; issue?: string; details?: string }) => {
    console.log(`Feedback for ${categoryName}:`, feedback);
    // In a real app, this would send the feedback to an API with category context
  };

  // Mock compliance details with expanded analysis
  const complianceDetails = {
    categories: [
      {
        name: "Logo Usage",
        score: compliance >= 80 ? 95 : compliance >= 60 ? 72 : 40,
        issues: compliance < 80 ? ["Logo placement violates minimum clear space requirements"] : [],
        detailedAnalysis: compliance >= 80
          ? "Logo implementation is excellent with proper clear space, correct sizing ratios, and appropriate placement. The logo maintains its visual integrity and follows all brand guidelines. Positioning creates strong brand presence without overwhelming other design elements."
          : compliance >= 60
          ? "Logo usage is generally acceptable but shows some minor violations. Clear space requirements are mostly met with slight encroachment on the left side. Logo sizing is appropriate for the format. Consider adjusting placement to ensure full compliance with brand standards."
          : "Logo placement significantly violates brand guidelines. Clear space requirements are not met on multiple sides, with text and graphics encroaching within the minimum safety zone. Logo size may be too small for optimal brand recognition. Immediate correction required to meet brand standards.",
        recommendations: compliance < 80 ? [
          "Increase clear space around logo by 25%",
          "Reposition logo to avoid text overlap",
          "Ensure logo size meets minimum requirements for this format"
        ] : ["Continue current logo implementation practices"]
      },
      {
        name: "Color Palette",
        score: compliance >= 80 ? 90 : compliance >= 60 ? 65 : 50,
        issues: compliance < 60 ? ["Unauthorized color variations detected", "Brand colors not used consistently"] : compliance < 80 ? ["Minor color inconsistencies"] : [],
        detailedAnalysis: compliance >= 80
          ? "Excellent color palette implementation with consistent use of primary and secondary brand colors. Color ratios are well-balanced and create strong visual hierarchy. All colors used are within approved brand specifications."
          : compliance >= 60
          ? "Color usage is mostly on-brand with some minor inconsistencies detected. Primary brand colors are used correctly, but some secondary elements use colors slightly outside approved ranges. Overall color harmony is maintained but could be optimized."
          : "Significant color palette violations detected. Multiple unauthorized color variations are present throughout the design. Brand colors are not used consistently, and some elements use colors that are not part of the approved brand palette. This creates confusion and weakens brand recognition.",
        recommendations: compliance < 60 ? [
          "Replace all unauthorized colors with approved brand palette",
          "Ensure consistent color usage across all design elements",
          "Review brand color guidelines for proper implementation"
        ] : compliance < 80 ? [
          "Adjust secondary colors to match approved specifications",
          "Maintain current primary color implementation"
        ] : ["Maintain current excellent color implementation"]
      },
      {
        name: "Typography",
        score: compliance >= 80 ? 88 : compliance >= 60 ? 75 : 35,
        issues: compliance < 60 ? ["Non-brand fonts used", "Incorrect font weights"] : compliance < 80 ? ["Font sizing needs adjustment"] : [],
        detailedAnalysis: compliance >= 80
          ? "Typography implementation is strong with consistent use of brand fonts. Font hierarchy is clear and effective. Font sizes are appropriate for readability and brand standards. Weight variations are used correctly to create visual emphasis."
          : compliance >= 60
          ? "Typography mostly follows brand guidelines with approved fonts used throughout. However, some font sizing inconsistencies are present that affect the overall hierarchy. Font weights are generally correct but could be optimized for better visual impact."
          : "Typography has significant compliance issues. Non-brand fonts are used in several areas, creating inconsistency with brand standards. Font weights don't follow approved guidelines, and sizing doesn't maintain proper hierarchy. This affects both brand consistency and readability.",
        recommendations: compliance < 60 ? [
          "Replace all non-brand fonts with approved typography",
          "Correct font weights according to brand guidelines",
          "Establish proper typographic hierarchy"
        ] : compliance < 80 ? [
          "Adjust font sizing for better hierarchy",
          "Maintain current font family usage"
        ] : ["Continue current typography implementation"]
      },
      {
        name: "Messaging Tone",
        score: compliance >= 80 ? 94 : compliance >= 60 ? 80 : 60,
        issues: compliance < 80 ? ["Tone doesn't match brand voice guidelines"] : [],
        detailedAnalysis: compliance >= 80
          ? "Messaging perfectly captures the brand voice with appropriate tone, style, and personality. Language is consistent with brand guidelines and effectively communicates the intended message while maintaining brand authenticity."
          : compliance >= 60
          ? "Messaging is generally aligned with brand voice but shows some deviation from preferred tone. The core message is appropriate, but certain phrases or word choices don't fully align with brand personality guidelines. Overall communication is effective but could be optimized."
          : "Messaging tone significantly deviates from brand voice guidelines. Language and style don't reflect brand personality, potentially confusing brand perception. Word choices and communication style need adjustment to align with established brand voice standards.",
        recommendations: compliance < 80 ? [
          "Revise messaging to better reflect brand personality",
          "Review brand voice guidelines for tone alignment",
          "Consider alternative word choices that better match brand voice"
        ] : ["Messaging tone is well-aligned with brand voice"]
      },
      {
        name: "Layout & Composition",
        score: compliance >= 80 ? 92 : compliance >= 60 ? 68 : 45,
        issues: compliance < 60 ? ["Layout hierarchy conflicts with brand standards", "Composition doesn't follow grid guidelines"] : compliance < 80 ? ["Minor layout adjustments needed"] : [],
        detailedAnalysis: compliance >= 80
          ? "Layout and composition excel with proper use of brand grid system. Visual hierarchy is clear and effective, guiding viewer attention appropriately. Spacing and proportions follow brand standards, creating a cohesive and professional appearance."
          : compliance >= 60
          ? "Layout generally follows brand guidelines but has some areas that need refinement. Grid system is mostly respected with minor deviations. Visual hierarchy is present but could be strengthened through better spacing and element positioning."
          : "Layout and composition have significant issues that conflict with brand standards. Grid guidelines are not followed consistently, creating visual confusion. Hierarchy is unclear, and spacing doesn't follow brand specifications. This affects both aesthetic appeal and brand consistency.",
        recommendations: compliance < 60 ? [
          "Restructure layout to follow brand grid system",
          "Establish clear visual hierarchy",
          "Adjust spacing to meet brand specifications"
        ] : compliance < 80 ? [
          "Fine-tune spacing for better hierarchy",
          "Minor adjustments to grid alignment"
        ] : ["Layout and composition are well-executed"]
      }
    ]
  };

  return (
    <div>
      <h3 className="font-semibold text-gray-900 mb-4">Detailed Analysis</h3>
      <div className="space-y-3">
        {complianceDetails.categories.map((category, index) => (
          <ComplianceCategory
            key={index}
            category={category}
            isExpanded={expandedCategory === index}
            onToggle={() => toggleCategory(index)}
            onFeedbackSubmitted={handleCategoryFeedback}
          />
        ))}
      </div>
    </div>
  );
};
