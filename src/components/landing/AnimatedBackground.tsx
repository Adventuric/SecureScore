'use client';

import { useEffect, useRef } from 'react';

function Blob({ className }: { className: string }) {
  return (
    <div
      className={`absolute animate-float rounded-full blur-3xl ${className}`}
    />
  );
}

function Particle({ index }: { index: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const w = typeof window !== 'undefined' ? window.innerWidth : 1920;
    const h = typeof window !== 'undefined' ? window.innerHeight : 1080;
    const x = Math.random() * w;
    const y = Math.random() * h;
    const size = Math.random() * 3 + 1;
    const duration = Math.random() * 20 + 15;
    const delay = Math.random() * 10;

    el.style.left = `${x}px`;
    el.style.top = `${y}px`;
    el.style.width = `${size}px`;
    el.style.height = `${size}px`;
    el.style.animationDuration = `${duration}s`;
    el.style.animationDelay = `${delay}s`;
  }, [index]);

  return (
    <div
      ref={ref}
      className="absolute animate-pulse-slow rounded-full bg-white/30"
    />
  );
}

export function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[#060618]" />
      <div className="absolute inset-0 grid-overlay opacity-50" />

      <Blob className="-left-32 -top-32 h-[500px] w-[500px] bg-brand-blue/8" />
      <Blob className="-right-32 top-1/3 h-[400px] w-[400px] bg-brand-purple/8" />
      <Blob className="bottom-0 left-1/3 h-[350px] w-[350px] bg-brand-cyan/8" />

      <div className="absolute inset-0">
        {Array.from({ length: 20 }, (_, i) => (
          <Particle key={i} index={i} />
        ))}
      </div>

      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.8) 1px, transparent 0)',
          backgroundSize: '40px 40px',
        }}
      />
    </div>
  );
}
