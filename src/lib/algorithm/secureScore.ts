import type { BreachResult, Rating, RiskLevel, UsernameExposure } from '@/types';
import { SCORE_THRESHOLDS, RISK_THRESHOLDS, PENALTIES } from '@/lib/constants';

export function calculateScore(breaches: BreachResult[], usernameExposures: UsernameExposure[]): number {
  let score = 100;

  for (const breach of breaches) {
    score -= PENALTIES.PER_BREACH;

    const dataClasses = breach.dataClasses.map((dc) => dc.toLowerCase());
    if (dataClasses.includes('password')) score -= PENALTIES.PASSWORD_LEAKED;
    if (dataClasses.some((dc) => ['phone', 'phone number'].includes(dc))) score -= PENALTIES.PHONE_LEAKED;
    if (dataClasses.some((dc) => ['address', 'physical address'].includes(dc))) score -= PENALTIES.ADDRESS_LEAKED;
    if (dataClasses.some((dc) => ['ssn', 'social security number', 'national id', 'passport', 'government id'].includes(dc))) {
      score -= PENALTIES.SSN_LEAKED;
    }
  }

  if (usernameExposures.length >= 2) {
    score -= PENALTIES.USERNAME_MULTIPLE;
  }

  return Math.max(0, Math.min(100, Math.round(score)));
}

export function getRating(score: number): Rating {
  if (score >= SCORE_THRESHOLDS.EXCELLENT) return 'Excellent';
  if (score >= SCORE_THRESHOLDS.GOOD) return 'Good';
  if (score >= SCORE_THRESHOLDS.FAIR) return 'Fair';
  if (score >= SCORE_THRESHOLDS.POOR) return 'Poor';
  return 'Critical';
}

export function getRiskLevel(score: number): RiskLevel {
  if (score >= RISK_THRESHOLDS.LOW) return 'Low Risk';
  if (score >= RISK_THRESHOLDS.MODERATE) return 'Moderate Risk';
  return 'High Risk';
}

export function getLastExposureDate(breaches: BreachResult[]): string | null {
  if (breaches.length === 0) return null;
  const dates = breaches
    .filter((b) => b.date && b.date !== 'Unknown')
    .map((b) => new Date(b.date))
    .filter((d) => !isNaN(d.getTime()));
  if (dates.length === 0) return null;
  dates.sort((a, b) => b.getTime() - a.getTime());
  return dates[0].toISOString();
}

export function getUniqueDataTypes(breaches: BreachResult[]): string[] {
  const types = new Set<string>();
  for (const breach of breaches) {
    for (const dc of breach.dataClasses) {
      types.add(dc.toLowerCase());
    }
  }
  return Array.from(types).sort();
}
