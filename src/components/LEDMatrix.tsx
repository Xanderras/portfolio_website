import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface LEDMatrixProps {
  text: string;
  color?: 'amber' | 'green' | 'red';
}

export function LEDMatrix({ text, color = 'amber' }: LEDMatrixProps) {
  const [activePattern, setActivePattern] = useState<boolean[][]>([]);

  // Simple LED dot patterns for characters (5x7 grid)
  const charPatterns: { [key: string]: boolean[][] } = {
    'A': [
      [0,1,1,1,0],
      [1,0,0,0,1],
      [1,0,0,0,1],
      [1,1,1,1,1],
      [1,0,0,0,1],
      [1,0,0,0,1],
      [1,0,0,0,1],
    ],
    'D': [
      [1,1,1,1,0],
      [1,0,0,0,1],
      [1,0,0,0,1],
      [1,0,0,0,1],
      [1,0,0,0,1],
      [1,0,0,0,1],
      [1,1,1,1,0],
    ],
    'E': [
      [1,1,1,1,1],
      [1,0,0,0,0],
      [1,0,0,0,0],
      [1,1,1,1,0],
      [1,0,0,0,0],
      [1,0,0,0,0],
      [1,1,1,1,1],
    ],
    'N': [
      [1,0,0,0,1],
      [1,1,0,0,1],
      [1,0,1,0,1],
      [1,0,0,1,1],
      [1,0,0,0,1],
      [1,0,0,0,1],
      [1,0,0,0,1],
    ],
    'R': [
      [1,1,1,1,0],
      [1,0,0,0,1],
      [1,0,0,0,1],
      [1,1,1,1,0],
      [1,0,1,0,0],
      [1,0,0,1,0],
      [1,0,0,0,1],
    ],
    'X': [
      [1,0,0,0,1],
      [1,0,0,0,1],
      [0,1,0,1,0],
      [0,0,1,0,0],
      [0,1,0,1,0],
      [1,0,0,0,1],
      [1,0,0,0,1],
    ],
    ' ': [
      [0,0,0,0,0],
      [0,0,0,0,0],
      [0,0,0,0,0],
      [0,0,0,0,0],
      [0,0,0,0,0],
      [0,0,0,0,0],
      [0,0,0,0,0],
    ],
  };

  useEffect(() => {
    const pattern: boolean[][] = [];
    const upperText = text.toUpperCase();

    for (let row = 0; row < 7; row++) {
      pattern[row] = [];
      for (let charIndex = 0; charIndex < upperText.length; charIndex++) {
        const char = upperText[charIndex];
        const charPattern = charPatterns[char] || charPatterns[' '];

        pattern[row].push(...charPattern[row]);
        // Add spacing between characters
        if (charIndex < upperText.length - 1) {
          pattern[row].push(false);
        }
      }
    }

    setActivePattern(pattern);
  }, [text]);

  const colorClasses = {
    amber: 'bg-amber-500 shadow-amber-500/60',
    green: 'bg-green-500 shadow-green-500/60',
    red: 'bg-red-500 shadow-red-500/60',
  };

  return (
    <div className="inline-flex flex-col gap-1 p-3 bg-zinc-950/80 rounded-lg border border-zinc-800">
      {activePattern.map((row, rowIndex) => (
        <div key={rowIndex} className="flex gap-1">
          {row.map((isActive, colIndex) => (
            <motion.div
              key={`${rowIndex}-${colIndex}`}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: isActive ? 1 : 0.15,
                scale: 1,
              }}
              transition={{
                delay: (rowIndex * 0.02) + (colIndex * 0.01),
                duration: 0.3,
              }}
              className={`w-2 h-2 rounded-full ${
                isActive
                  ? `${colorClasses[color]} shadow-lg`
                  : 'bg-zinc-800/30'
              }`}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
