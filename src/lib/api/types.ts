export interface BreachCheckRequest {
  email: string;
  username?: string;
}

export interface BreachCheckResponse {
  email: string;
  username?: string;
  breaches: import('@/types').BreachResult[];
  usernameExposures: import('@/types').UsernameExposure[];
  score: number;
  rating: import('@/types').Rating;
  riskLevel: import('@/types').RiskLevel;
  recommendations: import('@/types').Recommendation[];
  lastExposureDate: string | null;
  uniqueDataTypes: string[];
}
