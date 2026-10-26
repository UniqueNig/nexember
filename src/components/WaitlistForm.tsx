"use client";

import { useEffect, useRef, useState } from "react";
import { track } from "@vercel/analytics";
import { careerStages, site } from "@/lib/site";
import { type FieldErrors, validateWaitlist } from "@/lib/waitlist";
import { CheckIcon, WhatsAppIcon } from "./icons";
import { TrackedLink } from "./TrackedLink";

const SOURCE_KEY = "nexember_source";

type Source = {
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  referrer: string;
  landingPage: string;
};

// Remember where the visitor first came from (UTM tags / referrer) for this
// browser session, so it is still known if they browse to the privacy page and back.
function captureSource(): Source {
  try {
    const saved = sessionStorage.getItem(SOURCE_KEY);
    if (saved) return JSON.parse(saved);
  } catch {}

  const params = new URLSearchParams(window.location.search);
  const source: Source = {
    utmSource: params.get("utm_source") || "",
    utmMedium: params.get("utm_medium") || "",
    utmCampaign: params.get("utm_campaign") || "",
    referrer: document.referrer && !document.referrer.startsWith(window.location.origin) ? document.referrer : "",
    landingPage: window.location.pathname + window.location.search,
  };
  try {
    sessionStorage.setItem(SOURCE_KEY, JSON.stringify(source));
  } catch {}
  return source;
}

export function WaitlistForm() {
  const [values, setValues] = useState({ name: "", email: "", stage: "", consent: false, website: "" });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const source = useRef<Source | null>(null);
  const successRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    source.current = captureSource();
  }, []);

  useEffect(() => {
    if (status === "success") successRef.current?.focus();
  }, [status]);

  const update = (field: keyof typeof values, value: string | boolean) => {
    setValues((v) => ({ ...v, [field]: value }));
    if (field in errors) setErrors((e) => ({ ...e, [field]: undefined }));
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found = validateWaitlist(values);
    setErrors(found);
    const firstInvalid = (["name", "email", "consent"] as const).find((f) => found[f]);
    if (firstInvalid) {
      document.getElementById(firstInvalid)?.focus();
      return;
    }

    setStatus("submitting");
    setMessage("");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, ...source.current }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        if (data.errors) setErrors(data.errors);
        throw new Error(data.error || "Something went wrong. Please try again.");
      }
      track("waitlist_signup", { source: source.current?.utmSource || "direct" });
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="success" ref={successRef} tabIndex={-1}>
        <div className="success-icon">
          <CheckIcon />
        </div>
        <h3>You’re on the list!</h3>
        <p>Thanks for joining. We’ll be in touch with launch news and opportunities soon.</p>
        <p>In the meantime, come and say hello in our community.</p>
        <TrackedLink
          href={site.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-whatsapp"
          event="whatsapp_click_success"
        >
          <WhatsAppIcon />
          Join Our WhatsApp Community
        </TrackedLink>
      </div>
    );
  }

  const describe = (field: keyof FieldErrors) => (errors[field] ? `${field}-error` : undefined);

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="field">
        <label htmlFor="name">
          Full name <span className="req" aria-hidden="true">*</span>
        </label>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          maxLength={100}
          required
          value={values.name}
          onChange={(e) => update("name", e.target.value)}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={describe("name")}
        />
        {errors.name && <p className="error" id="name-error">{errors.name}</p>}
      </div>

      <div className="field">
        <label htmlFor="email">
          Email address <span className="req" aria-hidden="true">*</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          maxLength={200}
          required
          value={values.email}
          onChange={(e) => update("email", e.target.value)}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={describe("email")}
        />
        {errors.email && <p className="error" id="email-error">{errors.email}</p>}
      </div>

      <div className="field">
        <label htmlFor="stage">
          Where are you in your career? <span className="optional">(optional)</span>
        </label>
        <select id="stage" name="stage" value={values.stage} onChange={(e) => update("stage", e.target.value)}>
          <option value="">Select one</option>
          {careerStages.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </div>

      <div className="field checkbox">
        <input
          id="consent"
          name="consent"
          type="checkbox"
          checked={values.consent}
          onChange={(e) => update("consent", e.target.checked)}
          aria-invalid={Boolean(errors.consent)}
          aria-describedby={describe("consent")}
        />
        <label htmlFor="consent">
          I’d like to receive updates from NexEmber and have read the{" "}
          <a href="/privacy" target="_blank">
            privacy policy
          </a>
          .
        </label>
        {errors.consent && <p className="error" id="consent-error">{errors.consent}</p>}
      </div>

      {/* Spam trap: hidden from people, bots tend to fill it in */}
      <div className="hp" aria-hidden="true">
        <label htmlFor="website">Leave this empty</label>
        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.website}
          onChange={(e) => update("website", e.target.value)}
        />
      </div>

      <button type="submit" className="btn btn-primary btn-block" disabled={status === "submitting"}>
        {status === "submitting" ? "Joining…" : "Join the Waitlist"}
      </button>
      <p className="form-status" role="status" aria-live="polite">
        {status === "error" ? message : ""}
      </p>
    </form>
  );
}
