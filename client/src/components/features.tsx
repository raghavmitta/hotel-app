import { BedDouble, ShieldCheck, Truck, Ruler, Sparkles, HandCoins } from "lucide-react";
import { motion } from "framer-motion";
import { fadeIn, staggerContainer } from "@/lib/animations";

const features = [
  {
    icon: BedDouble,
    title: "Expert Consultation",
    description: "Our team guides you to the perfect mattress selection based on your guests' needs and hotel requirements."
  },
  {
    icon: ShieldCheck,
    title: "Lifetime Support",
    description: "Backed by industry-leading after-sales support. We stand behind our products for the long term."
  },
  {
    icon: Truck,
    title: "Nationwide Delivery",
    description: "Reliable logistics network ensuring timely bulk delivery for your hotel openings and renovations."
  },
  {
    icon: Ruler,
    title: "Complete Customization",
    description: "Tailored solutions for your exact specifications—sizes, firmness, materials, and special requirements."
  },
  {
    icon: HandCoins,
    title: "Smart Investment",
    description: "Premium quality mattresses that enhance guest reviews while protecting your budget and ROI."
  },
  {
    icon: Sparkles,
    title: "Health-Focused Design",
    description: "Mattresses engineered for orthopedic support, reducing guest complaints and improving satisfaction scores."
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
