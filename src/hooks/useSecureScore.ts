'use client';

import { useMemo } from 'react';
import type { BreachResult, SecurityHealthCategory, DataTypeStatus, UsernameExposure } from '@/types';
import { calculateScore, getRating, getRiskLevel, getLastExposureDate, getUniqueDataTypes } from '@/lib/algorithm/secureScore';

export function useSecureScore(breaches: BreachResult[], usernameExposures: UsernameExposure[]) {
  return useMemo(() => {
    const score = calculateScore(breaches, usernameExposures);
    const rating = getRating(score);
    const riskLevel = getRiskLevel(score);
    const lastExposureDate = getLastExposureDate(breaches);
    const uniqueDataTypes = getUniqueDataTypes(breaches);

    const allDataClasses = breaches.flatMap((b) => b.dataClasses.map((dc) => dc.toLowerCase()));
    const hasPassword = allDataClasses.includes('password');
    const hasSsn = allDataClasses.some((dc) => ['ssn', 'social security number', 'national id', 'passport'].includes(dc));

    const healthCategories: SecurityHealthCategory[] = [
      {
        name: 'Password Safety',
        score: hasPassword ? Math.max(0, score - 20) : Math.min(100, score + 10),
        color: hasPassword ? '#f97316' : '#22c55e',
      },
      {
        name: 'Exposure Risk',
        score: Math.max(0, 100 - breaches.length * 12),
        color: breaches.length > 3 ? '#ef4444' : breaches.length > 0 ? '#eab308' : '#22c55e',
      },
      {
        name: 'Identity Risk',
        score: hasSsn ? 25 : breaches.length > 0 ? 60 : 95,
        color: hasSsn ? '#ef4444' : '#3b82f6',
      },
      {
        name: 'Email Hygiene',
        score: Math.max(0, 100 - breaches.length * 8),
        color: breaches.length > 5 ? '#ef4444' : breaches.length > 0 ? '#eab308' : '#22c55e',
      },
      {
        name: 'Account Safety',
        score: Math.max(0, 100 - (breaches.length * 6 + usernameExposures.length * 10)),
        color: riskLevel === 'Low Risk' ? '#22c55e' : riskLevel === 'Moderate Risk' ? '#eab308' : '#ef4444',
      },
    ];

    const dataTypes: DataTypeStatus[] = [
      { name: 'Passwords', exposed: hasPassword, icon: 'Lock' },
      { name: 'Email', exposed: !hasPassword, icon: 'Mail' },
      { name: 'Phone Numbers', exposed: allDataClasses.some((dc) => ['phone', 'phone number'].includes(dc)), icon: 'Phone' },
      { name: 'Addresses', exposed: allDataClasses.some((dc) => ['address', 'physical address'].includes(dc)), icon: 'MapPin' },
      { name: 'Usernames', exposed: allDataClasses.includes('username'), icon: 'User' },
      { name: 'IP Addresses', exposed: allDataClasses.includes('ip'), icon: 'Globe' },
      { name: 'Financial Data', exposed: allDataClasses.some((dc) => ['credit card', 'financial', 'bank account'].includes(dc)), icon: 'CreditCard' },
      { name: 'Government IDs', exposed: hasSsn, icon: 'FileBadge' },
    ];

    return { score, rating, riskLevel, lastExposureDate, uniqueDataTypes, healthCategories, dataTypes };
  }, [breaches, usernameExposures]);
}
