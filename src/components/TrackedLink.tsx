"use client";

import { track } from "@vercel/analytics";

type Props = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  event: string;
};

// A plain <a> that records a click event before following the link.
// Used for CTAs so we can see which buttons people actually use.
export function TrackedLink({ event, onClick, ...rest }: Props) {
  return (
    <a
      {...rest}
      onClick={(e) => {
        track(event);
        onClick?.(e);
      }}
    />
  );
}
