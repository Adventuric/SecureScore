'use client';

import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';

export function DisclaimerBanner() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.5 }}
      className="mx-auto mt-16 max-w-2xl"
    >
      <div className="glass rounded-2xl px-6 py-4">
        <div className="flex items-start gap-3">
          <Shield className="mt-0.5 h-5 w-5 shrink-0 text-brand-blue" />
          <p className="text-xs leading-relaxed text-muted-foreground">
            SecureScore never stores your email, username, or scan results. All checks are performed
            securely in real-time against public breach intelligence databases. Your personal
            information is never retained, logged, or shared. Results are stored locally in your
            browser session and cleared when you close this tab.
          </p>
        </div>
      </div>
    </motion.div>
  );
}
