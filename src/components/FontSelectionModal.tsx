
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Upload } from 'lucide-react';

interface FontSelectionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onFontSelect: (font: string) => void;
  onFontFileUpload?: (file: File) => void;
}

const PRESET_FONTS = [
  'Helvetica Neue',
  'Arial',
  'Georgia',
  'Times New Roman',
  'Open Sans',
  'Roboto',
  'Lato',
  'Montserrat',
  'Source Sans Pro',
  'Oswald',
  'Raleway',
  'Poppins',
  'Merriweather',
  'Playfair Display',
  'Inter',
  'Nunito',
  'PT Sans',
  'Crimson Text',
  'Work Sans',
  'Fira Sans'
];

export const FontSelectionModal = ({
  open,
  onOpenChange,
  onFontSelect,
  onFontFileUpload
}: FontSelectionModalProps) => {
  const [customFont, setCustomFont] = React.useState('');
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handlePresetFontSelect = (font: string) => {
    onFontSelect(font);
    onOpenChange(false);
  };

  const handleCustomFontAdd = () => {
    if (customFont.trim()) {
      onFontSelect(customFont.trim());
      onOpenChange(false);
      setCustomFont('');
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && onFontFileUpload) {
      onFontFileUpload(file);
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg bg-gray-800 border-gray-700">
        <DialogHeader>
          <DialogTitle className="text-white">Select a Font</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 max-h-96 overflow-y-auto">
          {/* Preset Fonts */}
          <div>
            <Label className="text-gray-200 mb-3 block">Popular Fonts</Label>
            <div className="grid grid-cols-1 gap-2">
              {PRESET_FONTS.map((font) => (
                <button
                  key={font}
                  onClick={() => handlePresetFontSelect(font)}
                  className="p-3 text-left rounded border border-gray-600 hover:border-gray-400 hover:bg-gray-700 transition-colors text-white"
                  style={{ 
                    fontFamily: `"${font}", ${font.includes('serif') || font === 'Georgia' || font === 'Times New Roman' || font === 'Merriweather' || font === 'Playfair Display' || font === 'Crimson Text' ? 'serif' : 'sans-serif'}`,
                    fontSize: '16px'
                  }}
                >
                  {font}
                </button>
              ))}
            </div>
          </div>

          {/* Custom Font Name */}
          <div className="space-y-3">
            <Label className="text-gray-200">Custom Font Name</Label>
            <div className="flex items-center space-x-2">
              <Input
                type="text"
                value={customFont}
                onChange={(e) => setCustomFont(e.target.value)}
                placeholder="Enter font name..."
                className="flex-1 bg-gray-700 border-gray-600 text-white"
              />
              <Button onClick={handleCustomFontAdd} disabled={!customFont.trim()}>
                Add
              </Button>
            </div>
          </div>

          {/* Font File Upload */}
          {onFontFileUpload && (
            <div className="space-y-3">
              <Label className="text-gray-200">Upload Font File</Label>
              <div className="flex items-center space-x-2">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".woff,.woff2,.ttf,.otf"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <Button
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  className="border-gray-600 text-gray-300 w-full"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Font File (.woff, .woff2, .ttf, .otf)
                </Button>
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="border-gray-600 text-gray-300"
          >
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
