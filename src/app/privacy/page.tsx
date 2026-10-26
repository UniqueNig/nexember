import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Logo } from "@/components/Logo";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy — NexEmber",
  description: "How NexEmber collects and uses the information you share when you join our waitlist.",
};

export default function PrivacyPage() {
  const email = site.contactEmail;

  return (
    <>
      <header className="site-header">
        <div className="container">
          <Logo />
        </div>
      </header>

      <main className="section">
        <article className="container narrow prose">
          <Link href="/" className="back-link">
            ← Back to home
          </Link>
          <h1>Privacy Policy</h1>
          <p className="muted">Last updated: 26 October 2026</p>

          <p>
            This policy explains what information NexEmber (“we”, “us”) collects through this website, why we collect
            it and how we look after it. We keep it simple: we only collect what we need to keep you updated about
            NexEmber.
          </p>

          <h2>What we collect</h2>
          <p>When you join our waitlist, we collect:</p>
          <ul>
            <li>your name and email address;</li>
            <li>your career stage, if you choose to tell us;</li>
            <li>
              basic information about how you found us, such as the website that referred you or the campaign link you
              clicked, the date and time you signed up, and your browser type.
            </li>
          </ul>
          <p>
            We also use privacy-friendly website analytics to count visits and button clicks. This does not use
            cookies and does not identify you personally.
          </p>

          <h2>How we use it</h2>
          <ul>
            <li>to tell you when NexEmber launches;</li>
            <li>to share upcoming learning and career opportunities and other NexEmber news;</li>
            <li>to understand who is interested in NexEmber so we can build something useful;</li>
            <li>to see which channels people find us through, so we can improve how we reach people.</li>
          </ul>
          <p>
            We will not sell your information or share it with other companies for their own marketing.
          </p>

          <h2>Where it is stored</h2>
          <p>
            Waitlist signups are stored securely in Google Workspace (Google Sheets), which only authorised members of
            the NexEmber team can access. Our website is hosted by Vercel. These providers process data on our
            behalf and under their own security and privacy commitments.
          </p>

          <h2>How long we keep it</h2>
          <p>
            We keep your information until you ask us to remove it or unsubscribe, or until we no longer need it to
            keep you updated about NexEmber.
          </p>

          <h2>Your choices and rights</h2>
          <p>You can, at any time:</p>
          <ul>
            <li>unsubscribe using the link in any email we send;</li>
            <li>ask for a copy of the information we hold about you;</li>
            <li>ask us to correct or delete your information.</li>
          </ul>
          <p>
            To do any of these, email us at <a href={`mailto:${email}`}>{email}</a>. We will respond as soon as we
            can, and in any case within the time required by applicable data protection law.
          </p>

          <h2>WhatsApp community</h2>
          <p>
            If you join our WhatsApp community, your use of WhatsApp is governed by WhatsApp’s own terms and privacy
            policy. Other members of the community may be able to see your profile, depending on the community’s
            settings and your WhatsApp privacy settings.
          </p>

          <h2>Changes to this policy</h2>
          <p>
            We may update this policy as NexEmber grows. When we do, we will change the “last updated” date above.
          </p>

          <h2>Contact</h2>
          <p>
            Questions about your privacy? Email <a href={`mailto:${email}`}>{email}</a>.
          </p>
        </article>
      </main>

      <Footer />
    </>
  );
}
