// Central place for brand copy and outbound links.
// Links can be overridden with environment variables (see .env.example)
// so they can be changed in Vercel without touching code.

export const site = {
  name: "NexEmber",
  tagline: "Your next career opportunity starts here.",
  description:
    "Connecting people to the right opportunities to learn, grow and move forward in their careers.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://www.nexember.org",
  waitlistUrl: process.env.NEXT_PUBLIC_WAITLIST_URL || "https://tally.so/r/zExG0Z",
  whatsappUrl:
    process.env.NEXT_PUBLIC_WHATSAPP_URL || "https://whatsapp.com/channel/0029Vb8LFvyEawduwKQqWI2m",
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "hello@nexember.com",
  socials: [
    {
      label: "LinkedIn",
      key: "linkedin",
      url: process.env.NEXT_PUBLIC_LINKEDIN_URL || "https://www.linkedin.com/company/nexember/",
    },
    { label: "Instagram", key: "instagram", url: process.env.NEXT_PUBLIC_INSTAGRAM_URL },
    { label: "X (Twitter)", key: "x", url: process.env.NEXT_PUBLIC_X_URL },
  ] as const,
};
