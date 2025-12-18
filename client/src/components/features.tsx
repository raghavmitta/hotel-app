import { BedDouble, ShieldCheck, Truck, Ruler, Sparkles, HandCoins } from "lucide-react";
import { motion } from "framer-motion";
import { fadeIn, staggerContainer } from "@/lib/animations";

const features = [
  {
    icon: BedDouble,
    title: "Curated Selection, Not Factory Direct",
    description: "We've vetted and tested dozens of options. You get only the best—no factory politics, no quality inconsistencies, no language barriers. We handle the complexity."
  },
  {
    icon: ShieldCheck,
    title: "Lifetime Partnership, Not Just a Sale",
    description: "Unlike direct factory deals, we're here long-term. Lifetime after-sales support, warranty claims handling, and expert guidance whenever you need it."
  },
  {
    icon: Truck,
    title: "One Point of Contact",
    description: "No juggling multiple suppliers or factory negotiations. Single dedicated account manager. One phone call for logistics, support, and special requests."
  },
  {
    icon: Ruler,
    title: "Complete Customization Without Factory Hassle",
    description: "Want specific sizes, firmness, or materials? We customize without the communication delays or MOQ frustrations of dealing direct with manufacturers."
  },
  {
    icon: HandCoins,
    title: "Better Margins Than Retail, Better Service Than Factory",
    description: "Competitive pricing without sacrificing support. You get the value proposition other brands can't deliver—affordable quality with accountability."
  },
  {
    icon: Sparkles,
    title: "Single Brand Excellence",
    description: "We're exclusive partners with one premium manufacturer. This means deep product knowledge, better quality control, and unified warranty support. No brand switching. No conflicting recommendations."
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
