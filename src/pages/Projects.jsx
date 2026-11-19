import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { projects } from '../data.js';

export default function Projects() {
  const { hash } = useLocation();
  const target = hash.slice(1);

  useEffect(() => {
    if (!target) return;
    document.getElementById(target)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, [target]);

  return (
    <section className="page projects">
      <div className="section-head">
        <p className="eyebrow">01 — work</p>
        <h2>Projects</h2>
      </div>
      <div className="project-grid">
        {projects.map((p, i) => (
          <a
            key={p.title}
            id={`project-${i + 1}`}
            href={p.link}
            className={`project-card${target === `project-${i + 1}` ? ' is-target' : ''}`} target={p.link?.startsWith('http') ? '_blank' : undefined} rel="noreferrer">
            <span className="project-index">{String(i + 1).padStart(2, '0')}</span>
            <h3>{p.title} <span className="arrow">↗</span></h3>
            <p>{p.description}</p>
            <ul className="tags">
              {p.tech.map(t => <li key={t}>{t}</li>)}
            </ul>
          </a>
        ))}
      </div>
    </section>
  );
}
