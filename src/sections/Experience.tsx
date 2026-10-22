import { useState } from 'react';
import { EXPERIENCE, GROUP_LABEL, type ExperienceGroup } from '../data/portfolio';
import { Scope } from './Scope';

type Filter = 'all' | ExperienceGroup;

const FILTERS: { id: Filter; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'work', label: 'Work' },
  { id: 'education', label: 'Education' },
  { id: 'volunteer', label: 'Volunteer' },
];

const VISIBLE = 5;

export function Experience() {
  const [filter, setFilter] = useState<Filter>('all');
  const [showAll, setShowAll] = useState(false);

  const list = EXPERIENCE.filter((x) => filter === 'all' || x.group === filter);
  const shown = showAll ? list : list.slice(0, VISIBLE);
  const filterLabel = FILTERS.find((f) => f.id === filter)?.label.toUpperCase() ?? 'ALL';

  return (
    <section id="experience" className="wrap section">
      <h2 className="mono section-title">5 · TYPICAL CHARACTERISTICS (EXPERIENCE)</h2>
      <Scope filterLabel={filterLabel} count={list.length} />

      <div role="group" aria-label="Filter experience" className="filter-row">
        {FILTERS.map((f) => {
          const count = f.id === 'all' ? EXPERIENCE.length : EXPERIENCE.filter((x) => x.group === f.id).length;
          return (
            <button
              key={f.id}
              type="button"
              aria-pressed={f.id === filter}
              className={`btn ${f.id === filter ? 'btn-solid' : 'btn-outline'}`}
              onClick={() => {
                setFilter(f.id);
                setShowAll(false);
              }}
            >
              {f.label} · {count}
            </button>
          );
        })}
      </div>

      <div className="rev-table">
        <div className="rev-row rev-head mono" aria-hidden="true">
          <span>DATE</span>
          <span>ROLE</span>
          <span>ORGANIZATION</span>
          <span>TYPE</span>
        </div>
        <ul>
          {shown.map((x) => (
            <li key={`${x.org}-${x.date}`} className="rev-row">
              <span className="mono rev-date">{x.date}</span>
              <span className="rev-role">
                <strong>{x.role}</strong>
                {x.desc && <span>{x.desc}</span>}
              </span>
              <span className="rev-org">{x.org}</span>
              <span>
                <span className="mono rev-kind">{x.kind ?? GROUP_LABEL[x.group]}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>

      {list.length > VISIBLE && (
        <button type="button" className="btn btn-outline show-all" onClick={() => setShowAll((s) => !s)}>
          {showAll ? 'Show less' : `Show all ${list.length}`}
        </button>
      )}
    </section>
  );
}
