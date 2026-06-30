'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Download, Share2 } from 'lucide-react';
import type { ScanResult } from '@/types';
import { useSecureScore } from '@/hooks/useSecureScore';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { AnimatedBackground } from '@/components/landing/AnimatedBackground';
import { EmptyState } from '@/components/shared/EmptyState';
import { ScoreCircle } from '@/components/dashboard/ScoreCircle';
import { RiskBadge } from '@/components/dashboard/RiskBadge';
import { ExposureSummary } from '@/components/dashboard/ExposureSummary';
import { BreachTimeline } from '@/components/dashboard/BreachTimeline';
import { RecommendationsList } from '@/components/dashboard/RecommendationsList';
import { SecurityHealthBreakdown } from '@/components/dashboard/SecurityHealthBreakdown';
import { DataTypesExposed } from '@/components/dashboard/DataTypesExposed';
import { SecurityTipsSidebar } from '@/components/dashboard/SecurityTipsSidebar';
import { SecurityChecklist } from '@/components/dashboard/SecurityChecklist';
import { DisclaimerBanner } from '@/components/shared/DisclaimerBanner';
import { toast } from 'sonner';

interface RecentSearch {
  email: string;
  score: number;
  date: string;
}

function LoadingSkeleton() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      <Skeleton className="h-8 w-48" />
      <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
        <Skeleton className="h-[220px] w-[220px] rounded-full" />
        <div className="space-y-3 pt-8">
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-16 w-80" />
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-28 rounded-2xl" />
        ))}
      </div>
    </div>
  );
}

