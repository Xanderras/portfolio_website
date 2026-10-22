import { CONTACT, LANGUAGES, PINS_LEFT, PINS_RIGHT, PROJECTS, SKILLS } from '../data/portfolio';
import type { LedColor } from '../lib/ledColors';
import { LedPanel } from './LedPanel';

export function Header() {
  return (
    <header className="site-header">
      <nav aria-label="Main" className="wrap nav">
        <a href="#top" className="mono brand">
          XR-2027 <span className="brand-sub">/ Xander Rasschaert</span>
        </a>
        <div className="nav-links">
          <a href="#about">About</a>
          <a href="#skills">Skills</a>
          <a href="#projects">Projects</a>
          <a href="#experience">Experience</a>
          <a href="#contact" className="nav-cta">Contact</a>
        </div>
      </nav>
    </header>
  );
}

interface HeroProps {
  color: LedColor;
  onColorChange: (index: number) => void;
}

export function Hero({ color, onColorChange }: HeroProps) {
  return (
    <section id="top" className="wrap hero">
      <div className="mono sheet-meta">
        <span>DATASHEET · REV 2026.10</span>
        <span>
          STATUS: <span className="chip">AVAILABLE FEB 2027</span>
        </span>
      </div>
      <LedPanel color={color} onColorChange={onColorChange} />
      <div className="hero-body">
        <div className="hero-text">
          <h1>
            Xander
            <br />
            Rasschaert
          </h1>
          <p className="lead">
            IoT &amp; embedded developer in training. One part that covers the circuit board, the firmware and the software.
          </p>
        </div>
        <figure className="hero-photo">
          <img src="/assets/images/profile.jpg" alt="Portrait of Xander Rasschaert" width={640} height={767} />
          <figcaption className="mono caption">FIG. 2 · Package outline · Wetteren, BE</figcaption>
        </figure>
      </div>
    </section>
  );
}

export function About() {
  return (
    <section id="about" className="wrap section about">
      <div>
        <h2 className="mono section-title">1 · GENERAL DESCRIPTION</h2>
        <p>
          Electronics-ICT student (IoT Developer track) at Odisee, graduating January 2027 and looking for a job as an IoT
          or embedded developer.
        </p>
        <p>
          Previously a bachelor in Applied Computer Science (HOGENT) and two years of the Industrial Engineering bridging
          programme at KU Leuven. Chose a hands-on programme to build, test and debug myself.
        </p>
        <p>
          Now Student Software Engineer at LegalFly, grown from data engineering into fixing bugs and shipping features. Head
          animator and instructor at Kazou.
        </p>
      </div>
      <div>
        <h2 className="mono section-title">2 · QUICK START</h2>
        <div className="quick-links">
          <a href={CONTACT.cv} download>
            Download CV <span className="mono">PDF</span>
          </a>
          <a href={CONTACT.github} target="_blank" rel="noopener noreferrer">
            GitHub <span className="mono">@Xanderras</span>
          </a>
          <a href={CONTACT.linkedin} target="_blank" rel="noopener noreferrer">
            LinkedIn <span className="mono">Profile</span>
          </a>
        </div>
        <div className="lang-list">
          {LANGUAGES.map((l) => (
            <span key={l.name} className="mono lang">
              {l.name}: {l.level}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Pinout() {
  return (
    <section id="skills" className="wrap section">
      <h2 className="mono section-title">3 · PIN CONFIGURATION (SKILLS)</h2>
      <div className="mono pinout">
        <ul className="pins pins-left">
          {PINS_LEFT.map((name, i) => (
            <li key={name}>
              {name} <span className="pin-leg" /> <b>{i + 1}</b>
            </li>
          ))}
        </ul>
        <div className="chip-body" aria-hidden="true">
          <span className="chip-notch" />
          <span className="chip-name">XR-2027</span>
          <span className="chip-pkg">8-PIN · DIP</span>
        </div>
        <ul className="pins pins-right">
          {PINS_RIGHT.map((name, i) => (
            <li key={name}>
              <b>{PINS_LEFT.length * 2 - i}</b> <span className="pin-leg" /> {name}
            </li>
          ))}
        </ul>
      </div>
      <div className="skill-groups">
        {SKILLS.map((g) => (
          <div key={g.group} className="skill-group">
            <h3>{g.group}</h3>
            <p className="mono">
              {g.items.map((s) => (
                <span key={s}>{s}</span>
              ))}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function Projects() {
  const hasHardware = PROJECTS.some((p) => p.kind === 'Hardware');
  return (
    <section id="projects" className="wrap section">
      <h2 className="mono section-title">4 · TYPICAL APPLICATIONS (PROJECTS)</h2>
      <div className="project-grid">
        {PROJECTS.map((p) => (
          <article key={p.title} className="project">
            {p.img ? (
              <img src={p.img} alt={`Screenshot of ${p.title}`} loading="lazy" className="project-media" />
            ) : (
              <div className="project-media project-code mono" aria-hidden="true">
                {p.code}
              </div>
            )}
            <p className="mono caption">
              {p.fig} · {p.kind} · {p.years}
            </p>
            <h3>{p.title}</h3>
            <p className="project-desc">{p.desc}</p>
            <p className="tag-list">
              {p.tags.map((t) => (
                <span key={t} className="mono chip">
                  {t}
                </span>
              ))}
            </p>
            <p className="link-list">
              {p.links.map((l) => (
                <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer">
                  {l.label}
                </a>
              ))}
            </p>
          </article>
        ))}
        {!hasHardware && (
          <article className="project">
            <div className="project-media project-placeholder mono">Hardware project coming soon</div>
            <p className="mono caption">FIG. 6 · Hardware · in progress</p>
            <h3>First hardware build</h3>
            <p className="project-desc">An ESP32 or custom PCB project lands here next.</p>
          </article>
        )}
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap mono footer-row">
        <p>© {new Date().getFullYear()} Xander Rasschaert</p>
        <p>XR-2027 · Page 1 of 1</p>
      </div>
    </footer>
  );
}
