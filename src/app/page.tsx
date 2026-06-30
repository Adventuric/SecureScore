'use client';

import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { AnimatePresence } from 'framer-motion';
import { AnimatedBackground } from '@/components/landing/AnimatedBackground';
import { HeroSection } from '@/components/landing/HeroSection';
import { FeaturesSection } from '@/components/landing/FeaturesSection';
import { LoadingScan } from '@/components/landing/LoadingScan';
import { DisclaimerBanner } from '@/components/shared/DisclaimerBanner';
import { useBreachCheck } from '@/hooks/useBreachCheck';

export default function LandingPage() {
  const router = useRouter();
  const { isLoading, check } = useBreachCheck();

  const handleSearch = useCallback(
    async (email: string, username?: string) => {
      const result = await check(email, username);
      if (result) {
        router.push('/results');
      }
    },
    [check, router]
  );

  return (
    <main className="relative min-h-screen">
      <AnimatedBackground />

      <AnimatePresence>
        {isLoading && <LoadingScan onComplete={() => {}} />}
      </AnimatePresence>

      <HeroSection onSearch={handleSearch} isLoading={isLoading} />
      <FeaturesSection />
      <DisclaimerBanner />

      <footer className="relative z-10 border-t border-white/5 py-8 text-center text-xs text-muted-foreground">
        <p>
          Powered by{' '}
          <a
            href="https://leakcheck.io"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 hover:text-foreground"
          >
            LeakCheck
          </a>{' '}
          public API &middot; SecureScore &copy; {new Date().getFullYear()}
        </p>
      </footer>
    </main>
  );
}
