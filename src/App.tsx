import { useState, type CSSProperties } from 'react';
import { LED_COLORS } from './lib/ledColors';
import { About, Footer, Header, Hero, Pinout, Projects } from './sections/Sections';
import { Experience } from './sections/Experience';
import { Contact } from './sections/Contact';

function App() {
  const [colorIndex, setColorIndex] = useState(0);
  const color = LED_COLORS[colorIndex];

  return (
    <div className="page" style={{ '--chip': color.chip, '--led-on': color.on, '--led-glow': color.glow } as CSSProperties}>
      <a href="#about" className="skip-link">Skip to content</a>
      <Header />
      <main>
        <Hero color={color} onColorChange={setColorIndex} />
        <About />
        <Pinout />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
