import { profile } from '../data.js';
import SocialLinks from '../components/SocialLinks.jsx';

export default function Contact() {
  const { email } = profile.links;
  return (
    <section className="page contact">
      <p className="eyebrow">02 — contact</p>
      <h2>Let's talk.</h2>
      <a className="contact-email" href={`mailto:${email}`}>{email}</a>
      <SocialLinks className="contact-socials" />
      <p className="contact-copy">© {new Date().getFullYear()} {profile.name}</p>
    </section>
  );
}
