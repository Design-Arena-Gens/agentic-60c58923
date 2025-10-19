const insights = [
  {
    title: 'Acquisition flywheel',
    body:
      'Invest in multi-channel experiments until the marginal CAC surpasses 1.2x burn multiple. Future Flow keeps the spend-optimal curve visible to GTM partners.',
  },
  {
    title: 'Board narrative',
    body:
      'Highlight how FF consolidates live scenario deltas into board-ready storylines. Export the resilience score monthly to keep directors aligned.',
  },
  {
    title: 'Cadence design',
    body:
      'Use the 6, 9, 12 month projections to sequence hiring unlocks: finance pod first, then RevOps, then product analytics.',
  },
];

export function InsightStack() {
  return (
    <section className="gradient-border">
      <div className="panel">
        <span className="badge">Operator playbook</span>
        <h2 style={{ fontSize: '1.7rem', maxWidth: 520 }}>What finance leads are shipping with FF</h2>
        <div style={{ display: 'grid', gap: 22, marginTop: 12 }}>
          {insights.map((insight) => (
            <article key={insight.title} style={{ display: 'grid', gap: 8 }}>
              <h3 style={{ fontSize: '1.05rem' }}>{insight.title}</h3>
              <p style={{ color: 'var(--muted)', lineHeight: 1.6 }}>{insight.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
