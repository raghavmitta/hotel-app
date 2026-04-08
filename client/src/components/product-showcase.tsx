import { motion } from "framer-motion";
import { slideInLeft, slideInRight } from "@/lib/animations";
import mattressImg from "@assets/generated_images/premium_mattress_fabric_closeup.png";
import foamImg from "@assets/generated_images/comfortable_memory_foam_texture.png";
import { Check } from "lucide-react";

export function ProductShowcase() {
  return (
    <section id="products" className="py-24 bg-secondary/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Product 1: The Luxury/Adaptive Focus */}
        <div className="flex flex-col lg:flex-row items-center gap-16 mb-24">
          <motion.div 
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={slideInLeft}
            className="flex-1 relative"
          >
            <div className="absolute inset-0 bg-accent/10 rounded-3xl transform -rotate-3 scale-105" />
            <img 
              src={mattressImg} 
              alt="High-Resilience Luxury Mattress Detail" 
              className="relative rounded-2xl shadow-2xl w-full object-cover h-[500px]"
            />
          </motion.div>
          
          <motion.div 
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={slideInRight}
            className="flex-1 space-y-6"
          >
            <span className="text-amber-600 font-bold tracking-widest uppercase text-xs">Tier 1: Luxury & Executive</span>
            <h2 className="text-4xl font-serif font-bold text-primary">Adaptive High-Resilience Systems</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Our flagship collections utilize **High-Resilience (HR) Foam** and individual pocket springs to create a "weightless" sleep environment. Engineered specifically for 5-star suites, these systems adapt instantly to guest movement while maintaining total motion isolation.
            </p>
            
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
              {[
                "Instant Pressure-Point Relief",
                "Acoustic Turkish Felt Buffers",
                "Fire-Shield Safety Fabric",
                "Perimeter-Lock Edge Support",
                "Zero-Motion Partner Isolation",
                "Breathable Micro-Plush Quilting"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-primary" />
                  </div>
                  <span className="text-sm font-semibold text-foreground/80">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Product 2: The Durability/Ortho Focus */}
        <div className="flex flex-col lg:flex-row-reverse items-center gap-16">
          <motion.div 
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={slideInRight}
            className="flex-1 relative"
          >
            <div className="absolute inset-0 bg-primary/5 rounded-3xl transform rotate-3 scale-105" />
            <img 
              src={foamImg} 
              alt="Orthopedic Coir and Spring Technology" 
              className="relative rounded-2xl shadow-2xl w-full object-cover h-[500px]"
            />
          </motion.div>
          
          <motion.div 
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={slideInLeft}
            className="flex-1 space-y-6"
          >
            <span className="text-amber-600 font-bold tracking-widest uppercase text-xs">Tier 2: Orthopedic & Essential</span>
            <h2 className="text-4xl font-serif font-bold text-primary">Reinforced Structural Engineering</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Built for high-occupancy transit hotels and wellness resorts, this collection prioritizes **long-term ROI**. Utilizing high-tensile steel cores and natural rubberized coir, we deliver a firm, orthopedic surface that withstands heavy daily turnover without compromising guest spinal health.
            </p>
            
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
              {[
                "High-Tensile Steel Core",
                "Natural Cooling Coir Fiber",
                "Anti-Sag Lateral Stabilizers",
                "Maximum Heat Dissipation"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-primary" />
                  </div>
                  <span className="text-sm font-semibold text-foreground/80">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

      </div>
    </section>
  );
}