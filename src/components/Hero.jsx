import { useMemo, useSyncExternalStore } from 'react';
import { Link } from 'react-router-dom';
import FaultyTerminal from './FaultyTerminal.jsx';
import SocialLinks from './SocialLinks.jsx';
import FlexCarousel from './FlexCarousel.jsx';
import { profile, projects } from '../data.js';

const MOBILE_QUERY = '(max-width: 640px)';

function useIsMobile() {
  return useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia(MOBILE_QUERY);
      mq.addEventListener('change', onChange);
      return () => mq.removeEventListener('change', onChange);
    },
    () => window.matchMedia(MOBILE_QUERY).matches,
    () => false,
  );
}

export default function Hero() {
  // Barrel distortion is applied in screen UV space, so on a tall portrait
  // screen it bends far harder than on desktop. Flatten it on phones.
  const isMobile = useIsMobile();
  const items = useMemo(
    () => projects.map((p) => ({ src: p.image, alt: p.alt, title: p.title, subtitle: p.tech?.[0] })),
    [],
  );

  return (
    <section className="hero">
      <div className="hero-bg">
        <FaultyTerminal
          tint="#E4E4E7"
          glyphs="characters"
          scale={2.5}
          digitSize={1.1}
          timeScale={0.25}
          brightness={0.90}
          glow={0.95}
          persistence={0.28}
          mouseStrength={0.05}
          mouseGlow={0}
          curvature={isMobile ? 0.04 : 0.60}
          vignette={0.30}
          clickEffect="none"
          scramble={0.01}
          scanlineIntensity={0.15}
          glitchAmount={0.3}
          flickerAmount={0.2}
          chromaticAberration={isMobile ? 0.25 : 0.5}
        />
      </div>
      <div className="hero-scrim" />

      <div className="hero-content">
        <div className="hero-text">
          <p className="eyebrow">{profile.role}</p>
          <h1>{profile.name}</h1>
          <p className="hero-school">
            {profile.major} <span>@</span> {profile.school}
          </p>
          <p className="hero-bio">{profile.bio}</p>
          <ul className="skills">
            {profile.skills.map(skill => (
              <li key={skill}>{skill}</li>
            ))}
          </ul>
          <SocialLinks />
        </div>
        <div className="hero-projects">
          <div className="hero-carousel">
            <FlexCarousel
              items={items}
              preset="liquid"
              intro="rise"
              cardHeight={0.5}
              gap={12}
              squeeze={0.2}
              focusOnClick
              captions
              captureWheel={false}
            />
          </div>
          <Link to="/projects" className="hero-projects-link">all projects →</Link>
        </div>
      </div>
    </section>
  );
}
