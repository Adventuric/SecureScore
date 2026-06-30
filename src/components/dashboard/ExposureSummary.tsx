'use client';

import { motion } from 'framer-motion';
import { AlertTriangle, Database, FileType, Calendar } from 'lucide-react';
import type { BreachResult } from '@/types';
import { formatDate } from '@/lib/utils';

interface ExposureSummaryProps {
  breaches: BreachResult[];
  uniqueDataTypes: string[];
  lastExposureDate: string | null;
}

const statCards = (
  breaches: BreachResult[],
  uniqueDataTypes: string[],
  lastExposureDate: string | null
) => [
  {
    icon: AlertTriangle,
    value: breaches.length,
    label: 'Breaches Found',
    gradient: 'from-red-500/20 to-red-600/10',
    border: 'border-red-500/20',
    iconColor: 'text-red-400',
  },
  {
    icon: Database,
    value: new Set(breaches.map((b) => b.name)).size,
    label: 'Compromised Accounts',
    gradient: 'from-orange-500/20 to-orange-600/10',
    border: 'border-orange-500/20',
    iconColor: 'text-orange-400',
  },
  {
    icon: FileType,
    value: uniqueDataTypes.length,
    label: 'Sensitive Data Types',
    gradient: 'from-purple-500/20 to-purple-600/10',
    border: 'border-purple-500/20',
    iconColor: 'text-purple-400',
  },
  {
    icon: Calendar,
    value: lastExposureDate ? formatDate(lastExposureDate) : 'N/A',
    label: 'Last Exposure Date',
    gradient: 'from-blue-500/20 to-blue-600/10',
    border: 'border-blue-500/20',
    iconColor: 'text-blue-400',
  },
];

export function ExposureSummary({ breaches, uniqueDataTypes, lastExposureDate }: ExposureSummaryProps) {
  const cards = statCards(breaches, uniqueDataTypes, lastExposureDate);

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card, i) => (
        <motion.div
          key={card.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 + i * 0.1, duration: 0.4 }}
          whileHover={{ y: -2, transition: { duration: 0.2 } }}
          className={`glass rounded-2xl border ${card.border} p-5`}
        >
          <div className={`mb-3 inline-flex rounded-xl bg-gradient-to-br ${card.gradient} p-2.5`}>
            <card.icon className={`h-5 w-5 ${card.iconColor}`} />
          </div>
          <p className={`text-2xl font-bold ${typeof card.value === 'number' ? 'tabular-nums' : ''}`}>
            {card.value}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">{card.label}</p>
        </motion.div>
      ))}
    </div>
  );
}