export default function ResultsPage() {
  const router = useRouter();
  const [data, setData] = useState<ScanResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [recentSearches, setRecentSearches] = useLocalStorage<RecentSearch[]>('ss_recent', []);

  useEffect(() => {
    const stored = sessionStorage.getItem('securescore_result');
    if (stored) {
      try {
        const parsed: ScanResult = JSON.parse(stored);
        setData(parsed);
        setRecentSearches((prev) => {
          const filtered = prev.filter((s) => s.email !== parsed.email);
          return [{ email: parsed.email, score: parsed.score, date: new Date().toISOString() }, ...filtered].slice(0, 10);
        });
      } catch {
        // invalid data
      }
    }
    setLoading(false);
  }, [setRecentSearches]);

  useEffect(() => {
    if (!loading && !data) router.push('/');
  }, [loading, data, router]);

  const { score, rating, riskLevel, lastExposureDate, uniqueDataTypes, healthCategories, dataTypes } =
    useSecureScore(data?.breaches || [], data?.usernameExposures || []);

  if (loading) {
    return (
      <main className="relative min-h-screen">
        <AnimatedBackground />
        <LoadingSkeleton />
      </main>
    );
  }

  if (!data) return null;

  if (data.breaches.length === 0) {
    return (
      <main className="relative min-h-screen">
        <AnimatedBackground />
        <EmptyState email={data.email} score={score} onBack={() => router.push('/')} />
      </main>
    );
  }

  const handleShare = async () => {
    const text = `My SecureScore is ${score}/100 (${rating}). Check yours at SecureScore!`;
    if (navigator.share) {
      await navigator.share({ title: 'SecureScore', text });
    } else {
      await navigator.clipboard.writeText(text);
      toast.success('Score copied to clipboard');
    }
  };

  const handleExportPDF = async () => {
    toast.loading('Generating PDF...');
    try {
      const { generatePDFReport } = await import('@/lib/pdf-report');
      await generatePDFReport(data, score, rating);
      toast.dismiss();
      toast.success('Report exported as PDF');
    } catch {
      toast.dismiss();
      toast.error('PDF export failed. Please try again.');
    }
  };

  return (
    <TooltipProvider>
      <main className="relative min-h-screen">
        <AnimatedBackground />

        <div className="fixed right-6 top-6 z-40 flex items-center gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full" onClick={handleShare}>
                <Share2 className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Share score</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full" onClick={handleExportPDF}>
                <Download className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Export PDF</TooltipContent>
          </Tooltip>
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 flex items-center gap-3"
          >
            <Button variant="ghost" size="sm" onClick={() => router.push('/')}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              New Scan
            </Button>
            <span className="text-sm text-muted-foreground">
              Results for <span className="font-medium text-foreground">{data.email}</span>
            </span>
          </motion.div>

          <div id="report-content" className="space-y-8">
            <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
              <div className="space-y-8">
                <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
                  <ScoreCircle score={score} rating={rating} />
                  <div className="flex flex-col items-center gap-4 sm:items-start sm:pt-8">
                    <RiskBadge riskLevel={riskLevel} />
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className="max-w-md text-center text-sm text-muted-foreground sm:text-left"
                    >
                      We found {data.breaches.length} breach{data.breaches.length > 1 ? 'es' : ''} involving your information.
                    </motion.p>
                  </div>
                </div>

                <ExposureSummary breaches={data.breaches} uniqueDataTypes={uniqueDataTypes} lastExposureDate={lastExposureDate} />

                <div>
                  <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="mb-4 text-lg font-semibold">
                    Breach Timeline
                  </motion.h2>
                  <BreachTimeline breaches={data.breaches} />
                </div>

                <div>
                  <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }} className="mb-4 text-lg font-semibold">
                    Security Recommendations
                  </motion.h2>
                  <RecommendationsList recommendations={data.recommendations} />
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="mb-4 text-lg font-semibold">
                      Security Health Breakdown
                    </motion.h2>
                    <div className="glass rounded-2xl border p-5">
                      <SecurityHealthBreakdown categories={healthCategories} />
                    </div>
                  </div>
                  <div>
                    <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }} className="mb-4 text-lg font-semibold">
                      Data Types Exposed
                    </motion.h2>
                    <div className="glass rounded-2xl border p-5">
                      <DataTypesExposed dataTypes={dataTypes} />
                    </div>
                  </div>
                </div>

                <div>
                  <SecurityChecklist originalScore={score} />
                </div>
              </div>

              <div className="space-y-6">
                <div className="sticky top-6 space-y-6">
                  <SecurityTipsSidebar />
                  <div className="glass rounded-2xl border p-5">
                    <h3 className="mb-3 text-sm font-semibold">Quick Stats</h3>
                    <div className="space-y-3 text-sm">
                      {[
                        ['Total Breaches', data.breaches.length],
                        ['Username Exposures', data.usernameExposures.length],
                        ['Data Types Exposed', uniqueDataTypes.length],
                        ['Your Rating', rating],
                      ].map(([label, value]) => (
                        <div key={label as string}>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">{label as string}</span>
                            <span className="font-medium tabular-nums">{value as string | number}</span>
                          </div>
                          {label !== 'Your Rating' && <div className="h-px bg-border mt-3" />}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {recentSearches.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="mt-8"
            >
              <h3 className="mb-3 text-sm font-semibold">Recent Searches</h3>
              <div className="flex flex-wrap gap-2">
                {recentSearches.slice(0, 5).map((s) => (
                  <button
                    key={s.email + s.date}
                    onClick={() => {
                      const existing = sessionStorage.getItem('securescore_result');
                      if (existing) {
                        try {
                          const parsed = JSON.parse(existing);
                          if (parsed.email === s.email) return;
                        } catch {}
                      }
                      router.push('/');
                    }}
                    className="glass rounded-xl border px-3 py-2 text-left text-xs transition-all duration-200 hover:border-brand-blue/30 hover:shadow-md"
                  >
                    <p className="font-medium truncate max-w-[160px]">{s.email}</p>
                    <p className="text-muted-foreground">Score: {s.score}</p>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          <div className="mt-16">
            <DisclaimerBanner />
          </div>

          <footer className="mt-16 border-t border-white/5 py-8 text-center text-xs text-muted-foreground">
            <p>
              Powered by{' '}
              <a href="https://leakcheck.io" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-foreground">
                LeakCheck
              </a>{' '}
              public API &middot; SecureScore &copy; {new Date().getFullYear()}
            </p>
          </footer>
        </div>
      </main>
    </TooltipProvider>
  );
}
