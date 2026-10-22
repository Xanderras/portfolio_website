export interface LedColor {
  name: string;
  on: string;
  off: string;
  glow: string;
  /** Light tint used for highlights on the white page. */
  chip: string;
}

export const LED_COLORS: LedColor[] = [
  { name: 'Green', on: '#39ff7a', off: '#0b2416', glow: 'rgba(57,255,122,.7)', chip: '#86efac' },
  { name: 'Amber', on: '#ffb020', off: '#2a1c06', glow: 'rgba(255,176,32,.75)', chip: '#fde047' },
  { name: 'Red', on: '#ff3b30', off: '#2a0c0a', glow: 'rgba(255,59,48,.75)', chip: '#fca5a5' },
];
