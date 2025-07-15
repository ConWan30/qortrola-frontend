'use client';

import { useState, useEffect } from 'react';
import { QortrolaAPI } from '@/lib/qortrola-api';
import { HolographicCard } from '@/components/ui/holographic-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { 
  Users, 
  DollarSign, 
  ClipboardList, 
  Bot, 
  TrendingUp,
  Activity,
  Heart,
  Zap
} from 'lucide-react';

interface AnalyticsData {
  totalRevenue: number;
  surveysGenerated: number;
  aiSessions: number;
  activeDevelopers: number;
  apiCallsToday: number;
  surveysCompletedToday: number;
}

const StatCard = ({ 
  icon: Icon, 
  title, 
  value, 
  change, 
  color = "primary" 
}: {
  icon: any;
  title: string;
  value: string | number;
  change: string;
  color?: string;
}) => (
  <HolographicCard className="hover:shadow-neon-primary transition-shadow duration-300">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        <h3 className="text-3xl font-bold font-heading mt-2">{value}</h3>
        <p className={`text-sm mt-1 ${color === "primary" ? "text-primary" : "text-secondary"}`}>
          {change}
        </p>
      </div>
      <Icon className={`w-8 h-8 ${color === "primary" ? "text-primary" : "text-secondary"}`} />
    </div>
  </HolographicCard>
);

export function AnalyticsDashboard() {
  const [apiKey, setApiKey] = useState('');
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [surveys, setSurveys] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const api = QortrolaAPI.getInstance();

  const loadAnalytics = async () => {
    if (!apiKey) {
      toast({
        variant: "destructive",
        title: "API Key Required",
        description: "Please enter your API key to view analytics.",
      });
      return;
    }

    setLoading(true);
    api.setApiKey(apiKey);

    try {
      // Load surveys data
      const surveysResponse = await api.getMySurveys();
      setSurveys(surveysResponse.surveys || []);

      // Simulate analytics data (in real implementation, this would come from your backend)
      const mockAnalytics: AnalyticsData = {
        totalRevenue: surveysResponse.total_revenue || 0,
        surveysGenerated: surveysResponse.total_surveys || 0,
        aiSessions: Math.floor(Math.random() * 1000) + 500,
        activeDevelopers: Math.floor(Math.random() * 50) + 10,
        apiCallsToday: Math.floor(Math.random() * 10000) + 5000,
        surveysCompletedToday: Math.floor(Math.random() * 100) + 50,
      };
      
      setAnalyticsData(mockAnalytics);

      toast({
        title: "Analytics Loaded",
        description: "Dashboard updated with latest data.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to Load Analytics",
        description: error instanceof Error ? error.message : "Unknown error occurred",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <HolographicCard>
        <h2 className="text-3xl font-bold text-center uppercase tracking-wide mb-6">
          📊 Analytics Dashboard
        </h2>
        
        <div className="space-y-4 mb-6">
          <div>
            <Label htmlFor="apiKey">API Key</Label>
            <div className="flex gap-2 mt-1">
              <Input
                id="apiKey"
                type="password"
                placeholder="Enter your API key"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="font-mono"
              />
              <Button onClick={loadAnalytics} disabled={loading}>
                {loading ? 'Loading...' : 'Load Analytics'}
              </Button>
            </div>
          </div>
        </div>

        {analyticsData && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <StatCard
                icon={DollarSign}
                title="Total Revenue"
                value={`$${analyticsData.totalRevenue.toFixed(2)}`}
                change="+$280 today"
                color="primary"
              />
              <StatCard
                icon={ClipboardList}
                title="Surveys Generated"
                value={analyticsData.surveysGenerated}
                change="+12 today"
                color="secondary"
              />
              <StatCard
                icon={Bot}
                title="AI Sessions"
                value={analyticsData.aiSessions}
                change="+45 today"
                color="primary"
              />
              <StatCard
                icon={Users}
                title="API Calls Today"
                value={analyticsData.apiCallsToday.toLocaleString()}
                change="+2.3k today"
                color="secondary"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <HolographicCard>
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Revenue Breakdown
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">API Calls</span>
                    <span className="font-mono">$124.50</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">AI Coaching</span>
                    <span className="font-mono">$89.25</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Wellness AI</span>
                    <span className="font-mono">$245.00</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Surveys</span>
                    <span className="font-mono">$567.75</span>
                  </div>
                  <hr className="border-border" />
                  <div className="flex justify-between items-center font-bold">
                    <span>Total</span>
                    <span className="font-mono text-primary">${analyticsData.totalRevenue.toFixed(2)}</span>
                  </div>
                </div>
              </HolographicCard>

              <HolographicCard>
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Activity className="w-5 h-5" />
                  Recent Surveys
                </h3>
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {surveys.length > 0 ? (
                    surveys.slice(0, 5).map((survey, index) => (
                      <div key={index} className="flex justify-between items-center p-3 bg-muted/20 rounded">
                        <div>
                          <p className="font-medium capitalize">{survey.survey_type}</p>
                          <p className="text-xs text-muted-foreground">
                            {survey.target_audience}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-mono text-sm">${survey.value_per_response}</p>
                          <p className="text-xs text-muted-foreground">
                            {survey.responses} responses
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-muted-foreground text-center py-4">
                      No surveys found. Start tracking events to generate surveys!
                    </p>
                  )}
                </div>
              </HolographicCard>
            </div>
          </>
        )}
      </HolographicCard>
    </div>
  );
}
