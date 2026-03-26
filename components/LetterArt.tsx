import Image, { type StaticImageData } from "next/image";

interface LetterArtProps {
  src: string | StaticImageData;
  alt: string;
  blurDataURL?: string;
  priority?: boolean;
  sizes?: string;
}

export default function LetterArt({
  src,
  alt,
  blurDataURL,
  priority = false,
  sizes = "(max-width: 768px) 100vw, 768px",
}: LetterArtProps) {
  const isStaticImport = typeof src !== "string";
  const usePlaceholder = isStaticImport || !!blurDataURL;

  return (
    <figure className="relative mx-auto mb-12 w-full max-w-3xl overflow-hidden rounded-sm border border-gold-dim/20">
      <div className="relative aspect-[4/3]">
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          className="object-cover"
          placeholder={usePlaceholder ? "blur" : "empty"}
          blurDataURL={isStaticImport ? undefined : blurDataURL}
          priority={priority}
        />
      </div>
    </figure>
  );
}
