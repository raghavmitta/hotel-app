import { BedDouble, ShieldCheck, Truck, Ruler, Sparkles, HandCoins } from "lucide-react";
import { motion } from "framer-motion";
import { fadeIn, staggerContainer } from "@/lib/animations";

const features = [
  {
    icon: BedDouble,
    title: "Premium Quality Selection",
    description: "Carefully curated mattress collection meeting hospitality industry standards for guest comfort and durability."
  },
  {
    icon: ShieldCheck,
    title: "Warranty Support",
    description: "Reliable warranty coverage on all products. We stand behind the quality of every mattress in our collection."
  },
  {
    icon: Truck,
    title: "Nationwide Logistics",
    description: "Efficient bulk delivery network ensuring your hotel opening or renovation stays on schedule."
  },
  {
    icon: Ruler,
    title: "Multiple Sizes Available",
    description: "Wide range of standard and custom dimensions to fit your property's specific needs."
  },
  {
    icon: HandCoins,
    title: "Exceptional Value",
    description: "Premium quality at rates that work for your budget. Better margins mean better investment in guest experience."
  },
  {
    icon: Sparkles,
    title: "Hypoallergenic Options",
    description: "Premium mattresses with anti-microbial and hypoallergenic treatments for guest health and satisfaction."
  }
];

export function Features() {
  return (
    <section id="features" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4">Why Top Hotels Choose Us</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We understand the hospitality industry. Our products are engineered to maximize guest satisfaction while minimizing operational costs.
          </p>
        </div>

        <motion.div 
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              variants={fadeIn}
              className="p-8 rounded-2xl bg-secondary/20 hover:bg-secondary/40 transition-colors border border-secondary/20 group"
            >
              <div className="w-12 h-12 bg-primary/5 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary/10 transition-colors">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-primary mb-3">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
