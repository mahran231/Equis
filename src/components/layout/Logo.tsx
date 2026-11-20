import Image from "next/image";
import wordmark from "../../../public/brand/web/equis-wordmark.png";
import symbol from "../../../public/brand/web/equis-symbol.png";

/** Supplied EQUIS artwork only — never typed text. Aspect ratio is preserved by next/image. */
export function Wordmark({ className = "", priority = false }: { className?: string; priority?: boolean }) {
  return (
    <Image
      src={wordmark}
      alt="EQUIS Nutrition"
      className={`h-auto ${className}`}
      sizes="(min-width: 768px) 160px, 128px"
      priority={priority}
    />
  );
}

export function Symbol({ className = "", alt = "" }: { className?: string; alt?: string }) {
  return <Image src={symbol} alt={alt} className={`h-auto ${className}`} sizes="320px" />;
}
