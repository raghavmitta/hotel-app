import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const products = [
  {
    id: 1,
    name: "Premium Hybrid Collection",
    tagline: "Luxury 5-Star Experience",
    price: "Premium Positioning",
    description: "Engineered for discerning guests seeking the ultimate sleep experience. Combines pocket springs with advanced foam technology for superior support and motion isolation.",
    features: [
      "Pocket spring support system",
      "Premium memory foam layer",
      "Orthopedic design",
      "Anti-dust mite treatment",
      "10-year warranty"
    ],
    guest_benefit: "Exceptional comfort for premium properties"
  },
  {
    id: 2,
    name: "Orthopedic Spring Collection",
    tagline: "Proven Support & Durability",
    price: "Value-Focused",
    description: "Built for reliability and health-conscious guests. High-quality spring construction designed to improve posture and reduce back pain complaints.",
    features: [
      "High-density foam layers",
      "Breathable cover material",
      "Spinal support design",
      "Hypoallergenic fabric",
      "Lifetime after-sales support"
    ],
    guest_benefit: "Guest satisfaction scores increase"
  },
  {
    id: 3,
    name: "Boutique Collection",
    tagline: "Modern Hotel Comfort",
    price: "Smart Investment",
    description: "Perfect for modern, design-conscious hotels. Balanced firmness with contemporary aesthetics that appeal to younger guests.",
    features: [
      "Medium-firm comfort",
      "Contemporary quilting",
      "Pressure relief technology",
      "Quick delivery options",
      "Customizable sizes"
    ],
    guest_benefit: "Modern appeal meets comfort"
  },
  {
    id: 4,
    name: "Wellness Collection",
    tagline: "Health-Focused Sleep",
    price: "Wellness Premium",
    description: "Designed for wellness-conscious hotels and resorts. Features orthopedic support combined with natural materials for a health-first approach.",
    features: [
      "Orthopedic certification",
      "Natural latex options",
      "Anti-microbial treatment",
      "Eco-conscious materials",
      "Wellness positioning"
    ],
    guest_benefit: "Aligns with wellness trends"
  }
];

export function ProductsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextProduct = () => {
    setCurrentIndex((prev) => (prev + 1) % products.length);
  };

  const prevProduct = () => {
    setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);
  };

  const goToProduct = (index: number) => {
    setCurrentIndex(index);
  };

  const current = products[currentIndex];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4">Our Complete Product Range</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Four premium collections designed for different hotel segments. Each with distinct benefits and guest appeal.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Product Display */}
          <motion.div
            key={current.id}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="space-y-3">
              <span className="text-accent font-bold tracking-wider uppercase text-sm">{current.tagline}</span>
              <h3 className="text-4xl font-serif font-bold text-primary">{current.name}</h3>
              <div className="flex items-center gap-3 pt-2">
                <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-semibold">
                  {current.price}
                </span>
              </div>
            </div>

            <p className="text-lg text-muted-foreground leading-relaxed">
              {current.description}
            </p>

            <div className="space-y-3">
              <h4 className="font-bold text-primary text-sm uppercase tracking-wider">Key Features</h4>
              <ul className="space-y-3">
                {current.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-accent" />
                    </div>
                    <span className="text-foreground/80">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-secondary/30 rounded-lg p-4 border border-secondary/50">
              <p className="text-sm font-semibold text-primary">
                💡 {current.guest_benefit}
              </p>
            </div>
          </motion.div>

          {/* Navigation */}
          <div className="space-y-6">
            <motion.div
              key={`visual-${current.id}`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-br from-primary/5 via-accent/5 to-primary/5 rounded-2xl p-12 min-h-[400px] flex items-center justify-center border border-primary/10"
            >
              <div className="text-center space-y-4">
                <div className="text-6xl">🛏️</div>
                <p className="text-xl font-serif font-bold text-primary">{current.name}</p>
                <p className="text-sm text-muted-foreground max-w-sm">
                  Product {currentIndex + 1} of {products.length}
                </p>
              </div>
            </motion.div>

            {/* Product Dots */}
            <div className="flex justify-center gap-3">
              {products.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToProduct(index)}
                  className={`h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? "w-8 bg-primary"
                      : "w-3 bg-gray-300 hover:bg-gray-400"
                  }`}
                  data-testid={`product-dot-${index}`}
                  aria-label={`Go to product ${index + 1}`}
                />
              ))}
            </div>

            {/* Navigation Buttons */}
            <div className="flex gap-4 justify-center pt-4">
              <Button
                variant="outline"
                size="lg"
                onClick={prevProduct}
                className="border-2 border-primary text-primary hover:bg-primary/5"
                data-testid="button-prev-product"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={nextProduct}
                className="border-2 border-primary text-primary hover:bg-primary/5"
                data-testid="button-next-product"
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Quick Comparison */}
        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <motion.button
              key={product.id}
              onClick={() => goToProduct(products.indexOf(product))}
              whileHover={{ y: -4 }}
              className={`p-4 rounded-lg border-2 transition-all text-left cursor-pointer ${
                currentIndex === products.indexOf(product)
                  ? "border-primary bg-primary/5"
                  : "border-gray-200 hover:border-primary/50"
              }`}
              data-testid={`product-card-${product.id}`}
            >
              <p className="font-bold text-sm text-primary mb-1">{product.name}</p>
              <p className="text-xs text-muted-foreground">{product.tagline}</p>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
