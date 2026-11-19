import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { profile } from '../data.js';
import { copyText, GitHubIcon, LinkedInIcon } from './SocialLinks.jsx';

const clamp = (v, min, max) => Math.min(Math.max(v, min), Math.max(min, max));

// Draggable "business card" window. Drag anywhere on the card except
// interactive elements (close button, email).
export default function ContactCard({ onClose }) {
  const cardRef = useRef(null);
  const drag = useRef(null);
  const timer = useRef();
  const [pos, setPos] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [copied, setCopied] = useState(false);
  const { email, github, linkedin } = profile.links;

  // Start centered in the viewport.
  useLayoutEffect(() => {
    const { width, height } = cardRef.current.getBoundingClientRect();
    setPos({ x: (window.innerWidth - width) / 2, y: (window.innerHeight - height) / 2 });
    cardRef.current.focus();
  }, []);

  // Keep the card on screen when the window resizes.
  useEffect(() => {
    const onResize = () => {
      const { width, height } = cardRef.current.getBoundingClientRect();
      setPos((p) => p && {
        x: clamp(p.x, 0, window.innerWidth - width),
        y: clamp(p.y, 0, window.innerHeight - height),
      });
    };
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('resize', onResize);
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('keydown', onKey);
      clearTimeout(timer.current);
    };
  }, [onClose]);

  const onPointerDown = (e) => {
    if (e.button !== 0 || e.target.closest('button, a')) return;
    const rect = cardRef.current.getBoundingClientRect();
    drag.current = { dx: e.clientX - rect.left, dy: e.clientY - rect.top, w: rect.width, h: rect.height };
    cardRef.current.setPointerCapture(e.pointerId);
    setDragging(true);
  };

  const onPointerMove = useCallback((e) => {
    const d = drag.current;
    if (!d) return;
    setPos({
      x: clamp(e.clientX - d.dx, 0, window.innerWidth - d.w),
      y: clamp(e.clientY - d.dy, 0, window.innerHeight - d.h),
    });
  }, []);

  const endDrag = () => {
    drag.current = null;
    setDragging(false);
  };

  const onCopy = async () => {
    if (await copyText(email)) {
      setCopied(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 1800);
    }
  };

  return createPortal(
    <div
      ref={cardRef}
      className={`bcard${dragging ? ' dragging' : ''}`}
      style={pos ? { left: pos.x, top: pos.y } : { visibility: 'hidden' }}
      role="dialog"
      aria-label={`Contact ${profile.name}`}
      tabIndex={-1}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
    >
      <button type="button" className="bcard-close" onClick={onClose} aria-label="Close">
        <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M6 6l12 12M18 6 6 18" />
        </svg>
      </button>

      <div className="bcard-top">
        <span className="bcard-mark" aria-hidden="true">{profile.name.split(' ').map((w) => w[0]).join('').slice(0, 2)}</span>
      </div>

      <div className="bcard-body">
        <h2 className="bcard-name">{profile.name}</h2>
        <p className="bcard-role">{profile.role}<br />{profile.school}</p>
        <div className="bcard-rule" />
        <button type="button" className="bcard-email" onClick={onCopy} title="Copy email">
          {email}
          <span className="bcard-hint">{copied ? 'copied!' : 'click to copy'}</span>
        </button>
        <div className="bcard-links">
          <a href={github} target="_blank" rel="noreferrer" className="bcard-link">
            <GitHubIcon />
            <span>lancePetrisko</span>
          </a>
          <a href={linkedin} target="_blank" rel="noreferrer" className="bcard-link">
            <LinkedInIcon />
            <span>Lance Petrisko</span>
          </a>
        </div>
      </div>
    </div>,
    document.body,
  );
}
