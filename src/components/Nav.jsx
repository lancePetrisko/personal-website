import { useCallback, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { profile } from '../data.js';
import ContactCard from './ContactCard.jsx';

export default function Nav() {
  const [contactOpen, setContactOpen] = useState(false);
  const closeContact = useCallback(() => setContactOpen(false), []);

  return (
    <header className="nav">
      <Link to="/" className="nav-name">{profile.name}</Link>
      <nav className="nav-links">
        <NavLink to="/" end>home</NavLink>
        <NavLink to="/projects">projects</NavLink>
        <button
          type="button"
          className={`nav-btn${contactOpen ? ' active' : ''}`}
          onClick={() => setContactOpen((o) => !o)}
          aria-expanded={contactOpen}
        >
          contact
        </button>
      </nav>
      {contactOpen && <ContactCard onClose={closeContact} />}
    </header>
  );
}
