const VARIANT_CLASSES = {
  navbar: "h-10 sm:h-12 w-auto max-w-[min(100%,300px)]",
  footer: "h-12 sm:h-14 w-auto max-w-[min(100%,340px)]",
  compact: "h-12 sm:h-14 w-auto max-w-[min(100%,320px)] mx-auto",
} as const;

interface BrandLogoProps {
  variant?: keyof typeof VARIANT_CLASSES;
  className?: string;
}

/**
 * Site logo from public/WMOG.png (served at /WMOG.png).
 */
const BrandLogo = ({ variant = "navbar", className = "" }: BrandLogoProps) => (
  <img
    src="/WMOG.png"
    alt="SurpreSaFeel Travels"
    className={`object-contain object-left ${VARIANT_CLASSES[variant]} ${className}`.trim()}
    decoding="async"
  />
);

export default BrandLogo;
