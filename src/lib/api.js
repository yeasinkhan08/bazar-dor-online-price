// The main API, and a backup in case the first one is down
const BASE_URLS = [
  "https://api.api-store.workers.dev/api/bazardor",
  "https://api.abcz.workers.dev/api/bazardor",
];

// Tries each API in order. Returns the JSON, or throws if both fail.
async function request(path) {
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
