import { careerStages } from "./site";

// Shared by the form (instant feedback) and the API route (the real check).

export type WaitlistInput = {
  name: string;
  email: string;
  stage: string;
  consent: boolean;
};

export type FieldErrors = Partial<Record<"name" | "email" | "consent", string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateWaitlist(input: WaitlistInput): FieldErrors {
  const errors: FieldErrors = {};
  const name = input.name.trim();
  const email = input.email.trim();

  if (!name) errors.name = "Please enter your name.";
  else if (name.length > 100) errors.name = "Please use 100 characters or fewer.";

  if (!email) errors.email = "Please enter your email address.";
  else if (email.length > 200 || !EMAIL_RE.test(email))
    errors.email = "Please enter a valid email address, e.g. name@example.com.";

  if (!input.consent) errors.consent = "Please confirm you’re happy to hear from us.";

  return errors;
}

export function isValidStage(stage: string) {
  return stage === "" || (careerStages as readonly string[]).includes(stage);
}
