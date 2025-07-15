// lib/qortrola-api.ts
export class QortrolaAPI {
  private static instance: QortrolaAPI;
  private baseURL: string;
  private apiKey: string | null = null;

  private constructor() {
    // Use your Railway backend URL
    this.baseURL = 'https://qortrola-api-production.up.railway.app/api/v1';
  }

  public static getInstance(): QortrolaAPI {
    if (!QortrolaAPI.instance) {
      QortrolaAPI.instance = new QortrolaAPI();
    }
    return QortrolaAPI.instance;
  }

  public setApiKey(apiKey: string): void {
    this.apiKey = apiKey;
  }

  private async request(endpoint: string, options: RequestInit = {}): Promise<any> {
    const url = `${this.baseURL}${endpoint}`;
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ detail: 'Unknown error' }));
      throw new Error(error.detail || 'API request failed');
    }

    return response.json();
  }

  // Developer Registration
  async registerDeveloper(data: {
    developer_name: string;
    email: string;
    plan: 'starter' | 'professional' | 'enterprise';
  }) {
    return this.request('/developers/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Player Management
  async createPlayer(data: {
    platform: string;
    device_info?: string;
    user_agent?: string;
  }) {
    if (!this.apiKey) throw new Error('API key required');
    
    return this.request(`/players?api_key=${this.apiKey}`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Event Tracking
  async trackEvent(data: {
    session_id: string;
    event_type: string;
    data?: any;
  }) {
    if (!this.apiKey) throw new Error('API key required');
    
    return this.request(`/events?api_key=${this.apiKey}`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // AI Agents
  async requestCoaching(playerId: string, context: any) {
    if (!this.apiKey) throw new Error('API key required');
    
    return this.request(`/ai-agents/coach?api_key=${this.apiKey}&player_id=${playerId}`, {
      method: 'POST',
      body: JSON.stringify({ context }),
    });
  }

  async requestWellnessCheck(playerId: string, context: any) {
    if (!this.apiKey) throw new Error('API key required');
    
    return this.request(`/ai-agents/wellness-enhanced?api_key=${this.apiKey}&player_id=${playerId}`, {
      method: 'POST',
      body: JSON.stringify({ context }),
    });
  }

  async requestMonetizationAdvice(playerId: string, context: any) {
    if (!this.apiKey) throw new Error('API key required');
    
    return this.request(`/ai-agents/monetization?api_key=${this.apiKey}&player_id=${playerId}`, {
      method: 'POST',
      body: JSON.stringify({ context }),
    });
  }

  async requestSocialOptimization(playerId: string, context: any) {
    if (!this.apiKey) throw new Error('API key required');
    
    return this.request(`/ai-agents/social?api_key=${this.apiKey}&player_id=${playerId}`, {
      method: 'POST',
      body: JSON.stringify({ context }),
    });
  }

  // Performance Optimization (Enterprise)
  async requestPerformanceOptimization(playerId: string, data: {
    device_info: string;
    current_game: string;
    current_fps: number;
    target_resolution: string;
  }) {
    if (!this.apiKey) throw new Error('API key required');
    
    return this.request(`/ai-agents/performance-optimizer-real?api_key=${this.apiKey}&player_id=${playerId}`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async requestHardwareConsultation(playerId: string, data: {
    current_hardware: any;
    budget: number;
  }) {
    if (!this.apiKey) throw new Error('API key required');
    
    return this.request(`/ai-agents/hardware-consultant-real?api_key=${this.apiKey}&player_id=${playerId}`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Survey Management
  async getMySurveys() {
    if (!this.apiKey) throw new Error('API key required');
    
    return this.request(`/surveys/mine?api_key=${this.apiKey}`);
  }

  async createSurvey(data: {
    survey_type: string;
    target_audience: string;
    player_id: string;
  }) {
    if (!this.apiKey) throw new Error('API key required');
    
    const params = new URLSearchParams({
      api_key: this.apiKey,
      survey_type: data.survey_type,
      target_audience: data.target_audience,
      player_id: data.player_id,
    });
    
    return this.request(`/surveys/create?${params}`, {
      method: 'POST',
    });
  }

  async submitSurveyResponse(surveyId: string, playerId: string, data: {
    responses: any;
    player_feedback?: string;
  }) {
    const params = new URLSearchParams({
      survey_id: surveyId,
      player_id: playerId,
    });
    
    return this.request(`/surveys/respond?${params}`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Gamer Services
  async registerGamer(data: {
    email: string;
    username: string;
    plan: 'gamer_basic' | 'gamer_pro' | 'gamer_elite';
  }) {
    return this.request('/gamer/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async gamerOptimize(accessToken: string, data: {
    device_info: string;
    current_game: string;
    current_fps: number;
    target_resolution: string;
  }) {
    return this.request(`/gamer/optimize?access_token=${accessToken}`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async gamerCoaching(accessToken: string, context: any) {
    return this.request(`/gamer/service/coach?access_token=${accessToken}`, {
      method: 'POST',
      body: JSON.stringify({ context }),
    });
  }

  async gamerWellness(accessToken: string, context: any) {
    return this.request(`/gamer/service/wellness?access_token=${accessToken}`, {
      method: 'POST',
      body: JSON.stringify({ context }),
    });
  }

  async gamerHardware(accessToken: string, data: {
    current_hardware: any;
    budget: number;
  }) {
    return this.request(`/gamer/service/hardware?access_token=${accessToken}`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // System endpoints
  async healthCheck() {
    return this.request('/health');
  }

  async getIntegrationStatus() {
    return this.request('/integration/status');
  }

  async downloadSDK(platform: string) {
    return this.request(`/download/sdk/${platform}`);
  }
}
