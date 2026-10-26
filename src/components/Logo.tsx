import Link from "next/link";

export function LogoMark({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true">
      <rect width="32" height="32" rx="8" fill="#3d1a78" />
      <path
        d="M16 5.5c1.2 3.4 6.5 6.6 6.5 12.3a6.5 6.5 0 0 1-13 0c0-2.9 1.6-4.9 3-6.4.2 1.9 1 3.1 2.2 3.6-.6-3.5.1-6.8 1.3-9.5z"
        fill="#ffc53d"
      />
      <circle cx="16" cy="19.5" r="2.4" fill="#fff" />
    </svg>
  );
}

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className={`logo${light ? " logo-light" : ""}`} aria-label="NexEmber home">
      <LogoMark />
      <span>
        Nex<span className="logo-accent">Ember</span>
      </span>
    </Link>
  );
}
