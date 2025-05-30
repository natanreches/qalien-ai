
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Upload, FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CreativeBriefUploadProps {
  campaignId: string;
  onBriefUploaded: (brief: string) => void;
  hasExistingBrief?: boolean;
}

export const CreativeBriefUpload = ({ campaignId, onBriefUploaded, hasExistingBrief = false }: CreativeBriefUploadProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [briefText, setBriefText] = useState('');
  const [briefFile, setBriefFile] = useState<File | null>(null);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setBriefFile(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!briefText.trim() && !briefFile) {
      toast({
        title: "Error",
        description: "Please provide either brief text or upload a file",
        variant: "destructive"
      });
      return;
    }

    // In a real app, this would upload the file and save the brief
    const briefContent = briefText.trim() || `File uploaded: ${briefFile?.name}`;
    onBriefUploaded(briefContent);
    
    toast({
      title: "Success",
      description: "Creative brief uploaded successfully",
    });
    
    setIsOpen(false);
    setBriefText('');
    setBriefFile(null);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant={hasExistingBrief ? "outline" : "default"} size="sm">
          <FileText className="h-4 w-4 mr-2" />
          {hasExistingBrief ? "Update Brief" : "Upload Brief"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px] bg-gray-900 border-gray-700">
        <DialogHeader>
          <DialogTitle className="text-white">Upload Creative Brief</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="briefText" className="text-gray-300">Brief Description</Label>
            <Textarea
              id="briefText"
              placeholder="Enter the creative brief description..."
              value={briefText}
              onChange={(e) => setBriefText(e.target.value)}
              className="min-h-[100px] bg-gray-800 border-gray-600 text-white placeholder:text-gray-400"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="briefFile" className="text-gray-300">Upload Brief File (Optional)</Label>
            <div className="flex items-center space-x-2">
              <Input
                id="briefFile"
                type="file"
                accept=".pdf,.doc,.docx,.txt"
                onChange={handleFileChange}
                className="bg-gray-800 border-gray-600 text-white file:bg-gray-700 file:text-white file:border-gray-600"
              />
              <Upload className="h-4 w-4 text-gray-400" />
            </div>
            {briefFile && (
              <p className="text-sm text-gray-400">Selected: {briefFile.name}</p>
            )}
          </div>
          
          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)} className="border-gray-600 text-gray-300">
              Cancel
            </Button>
            <Button type="submit">Upload Brief</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
