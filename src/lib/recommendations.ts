import type { BreachResult, Recommendation, UsernameExposure } from '@/types';

export function generateRecommendations(
  breaches: BreachResult[],
  usernameExposures: UsernameExposure[]
): Recommendation[] {
  const recs: Recommendation[] = [];
  const allDataClasses = breaches.flatMap((b) => b.dataClasses.map((dc) => dc.toLowerCase()));
  const hasPassword = allDataClasses.includes('password');
  const hasPhone = allDataClasses.some((dc) => ['phone', 'phone number'].includes(dc));
  const hasAddress = allDataClasses.some((dc) => ['address', 'physical address'].includes(dc));
  const hasSsn = allDataClasses.some((dc) => ['ssn', 'social security number', 'national id', 'passport', 'government id'].includes(dc));
  const hasFinancial = allDataClasses.some((dc) => ['credit card', 'financial', 'bank account'].includes(dc));
  const hasDob = allDataClasses.includes('dob');
  const breachCount = breaches.length;

  if (hasPassword || breachCount > 0) {
    recs.push({
      id: 'change-passwords',
      icon: 'Key',
      title: 'Change passwords immediately',
      description: hasPassword
        ? `${breachCount} breach${breachCount > 1 ? 'es' : ''} exposed your password${breachCount > 1 ? 's' : ''}. Change passwords on all affected accounts immediately.`
        : `Your accounts appeared in ${breachCount} breach${breachCount > 1 ? 'es' : ''}. Update your passwords as a precaution.`,
      priority: 'critical',
      estimatedTime: '30-60 min',
    });
  }

  recs.push({
    id: 'enable-mfa',
    icon: 'Shield',
    title: 'Enable multi-factor authentication (MFA)',
    description: 'Add an extra layer of security to all supported accounts. Use authenticator apps, not SMS when possible.',
    priority: 'high',
    estimatedTime: '15-30 min',
  });

  if (hasPassword) {
    recs.push({
      id: 'unique-passwords',
      icon: 'FileCheck',
      title: 'Use unique passwords for every account',
      description: 'Never reuse passwords across different services. A breach on one site should not compromise others.',
      priority: 'high',
      estimatedTime: '30-60 min',
    });

    recs.push({
      id: 'password-manager',
      icon: 'Wallet',
      title: 'Start using a password manager',
      description: 'Generate and store strong, unique passwords securely. Recommended: Bitwarden, 1Password, or Apple Passwords.',
      priority: 'high',
      estimatedTime: '20 min',
    });
  }

  if (hasPhone) {
    recs.push({
      id: 'monitor-phone',
      icon: 'Smartphone',
      title: 'Watch for SIM swapping attacks',
      description: 'Your phone number was exposed. Contact your carrier to add a PIN or extra verification to your account.',
      priority: 'high',
      estimatedTime: '15 min',
    });
  }

  if (hasFinancial) {
    recs.push({
      id: 'monitor-finances',
      icon: 'CreditCard',
      title: 'Monitor financial accounts closely',
      description: 'Your financial data was exposed. Review bank and credit card statements for unauthorized transactions.',
      priority: 'critical',
      estimatedTime: '20 min',
    });
  }

  if (hasSsn) {
    recs.push({
      id: 'freeze-credit',
      icon: 'Lock',
      title: 'Freeze your credit immediately',
      description: 'Your SSN or national ID was exposed. Freeze your credit with all major bureaus (Equifax, Experian, TransUnion).',
      priority: 'critical',
      estimatedTime: '45 min',
    });
  }

  if (hasAddress || hasDob) {
    recs.push({
      id: 'identity-theft',
      icon: 'Fingerprint',
      title: 'Monitor for identity theft',
      description: 'Personal details like your address and date of birth are valuable for identity theft. Monitor statements and credit reports.',
      priority: 'medium',
      estimatedTime: '15 min',
    });
  }

  if (usernameExposures.length > 0) {
    recs.push({
      id: 'replace-username',
      icon: 'UserMinus',
      title: 'Update exposed usernames',
      description: `Your username appeared in ${usernameExposures.length} location${usernameExposures.length > 1 ? 's' : ''}. Update usernames on critical accounts where possible.`,
      priority: 'medium',
      estimatedTime: '20 min',
    });
  }

  recs.push({
    id: 'breach-monitoring',
    icon: 'Bell',
    title: 'Subscribe to breach monitoring',
    description: 'Use services like Have I Been Pwned or Firefox Monitor to get notified of future breaches involving your email.',
    priority: 'low',
    estimatedTime: '5 min',
  });

  recs.push({
    id: 'phishing-awareness',
    icon: 'Eye',
    title: 'Stay vigilant against phishing',
    description: 'With your data exposed, expect targeted phishing attempts. Never click suspicious links or share personal info via email.',
    priority: 'medium',
    estimatedTime: '10 min',
  });

  recs.push({
    id: 'browser-extensions',
    icon: 'Extension',
    title: 'Use security browser extensions',
    description: 'Extensions like uBlock Origin, Privacy Badger, and Bitwarden can help block trackers and manage credentials safely.',
    priority: 'low',
    estimatedTime: '10 min',
  });

  return recs;
}
