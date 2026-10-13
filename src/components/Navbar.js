import Link from "next/link";
import { getCategories } from "@/lib/api";
import { formatBanglaDate } from "@/lib/format";
import { CategoryLinks } from "./CategoryLinks";
import AuthButtons from "./AuthButtons";

// Shown for a moment while the real navbar is loading
export function NavbarSkeleton() {
  return (
    <header className="sticky top-0 z-40 bg-base-100 border-b border-base-300">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between gap-3 py-3">
          <div className="space-y-2">
            <div className="skeleton h-6 w-32"></div>
            <div className="skeleton h-3 w-44"></div>
          </div>
          <div className="skeleton h-8 w-28"></div>
        </div>
        <div className="flex gap-2 pb-3 overflow-hidden">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="skeleton h-8 w-16 shrink-0 rounded-full"
            ></div>
          ))}
        </div>
      </div>
    </header>
  );
}

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
        {/* Row 1: logo + date on the left, auth area on the right */}
        <div className="flex items-center justify-between gap-2 py-3">
          <Link href="/" className="flex min-w-0 flex-col leading-tight">
            <span className="text-lg font-bold text-primary sm:text-xl">
              🛒 বাজার দর
            </span>
            <span className="text-xs text-base-content/60">
              {formatBanglaDate()}
            </span>
          </Link>

          {/* Sign in/up buttons, or the profile menu when logged in */}
          <AuthButtons />
        </div>

        {/* Row 2: category chips */}
        <CategoryLinks categories={categories} />
      </div>
    </header>
  );
}
