import { Footer } from "@/components/Footer";
import {
  BookIcon,
  CapIcon,
  GrowthIcon,
  MailIcon,
  RocketIcon,
  SwitchIcon,
  ToolsIcon,
  VideoIcon,
  WhatsAppIcon,
} from "@/components/icons";
import { Logo } from "@/components/Logo";
import { TrackedLink } from "@/components/TrackedLink";
import { WaitlistLink } from "@/components/WaitlistLink";
import { site } from "@/lib/site";

const opportunities = [
  { icon: VideoIcon, label: "Webinars" },
  { icon: ToolsIcon, label: "Workshops" },
  { icon: RocketIcon, label: "Boot camps" },
  { icon: BookIcon, label: "Structured learning programmes" },
];

const audiences = [
  {
    icon: CapIcon,
    title: "Beginners and Career Starters",
    text: "Discover learning opportunities that help you build skills, explore career paths and get started.",
  },
  {
    icon: SwitchIcon,
    title: "Job Seekers and Career Switchers",
    text: "Find opportunities to develop relevant skills, explore new directions and prepare for your next move.",
  },
  {
    icon: GrowthIcon,
    title: "Working Professionals",
    text: "Keep learning, strengthen your skills and discover opportunities for continued career growth.",
  },
];

export default function Home() {
  return (
    <>
      <header className="site-header">
        <div className="container">
          <Logo />
        </div>
      </header>

      <main>
        {/* 1. HERO */}
        <section className="hero">
          <div className="container hero-inner">
            <div className="hero-copy">
              <p className="eyebrow">Coming soon</p>
              <h1>
                Your next career opportunity <span className="highlight">starts here.</span>
              </h1>
              <p className="lead">
                We’re building NexEmber to help you discover learning opportunities that build your skills, open new
                possibilities and move your career forward.
              </p>
              <p className="lead secondary">
                From webinars and workshops to boot camps and structured learning programmes, we’re connecting people
                with opportunities to learn, grow and take their next step.
              </p>
              <div className="cta-row">
                <WaitlistLink className="btn btn-primary" event="waitlist_click_hero">
                  Join the Waitlist
                </WaitlistLink>
                <TrackedLink
                  href={site.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline"
                  event="whatsapp_click_hero"
                >
                  <WhatsAppIcon />
                  Join Our WhatsApp Community
                </TrackedLink>
              </div>
            </div>

            <aside className="hero-card" aria-label="Opportunities on NexEmber">
              <p className="hero-card-title">Opportunities to learn, grow and move forward</p>
              <ul>
                {opportunities.map(({ icon: Icon, label }) => (
                  <li key={label}>
                    <span className="hero-card-icon">
                      <Icon />
                    </span>
                    {label}
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </section>

        {/* 2. ABOUT */}
        <section className="section about">
          <div className="container narrow">
            <p className="section-label">About NexEmber</p>
            <h2>More than learning. A step towards what’s next.</h2>
            <p className="big">
              We believe everyone has an <strong>ember</strong>, the potential to grow, develop and do more.
            </p>
            <p>But potential needs the right opportunities to become progress.</p>
            <p>
              That’s why we’re building NexEmber: a career-growth platform that connects people with relevant learning
              opportunities to help them build skills, explore possibilities and take their next career step.
            </p>
            <p className="callout">Our goal is simple: make it easier to find opportunities that move you forward.</p>
          </div>
        </section>

        {/* 3. WHO IT'S FOR */}
        <section className="section audience">
          <div className="container">
            <p className="section-label center">Who it’s for</p>
            <h2 className="center">Wherever you are in your career, there’s room to grow.</h2>
            <div className="cards">
              {audiences.map(({ icon: Icon, title, text }) => (
                <article className="card" key={title}>
                  <div className="card-icon">
                    <Icon />
                  </div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* 4. WAITLIST */}
        <section className="section waitlist" id="waitlist">
          <div className="container narrow center">
            <p className="section-label on-dark">Join the waitlist</p>
            <h2>Be among the first.</h2>
            <p>
              NexEmber is coming soon. Join the waitlist to hear about our launch, upcoming opportunities and what’s
              next.
            </p>
            <WaitlistLink className="btn btn-yellow" event="waitlist_click_section">
              Join the Waitlist
            </WaitlistLink>
          </div>
        </section>

        {/* 5. COMMUNITY */}
        <section className="section community">
          <div className="container narrow center">
            <div className="community-badge">
              <WhatsAppIcon />
            </div>
            <h2>Stay connected while we build.</h2>
            <p>
              Want to stay in the loop? Join our WhatsApp community for updates, useful resources and news about
              career opportunities.
            </p>
            <TrackedLink
              href={site.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp"
              event="whatsapp_click_community"
            >
              <WhatsAppIcon />
              Join Our WhatsApp Community
            </TrackedLink>
          </div>
        </section>

        {/* 6. CONTACT */}
        <section className="section contact">
          <div className="container narrow">
            <div className="contact-card">
              <h2>Have an idea? Let’s hear it.</h2>
              <p>
                We’re building NexEmber to make career growth more accessible. If you have a question, an idea, or a
                suggestion for something you’d love to see on the platform, we’d love to hear from you.
              </p>
              <TrackedLink
                href={`mailto:${site.contactEmail}?subject=${encodeURIComponent("Hello NexEmber")}`}
                className="btn btn-primary"
                event="contact_click"
              >
                <MailIcon />
                Get in Touch
              </TrackedLink>
              <p className="small">
                Or email us at <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
