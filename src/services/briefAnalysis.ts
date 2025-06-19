
export interface BriefAnalysis {
  summary: string;
  keyPoints: string[];
  targetAudience?: string;
  objectives?: string[];
  evaluationNote: string;
}

export const analyzeBrief = (briefContent: string): BriefAnalysis => {
  // Mock analysis - in a real app, this would use AI/ML to analyze the brief
  const words = briefContent.toLowerCase().split(' ');
  
  // Extract key themes and generate summary
  const themes: string[] = [];
  if (words.some(w => ['family', 'families', 'parents', 'kids', 'children'].includes(w))) {
    themes.push('family-focused');
  }
  if (words.some(w => ['summer', 'holiday', 'seasonal', 'spring', 'winter'].includes(w))) {
    themes.push('seasonal campaign');
  }
  if (words.some(w => ['launch', 'new', 'introduce', 'debut'].includes(w))) {
    themes.push('product launch');
  }
  if (words.some(w => ['refresh', 'cool', 'refreshing', 'cold'].includes(w))) {
    themes.push('refreshment messaging');
  }
  if (words.some(w => ['baking', 'recipe', 'cooking', 'kitchen'].includes(w))) {
    themes.push('culinary application');
  }

  // Generate summary based on content
  let summary = '';
  if (briefContent.length < 100) {
    summary = `This brief outlines a focused campaign targeting ${themes.length > 0 ? themes.join(' and ') : 'key consumer segments'}. The campaign emphasizes brand positioning and messaging consistency.`;
  } else {
    summary = `This comprehensive brief details a multi-faceted campaign incorporating ${themes.length > 0 ? themes.join(', ') : 'strategic messaging elements'}. The campaign strategy focuses on consumer engagement and brand alignment across all touchpoints.`;
  }

  // Extract potential objectives
  const objectives: string[] = [];
  if (words.some(w => ['awareness', 'introduce', 'launch'].includes(w))) {
    objectives.push('Build brand awareness');
  }
  if (words.some(w => ['engagement', 'connect', 'relationship'].includes(w))) {
    objectives.push('Drive consumer engagement');
  }
  if (words.some(w => ['sales', 'purchase', 'buy', 'conversion'].includes(w))) {
    objectives.push('Increase sales conversion');
  }

  // Generate key points
  const keyPoints = [
    `Campaign theme: ${themes.length > 0 ? themes[0] : 'Brand positioning'}`,
    `Content focus: ${briefContent.length > 150 ? 'Comprehensive messaging strategy' : 'Targeted communication approach'}`,
    `Brand alignment: High priority on consistent visual and verbal identity`
  ];

  if (objectives.length > 0) {
    keyPoints.push(`Primary objectives: ${objectives.join(', ')}`);
  }

  return {
    summary,
    keyPoints,
    targetAudience: words.some(w => ['family', 'parents'].includes(w)) ? 'Families and parents' : 
                    words.some(w => ['young', 'youth', 'teens'].includes(w)) ? 'Young consumers' : undefined,
    objectives: objectives.length > 0 ? objectives : undefined,
    evaluationNote: "All assets uploaded to this campaign will be evaluated against this creative brief in addition to your brand guidelines and compliance settings."
  };
};
