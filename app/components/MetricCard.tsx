'use client';

import { useMemo } from 'react';

const paths = {
  trending: 'M2,28 C10,10 14,12 22,4 28,-2 34,8 38,2',
  smooth: 'M2,24 C10,18 14,20 22,18 28,16 34,20 38,14',
  rising: 'M2,30 C10,20 18,10 28,6 38,2 42,8 46,4',
};

export type MetricCardProps = {
  label: string;
  value: string;
  delta?: string;
  trend?: keyof typeof paths;
};

export function MetricCard({ label, value, delta, trend = 'trending' }: MetricCardProps) {
  const path = useMemo(() => paths[trend] ?? paths.trending, [trend]);

  return (
    <div className="metric-card">
      <span>{label}</span>
      <strong>{value}</strong>
      {delta ? <small style={{ color: '#38f7c4', fontWeight: 600 }}>{delta}</small> : null}
      <svg className="sparkline" viewBox="0 0 48 32" preserveAspectRatio="none">
        <path d={path} fill="none" stroke="url(#gradient)" strokeWidth={2} strokeLinecap="round" />
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgb(124,92,255)" stopOpacity={0.8} />
            <stop offset="100%" stopColor="rgb(56,247,196)" stopOpacity={0.9} />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
