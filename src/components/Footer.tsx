import Link from "next/link";
import { site } from "@/lib/site";
import { InstagramIcon, LinkedInIcon, WhatsAppIcon, XIcon } from "./icons";
import { Logo } from "./Logo";
import { TrackedLink } from "./TrackedLink";

const socialIcons = { linkedin: LinkedInIcon, instagram: InstagramIcon, x: XIcon };

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <Logo light />
          <p className="footer-tagline">{site.tagline}</p>
          <p>Connecting people to opportunities to learn, grow and move forward.</p>
        </div>

        <div className="footer-links">
          <nav className="social" aria-label="Social media">
            {site.socials
              .filter((s) => s.url)
              .map((s) => {
                const Icon = socialIcons[s.key];
                return (
                  <a key={s.key} href={s.url} target="_blank" rel="noopener noreferrer" aria-label={s.label}>
                    <Icon />
                  </a>
                );
              })}
            <TrackedLink
              href={site.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp community"
              event="whatsapp_click_footer"
            >
              <WhatsAppIcon />
            </TrackedLink>
          </nav>
          <ul className="footer-nav">
            <li>
              <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>
            </li>
            <li>
              <Link href="/privacy">Privacy Policy</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="container footer-bottom">
        <p>© 2026 NexEmber. All rights reserved.</p>
        <p className="credit">
          Developed by{" "}
          <a href="https://emmanuelfaniyi.vercel.app" target="_blank" rel="noopener noreferrer">
            tech_with_dami
          </a>
        </p>
      </div>
    </footer>
  );
}
