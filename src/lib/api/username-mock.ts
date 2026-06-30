import type { UsernameExposure } from '@/types';

const MOCK_PLATFORMS = [
  { name: 'GitHub', date: '2023-06' },
  { name: 'Reddit', date: '2022-11' },
  { name: 'Discord', date: '2024-02' },
  { name: 'Telegram', date: '2023-08' },
  { name: 'X (Twitter)', date: '2024-01' },
  { name: 'Instagram', date: '2022-05' },
  { name: 'LinkedIn (scraping)', date: '2024-06' },
  { name: 'Roblox', date: '2023-03' },
  { name: 'Spotify', date: '2022-09' },
  { name: 'CodePen', date: '2024-04' },
];

function hashUsername(username: string): number {
  let hash = 0;
  for (let i = 0; i < username.length; i++) {
    const char = username.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0;
  }
  return Math.abs(hash);
}

export async function checkUsername(username: string): Promise<UsernameExposure[]> {
  await new Promise((r) => setTimeout(r, 300 + Math.random() * 500));

  const hash = hashUsername(username);
  const exposureCount = hash % 5;

  if (exposureCount === 0) return [];

  const shuffled = [...MOCK_PLATFORMS].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, exposureCount).map((p) => ({
    platform: p.name,
    date: p.date,
  }));
}
