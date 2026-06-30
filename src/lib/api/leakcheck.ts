import type { BreachResult, LeakCheckResponse } from '@/types';
import type { BreachDataSource } from './breach-api';

const LEAKCHECK_API = 'https://leakcheck.io/api/public';

function determineSeverity(fields: string[]): 'low' | 'medium' | 'high' | 'critical' {
  if (fields.some((f) => ['ssn', 'passport', 'national id'].includes(f.toLowerCase()))) return 'critical';
  if (fields.some((f) => ['password', 'credit card', 'financial'].includes(f.toLowerCase()))) return 'high';
  if (fields.some((f) => ['phone', 'address'].includes(f.toLowerCase()))) return 'medium';
  return 'low';
}

function getBreachDescription(name: string): string {
  const descriptions: Record<string, string> = {
    'Adobe': 'Creative software platform breach exposing customer IDs and passwords.',
    'Canva.com': 'Graphic design platform breach affecting user accounts.',
    'Dropbox': 'Cloud storage service breach exposing user credentials.',
    'LinkedIn': 'Professional networking platform breach compromising user accounts.',
    'MySpace.com': 'Social networking platform breach exposing user data.',
    'Twitter.com': 'Social media platform breach compromising user information.',
    'Facebook': 'Social media platform data breach.',
    'AdultFriendFinder': 'Adult dating and entertainment platform breach.',
    'LinkedIn (scraping)': 'Professional network data scraping incident.',
  };
  return descriptions[name] || `Data breach involving ${name} exposing user account information.`;
}

export class LeakCheckSource implements BreachDataSource {
  name = 'LeakCheck';

  async checkEmail(email: string): Promise<BreachResult[]> {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);

    try {
      const res = await fetch(`${LEAKCHECK_API}?check=${encodeURIComponent(email)}`, {
        signal: controller.signal,
        headers: { 'User-Agent': 'SecureScore/1.0' },
      });

      if (!res.ok) {
        if (res.status === 429) throw new Error('rate_limited');
        if (res.status === 404) return [];
        throw new Error(`API error: ${res.status}`);
      }

      const data: LeakCheckResponse = await res.json();

      if (!data.success || !data.sources || data.sources.length === 0) return [];

      return data.sources.map((source) => ({
        name: source.name,
        domain: source.name.toLowerCase().replace(/[^a-z0-9.]/g, '').replace(/^\./, ''),
        date: source.date || 'Unknown',
        description: getBreachDescription(source.name),
        dataClasses: data.fields || [],
        severity: determineSeverity(data.fields || []),
      }));
    } finally {
      clearTimeout(timeout);
    }
  }
}
