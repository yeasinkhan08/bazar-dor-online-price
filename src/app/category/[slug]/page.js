import { Suspense } from "react";
import { getCategory, getProducts } from "@/lib/api";
import { toBn } from "@/lib/format";
import { ProductGridSkeleton } from "@/components/ProductGrid";
import SortableProducts from "@/components/SortableProducts";
import EmptyState from "@/components/EmptyState";

// Gray placeholder shown while the category is loading
function CategorySkeleton() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      <div className="flex items-center gap-3">
        <div className="skeleton h-14 w-14 rounded-full"></div>
        <div className="space-y-2">
          <div className="skeleton h-7 w-40"></div>
          <div className="skeleton h-4 w-28"></div>
        </div>
      </div>
      <ProductGridSkeleton count={8} wide />
    </section>
  );
}

// This part loads the data, so it lives in its own component inside Suspense
async function CategoryContent({ params }) {
  // The slug is the last part of the URL, e.g. "chal" in /category/chal
  const { slug } = await params;

  const [category, products] = await Promise.all([
    getCategory(slug),
    getProducts(slug),
  ]);

  // Invalid slug, e.g. /category/invalid
  if (!category) {
    return (
      <EmptyState
        icon="😕"
        title="৪০৪ — ক্যাটাগরিটি খুঁজে পাওয়া যায়নি"
        message="আপনি যে ক্যাটাগরিটি খুঁজছেন সেটি নেই বা সরিয়ে ফেলা হয়েছে।"
      />
    );
  }

  // Valid category, but no products in it
  if (products.length === 0) {
    return (
      <EmptyState
        icon={category.icon}
        title="এই ক্যাটাগরিতে কোনো পণ্য নেই"
        message="অন্য ক্যাটাগরি দেখুন অথবা হোম পেজে ফিরে যান।"
      />
    );
  }

  return (
    <section className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      {/* Title + icon */}
      <div className="flex items-center gap-3">
        <span className="text-5xl">{category.icon}</span>
        <div>
          <h1 className="text-3xl font-bold">{category.nameBn}</h1>
          <p className="text-sm text-base-content/60">
            মোট {toBn(products.length)}টি পণ্য
          </p>
        </div>
      </div>

      {/* Sort dropdown + product cards */}
      <SortableProducts products={products} />
    </section>
  );
}

export default function CategoryPage({ params }) {
  return (
    <main>
      <Suspense fallback={<CategorySkeleton />}>
        <CategoryContent params={params} />
      </Suspense>
    </main>
  );
}
