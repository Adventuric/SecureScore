'use client';

import { motion } from 'framer-motion';
import { AlertTriangle, RefreshCw, WifiOff, Clock, Ban, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ErrorStateProps {
  error: string;
  onRetry: () => void;
  onBack: () => void;
}

const errorConfig: Record<string, { icon: typeof AlertTriangle; title: string }> = {
  rate_limited: { icon: Clock, title: 'Rate limit reached' },
  'Failed to fetch': { icon: WifiOff, title: 'Connection error' },
  'NetworkError': { icon: WifiOff, title: 'No internet connection' },
  'AbortError': { icon: Clock, title: 'Request timed out' },
};

export function ErrorState({ error, onRetry, onBack }: ErrorStateProps) {
  const config = Object.entries(errorConfig).find(([key]) => error.toLowerCase().includes(key.toLowerCase()));
  const Icon = config?.[1]?.icon || HelpCircle;
  const title = config?.[1]?.title || 'Something went wrong';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex min-h-[50vh] flex-col items-center justify-center px-4"
    >
      <motion.div
        animate={{ rotate: [0, -10, 10, -10, 0] }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mb-6"
      >
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-red-500/10 ring-4 ring-red-500/20">
          <Icon className="h-10 w-10 text-red-400" />
        </div>
      </motion.div>

      <h2 className="mb-2 text-2xl font-bold">{title}</h2>
      <p className="mb-8 max-w-md text-center text-sm text-muted-foreground">
        {error === 'rate_limited'
          ? 'Too many requests. Please wait a moment and try again.'
          : error.includes('Failed to fetch') || error.includes('NetworkError')
          ? 'Unable to reach breach databases. Check your internet connection.'
          : error.includes('AbortError')
          ? 'The request timed out. Please try again.'
          : error || 'An unexpected error occurred.'}
      </p>

      <div className="flex gap-3">
        <Button variant="outline" onClick={onBack}>
          <Ban className="mr-2 h-4 w-4" />
          Go back
        </Button>
        <Button variant="gradient" onClick={onRetry}>
          <RefreshCw className="mr-2 h-4 w-4" />
          Try again
        </Button>
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-8 text-xs text-muted-foreground"
      >
        Error: {error}
      </motion.p>
    </motion.div>
  );
}
