import { Link } from 'react-router-dom';
import { projects } from '../data.js';

const SLOTS = 12; // 2 columns x 6 rows

export default function ProjectTiles() {
  const tiles = Array.from({ length: SLOTS }, (_, i) => projects[i] || null);

  return (
    <nav className="tiles" aria-label="Project previews">
      {tiles.map((p, i) => {
        const num = String(i + 1).padStart(2, '0');
        const style = { '--i': i };
        if (!p) {
          return (
            <div key={i} className="tile tile-empty" style={style} aria-hidden="true">
              <span className="tile-num">{num}</span>
              <span className="tile-title">soon</span>
            </div>
          );
        }
        return (
          <Link key={i} to={`/projects#project-${i + 1}`} className="tile" style={style}>
            <span className="tile-num">{num}</span>
            <span className="tile-title">{p.title}</span>
            {p.tech?.[0] && <span className="tile-tag">{p.tech[0]}</span>}
          </Link>
        );
      })}
    </nav>
  );
}
