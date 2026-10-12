import { getProducts } from "@/lib/api";
import {
  toBn,
  formatBanglaDate,
  formatPrice,
  formatChange,
  unitLabel,
} from "@/lib/format";

export default async function Home() {
  const products = await getProducts();

  return (
    <main className="max-w-6xl mx-auto p-6 space-y-4">
      <h1 className="text-3xl font-bold text-primary">🛒 বাজার দর</h1>
      <p>{formatBanglaDate()}</p>
      <p>মোট পণ্য: {toBn(products.length)}টি</p>

      <ul className="space-y-2">
        {products.slice(0, 5).map((product) => (
          <li key={product.id} className="card bg-base-200 p-4">
            {product.image} {product.nameBn} — {unitLabel(product.unit)} —{" "}
            {formatPrice(product.today)} — {formatChange(product.change)}
          </li>
        ))}
      </ul>
    </main>
  );
}
