import { Suspense } from "react";
import Hero from "@/components/Hero";
import Movers, { MoversSkeleton } from "@/components/Movers";
import AllProducts, { AllProductsSkeleton } from "@/components/AllProducts";

export default function Home() {
  return (
    <main>
      <Hero />

      {/* Section A: top 6 risers */}
      <Suspense fallback={<MoversSkeleton type="up" />}>
        <Movers type="up" />
      </Suspense>

      {/* Section B: top 6 fallers */}
      <Suspense fallback={<MoversSkeleton type="down" />}>
        <Movers type="down" />
      </Suspense>

      {/* Section C: all products (the hero button scrolls here) */}
      <Suspense fallback={<AllProductsSkeleton />}>
        <AllProducts />
      </Suspense>
    </main>
  );
}
