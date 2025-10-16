"use client";

import Image from "next/image";

type ProductCardVariant = "compact" | "default" | "expanded";
type BadgeVariant = "primary" | "secondary" | "danger";

interface ProductCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description: string;
  price: number;
  image: string;
  imageAlt: string;
  showCurrency?: boolean;
  badge?: string;
  badgeVariant?: BadgeVariant;
  variant?: ProductCardVariant;
}

export default function ProductCard(props: ProductCardProps) {
  const {
    title,
    description,
    price,
    image,
    imageAlt,
    showCurrency = true,
    badge,
    badgeVariant = "primary",
    variant = "default",
    onClick,
    className = "",
    ...rest
  } = props;

  // Format price to 2 decimal places
  const formattedPrice = price.toFixed(2);
  const priceDisplay = showCurrency ? `$${formattedPrice}` : formattedPrice;

  // Base classes for the card
  const baseClasses = [
    "border",
    "border-gray-200",
    "rounded-lg",
    "shadow-sm",
    "hover:shadow-md",
    "transition-shadow",
    "duration-200",
    "bg-white",
    "overflow-hidden",
  ].join(" ");

  // Variant classes for padding
  const variantClasses: Record<ProductCardVariant, string> = {
    compact: "p-3",
    default: "p-4",
    expanded: "p-6",
  };

  // Badge variant classes
  const badgeVariantClasses: Record<BadgeVariant, string> = {
    primary: "bg-cyan-600 text-white",
    secondary: "bg-gray-200 text-gray-800",
    danger: "bg-red-600 text-white",
  };

  // Cursor class based on onClick
  const cursorClass = onClick ? "cursor-pointer" : "";

  // Combine all classes
  const cardClasses = `${baseClasses} ${variantClasses[variant]} ${cursorClass} ${className}`.trim();

  return (
    <article {...rest} className={cardClasses} onClick={onClick}>
      <div className="relative mb-3">
        <Image
          src={image}
          alt={imageAlt}
          width={400}
          height={300}
          className="w-full h-48 object-cover rounded-md"
        />
        {badge && (
          <span
            className={`absolute top-2 right-2 px-2 py-1 rounded-md text-xs font-semibold ${badgeVariantClasses[badgeVariant]}`}
          >
            {badge}
          </span>
        )}
      </div>
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-sm text-gray-600 mb-3">{description}</p>
        <p className="text-xl font-bold text-cyan-600">{priceDisplay}</p>
      </div>
    </article>
  );
}
