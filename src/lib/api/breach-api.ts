import type { BreachResult } from '@/types';

export interface BreachDataSource {
  name: string;
  checkEmail(email: string): Promise<BreachResult[]>;
}
