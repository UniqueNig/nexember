"use client";

import { useEffect, useState } from "react";
import { track } from "@vercel/analytics";
import { site } from "@/lib/site";

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign"] as const;
const STORAGE_KEY = "nexember_utm";

// Carry the visitor's UTM tags over to the Tally form, so signups show where
// people came from. Remembered for the session in case they browse to the
// privacy page and back. Tally only stores them if the form has matching
// hidden fields (see README).
function waitlistUrlWithUtm() {
  let utm: Record<string, string> = {};
  try {
    utm = JSON.parse(sessionStorage.getItem(STORAGE_KEY) || "{}");
  } catch {}

  const params = new URLSearchParams(window.location.search);
  const fresh: Record<string, string> = {};
  for (const key of UTM_KEYS) {
    const value = params.get(key);
    if (value) fresh[key] = value;
  }
  if (Object.keys(fresh).length > 0) {
    utm = fresh;
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(utm));
    } catch {}
  }

  const url = new URL(site.waitlistUrl);
  for (const [key, value] of Object.entries(utm)) url.searchParams.set(key, value);
  return url.toString();
}

type Props = {
  event: string;
  className?: string;
  children: React.ReactNode;
};

export function WaitlistLink({ event, className, children }: Props) {
  const [href, setHref] = useState(site.waitlistUrl);

  useEffect(() => {
    setHref(waitlistUrlWithUtm());
  }, []);

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className} onClick={() => track(event)}>
      {children}
    </a>
  );
}
