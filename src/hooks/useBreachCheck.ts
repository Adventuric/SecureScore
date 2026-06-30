'use client';

import { useState, useCallback } from 'react';
import type { ScanResult } from '@/types';

interface BreachCheckState {
  isLoading: boolean;
  error: string | null;
  result: ScanResult | null;
}

export function useBreachCheck() {
  const [state, setState] = useState<BreachCheckState>({
    isLoading: false,
    error: null,
    result: null,
  });

  const check = useCallback(async (email: string, username?: string) => {
    setState({ isLoading: true, error: null, result: null });

    try {
      const res = await fetch('/api/check-breaches', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, username }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || `Request failed (${res.status})`);
      }

      const data: ScanResult = await res.json();
      sessionStorage.setItem('securescore_result', JSON.stringify(data));
      setState({ isLoading: false, error: null, result: data });
      return data;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An unexpected error occurred';
      setState({ isLoading: false, error: message, result: null });
      return null;
    }
  }, []);

  const reset = useCallback(() => {
    setState({ isLoading: false, error: null, result: null });
  }, []);

  return { ...state, check, reset };
}
