import FaultyTerminal from './FaultyTerminal.jsx';
import SocialLinks from './SocialLinks.jsx';
import ProjectTiles from './ProjectTiles.jsx';
import { profile } from '../data.js';

export default function Hero() {
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
          curvature={0.60}
          vignette={0.30}
          clickEffect="none"
          scramble={0.01}
          scanlineIntensity={0.15}
          glitchAmount={0.3}
          flickerAmount={0.2}
          chromaticAberration={0.5}
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
        <ProjectTiles />
      </div>
    </section>
  );
}
