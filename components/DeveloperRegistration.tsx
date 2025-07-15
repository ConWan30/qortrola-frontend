'use client';

import { useState } from 'react';
import { QortrolaAPI } from '@/lib/qortrola-api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { HolographicCard } from '@/components/ui/holographic-card';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Copy, Check } from 'lucide-react';

interface ApiResponse {
  success: boolean;
  developer_id: string;
  api_key: string;
  plan: string;
  message: string;
  features_enabled: string[];
}

export function DeveloperRegistration() {
  const [formData, setFormData] = useState({
    developer_name: '',
    email: '',
    plan: 'starter' as 'starter' | 'professional' | 'enterprise',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [apiResponse, setApiResponse] = useState<ApiResponse | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const { toast } = useToast();

  const api = QortrolaAPI.getInstance();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await api.registerDeveloper(formData);
      setApiResponse(response);
      setShowModal(true);
      
      toast({
        title: "Registration Successful!",
        description: "Your API key has been generated successfully.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Registration Failed",
        description: error instanceof Error ? error.message : "Failed to register. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async () => {
    if (apiResponse?.api_key) {
      await navigator.clipboard.writeText(apiResponse.api_key);
      setIsCopied(true);
      toast({ title: "API Key Copied!" });
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  return (
    <>
      <HolographicCard className="max-w-2xl mx-auto">
        <h2 className="text-4xl font-bold text-center uppercase tracking-wide mb-8">
          Register for API Access
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="developer_name">Developer/Studio Name</Label>
            <Input
              id="developer_name"
              value={formData.developer_name}
              onChange={(e) => setFormData(prev => ({ ...prev, developer_name: e.target.value }))}
              className="mt-2"
              required
            />
          </div>

          <div>
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              className="mt-2"
              required
            />
          </div>

          <div>
            <Label htmlFor="plan">Choose Your Plan</Label>
            <Select
              value={formData.plan}
              onValueChange={(value: 'starter' | 'professional' | 'enterprise') =>
                setFormData(prev => ({ ...prev, plan: value }))
              }
            >
              <SelectTrigger className="mt-2">
                <SelectValue placeholder="Select a plan" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="starter">Starter ($750/month)</SelectItem>
                <SelectItem value="professional">Professional ($1,500/month)</SelectItem>
                <SelectItem value="enterprise">Enterprise ($7,500/month)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Generating API Key..." : "Generate API Key"}
          </Button>
        </form>
      </HolographicCard>

      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="holographic-border bg-card/80 backdrop-blur-sm">
          <DialogHeader>
            <DialogTitle className="font-heading text-4xl text-primary uppercase tracking-wide">
              Registration Successful!
            </DialogTitle>
            <DialogDescription>
              Your API key is ready. Store it securely, as it will not be shown again.
            </DialogDescription>
          </DialogHeader>
          
          {apiResponse && (
            <div className="space-y-4">
              <div>
                <Label>Developer ID</Label>
                <p className="text-sm text-muted-foreground">{apiResponse.developer_id}</p>
              </div>
              
              <div>
                <Label>Your API Key</Label>
                <div className="flex items-center space-x-2 mt-1">
                  <Input
                    readOnly
                    value={apiResponse.api_key}
                    className="font-mono"
                  />
                  <Button variant="ghost" size="icon" onClick={handleCopy}>
                    {isCopied ? <Check className="text-green-400" /> : <Copy />}
                  </Button>
                </div>
              </div>
              
              <div>
                <Label>Plan</Label>
                <p className="text-sm text-muted-foreground capitalize">{apiResponse.plan}</p>
              </div>
              
              <div>
                <Label>Features Enabled</Label>
                <div className="flex flex-wrap gap-2 mt-1">
                  {apiResponse.features_enabled.map((feature, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-primary/10 text-primary rounded-md text-xs"
                    >
                      {feature.replace('_', ' ')}
                    </span>
                  ))}
                </div>
              </div>
              
              <Button className="w-full" onClick={() => setShowModal(false)}>
                Got it, thanks!
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
