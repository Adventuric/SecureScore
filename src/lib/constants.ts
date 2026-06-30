export const SCORE_THRESHOLDS = {
  EXCELLENT: 90,
  GOOD: 75,
  FAIR: 50,
  POOR: 25,
} as const;

export const RISK_THRESHOLDS = {
  LOW: 70,
  MODERATE: 40,
} as const;

export const PENALTIES = {
  PER_BREACH: 5,
  PASSWORD_LEAKED: 15,
  PHONE_LEAKED: 10,
  ADDRESS_LEAKED: 8,
  SSN_LEAKED: 12,
  USERNAME_MULTIPLE: 5,
} as const;

export const RATING_LABELS = {
  EXCELLENT: 'Excellent',
  GOOD: 'Good',
  FAIR: 'Fair',
  POOR: 'Poor',
  CRITICAL: 'Critical',
} as const;

export const SEVERITY_COLORS: Record<string, string> = {
  low: 'bg-slate-500/20 text-slate-300 border-slate-500/30',
  medium: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
  high: 'bg-orange-500/20 text-orange-300 border-orange-500/30',
  critical: 'bg-red-500/20 text-red-300 border-red-500/30',
};

export const LOADING_MESSAGES = [
  'Scanning breach databases...',
  'Checking identity exposure...',
  'Analyzing digital footprint...',
  'Calculating SecureScore...',
];

export const DATA_TYPE_ICONS: Record<string, string> = {
  password: 'Lock',
  email: 'Mail',
  phone: 'Phone',
  address: 'MapPin',
  username: 'User',
  ip: 'Globe',
  ssn: 'FileBadge',
  'national id': 'FileBadge',
  'credit card': 'CreditCard',
  dob: 'Calendar',
  name: 'UserCircle',
};

export const SEARCH_MESSAGES_BY_STEP = [
  { text: 'Connecting to breach intelligence databases...', duration: 800 },
  { text: 'Scanning breach databases...', duration: 1200 },
  { text: 'Cross-referencing email against known leaks...', duration: 1000 },
  { text: 'Checking identity exposure...', duration: 1100 },
  { text: 'Analyzing compromised data types...', duration: 900 },
  { text: 'Analyzing digital footprint...', duration: 1000 },
  { text: 'Calculating SecureScore...', duration: 1200 },
];
