import { InsightStack } from './components/InsightStack';
import { MetricCard } from './components/MetricCard';
import { ScenarioPlanner } from './components/ScenarioPlanner';

const heroMetrics = [
  {
    label: 'Current ARR',
    value: '$1.4M',
    delta: '+18.4% QoQ',
    trend: 'rising' as const,
  },
  {
    label: 'Net Revenue Retention',
    value: '128%',
    delta: '+6 pts',
    trend: 'smooth' as const,
  },
  {
    label: 'Capital Efficiency',
    value: '1.2x',
    delta: 'Benchmark: 1.4x',
    trend: 'trending' as const,
  },
];

export default function Page() {
  return (
    <main>
      <header>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <span className="badge">FF • Future Flow</span>
          <div className="hero">
            <h1>Finance without the fragility</h1>
            <p className="subtitle">
              FF stitches data, strategy, and narrative into a single command center so you can forecast, align, and
              ship decisions faster than the market shifts.
            </p>
          </div>
        </div>
        <div className="gradient-border" style={{ maxWidth: 280, width: '100%' }}>
          <div className="panel" style={{ gap: 16 }}>
            <span style={{ color: 'var(--muted)', fontSize: '0.85rem' }}>FF Signal Pulse</span>
            <div className="metrics-grid">
              {heroMetrics.map((metric) => (
                <MetricCard key={metric.label} {...metric} />
              ))}
            </div>
          </div>
        </div>
      </header>

      <ScenarioPlanner />

      <InsightStack />

      <footer style={{ color: 'var(--muted)', fontSize: '0.85rem', marginTop: 24 }}>
        <span>© {new Date().getFullYear()} Future Flow Intelligence. Built for the operators rewriting finance culture.</span>
      </footer>
    </main>
  );
}
