import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/ui/Navbar";
import ProductGallery from "@/components/product/ProductGallery";
import ProductInfo from "@/components/product/ProductInfo";
import ProductDetails from "@/components/product/ProductDetails";
import ProductReviews from "@/components/product/ProductReviews";
import FeaturesBanner from "@/components/product/FeaturesBanner";
import TrendingProducts from "@/components/layout/TrendingProducts";
import { prisma } from "@/lib/prisma";
import { products as mockProducts } from "@/data/products";

// ---------------------------------------------------------------------------
// Data fetching — ecom API + prisma run in PARALLEL via Promise.all
// ---------------------------------------------------------------------------
async function getProductData(id) {
  const apiUrl =
    process.env.NEXT_PUBLIC_SHOP_API_URL ||
    "https://megaecomm.megascale.co.in/backend/api/shop";
  const token =
    process.env.SHOP_TOKEN;

  // Run both fetches in parallel — don't wait for one before starting the other
  const [shopResult, watchConfig] = await Promise.all([
    // 1. Ecom product list
    fetch(`${apiUrl}/products`, {
      headers: {
        "X-Shopfront-Token": token,
        "Content-Type": "application/json",
      },
      next: { revalidate: 60 }, // cache for 60 s — won't hit API every request
    })
      .then((res) => (res.ok ? res.json() : null))
      .catch(() => null),

    // 2. Our backend watch config
    prisma.watch.findFirst({ where: { name: id } }).catch(() => null),
  ]);

  // Parse product list
  const productsList = shopResult?.data || shopResult || mockProducts;
  const list = Array.isArray(productsList) ? productsList : mockProducts;

  const current = list.find((p) => String(p.id) === id);
  if (!current) return null;

  const related = list
    .filter(
      (p) =>
        String(p.id) !== id && (p.image_url || p.images?.[0]?.url || p.image)
    )
    .slice(0, 4)
    .map((p) => ({
      id: String(p.id),
      name: p.title || p.name || `Product ${p.id}`,
      image: p.image_url || p.images?.[0]?.url || p.image,
    }));

  return { current, related, watchConfig };
}

// ---------------------------------------------------------------------------
// Skeleton loaders for deferred sections
// ---------------------------------------------------------------------------
function ReviewsSkeleton() {
  return (
    <div className="w-full animate-pulse space-y-6">
      <div className="h-8 w-48 bg-stone-100 rounded-xl" />
      <div className="grid md:grid-cols-2 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-32 bg-stone-100 rounded-2xl" />
        ))}
      </div>
    </div>
  );
}

