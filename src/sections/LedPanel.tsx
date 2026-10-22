import { useEffect, useMemo, useState, type FormEvent } from 'react';
import { textToColumns } from '../lib/ledFont';
import { LED_COLORS, type LedColor } from '../lib/ledColors';

const WIDTH = 72;
const ROWS = 7;
const DEFAULT_MESSAGE = 'XANDER RASSCHAERT - IOT & EMBEDDED DEV - AVAILABLE FEB 2027';

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

interface Props {
  color: LedColor;
  onColorChange: (index: number) => void;
}

export function LedPanel({ color, onColorChange }: Props) {
  const [message, setMessage] = useState(DEFAULT_MESSAGE);
  const [offset, setOffset] = useState(0);
  const [paused, setPaused] = useState(prefersReducedMotion);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => setOffset((o) => o + 1), 80);
    return () => clearInterval(timer);
  }, [paused]);

  const columns = useMemo(() => textToColumns(message), [message]);

  const dots = [];
  for (let y = 0; y < ROWS; y++) {
    for (let x = 0; x < WIDTH; x++) {
      const on = columns[(x + offset) % columns.length][y];
      dots.push(
        <span
          key={y * WIDTH + x}
          className="led-dot"
          style={{ background: on ? color.on : color.off, boxShadow: on ? `0 0 6px ${color.glow}` : 'none' }}
        />,
      );
    }
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const input = e.currentTarget.elements.namedItem('msg') as HTMLInputElement;
    const value = input.value.trim();
    if (value) {
      setMessage(value.toUpperCase());
      setOffset(0);
    }
  };

  return (
    <figure className="led-figure">
      <div className="led-frame">
        <div className="led-grid" role="img" aria-label={`LED sign scrolling: ${message}`}>
          {dots}
        </div>
      </div>
      <figcaption className="led-controls">
        <span className="mono caption">FIG. 1 · Front panel, 72 × 7 LED matrix</span>
        <form onSubmit={handleSubmit} className="led-form">
          <label htmlFor="led-msg" className="mono caption">MESSAGE</label>
          <input id="led-msg" name="msg" type="text" maxLength={40} autoComplete="off" placeholder="HELLO" className="led-input" />
          <button type="submit" className="btn btn-solid">Display</button>
          <button type="button" className="btn btn-outline" onClick={() => setPaused((p) => !p)}>
            {paused ? 'Resume' : 'Pause'}
          </button>
          {LED_COLORS.map((c, i) => (
            <button
              key={c.name}
              type="button"
              className="led-swatch"
              aria-label={`${c.name} LEDs`}
              aria-pressed={c.name === color.name}
              onClick={() => onColorChange(i)}
              style={{ background: c.on, borderColor: c.name === color.name ? '#0a0a0a' : '#d4d4d4' }}
            />
          ))}
        </form>
      </figcaption>
    </figure>
  );
}
