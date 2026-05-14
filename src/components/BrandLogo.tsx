const VARIANT_CLASSES = {
  navbar: "h-8 sm:h-10 w-auto max-w-[min(100%,240px)]",
  footer: "h-10 sm:h-11 w-auto max-w-[min(100%,280px)]",
  compact: "h-8 w-auto max-w-[200px] mx-auto",
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
