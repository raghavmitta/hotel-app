import { motion } from "framer-motion";
import { slideInLeft, slideInRight } from "@/lib/animations";
import mattressImg from "@assets/generated_images/premium_mattress_fabric_closeup.png";
import foamImg from "@assets/generated_images/comfortable_memory_foam_texture.png";
import { Check } from "lucide-react";

export function ProductShowcase() {
  return (
    <section id="products" className="py-24 bg-secondary/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Product 1 */}
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
              alt="The Royal Suite Mattress" 
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
            <span className="text-accent font-bold tracking-wider uppercase text-sm">Luxury Collection</span>
            <h2 className="text-4xl font-serif font-bold text-primary">Premium Hybrid Mattresses</h2>
            <p className="text-lg text-muted-foreground">
              Crafted with perfection, these hybrid collections feature pocket springs and advanced foam technology. Engineered for exceptional support and comfort, they help improve guest posture and revitalize rest—perfect for 5-star properties.
            </p>
            
            <ul className="space-y-4 pt-4">
              {[
                "12-inch profile height",
                "Cool-touch quilted top layer",
                "Individually wrapped pocket coils",
                "Edge-to-edge support system"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-primary" />
                  </div>
                  <span className="font-medium text-foreground/80">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Product 2 */}
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
              alt="Memory Foam Technology" 
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
            <span className="text-accent font-bold tracking-wider uppercase text-sm">Value-Driven Collection</span>
            <h2 className="text-4xl font-serif font-bold text-primary">Memory Foam Solutions</h2>
            <p className="text-lg text-muted-foreground">
              Designed for comfort and longevity, our memory foam range offers excellent pressure relief and support. Perfect for budget-conscious properties seeking to deliver quality sleep without compromising on guest satisfaction.
            </p>
            
            <ul className="space-y-4 pt-4">
              {[
                "High-density base core",
                "Gel-infused comfort layer",
                "Removable & washable cover",
                "Fire-retardant compliant"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-primary" />
                  </div>
                  <span className="font-medium text-foreground/80">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
