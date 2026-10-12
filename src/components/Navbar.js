import Link from "next/link";
import { getCategories } from "@/lib/api";
import { formatBanglaDate } from "@/lib/format";
import CategoryLinks from "./CategoryLinks";

export default async function Navbar() {
  // If the API fails, show the navbar without chips instead of crashing
  let categories = [];
  try {
    categories = await getCategories();
  } catch (error) {
    categories = [];
  }

  return (
    <header className="sticky top-0 z-40 bg-base-100 border-b border-base-300">
      <div className="max-w-6xl mx-auto px-4">
        {/* Row 1: logo + date on the left, auth buttons on the right */}
        <div className="flex items-center justify-between gap-3 py-3">
          <Link href="/" className="flex flex-col leading-tight">
            <span className="text-xl font-bold text-primary">🛒 বাজার দর</span>
            <span className="text-xs text-base-content/60">
              {formatBanglaDate()}
            </span>
          </Link>

          <div className="flex items-center gap-2">
            <Link href="/signin" className="btn btn-ghost btn-sm sm:btn-md">
              সাইন ইন
            </Link>
            <Link href="/signup" className="btn btn-primary btn-sm sm:btn-md">
              সাইন আপ
            </Link>
          </div>
        </div>

        {/* Row 2: category chips */}
        <CategoryLinks categories={categories} />
      </div>
    </header>
  );
}
