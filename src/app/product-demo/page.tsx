"use client";

import ProductCard from "@/components/productCard";

export default function ProductDemoPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-2 text-center">
          Product Card Component Demo
        </h1>
        <p className="text-gray-600 mb-12 text-center">
          Showcasing different variants and configurations
        </p>

        <div className="space-y-12">
          {/* Default Variant */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Default Variant
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <ProductCard
                title="Premium Wireless Headphones"
                description="Experience crystal-clear audio with our premium wireless headphones featuring noise cancellation technology."
                price={149.99}
                image="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop"
                imageAlt="Premium wireless headphones"
              />
              <ProductCard
                title="Smart Watch"
                description="Track your fitness goals with this sleek smartwatch."
                price={299.99}
                image="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop"
                imageAlt="Smart watch"
                badge="New"
              />
              <ProductCard
                title="Professional Camera"
                description="Capture stunning photos with this professional-grade camera."
                price={1299.99}
                image="https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400&h=300&fit=crop"
                imageAlt="Professional camera"
                badge="Sale"
                badgeVariant="danger"
              />
            </div>
          </section>

          {/* Compact Variant */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Compact Variant
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <ProductCard
                title="Wireless Earbuds"
                description="Compact and lightweight wireless earbuds."
                price={89.99}
                image="https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&h=300&fit=crop"
                imageAlt="Wireless earbuds"
                variant="compact"
              />
              <ProductCard
                title="Phone Case"
                description="Protective phone case with shock-absorbing corners."
                price={12.99}
                image="https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=400&h=300&fit=crop"
                imageAlt="Phone case"
                variant="compact"
              />
              <ProductCard
                title="USB-C Cable"
                description="High-speed USB-C charging cable."
                price={19.99}
                image="https://images.unsplash.com/photo-1625948515291-69613efd103f?w=400&h=300&fit=crop"
                imageAlt="USB-C cable"
                variant="compact"
                showCurrency={false}
              />
              <ProductCard
                title="Gaming Keyboard"
                description="Mechanical gaming keyboard with RGB backlighting."
                price={79.99}
                image="https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=300&fit=crop"
                imageAlt="Gaming keyboard"
                variant="compact"
                badge="Limited"
                badgeVariant="secondary"
              />
            </div>
          </section>

          {/* Expanded Variant */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Expanded Variant
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <ProductCard
                title="Premium Laptop"
                description="Powerful laptop with the latest processor, 32GB RAM, and 1TB SSD for professional work. Perfect for developers, designers, and content creators."
                price={2499.99}
                image="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop"
                imageAlt="Premium laptop"
                variant="expanded"
                badge="Pro"
              />
              <ProductCard
                title="Portable Speaker"
                description="Waterproof portable speaker with 360-degree sound and 20-hour battery life. Perfect for outdoor adventures and gatherings."
                price={59.99}
                image="https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=300&fit=crop"
                imageAlt="Portable speaker"
                variant="expanded"
                badge="Best Seller"
                badgeVariant="secondary"
              />
            </div>
          </section>

          {/* Interactive Example */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Interactive (Clickable)
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <ProductCard
                title="Tablet Stand"
                description="Adjustable aluminum tablet stand for optimal viewing angles."
                price={34.99}
                image="https://images.unsplash.com/photo-1585338107529-13afc5f02586?w=400&h=300&fit=crop"
                imageAlt="Tablet stand"
                onClick={() => alert("Product clicked: Tablet Stand")}
              />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
