import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { fadeIn } from "@/lib/animations";
import heroBg from "@assets/generated_images/luxury_hotel_bedroom_interior.png";

export function Hero() {
  return (
    <div className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroBg} 
          alt="Luxury Hotel Bedroom" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        <motion.div 
          initial="initial"
          animate="animate"
          variants={fadeIn}
          className="space-y-8"
        >
          <span className="inline-block py-1 px-3 rounded-full bg-accent/20 border border-accent/40 text-accent-foreground backdrop-blur-sm text-sm font-semibold tracking-wider uppercase mb-4">
            Premium Hotel Solutions
          </span>
          
          <h1 className="text-5xl md:text-7xl font-serif font-bold tracking-tight leading-tight max-w-4xl mx-auto text-white drop-shadow-lg">
            A Good Night's Sleep, <span className="text-accent italic">Every Night</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto font-light leading-relaxed drop-shadow-md">
            Premium mattresses crafted for hotels that put guest comfort first. From Richa Foam—trusted for quality, customization, and expert guidance.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <Button 
              size="xl" 
              className="bg-accent text-primary hover:bg-accent/90 text-lg px-8 py-6 h-auto font-bold shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Request Bulk Pricing
            </Button>
            <Button 
              size="xl" 
              variant="outline" 
              className="bg-transparent border-white text-white hover:bg-white/10 text-lg px-8 py-6 h-auto font-semibold backdrop-blur-sm"
              onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Explore Collection
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
