import { getProducts } from "@/lib/api";
import { ProductGrid, ProductGridSkeleton } from "./ProductGrid";

// Texts for the two sections ("up" = risers, "down" = fallers)
const SECTIONS = {
  up: {
    title: "আজ দাম বেড়েছে ▲",
    subtitle: "সবচেয়ে বেশি দাম বেড়েছে এমন ৬টি পণ্য",
    color: "text-success",
    empty: "আজ কোনো পণ্যের দাম বাড়েনি।",
  },
  down: {
    title: "আজ দাম কমেছে ▼",
    subtitle: "সবচেয়ে বেশি দাম কমেছে এমন ৬টি পণ্য",
    color: "text-error",
    empty: "আজ কোনো পণ্যের দাম কমেনি।",
  },
};

function MoversHeader({ type }) {
  const section = SECTIONS[type];
  return (
    <div>
      <h2 className={`text-2xl font-bold ${section.color}`}>{section.title}</h2>
      <p className="text-sm text-base-content/60">{section.subtitle}</p>
    </div>
  );
}

// Shown while the real section is loading
export function MoversSkeleton({ type }) {
  return (
    <section className="max-w-6xl mx-auto px-4 py-8 space-y-4">
      <MoversHeader type={type} />
      <ProductGridSkeleton count={6} />
    </section>
  );
}

export default async function Movers({ type }) {
  const products = await getProducts();

  const movers = products
    .filter((product) => product.change.dir === type)
    .sort((a, b) => Math.abs(b.change.pct) - Math.abs(a.change.pct))
    .slice(0, 6);

  return (
    <section className="max-w-6xl mx-auto px-4 py-8 space-y-4">
      <MoversHeader type={type} />

      {movers.length === 0 ? (
        <p className="text-base-content/60">{SECTIONS[type].empty}</p>
      ) : (
        <ProductGrid products={movers} />
      )}
    </section>
  );
}
