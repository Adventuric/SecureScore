'use client';

import { motion } from 'framer-motion';
import { Shield, ShieldAlert, ShieldCheck } from 'lucide-react';
import { getRiskColor } from '@/lib/utils';

interface RiskBadgeProps {
  riskLevel: string;
}

export function RiskBadge({ riskLevel }: RiskBadgeProps) {
  const color = getRiskColor(riskLevel);
  const Icon = riskLevel === 'Low Risk' ? ShieldCheck : riskLevel === 'Moderate Risk' ? Shield : ShieldAlert;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.3, type: 'spring' }}
      className="glass-strong inline-flex items-center gap-2.5 rounded-full px-5 py-2.5"
      style={{ borderColor: `${color}30` }}
    >
      <motion.div
        animate={riskLevel === 'Low Risk' ? { scale: [1, 1.1, 1] } : { opacity: [1, 0.5, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <Icon className="h-5 w-5" style={{ color }} />
      </motion.div>
      <div>
        <p className="text-xs text-muted-foreground">Risk Level</p>
        <p className="text-sm font-semibold" style={{ color }}>{riskLevel}</p>
      </div>
      <motion.div
        className="ml-2 h-2.5 w-2.5 rounded-full"
        style={{ backgroundColor: color }}
        animate={{ boxShadow: [`0 0 0 0 ${color}40`, `0 0 0 6px ${color}00`] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </motion.div>
  );
}
