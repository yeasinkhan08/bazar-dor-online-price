import Link from "next/link";
import ChangeBadge from "./ChangeBadge";
import { formatPrice, unitLabel } from "@/lib/format";

export default function ProductCard({ product }) {
  return (
    // The whole card is a link to the product's detail page
    <Link
      href={`/product/${product.slug}`}
      className="card bg-base-100 border border-base-300 transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="card-body gap-2 p-4">
        {/* Emoji */}
        <div className="text-4xl">{product.image}</div>

        {/* Name and unit */}
        <h3 className="card-title text-lg">{product.nameBn}</h3>
        <p className="text-sm text-base-content/60">
          {unitLabel(product.unit)}
        </p>

        {/* Price row */}
        <div className="flex items-center justify-between gap-2 border-t border-base-300 pt-3">
          <div>
            <p className="text-xs text-base-content/60">আজকের দাম</p>
            <p className="text-lg font-bold">{formatPrice(product.today)}</p>
          </div>
          <ChangeBadge change={product.change} />
        </div>
      </div>
    </Link>
  );
}
