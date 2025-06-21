
import React, { useState } from 'react';
import { ThumbsUp, ThumbsDown, X, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';

interface FeedbackWidgetProps {
  onFeedbackSubmitted: (feedback: { helpful: boolean; issue?: string; details?: string }) => void;
  showFinishButton?: boolean;
  onFinish?: () => void;
  finishPromptText?: string;
}

export const FeedbackWidget = ({ 
  onFeedbackSubmitted, 
  showFinishButton = false,
  onFinish,
  finishPromptText = "Ready to confirm your selections?"
}: FeedbackWidgetProps) => {
  const [feedbackGiven, setFeedbackGiven] = useState(false);
  const [showIssueOptions, setShowIssueOptions] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState('');
  const [additionalDetails, setAdditionalDetails] = useState('');

  const issueOptions = [
    { value: 'inaccurate', label: 'Analysis seems inaccurate' },
    { value: 'incomplete', label: 'Analysis is incomplete' },
    { value: 'unclear', label: 'Analysis is unclear or confusing' },
    { value: 'irrelevant', label: 'Analysis is not relevant to my needs' },
    { value: 'technical', label: 'Technical issues with the analysis' },
    { value: 'other', label: 'Other (please specify)' }
  ];

  const handleThumbsUp = () => {
    setFeedbackGiven(true);
    onFeedbackSubmitted({ helpful: true });
  };

  const handleThumbsDown = () => {
    setShowIssueOptions(true);
  };

  const handleIssueSubmit = () => {
    setFeedbackGiven(true);
    onFeedbackSubmitted({
      helpful: false,
      issue: selectedIssue,
      details: selectedIssue === 'other' ? additionalDetails : undefined
    });
  };

  const handleCancel = () => {
    setShowIssueOptions(false);
    setSelectedIssue('');
    setAdditionalDetails('');
  };

  const handleFinish = () => {
    if (onFinish) {
      onFinish();
    }
  };

  if (feedbackGiven) {
    return (
      <div className="p-4 bg-green-50 rounded-lg border border-green-200">
        <p className="text-sm text-green-800 font-medium">
          Thank you for your feedback! This helps us improve our analysis.
        </p>
      </div>
    );
  }

  if (showFinishButton) {
    return (
      <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <CheckCircle className="h-4 w-4 text-blue-500" />
            <span className="text-sm font-medium text-gray-900">{finishPromptText}</span>
          </div>
          <Button
            onClick={handleFinish}
            size="sm"
            className="bg-blue-600 text-white hover:bg-blue-700"
          >
            <CheckCircle className="h-3 w-3 mr-1" />
            Finish
          </Button>
        </div>
      </div>
    );
  }

  if (showIssueOptions) {
    return (
      <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-medium text-gray-900">What was the issue with this analysis?</h4>
          <Button variant="ghost" size="sm" onClick={handleCancel}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <RadioGroup value={selectedIssue} onValueChange={setSelectedIssue} className="space-y-3">
          {issueOptions.map((option) => (
            <div key={option.value} className="flex items-center space-x-2">
              <RadioGroupItem value={option.value} id={option.value} />
              <label htmlFor={option.value} className="text-sm text-gray-700 cursor-pointer">
                {option.label}
              </label>
            </div>
          ))}
        </RadioGroup>

        {selectedIssue === 'other' && (
          <div className="mt-4">
            <label htmlFor="details" className="block text-sm font-medium text-gray-700 mb-2">
              Please provide more details:
            </label>
            <Textarea
              id="details"
              value={additionalDetails}
              onChange={(e) => setAdditionalDetails(e.target.value)}
              placeholder="Describe the issue with the analysis..."
              rows={3}
            />
          </div>
        )}

        <div className="flex gap-2 mt-4">
          <Button 
            onClick={handleIssueSubmit} 
            disabled={!selectedIssue || (selectedIssue === 'other' && !additionalDetails.trim())}
            size="sm"
          >
            Submit Feedback
          </Button>
          <Button variant="outline" onClick={handleCancel} size="sm">
            Cancel
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-gray-900">Is this analysis helpful?</p>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleThumbsUp}
            className="hover:bg-green-50 hover:border-green-300"
          >
            <ThumbsUp className="h-4 w-4 mr-1" />
            Yes
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleThumbsDown}
            className="hover:bg-red-50 hover:border-red-300"
          >
            <ThumbsDown className="h-4 w-4 mr-1" />
            No
          </Button>
        </div>
      </div>
    </div>
  );
};
