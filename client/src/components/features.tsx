import { BedDouble, ShieldCheck, Truck, Ruler, Sparkles, HandCoins } from "lucide-react";
import { motion } from "framer-motion";
import { fadeIn, staggerContainer } from "@/lib/animations";

const features = [
  {
    icon: BedDouble,
    title: "Expert Distributor, Not Retail Middleman",
    description: "We partner exclusively with one premium manufacturer. Deep product expertise, quality assured, and industry-tested. You get the best without the factory complexity."
  },
  {
    icon: ShieldCheck,
    title: "Lifetime Partnership, Not Transactional",
    description: "Unlike factory direct, we handle warranty claims, provide ongoing support, and are here for the long term. Your success is our business."
  },
  {
    icon: Truck,
    title: "Hassle-Free Logistics",
    description: "No factory MOQs or minimum order frustrations. Flexible ordering, fast delivery, and dedicated account management—one phone call for everything."
  },
  {
    icon: Ruler,
    title: "Complete Customization Support",
    description: "Special sizes, firmness preferences, material requests? We facilitate everything without the communication delays or complications of dealing direct."
  },
  {
    icon: HandCoins,
    title: "Smart Pricing + White-Glove Service",
    description: "Better rates than retail, better support than factory. You get institutional pricing with the expertise and accountability of a trusted partner."
  },
  {
    icon: Sparkles,
    title: "Single Brand Deep Expertise",
    description: "Exclusive partnership means we know this brand inside and out. Superior quality control, consistent support, and zero brand confusion."
  }
];

export function Features() {
  return (
    <section id="features" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4">Why Hotels Choose Richa Foam</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Skip the factory complexity. Get a trusted partner who handles the research, quality assurance, and support—so you focus on your guests.
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
