"use client";

import { useState } from "react";
import { ProductGrid } from "./ProductGrid";

export default function SortableProducts({ products }) {
  // "default", "low" (cheapest first) or "high" (most expensive first)
  const [sort, setSort] = useState("default");

  // Copy the list first, so we never change the original
  const sorted = [...products];

  // We compare the real NUMBER (product.today = 148), not the Bengali text
  // ("১৪৮"). Comparing text would put ১,৮৫০ before ৯০ by mistake.
  if (sort === "low") sorted.sort((a, b) => a.today - b.today);
  if (sort === "high") sorted.sort((a, b) => b.today - a.today);

  return (
    <div className="space-y-4">
      {/* Sort control */}
      <div className="flex items-center justify-end gap-2">
        <label htmlFor="sort" className="text-sm font-semibold">
          সাজান:
        </label>
        {/* DaisyUI's select already has the chevron (arrow) icon */}
        <select
          id="sort"
          value={sort}
          onChange={(event) => setSort(event.target.value)}
          className="select select-sm w-auto"
        >
          <option value="default">ডিফল্ট</option>
          <option value="low">দাম: কম থেকে বেশি</option>
          <option value="high">দাম: বেশি থেকে কম</option>
        </select>
      </div>

      <ProductGrid products={sorted} wide />
    </div>
  );
}