function TrendingSkeleton() {
  return (
    <section className="py-24 bg-stone-50">
      <div className="w-full px-6 md:px-12">
        <div className="h-10 w-56 bg-stone-200 rounded-xl mb-12 animate-pulse" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 animate-pulse">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="aspect-square bg-stone-200 rounded-none" />
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
export default async function ProductPage({ params }) {
  const { id } = await params;

  const data = await getProductData(id);
  if (!data || !data.current) notFound();

  const { current: rawProduct, watchConfig } = data;

  // Price helpers
  const priceVal = parseFloat(
    rawProduct.priceRange?.minVariantPrice?.amount ||
      rawProduct.price ||
      "1249.00"
  );
  let rawCompare =
    rawProduct.compare_at_price ||
    rawProduct.variants?.[0]?.compareAtPrice ||
    rawProduct.priceRange?.maxVariantPrice?.amount;
  let comparePriceVal = rawCompare ? parseFloat(rawCompare) : priceVal * 1.25;
  if (comparePriceVal <= priceVal) comparePriceVal = priceVal * 1.25;

  // Description cleanup
  const cleanDesc = rawProduct.description
    ? rawProduct.description
        .replace(/<[^>]*>/g, "")
        .replace(/&nbsp;/g, " ")
        .replace(/&amp;/g, "&")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/\s+/g, " ")
        .trim()
    : "Luxury Timepiece";

  const sentences = cleanDesc.split(/(?<=\.)\s+/);
  const shortDesc =
    sentences.length > 1 ? sentences.slice(0, 2).join(" ") : cleanDesc;

  const product = {
    id: String(rawProduct.id),
    name: rawProduct.title || rawProduct.name || `Product ${id}`,
    description: shortDesc,
    fullDescription: cleanDesc,
    price: `Rs. ${priceVal.toFixed(2)}`,
    compareAtPrice: `Rs. ${comparePriceVal.toFixed(2)}`,
    category: rawProduct.category || "Collection",
    image:
      rawProduct.image_url ||
      rawProduct.images?.[0]?.url ||
      "/watches/trending/watch1.png",
    images: rawProduct.images || [],
    rating: rawProduct.avg_rating || 5.0,
    reviews: rawProduct.total_reviews || 0,
    variants:
      rawProduct.variants && rawProduct.variants.length > 0
        ? rawProduct.variants.map((v, i) => ({
            id: v.id || `v${i}`,
            name: v.title || "Standard",
            color: v.color || "#d4af37",
          }))
        : [
            { id: "v1", name: "Gold", color: "#d4af37" },
            { id: "v2", name: "Silver", color: "#e5e7eb" },
          ],
    straps: [
      { id: "s1", name: "Leather", color: "#503d29" },
      { id: "s2", name: "Metal", color: "#1c1917" },
    ],
    specs: {
      caseMaterial: "316L Stainless Steel",
      glass: "Scratch-resistant Sapphire Crystal",
      waterResistance: "5 ATM (50 meters)",
      movement: "Swiss Automatic Calibre",
      powerReserve: "48 Hours",
      caseDiameter: "42mm",
      caseThickness: "11.5mm",
      strapWidth: "22mm",
      warranty: "2 Years International",
    },
  };

  const customConfig = watchConfig
    ? {
        ...((typeof watchConfig.config === "object" && watchConfig.config) ||
          {}),
        dialImage: watchConfig.dialImage,
        dialScale: watchConfig.dialScale || 100,
      }
    : null;

  return (
    <main className="min-h-screen bg-white product-page-root">
      <Navbar />

      <div className="pt-28 md:pt-36">
        {/* Breadcrumb */}
        <div className="w-full px-6 md:px-12 mb-8">
          <nav className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em]">
            <Link href="/" className="text-stone-400 hover:text-black transition-colors">
              Home
            </Link>
            <span className="text-stone-200">/</span>
            <Link href="/collection" className="text-stone-400 hover:text-black transition-colors">
              Collection
            </Link>
            <span className="text-stone-200">/</span>
            <span className="text-black line-clamp-1 max-w-xs">{product.name}</span>
          </nav>
        </div>

        {/* Gallery + Info Grid — renders immediately, no waiting */}
        <div className="w-full px-6 md:px-12">
          <div className="grid lg:grid-cols-2 gap-10 xl:gap-16 items-start">
            <div className="lg:sticky lg:top-28">
              <ProductGallery
                image={product.image}
                images={product.images}
                name={product.name}
                customConfig={customConfig}
                productId={product.id}
              />
            </div>
            <div className="flex flex-col gap-10 lg:pt-0">
              <ProductInfo product={product} />
              <div className="w-full h-px bg-black/5" />
              <ProductDetails
                specs={product.specs}
                description={product.fullDescription}
                productId={product.id}
              />
            </div>
          </div>
        </div>

        {/* Features Banner */}
        <FeaturesBanner />

        {/* Reviews — streamed in separately, shows skeleton while loading */}
        <div className="w-full px-6 md:px-12 py-20 border-t border-black/5 mt-20">
          <Suspense fallback={<ReviewsSkeleton />}>
            <ProductReviews productId={product.id} />
          </Suspense>
        </div>
      </div>

      {/* Trending — streamed in separately, shows skeleton while loading */}
      <div className="border-t border-black/5 bg-stone-50">
        <Suspense fallback={<TrendingSkeleton />}>
          <TrendingProducts />
        </Suspense>
      </div>
    </main>
  );
}