import type { BreachResult } from '@/types';

const MOCK_BREACHES: BreachResult[] = [
  { name: 'Adobe', domain: 'adobe.com', date: '2013-10', description: 'Creative software platform breach affecting 153 million users. Exposed encrypted passwords and password hints.', dataClasses: ['password', 'email', 'username'], severity: 'high' },
  { name: 'Canva.com', domain: 'canva.com', date: '2019-05', description: 'Australian graphic design platform breach compromising 139 million user accounts.', dataClasses: ['email', 'username', 'password', 'name'], severity: 'high' },
  { name: 'LinkedIn', domain: 'linkedin.com', date: '2012-05', description: 'Professional networking platform breach exposing 167 million user accounts with emails and hashed passwords.', dataClasses: ['email', 'password', 'username'], severity: 'high' },
  { name: 'Dropbox', domain: 'dropbox.com', date: '2012-07', description: 'Cloud storage service breach affecting 68 million users with emails and hashed passwords.', dataClasses: ['email', 'password'], severity: 'high' },
  { name: 'MySpace.com', domain: 'myspace.com', date: '2008-07', description: 'Social networking platform breach exposing 360 million user accounts.', dataClasses: ['email', 'username', 'password'], severity: 'high' },
  { name: 'Twitter.com', domain: 'twitter.com', date: '2022-01', description: 'Social media platform breach affecting 5.4 million user accounts with email addresses and phone numbers.', dataClasses: ['email', 'phone', 'username'], severity: 'high' },
  { name: 'AdultFriendFinder', domain: 'adultfriendfinder.com', date: '2016-10', description: 'Adult dating platform breach exposing 412 million accounts with highly sensitive user information.', dataClasses: ['email', 'username', 'password', 'dob', 'ip', 'address'], severity: 'critical' },
  { name: 'Facebook', domain: 'facebook.com', date: '2021-04', description: 'Data leak affecting 533 million Facebook users with phone numbers and personal details.', dataClasses: ['phone', 'email', 'name', 'address', 'dob'], severity: 'high' },
  { name: 'Collection 1', domain: '', date: '2019-01', description: 'Massive credential compilation containing 2.7 billion records combining multiple data breaches and credential stuffing lists.', dataClasses: ['email', 'password', 'username'], severity: 'critical' },
  { name: 'MyHeritage.com', domain: 'myheritage.com', date: '2017-10', description: 'Genealogy platform breach exposing 92 million user email addresses and hashed passwords.', dataClasses: ['email', 'password'], severity: 'medium' },
  { name: 'Wattpad.com', domain: 'wattpad.com', date: '2020-05', description: 'Storytelling platform breach affecting 270 million users.', dataClasses: ['email', 'username', 'password', 'ip'], severity: 'high' },
  { name: 'Zomato.com', domain: 'zomato.com', date: '2017-05', description: 'Food delivery platform breach affecting 17 million user accounts.', dataClasses: ['email', 'password', 'username'], severity: 'medium' },
  { name: 'Duolingo.com', domain: 'duolingo.com', date: '2023-08', description: 'Language learning platform breach exposing 2.6 million user email addresses and course data.', dataClasses: ['email', 'username'], severity: 'low' },
  { name: 'Trello.com', domain: 'trello.com', date: '2024-01', description: 'Project management platform breach exposing 15 million user email addresses.', dataClasses: ['email', 'username'], severity: 'low' },
  { name: 'Patreon.com', domain: 'patreon.com', date: '2015-10', description: 'Membership platform breach exposing 2.3 million user records with emails and API keys.', dataClasses: ['email', 'username', 'password'], severity: 'high' },
  { name: '500px.com', domain: '500px.com', date: '2017-11', description: 'Photography platform breach affecting 14.8 million user accounts.', dataClasses: ['email', 'username', 'password', 'name'], severity: 'medium' },
  { name: 'VK.com', domain: 'vk.com', date: '2012-01', description: 'Russian social network breach exposing 100 million user accounts with phone numbers and personal data.', dataClasses: ['email', 'phone', 'username', 'password', 'name'], severity: 'critical' },
  { name: 'Badoo.com', domain: 'badoo.com', date: '2013-07', description: 'Dating platform breach affecting 112 million user accounts.', dataClasses: ['email', 'username', 'password', 'dob'], severity: 'high' },
  { name: 'Last.fm', domain: 'last.fm', date: '2012-07', description: 'Music platform breach exposing 43 million user accounts.', dataClasses: ['email', 'username', 'password'], severity: 'medium' },
  { name: 'Zynga.com', domain: 'zynga.com', date: '2019-09', description: 'Gaming company breach affecting 218 million user accounts.', dataClasses: ['email', 'username', 'password'], severity: 'high' },
];

export function getMockBreaches(email: string): BreachResult[] {
  let hash = 0;
  for (let i = 0; i < email.length; i++) {
    const char = email.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0;
  }
  const count = Math.abs(hash) % 8;
  if (count === 0) return [];
  return MOCK_BREACHES.slice(0, count);
}
