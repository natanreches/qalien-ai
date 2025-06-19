
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface ColorSelectionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onColorSelect: (color: string) => void;
}

const PRESET_COLORS = [
  '#FF6B35', '#004E89', '#FFFFFF', '#000000', '#F4F4F4',
  '#2C3E50', '#E74C3C', '#3498DB', '#2ECC71', '#F39C12',
  '#9B59B6', '#1ABC9C', '#34495E', '#95A5A6', '#D35400',
  '#8E44AD', '#27AE60', '#2980B9', '#E67E22', '#C0392B',
  '#16A085', '#F1C40F', '#BDC3C7', '#7F8C8D', '#ECF0F1'
];

export const ColorSelectionModal = ({
  open,
  onOpenChange,
  onColorSelect
}: ColorSelectionModalProps) => {
  const [customColor, setCustomColor] = React.useState('#000000');

  const handlePresetColorSelect = (color: string) => {
    onColorSelect(color);
    onOpenChange(false);
  };

  const handleCustomColorAdd = () => {
    onColorSelect(customColor);
    onOpenChange(false);
    setCustomColor('#000000');
  };

  const getTextColor = (backgroundColor: string) => {
    // Convert hex to RGB
    const hex = backgroundColor.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    
    // Calculate luminance
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    
    // Return black for light colors, white for dark colors
    return luminance > 0.5 ? '#000000' : '#FFFFFF';
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg bg-gray-800 border-gray-700">
        <DialogHeader>
          <DialogTitle className="text-white">Select a Color</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Preset Colors */}
          <div>
            <Label className="text-gray-200 mb-3 block">Preset Colors</Label>
            <div className="grid grid-cols-5 gap-2">
              {PRESET_COLORS.map((color) => (
                <button
                  key={color}
                  onClick={() => handlePresetColorSelect(color)}
                  className="w-12 h-12 rounded border-2 border-gray-600 hover:border-gray-400 transition-colors relative flex items-center justify-center"
                  style={{ backgroundColor: color }}
                  title={color}
                >
                  <span 
                    className="text-xs font-mono font-semibold px-1 py-0.5 rounded bg-black/20 backdrop-blur-sm"
                    style={{ color: getTextColor(color) }}
                  >
                    {color}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Custom Color */}
          <div className="space-y-3">
            <Label className="text-gray-200">Custom Color</Label>
            <div className="flex items-center space-x-2">
              <Input
                type="color"
                value={customColor}
                onChange={(e) => setCustomColor(e.target.value)}
                className="w-16 h-10 p-1 bg-gray-700 border-gray-600"
              />
              <Input
                type="text"
                value={customColor}
                onChange={(e) => setCustomColor(e.target.value)}
                placeholder="#000000"
                className="flex-1 bg-gray-700 border-gray-600 text-white"
              />
            </div>
          </div>
        </div>

        <DialogFooter className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="border-gray-600 text-gray-300"
          >
            Cancel
          </Button>
          <Button onClick={handleCustomColorAdd}>
            Add Custom Color
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
