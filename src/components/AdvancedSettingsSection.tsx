
import React from 'react';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

interface AdvancedSettingsSectionProps {
  strictMode: boolean;
  autoApproval: boolean;
  onStrictModeChange: (checked: boolean) => void;
  onAutoApprovalChange: (checked: boolean) => void;
}

export const AdvancedSettingsSection = ({
  strictMode,
  autoApproval,
  onStrictModeChange,
  onAutoApprovalChange
}: AdvancedSettingsSectionProps) => {
  return (
    <div>
      <h3 className="text-lg font-semibold text-white mb-4">Advanced Settings</h3>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <Label htmlFor="strict-mode" className="text-sm font-medium text-gray-200">
              Strict Mode
            </Label>
            <p className="text-xs text-gray-500">
              Apply all weights with maximum strictness for critical brand assets
            </p>
          </div>
          <Switch
            id="strict-mode"
            checked={strictMode}
            onCheckedChange={onStrictModeChange}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <Label htmlFor="auto-approval" className="text-sm font-medium text-gray-200">
              Auto-approve high compliance assets
            </Label>
            <p className="text-xs text-gray-500">
              Automatically approve assets scoring above 90% overall compliance
            </p>
          </div>
          <Switch
            id="auto-approval"
            checked={autoApproval}
            onCheckedChange={onAutoApprovalChange}
          />
        </div>
      </div>
    </div>
  );
};
