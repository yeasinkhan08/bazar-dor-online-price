import { connection } from "next/server";

// The official API first, then two backups in case it fails
const BASE_URLS = [
  "https://openapi.programming-hero.com/api/bazardor",
  "https://api.api-store.workers.dev/api/bazardor",
  "https://api.abcz.workers.dev/api/bazardor",
];

// How long (in milliseconds) we reuse a saved answer: 5 minutes
const CACHE_TIME = 5 * 60 * 1000;

// globalThis keeps the saved answers alive even when the dev server reloads files
const saved = (globalThis.bazardorCache ??= {});

// Asks each API in order. Returns the JSON, or throws if all of them fail.
async function fetchFromApi(path) {
  let lastError;
  for (const base of BASE_URLS) {
    try {
      const res = await fetch(base + path, { cache: "no-store" });
      if (!res.ok) throw new Error(`Request failed with status ${res.status}`);
      return await res.json();
    } catch (error) {
      lastError = error;
    }
  }
  throw lastError;
}

// Same as fetchFromApi, but remembers the answer so we call the API far less
async function request(path) {
  // Tell Next.js this runs per request (needed because we use Date.now() below)
  await connection();

  const entry = saved[path];

  // 1. We have a fresh answer (or one that is still loading): reuse it
  if (entry && Date.now() - entry.time < CACHE_TIME) {
    return entry.promise;
  }

  // 2. Otherwise ask the API and remember the answer
  const promise = fetchFromApi(path);
  saved[path] = { promise, time: Date.now() };

  try {
    const data = await promise;
    saved[path].data = data;
    return data;
  } catch (error) {
    // 3. The API failed: use the last good answer if we still have one
    if (entry && entry.data) {
      saved[path] = {
        promise: Promise.resolve(entry.data),
        time: Date.now(),
        data: entry.data,
      };
      return entry.data;
    }
    // No old answer: forget this failure so the next request tries again
    delete saved[path];
    throw error;
  }
}

// All products, or only one category's products.
// We filter ourselves, so it works even if the API ignores the filter.
export async function getProducts(category) {
  const products = await request("/products");
  if (!category) return products;
  return products.filter((product) => product.category === category);
}

// One product by slug, or null if there is no such product
export async function getProductBySlug(slug) {
  const products = await request("/products");
  return products.find((product) => product.slug === slug) || null;
}

export async function getCategories() {
  return request("/categories");
}

// One category by slug, or null if there is no such category
export async function getCategory(slug) {
  const categories = await request("/categories");
  return categories.find((category) => category.slug === slug) || null;
}
