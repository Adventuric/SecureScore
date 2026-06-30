'use client';

import { motion } from 'framer-motion';
import { Search, BarChart3, Lightbulb } from 'lucide-react';

const features = [
  {
    icon: Search,
    title: 'Real-Time Scanning',
    description: 'Scans billions of records across known data breaches using the LeakCheck database.',
  },
  {
    icon: BarChart3,
    title: 'Comprehensive Analysis',
    description: 'Detailed breakdown of exposed data types, breach timelines, and your personalized SecureScore.',
  },
  {
    icon: Lightbulb,
    title: 'Actionable Insights',
    description: 'Prioritized security recommendations tailored to your exposure.',
  },
];

export function FeaturesSection() {
  return (
    <section className="relative z-10 px-4 pb-32">
      <div className="mx-auto max-w-4xl">
        <div className="flex flex-col divide-y divide-white/[0.06] md:flex-row md:divide-x md:divide-y-0">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ delay: i * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="flex-1 px-6 py-8 text-center md:py-6"
            >
              <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03]">
                <feature.icon className="h-5 w-5 text-brand-blue" />
              </div>
              <h3 className="mb-1.5 text-sm font-semibold">{feature.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
