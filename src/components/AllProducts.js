import { getProducts } from "@/lib/api";
import { toBn } from "@/lib/format";
import { ProductGrid, ProductGridSkeleton } from "./ProductGrid";

// The id is what the hero button scrolls to; scroll-mt keeps the heading
// clear of the sticky navbar after the jump
const SECTION_CLASS = "max-w-6xl mx-auto px-4 py-8 space-y-4 scroll-mt-32";

// Shown while the real section is loading (keeps the same id, so the
// hero button still works even before the data arrives)
export function AllProductsSkeleton() {
  return (
    <section id="সব-পণ্য" className={SECTION_CLASS}>
      <div>
        <h2 className="text-2xl font-bold">সব পণ্য</h2>
        <p className="text-sm text-base-content/60">
          নিত্যদিনের সব পণ্যের আজকের দাম
        </p>
      </div>
      <ProductGridSkeleton count={8} wide />
    </section>
  );
}

export default async function AllProducts() {
  const products = await getProducts();

  return (
    <section id="সব-পণ্য" className={SECTION_CLASS}>
      <div>
        <h2 className="text-2xl font-bold">সব পণ্য</h2>
        <p className="text-sm text-base-content/60">
          নিত্যদিনের সব পণ্যের আজকের দাম · মোট {toBn(products.length)}টি পণ্য
          দেখানো হচ্ছে
        </p>
      </div>

      {products.length === 0 ? (
        <p className="text-base-content/60">কোনো পণ্য পাওয়া যায়নি।</p>
      ) : (
        <ProductGrid products={products} wide />
      )}
    </section>
  );
}
