"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function CategoryLinks({ categories }) {
  const pathname = usePathname();

  return (
    <nav className="flex gap-2 overflow-x-auto pb-3">
      {categories.map((category) => {
        const href = `/category/${category.slug}`;
        const isActive = pathname === href;

        return (
          <Link
            key={category.id}
            href={href}
            aria-current={isActive ? "page" : undefined}
            className={`btn btn-sm shrink-0 rounded-full ${
              isActive ? "btn-primary" : "btn-ghost bg-base-200"
            }`}
          >
            {category.nameBn}
          </Link>
        );
      })}
    </nav>
  );
}
