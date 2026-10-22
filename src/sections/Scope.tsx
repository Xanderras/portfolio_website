import { useState } from 'react';

type Shape = 'sine' | 'square' | 'triangle' | 'saw';

const SHAPES: { id: Shape; label: string }[] = [
  { id: 'sine', label: 'SINE' },
  { id: 'square', label: 'SQUARE' },
  { id: 'triangle', label: 'TRI' },
  { id: 'saw', label: 'SAW' },
];

function waveY(shape: Shape, t: number) {
  const p = t - Math.floor(t);
  if (shape === 'square') return p < 0.5 ? 1 : -1;
  if (shape === 'triangle') return 1 - 4 * Math.abs(p - 0.5);
  if (shape === 'saw') return 2 * p - 1;
  return Math.sin(2 * Math.PI * t);
}

function wavePath(shape: Shape, freq: number) {
  const points: string[] = [];
  for (let i = 0; i <= 400; i++) {
    const y = 150 - 100 * waveY(shape, (i / 400) * freq);
    points.push(`${i ? 'L' : 'M'}${(i * 2.5).toFixed(1)} ${y.toFixed(1)}`);
  }
  return points.join(' ');
}

interface Props {
  filterLabel: string;
  count: number;
}

export function Scope({ filterLabel, count }: Props) {
  const [shape, setShape] = useState<Shape>('sine');
  const [freq, setFreq] = useState(3);
  const shapeLabel = SHAPES.find((s) => s.id === shape)?.label;

  return (
    <figure className="scope">
      <div className="scope-screen">
        <svg viewBox="0 0 1000 300" preserveAspectRatio="none" aria-hidden="true">
          <path d={wavePath(shape, freq)} />
        </svg>
        <div className="scope-readout mono">
          <span>CH1 · {shapeLabel} · {freq} Hz</span>
          <span>{filterLabel} · {count} entries</span>
        </div>
      </div>
      <figcaption className="scope-controls">
        <div role="group" aria-label="Waveform" className="scope-shapes">
          {SHAPES.map((s) => (
            <button
              key={s.id}
              type="button"
              aria-pressed={s.id === shape}
              className={`scope-btn mono${s.id === shape ? ' is-active' : ''}`}
              onClick={() => setShape(s.id)}
            >
              {s.label}
            </button>
          ))}
        </div>
        <label htmlFor="scope-freq" className="scope-timebase mono">
          TIMEBASE
          <input id="scope-freq" type="range" min={1} max={8} step={1} value={freq} onChange={(e) => setFreq(Number(e.target.value))} />
        </label>
        <span className="mono scope-caption">FIG. 7 · Career signal</span>
      </figcaption>
    </figure>
  );
}
