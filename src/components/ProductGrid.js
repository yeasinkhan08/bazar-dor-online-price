import ProductCard from "./ProductCard";

// 1 column on mobile, 2 on tablet, 3 (or 4 if "wide") on large screens
function gridClass(wide) {
  const large = wide ? "lg:grid-cols-4" : "lg:grid-cols-3";
  return `grid grid-cols-1 gap-4 sm:grid-cols-2 ${large}`;
}

export function ProductGrid({ products, wide = false }) {
  return (
    <div className={gridClass(wide)}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

// Gray placeholder boxes shown while products are loading
export function ProductGridSkeleton({ count = 6, wide = false }) {
  return (
    <div className={gridClass(wide)}>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="skeleton h-44 w-full"></div>
      ))}
    </div>
  );
}
