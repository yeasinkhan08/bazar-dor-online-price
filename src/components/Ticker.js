import { getProducts } from "@/lib/api";
import { formatPrice, formatChange, unitName } from "@/lib/format";

// Gray placeholder shown while prices are loading
export function TickerSkeleton() {
  return (
    <div className="bg-secondary h-10 flex items-center px-4">
      <div className="skeleton h-4 w-full opacity-30"></div>
    </div>
  );
}

// Colours that are easy to read on the dark green strip
function changeColor(dir) {
  if (dir === "up") return "text-green-300";
  if (dir === "down") return "text-red-300";
  return "text-gray-400";
}

// One full round of all the products
function TickerRound({ products, hidden }) {
  return products.map((product) => (
    <div
      key={`${product.id}-${hidden ? "copy" : "main"}`}
      className="flex items-center gap-2 px-6 whitespace-nowrap text-sm"
      aria-hidden={hidden ? "true" : undefined}
    >
      <span>{product.image}</span>
      <span className="font-semibold">{product.nameBn}</span>
      <span>
        {formatPrice(product.today)}/{unitName(product.unit)}
      </span>
      <span className={changeColor(product.change.dir)}>
        {formatChange(product.change)}
      </span>
    </div>
  ));
}

export default async function Ticker() {
  // If the API fails, simply show no ticker
  let products = [];
  try {
    products = await getProducts();
  } catch (error) {
    return null;
  }

  return (
    <div className="ticker bg-secondary text-secondary-content overflow-hidden">
      <div className="ticker-track py-2">
        {/* Two identical rounds make the loop look endless */}
        <TickerRound products={products} />
        <TickerRound products={products} hidden />
      </div>
    </div>
  );
}
