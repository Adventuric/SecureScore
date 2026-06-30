export interface BreachSource {
  name: string;
  date: string;
}

export interface BreachResult {
  name: string;
  domain?: string;
  date: string;
  description?: string;
  dataClasses: string[];
  severity: 'low' | 'medium' | 'high' | 'critical';
}

export interface LeakCheckResponse {
  success: boolean;
  found: number;
  fields: string[];
  sources: BreachSource[];
}

export interface ScanResult {
  email: string;
  username?: string;
  breaches: BreachResult[];
  usernameExposures: UsernameExposure[];
  score: number;
  rating: Rating;
  riskLevel: RiskLevel;
  recommendations: Recommendation[];
  lastExposureDate: string | null;
  uniqueDataTypes: string[];
}

export interface UsernameExposure {
  platform: string;
  date: string;
}

export type Rating = 'Excellent' | 'Good' | 'Fair' | 'Poor' | 'Critical';
export type RiskLevel = 'Low Risk' | 'Moderate Risk' | 'High Risk';

export interface Recommendation {
  id: string;
  icon: string;
  title: string;
  description: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
  estimatedTime: string;
}

export interface SecurityHealthCategory {
  name: string;
  score: number;
  color: string;
}

export interface DataTypeStatus {
  name: string;
  exposed: boolean;
  icon: string;
}

export interface SecurityTip {
  text: string;
  icon: string;
}
