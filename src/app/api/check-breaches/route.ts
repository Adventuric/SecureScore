import { NextResponse } from 'next/server';
import { z } from 'zod';
import type { BreachResult, UsernameExposure } from '@/types';
import { LeakCheckSource } from '@/lib/api/leakcheck';
import { getMockBreaches } from '@/lib/api/mock-data';
import { checkUsername } from '@/lib/api/username-mock';
import { calculateScore, getRating, getRiskLevel, getLastExposureDate, getUniqueDataTypes } from '@/lib/algorithm/secureScore';
import { generateRecommendations } from '@/lib/recommendations';

const requestSchema = z.object({
  email: z.string().email('Invalid email address'),
  username: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = requestSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.errors[0]?.message || 'Invalid input' },
        { status: 400 }
      );
    }

    const { email, username } = parsed.data;

    let breaches: BreachResult[];
    try {
      const leakcheck = new LeakCheckSource();
      breaches = await leakcheck.checkEmail(email);
    } catch (err) {
      const message = err instanceof Error ? err.message : '';
      if (message === 'rate_limited') {
        return NextResponse.json({ error: 'rate_limited' }, { status: 429 });
      }
      breaches = getMockBreaches(email);
    }

    let usernameExposures: UsernameExposure[] = [];
    if (username) {
      try {
        usernameExposures = await checkUsername(username);
      } catch {
        usernameExposures = [];
      }
    }

    const score = calculateScore(breaches, usernameExposures);
    const rating = getRating(score);
    const riskLevel = getRiskLevel(score);
    const lastExposureDate = getLastExposureDate(breaches);
    const uniqueDataTypes = getUniqueDataTypes(breaches);
    const recommendations = generateRecommendations(breaches, usernameExposures);

    const result = {
      email,
      username,
      breaches,
      usernameExposures,
      score,
      rating,
      riskLevel,
      recommendations,
      lastExposureDate,
      uniqueDataTypes,
    };

    return NextResponse.json(result);
  } catch (err) {
    console.error('API Error:', err);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
