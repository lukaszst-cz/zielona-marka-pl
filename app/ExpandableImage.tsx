type Props = { src: string; alt: string; previewSrc?: string; width?: number; height?: number };

// Existing call sites now display a plain, non-interactive photo.
export default function ExpandableImage({ src, alt, previewSrc, width, height }: Props) {
  return <div className="static-owner-photo"><img src={previewSrc || src} width={width} height={height} alt={alt} loading="lazy" decoding="async" /></div>;
}
