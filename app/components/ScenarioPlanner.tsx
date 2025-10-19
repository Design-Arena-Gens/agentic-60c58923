'use client';

import { useMemo, useState } from 'react';

type ScenarioInputs = {
  acquisitionGrowth: number;
  expansionRevenue: number;
  burnMultiple: number;
  retention: number;
};

type ScenarioPoint = {
  label: string;
  arr: number;
  netRevenue: number;
  runwayMonths: number;
};

const BASE_ARR = 1.4; // in millions
const BASE_NET = 0.32; // in millions
const BASE_BURN = 0.42; // in millions
const BASE_RUNWAY = 16;

function formatMillions(value: number) {
  return `$${value.toFixed(2)}M`;
}

function formatMonths(value: number) {
  return `${value.toFixed(1)} mo`;
}

function buildPoints(inputs: ScenarioInputs): ScenarioPoint[] {
  const { acquisitionGrowth, expansionRevenue, burnMultiple, retention } = inputs;
  const months = [3, 6, 9, 12];

  return months.map((month, index) => {
    const growthFactor = 1 + acquisitionGrowth * (month / 12);
    const expansionBoost = 1 + expansionRevenue * 0.6;
    const retentionLift = 0.92 + retention * 0.08;
    const burnAdjustment = burnMultiple * (0.85 + index * 0.05);

    const arr = BASE_ARR * growthFactor * expansionBoost * retentionLift;
    const netRevenue = BASE_NET * growthFactor * expansionBoost;
    const burn = BASE_BURN * burnAdjustment;
    const runway = Math.max(BASE_RUNWAY - month * (burn / BASE_BURN - 1), 6);

    const runwayAdjusted = runway * (1 + (retention - 0.5) * 0.15);

    return {
      label: `${month} mo`,
      arr,
      netRevenue,
      runwayMonths: runwayAdjusted,
    };
  });
}

export function ScenarioPlanner() {
  const [inputs, setInputs] = useState<ScenarioInputs>({
    acquisitionGrowth: 0.36,
    expansionRevenue: 0.28,
    burnMultiple: 1.2,
    retention: 0.76,
  });

  const points = useMemo(() => buildPoints(inputs), [inputs]);
  const current = points[points.length - 1];

  const compositeScore = useMemo(() => {
    const arrScore = Math.min(current.arr / 2.5, 1);
    const netScore = Math.min(current.netRevenue / 0.9, 1);
    const runwayScore = Math.min(current.runwayMonths / 18, 1);
    const efficiencyScore = 1 - Math.abs(inputs.burnMultiple - 1.2) / 1.2;

    return ((arrScore + netScore + runwayScore + efficiencyScore) / 4) * 100;
  }, [current.arr, current.netRevenue, current.runwayMonths, inputs.burnMultiple]);

  return (
    <section className="gradient-border">
      <div className="panel">
        <div className="hero">
          <span className="badge">FF Scenario Canvas</span>
          <h2>Design resilient trajectories without needing a spreadsheet</h2>
          <p className="subtitle">
            Model acquisition, expansion, retention, and burn dynamics to see how Future Flow (FF) adapts your
            revenue posture over the next four quarters.
          </p>
        </div>

        <div className="controls">
          <div className="control">
            <label htmlFor="acquisitionGrowth">Acquisition velocity ({Math.round(inputs.acquisitionGrowth * 100)}%)</label>
            <input
              id="acquisitionGrowth"
              className="slider"
              type="range"
              min={0.1}
              max={0.6}
              step={0.01}
              value={inputs.acquisitionGrowth}
              onChange={(event) =>
                setInputs((prev) => ({ ...prev, acquisitionGrowth: Number(event.target.value) }))
              }
            />
          </div>

          <div className="control">
            <label htmlFor="expansionRevenue">Expansion revenue influence ({Math.round(inputs.expansionRevenue * 100)}%)</label>
            <input
              id="expansionRevenue"
              className="slider"
              type="range"
              min={0}
              max={0.5}
              step={0.01}
              value={inputs.expansionRevenue}
              onChange={(event) =>
                setInputs((prev) => ({ ...prev, expansionRevenue: Number(event.target.value) }))
              }
            />
          </div>

          <div className="control">
            <label htmlFor="burnMultiple">Burn multiple ({inputs.burnMultiple.toFixed(2)}x)</label>
            <input
              id="burnMultiple"
              className="slider"
              type="range"
              min={0.6}
              max={2.4}
              step={0.01}
              value={inputs.burnMultiple}
              onChange={(event) => setInputs((prev) => ({ ...prev, burnMultiple: Number(event.target.value) }))}
            />
          </div>

          <div className="control">
            <label htmlFor="retention">Retention strength ({Math.round(inputs.retention * 100)}%)</label>
            <input
              id="retention"
              className="slider"
              type="range"
              min={0.5}
              max={0.92}
              step={0.01}
              value={inputs.retention}
              onChange={(event) => setInputs((prev) => ({ ...prev, retention: Number(event.target.value) }))}
            />
          </div>
        </div>

        <div className="timeline-grid">
          {points.map((point) => (
            <div key={point.label} className="timeline-card">
              <h3>{point.label}</h3>
              <strong>{formatMillions(point.arr)}</strong>
              <p style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>Projected ARR</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--muted)', fontSize: '0.85rem' }}>
                <span>Net revenue</span>
                <span>{formatMillions(point.netRevenue)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--muted)', fontSize: '0.85rem' }}>
                <span>Runway</span>
                <span>{formatMonths(point.runwayMonths)}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="gradient-border" style={{ marginTop: 12 }}>
          <div
            className="panel"
            style={{
              gap: 12,
              background: 'rgba(16, 25, 52, 0.9)',
              border: '1px solid rgba(124, 92, 255, 0.25)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <h3 style={{ fontSize: '1rem', letterSpacing: '-0.01em' }}>Resilience score</h3>
                <p style={{ color: 'var(--muted)', fontSize: '0.85rem' }}>
                  Composite signal combining ARR, margin efficiency, and capital discipline.
                </p>
              </div>
              <span style={{ fontSize: '2.4rem', fontWeight: 700 }}>{compositeScore.toFixed(0)}%</span>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <span className="tag">Capital Efficient</span>
              <span className="tag">Forecast Stable</span>
              <span className="tag">Growth Ready</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
