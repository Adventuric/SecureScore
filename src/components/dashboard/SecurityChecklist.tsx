'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Circle, Target, RotateCcw } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { useLocalStorage } from '@/hooks/useLocalStorage';

const CHECKLIST_ITEMS = [
  { id: 'mfa', label: 'Enable multi-factor authentication on accounts' },
  { id: 'password-manager', label: 'Start using a password manager' },
  { id: 'unique-passwords', label: 'Ensure all passwords are unique' },
  { id: 'change-leaked', label: 'Change passwords on compromised accounts' },
  { id: 'credit-freeze', label: 'Freeze credit with major bureaus' },
  { id: 'monitor-bank', label: 'Set up bank account alerts' },
  { id: 'phishing-check', label: 'Review recent emails for phishing attempts' },
  { id: 'backup-2fa', label: 'Backup 2FA recovery codes' },
  { id: 'browser-update', label: 'Update browser and security extensions' },
  { id: 'review-apps', label: 'Review and revoke unused app permissions' },
];

interface SecurityChecklistProps {
  originalScore: number;
}

export function SecurityChecklist({ originalScore }: SecurityChecklistProps) {
  const [checked, setChecked] = useLocalStorage<string[]>('securescore_checklist', []);

  const toggle = (id: string) => {
    setChecked((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const progress = Math.round((checked.length / CHECKLIST_ITEMS.length) * 100);
  const improvedScore = Math.min(100, originalScore + Math.round((100 - originalScore) * (progress / 100)));

  const reset = () => setChecked([]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.4 }}
      className="glass rounded-2xl border p-5"
    >
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Target className="h-4 w-4 text-brand-blue" />
          <h3 className="text-sm font-semibold">Security Improvement Checklist</h3>
        </div>
        {checked.length > 0 && (
          <Button variant="ghost" size="sm" onClick={reset} className="h-7 text-xs text-muted-foreground">
            <RotateCcw className="mr-1 h-3 w-3" />
            Reset
          </Button>
        )}
      </div>

      <div className="mb-4 rounded-xl bg-gradient-to-r from-brand-blue/10 to-brand-purple/10 p-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Score if completed</span>
          <span className="font-bold tabular-nums">
            {originalScore} → <span className="text-emerald-400">{improvedScore}</span>
          </span>
        </div>
        <Progress value={progress} className="mt-2 h-2" />
        <p className="mt-1 text-xs text-muted-foreground">
          {checked.length}/{CHECKLIST_ITEMS.length} actions completed
        </p>
      </div>

      <div className="space-y-1.5">
        {CHECKLIST_ITEMS.map((item, i) => {
          const isChecked = checked.includes(item.id);
          return (
            <motion.button
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.1 + i * 0.05, duration: 0.3 }}
              onClick={() => toggle(item.id)}
              className={`flex w-full items-center gap-3 rounded-xl border px-3.5 py-2.5 text-left text-xs transition-all duration-200 ${
                isChecked
                  ? 'border-emerald-500/20 bg-emerald-500/5'
                  : 'border-transparent hover:bg-secondary/50'
              }`}
            >
              {isChecked ? (
                <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
              ) : (
                <Circle className="h-4 w-4 shrink-0 text-muted-foreground" />
              )}
              <span className={isChecked ? 'text-emerald-400/80 line-through' : ''}>
                {item.label}
              </span>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}
