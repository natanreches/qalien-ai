import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { UserPlus, Mail, X, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Collaborator {
  id: string;
  email: string;
  role: string;
}

interface OnboardingInviteCollaboratorsProps {
  collaborators: Collaborator[];
  onCollaboratorsUpdated: (collaborators: Collaborator[]) => void;
}

export const OnboardingInviteCollaborators = ({
  collaborators,
  onCollaboratorsUpdated
}: OnboardingInviteCollaboratorsProps) => {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('Editor');
  const { toast } = useToast();

  const handleAddCollaborator = () => {
    if (!email.trim()) {
      toast({
        title: "Email required",
        description: "Please enter a valid email address.",
        variant: "destructive"
      });
      return;
    }

    // Check if email already exists
    if (collaborators.some(c => c.email === email)) {
      toast({
        title: "Already invited",
        description: "This email has already been invited.",
        variant: "destructive"
      });
      return;
    }

    const newCollaborator: Collaborator = {
      id: Date.now().toString(),
      email: email.trim(),
      role
    };

    const updatedCollaborators = [...collaborators, newCollaborator];
    onCollaboratorsUpdated(updatedCollaborators);
    setEmail('');

    // Position toast at top to avoid blocking navigation buttons
    toast({
      title: "Collaborator added",
      description: `${email} will be invited as ${role}`,
      className: "top-4 right-4 fixed"
    });
  };

  const handleRemoveCollaborator = (id: string) => {
    const updatedCollaborators = collaborators.filter(c => c.id !== id);
    onCollaboratorsUpdated(updatedCollaborators);
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">Invite Your Team</h2>
        <p className="text-gray-400">
          Invite collaborators from your organization to work together on your brand assets.
        </p>
      </div>

      {/* Add Collaborator Form */}
      <Card className="p-6 bg-gray-700 border-gray-600">
        <div className="space-y-4">
          <div className="flex space-x-4">
            <div className="flex-1 space-y-2">
              <Label htmlFor="collaborator-email" className="text-gray-200">Email Address</Label>
              <Input
                id="collaborator-email"
                type="email"
                placeholder="colleague@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-800 border-gray-600 text-white"
                onKeyPress={(e) => e.key === 'Enter' && handleAddCollaborator()}
              />
            </div>
            <div className="w-32 space-y-2">
              <Label htmlFor="role" className="text-gray-200">Role</Label>
              <select
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full h-10 px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white text-sm"
              >
                <option value="Editor">Editor</option>
                <option value="Viewer">Viewer</option>
                <option value="Admin">Admin</option>
              </select>
            </div>
          </div>
          <Button onClick={handleAddCollaborator} className="w-full">
            <UserPlus className="h-4 w-4 mr-2" />
            Add Collaborator
          </Button>
        </div>
      </Card>

      {/* Collaborators List */}
      {collaborators.length > 0 && (
        <div className="space-y-3">
          <h4 className="font-medium text-white flex items-center">
            <Users className="h-5 w-5 mr-2" />
            Team Members ({collaborators.length})
          </h4>
          <div className="space-y-2">
            {collaborators.map((collaborator) => (
              <div key={collaborator.id} className="flex items-center justify-between p-4 border rounded-lg bg-gray-700 border-gray-600">
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-blue-400" />
                  <div>
                    <p className="font-medium text-white">{collaborator.email}</p>
                    <Badge variant="secondary" className="text-xs">
                      {collaborator.role}
                    </Badge>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleRemoveCollaborator(collaborator.id)}
                  className="text-red-400 hover:text-red-300 border-gray-600"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      {collaborators.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <Users className="h-12 w-12 mx-auto mb-3 text-gray-600" />
          <p>No collaborators added yet</p>
        </div>
      )}
    </div>
  );
};
