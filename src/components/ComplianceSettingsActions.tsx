
import React from 'react';
import { Button } from '@/components/ui/button';
import { Save, RotateCcw } from 'lucide-react';

interface ComplianceSettingsActionsProps {
  onSave: () => void;
  onReset: () => void;
}

export const ComplianceSettingsActions = ({
  onSave,
  onReset
}: ComplianceSettingsActionsProps) => {
  return (
    <div className="flex justify-between">
      <Button variant="outline" onClick={onReset} className="flex items-center space-x-2 border-gray-600 text-gray-300">
        <RotateCcw className="h-4 w-4" />
        <span>Reset to Defaults</span>
      </Button>
      <Button onClick={onSave} className="flex items-center space-x-2">
        <Save className="h-4 w-4" />
        <span>Save Settings</span>
      </Button>
    </div>
  );
};
