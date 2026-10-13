import { Suspense } from "react";
import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { getProductBySlug } from "@/lib/api";
import { toBn, formatPrice, unitLabel } from "@/lib/format";
import ChangeBadge from "@/components/ChangeBadge";
import EmptyState from "@/components/EmptyState";

// Gray placeholder shown while the product is loading
function ProductSkeleton() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      <div className="skeleton h-4 w-48"></div>
      <div className="skeleton h-32 w-full"></div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="skeleton h-24 w-full"></div>
        <div className="skeleton h-24 w-full"></div>
        <div className="skeleton h-24 w-full"></div>
      </div>
      <div className="skeleton h-80 w-full"></div>
    </section>
  );
}

// One small box in the price summary (min / max / average)
function PriceBox({ label, value, color }) {
  return (
    <div className="rounded-box border border-base-300 bg-base-100 p-4">
      <p className="text-sm text-base-content/60">{label}</p>
      <p className={`text-2xl font-bold ${color}`}>{value}</p>
    </div>
  );
}

// This part loads data, so it lives in its own component inside Suspense
async function ProductContent({ params }) {
  const { slug } = await params;

  // PROTECTED ROUTE: ask the server who is logged in
  const session = await auth.api.getSession({ headers: await headers() });

  // Not logged in: go to sign in, and remember where the user wanted to go
  if (!session) {
    redirect(`/signin?redirect=${encodeURIComponent(`/product/${slug}`)}`);
  }

  const product = await getProductBySlug(slug);

  // Invalid slug, e.g. /product/unknown
  if (!product) {
    return (
      <EmptyState
        icon="😕"
        title="৪০৪ — পণ্যটি খুঁজে পাওয়া যায়নি"
        message="আপনি যে পণ্যটি খুঁজছেন সেটি নেই বা সরিয়ে ফেলা হয়েছে।"
      />
    );
  }

  const markets = product.markets || [];

  // Price summary, calculated from the market data
  let lowest = 0;
  let highest = 0;
  let average = 0;

  if (markets.length > 0) {
    lowest = Math.min(...markets.map((market) => market.min));
    highest = Math.max(...markets.map((market) => market.max));

    // Each market's average is halfway between its min and max.
    // The overall average is the average of those market averages.
    const total = markets.reduce(
      (sum, market) => sum + (market.min + market.max) / 2,
      0,
    );
    average = Math.round((total / markets.length) * 100) / 100;
  }

  return (
    <section className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-base-content/60">
        <Link href="/" className="link link-hover">
          হোম
        </Link>
        {" / "}
        <Link
          href={`/category/${product.category}`}
          className="link link-hover"
        >
          {product.categoryNameBn}
        </Link>
        {" / "}
        <span className="text-base-content">{product.nameBn}</span>
      </nav>

      {/* Top summary: emoji, title, subtitle, tags, unit */}
      <div className="rounded-box border border-base-300 bg-base-100 p-6 flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="text-7xl">{product.image}</div>

        <div className="space-y-2 flex-1">
          <h1 className="text-3xl font-bold">{product.nameBn}</h1>

          {markets.length > 0 && (
            <p className="text-base-content/70">
              আজ {toBn(markets.length)}টি বাজারে {product.nameBn}-এর দাম{" "}
              {formatPrice(lowest)} থেকে {formatPrice(highest)} পর্যন্ত।
            </p>
          )}

          <div className="flex flex-wrap items-center gap-2">
            <Link
              href={`/category/${product.category}`}
              className="badge badge-outline"
            >
              {product.categoryIcon} {product.categoryNameBn}
            </Link>
            <span className="badge badge-ghost">{unitLabel(product.unit)}</span>
          </div>
        </div>

        <div className="sm:text-right space-y-1">
          <p className="text-xs text-base-content/60">আজকের দাম</p>
          <p className="text-2xl font-bold">{formatPrice(product.today)}</p>
          <ChangeBadge change={product.change} />
        </div>
      </div>

      {/* Price summary */}
      {markets.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-xl font-bold">দামের সারসংক্ষেপ</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <PriceBox
              label="সর্বনিম্ন দাম"
              value={formatPrice(lowest)}
              color="text-success"
            />
            <PriceBox
              label="সর্বোচ্চ দাম"
              value={formatPrice(highest)}
              color="text-error"
            />
            <PriceBox
              label="গড় দাম"
              value={formatPrice(average)}
              color="text-primary"
            />
          </div>
        </div>
      )}

      {/* Market-wise prices */}
      <div className="space-y-3">
        <h2 className="text-xl font-bold">বাজারভিত্তিক আজকের দাম</h2>

        {markets.length === 0 ? (
          <p className="text-base-content/60">
            বাজারভিত্তিক তথ্য পাওয়া যায়নি।
          </p>
        ) : (
          // The table scrolls sideways inside this box on small screens
          <div className="overflow-x-auto rounded-box border border-base-300 bg-base-100">
            <table className="table">
              <thead>
                <tr>
                  <th>বাজার</th>
                  <th>বিভাগ</th>
                  <th className="text-right">সর্বনিম্ন</th>
                  <th className="text-right">সর্বোচ্চ</th>
                  <th className="text-right">গড়</th>
                </tr>
              </thead>
              <tbody>
                {markets.map((market) => (
                  <tr key={`${market.division}-${market.market}`}>
                    <td className="font-semibold whitespace-nowrap">
                      {market.market}
                    </td>
                    <td className="whitespace-nowrap">{market.division}</td>
                    <td className="text-right whitespace-nowrap">
                      {formatPrice(market.min)}
                    </td>
                    <td className="text-right whitespace-nowrap">
                      {formatPrice(market.max)}
                    </td>
                    <td className="text-right whitespace-nowrap font-semibold">
                      {formatPrice((market.min + market.max) / 2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}

export default function ProductPage({ params }) {
  return (
    <main>
      <Suspense fallback={<ProductSkeleton />}>
        <ProductContent params={params} />
      </Suspense>
    </main>
  );
}
