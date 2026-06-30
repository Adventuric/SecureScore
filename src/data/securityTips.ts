import type { SecurityTip } from '@/types';

export const SECURITY_TIPS: SecurityTip[] = [
  { text: 'Never reuse passwords across different accounts.', icon: 'Key' },
  { text: 'Use passkeys instead of passwords where supported.', icon: 'Fingerprint' },
  { text: 'Turn on MFA for every account that offers it.', icon: 'Shield' },
  { text: 'Monitor login alerts and review account activity regularly.', icon: 'Bell' },
  { text: 'Avoid phishing emails — never click links from unknown senders.', icon: 'Eye' },
  { text: 'Keep your software and devices updated to patch vulnerabilities.', icon: 'RefreshCw' },
  { text: 'Use a VPN on public Wi-Fi networks.', icon: 'Wifi' },
  { text: 'Review app permissions regularly and revoke unnecessary access.', icon: 'AppWindow' },
  { text: 'Back up important data to an external drive or cloud storage.', icon: 'HardDrive' },
  { text: 'Use a password manager to generate and store strong passwords.', icon: 'Wallet' },
  { text: 'Enable login notifications to detect unauthorized access early.', icon: 'MessageSquare' },
  { text: 'Review your social media privacy settings regularly.', icon: 'Globe' },
  { text: 'Use unique email aliases for different services.', icon: 'AtSign' },
  { text: 'Lock your devices with biometrics or strong PINs.', icon: 'Smartphone' },
  { text: 'Log out of accounts on shared or public devices.', icon: 'LogOut' },
];
