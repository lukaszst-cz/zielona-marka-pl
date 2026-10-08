import Image from "next/image";

type Props = { src: string; alt: string; previewSrc?: string; width?: number; height?: number };

// Existing call sites now display a plain, non-interactive photo.
export default function ExpandableImage({ src, alt, previewSrc, width, height }: Props) {
  return <div className="static-owner-photo"><Image src={previewSrc || src} width={width ?? 1142} height={height ?? 1377} alt={alt} unoptimized /></div>;
}
