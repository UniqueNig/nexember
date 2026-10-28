import Image from "next/image";
import Link from "next/link";

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className={`logo${light ? " logo-light" : ""}`} aria-label="NexEmber home">
      <Image
        src={light ? "/logo-white.png" : "/logo.png"}
        alt="NexEmber"
        width={1200}
        height={234}
        priority={!light}
      />
    </Link>
  );
}
