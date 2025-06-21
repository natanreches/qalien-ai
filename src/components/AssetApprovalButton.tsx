
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { CheckCircle, AlertTriangle } from 'lucide-react';

interface AssetApprovalButtonProps {
  asset: {
    id: string;
    name: string;
    compliance: number;
    status: string;
  };
  onApprove: (assetId: string) => void;
  variant?: 'default' | 'small';
}

export const AssetApprovalButton = ({ asset, onApprove, variant = 'default' }: AssetApprovalButtonProps) => {
  const [isApproved, setIsApproved] = useState(asset.status === 'approved');
  
  const isHighCompliance = asset.compliance >= 90;
  const buttonText = isApproved ? 'Approved' : (isHighCompliance ? 'Approve' : 'Approve Anyway');
  const icon = isHighCompliance ? CheckCircle : AlertTriangle;
  const Icon = icon;

  const handleApprove = () => {
    setIsApproved(true);
    onApprove(asset.id);
  };

  if (isApproved) {
    return (
      <Button 
        disabled
        variant="outline"
        size={variant === 'small' ? 'sm' : 'default'}
        className="bg-green-50 border-green-200 text-green-700 cursor-not-allowed"
      >
        <CheckCircle className="h-4 w-4 mr-1" />
        Approved
      </Button>
    );
  }

  if (isHighCompliance) {
    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button 
            variant="default"
            size={variant === 'small' ? 'sm' : 'default'}
            className="bg-green-600 hover:bg-green-700"
          >
            <Icon className="h-4 w-4 mr-1" />
            {buttonText}
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Approve Asset</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to approve "{asset.name}"? This asset has a compliance score of {asset.compliance}% and meets the required standards.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleApprove} className="bg-green-600 hover:bg-green-700">
              Approve
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button 
          variant="outline"
          size={variant === 'small' ? 'sm' : 'default'}
          className="border-orange-300 text-orange-700 hover:bg-orange-50"
        >
          <Icon className="h-4 w-4 mr-1" />
          {buttonText}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Approve Asset Anyway</AlertDialogTitle>
          <AlertDialogDescription>
            This asset "{asset.name}" has a compliance score of {asset.compliance}%, which is below the recommended 90% threshold. 
            Are you sure you want to approve it anyway?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleApprove} className="bg-orange-600 hover:bg-orange-700">
            Approve Anyway
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
