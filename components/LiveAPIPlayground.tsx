'use client';

import { useState } from 'react';
import { QortrolaAPI } from '@/lib/qortrola-api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { HolographicCard } from '@/components/ui/holographic-card';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  Bot, 
  Heart, 
  DollarSign, 
  Users, 
  Gamepad2,
  Activity,
  Hardware
} from 'lucide-react';

export function LiveAPIPlayground() {
  const [apiKey, setApiKey] = useState('');
  const [playerId, setPlayerId] = useState('');
  const [loading, setLoading] = useState<string | null>(null);
  const [responses, setResponses] = useState<Record<string, any>>({});
  const { toast } = useToast();

  const api = QortrolaAPI.getInstance();

  const executeRequest = async (requestType: string, requestFn: () => Promise<any>) => {
    if (!apiKey) {
      toast({
        variant: "destructive",
        title: "API Key Required",
        description: "Please enter your API key first.",
      });
      return;
    }

    setLoading(requestType);
    api.setApiKey(apiKey);

    try {
      const response = await requestFn();
      setResponses(prev => ({ ...prev, [requestType]: response }));
      
      toast({
        title: "Request Successful",
        description: `${requestType} completed successfully!`,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Request Failed",
        description: error instanceof Error ? error.message : "Request failed",
      });
    } finally {
      setLoading(null);
    }
  };

  const createPlayer = () => executeRequest('createPlayer', async () => {
    const response = await api.createPlayer({
      platform: 'web_demo',
      device_info: navigator.userAgent,
      user_agent: navigator.userAgent,
    });
    setPlayerId(response.player_id);
    return response;
  });

  const trackEvent = () => executeRequest('trackEvent', async () => {
    if (!playerId) throw new Error('Create a player first');
    return api.trackEvent({
      session_id: responses.createPlayer?.session_id || 'demo_session',
      event_type: 'achievement',
      data: { achievement_name: 'Demo Achievement', points: 100 }
    });
  });

  const requestCoaching = () => executeRequest('coaching', async () => {
    if (!playerId) throw new Error('Create a player first');
    return api.requestCoaching(playerId, {
      current_level: 5,
      recent_deaths: 3,
      playtime_minutes: 45
    });
  });

  const requestWellness = () => executeRequest('wellness', async () => {
    if (!playerId) throw new Error('Create a player first');
    return api.requestWellnessCheck(playerId, {
      session_time: 120,
      daily_playtime: 180,
      sleep_quality: 'fair',
      stress_indicators: ['eye_strain', 'fatigue']
    });
  });

  const requestMonetization = () => executeRequest('monetization', async () => {
    if (!playerId) throw new Error('Create a player first');
    return api.requestMonetizationAdvice(playerId, {
      current_spend: 15.99,
      last_purchase: '7 days ago',
      engagement_level: 'high'
    });
  });

  const requestSocial = () => executeRequest('social', async () => {
    if (!playerId) throw new Error('Create a player first');
    return api.requestSocialOptimization(playerId, {
      friend_count: 8,
      guild_activity: 'moderate',
      communication_style: 'friendly'
    });
  });

  const requestPerformanceOpt = () => executeRequest('performanceOpt', async () => {
    if (!playerId) throw new Error('Create a player first');
    return api.requestPerformanceOptimization(playerId, {
      device_info: 'RTX 4080, Intel i7-12700K, 32GB RAM',
      current_game: 'Cyberpunk 2077',
      current_fps: 45,
      target_resolution: '1440p'
    });
  });

  const requestHardware = () => executeRequest('hardware', async () => {
    if (!playerId) throw new Error('Create a player first');
    return api.requestHardwareConsultation(playerId, {
      current_hardware: {
        gpu: 'GTX 1060',
        cpu: 'Intel i5-8400',
        ram: '16GB'
      },
      budget: 1500
    });
  });

  const ResponseDisplay = ({ response, title }: { response: any; title: string }) => (
    <div className="mt-4 p-4 bg-muted/20 rounded-lg">
      <h4 className="font-semibold text-primary mb-2">{title} Response:</h4>
      <pre className="text-xs overflow-auto max-h-40 bg-muted/50 p-2 rounded">
        {JSON.stringify(response, null, 2)}
      </pre>
    </div>
  );

  return (
    <div className="space-y-6">
      <HolographicCard>
        <h2 className="text-3xl font-bold text-center uppercase tracking-wide mb-6">
          🎮 Live API Playground
        </h2>
        
        <div className="space-y-4 mb-6">
          <div>
            <Label htmlFor="apiKey">API Key</Label>
            <Input
              id="apiKey"
              type="password"
              placeholder="Enter your API key (qor_...)"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="mt-1 font-mono"
            />
          </div>
          
          {playerId && (
            <div>
              <Label>Current Player ID</Label>
              <p className="text-sm text-primary font-mono">{playerId}</p>
            </div>
          )}
        </div>

        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="basic">Basic</TabsTrigger>
            <TabsTrigger value="ai-agents">AI Agents</TabsTrigger>
            <TabsTrigger value="enterprise">Enterprise</TabsTrigger>
            <TabsTrigger value="surveys">Surveys</TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button
                onClick={createPlayer}
                disabled={loading === 'createPlayer'}
                className="h-20 flex flex-col items-center gap-2"
              >
                <Gamepad2 className="w-6 h-6" />
                {loading === 'createPlayer' ? 'Creating...' : 'Create Player'}
              </Button>

              <Button
                onClick={trackEvent}
                disabled={loading === 'trackEvent' || !playerId}
                className="h-20 flex flex-col items-center gap-2"
                variant="outline"
              >
                <Activity className="w-6 h-6" />
                {loading === 'trackEvent' ? 'Tracking...' : 'Track Event'}
              </Button>
            </div>

            {responses.createPlayer && (
              <ResponseDisplay response={responses.createPlayer} title="Create Player" />
            )}
            {responses.trackEvent && (
              <ResponseDisplay response={responses.trackEvent} title="Track Event" />
            )}
          </TabsContent>

          <TabsContent value="ai-agents" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button
                onClick={requestCoaching}
                disabled={loading === 'coaching' || !playerId}
                className="h-20 flex flex-col items-center gap-2"
              >
                <Bot className="w-6 h-6" />
                <div className="text-center">
                  <div>AI Coach</div>
                  <Badge variant="secondary" className="text-xs">$0.25</Badge>
                </div>
              </Button>

              <Button
                onClick={requestWellness}
                disabled={loading === 'wellness' || !playerId}
                className="h-20 flex flex-col items-center gap-2"
                variant="outline"
              >
                <Heart className="w-6 h-6" />
                <div className="text-center">
                  <div>Wellness AI</div>
                  <Badge variant="secondary" className="text-xs">$5.00</Badge>
                </div>
              </Button>

              <Button
                onClick={requestMonetization}
                disabled={loading === 'monetization' || !playerId}
                className="h-20 flex flex-col items-center gap-2"
              >
                <DollarSign className="w-6 h-6" />
                <div className="text-center">
                  <div>Monetization</div>
                  <Badge variant="secondary" className="text-xs">$0.15</Badge>
                </div>
              </Button>

              <Button
                onClick={requestSocial}
                disabled={loading === 'social' || !playerId}
                className="h-20 flex flex-col items-center gap-2"
                variant="outline"
              >
                <Users className="w-6 h-6" />
                <div className="text-center">
                  <div>Social AI</div>
                  <Badge variant="secondary" className="text-xs">$0.10</Badge>
                </div>
              </Button>
            </div>

            {responses.coaching && (
              <ResponseDisplay response={responses.coaching} title="AI Coaching" />
            )}
            {responses.wellness && (
              <ResponseDisplay response={responses.wellness} title="Wellness AI" />
            )}
            {responses.monetization && (
              <ResponseDisplay response={responses.monetization} title="Monetization AI" />
            )}
            {responses.social && (
              <ResponseDisplay response={responses.social} title="Social AI" />
            )}
          </TabsContent>

          <TabsContent value="enterprise" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button
                onClick={requestPerformanceOpt}
                disabled={loading === 'performanceOpt' || !playerId}
                className="h-20 flex flex-col items-center gap-2"
              >
                <Activity className="w-6 h-6" />
                <div className="text-center">
                  <div>Performance Optimizer</div>
                  <Badge variant="secondary" className="text-xs">$15.00</Badge>
                </div>
              </Button>

              <Button
                onClick={requestHardware}
                disabled={loading === 'hardware' || !playerId}
                className="h-20 flex flex-col items-center gap-2"
                variant="outline"
              >
                <Hardware className="w-6 h-6" />
                <div className="text-center">
                  <div>Hardware Consultant</div>
                  <Badge variant="secondary" className="text-xs">$25.00</Badge>
                </div>
              </Button>
            </div>

            {responses.performanceOpt && (
              <ResponseDisplay response={responses.performanceOpt} title="Performance Optimization" />
            )}
            {responses.hardware && (
              <ResponseDisplay response={responses.hardware} title="Hardware Consultation" />
            )}
          </TabsContent>

          <TabsContent value="surveys" className="space-y-4">
            <div className="text-center p-8 bg-muted/20 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Survey System</h3>
              <p className="text-muted-foreground mb-4">
                Surveys are automatically generated when you track events! 
                Try tracking an achievement event to see the survey system in action.
              </p>
              <Badge className="text-sm">Auto-Generated: $2.50-$4.00 per response</Badge>
            </div>
          </TabsContent>
        </Tabs>
      </HolographicCard>
    </div>
  );
}
