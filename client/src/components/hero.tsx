import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { fadeIn } from "@/lib/animations";
import heroBg from "@assets/generated_images/navy_luxury_hotel_bedroom_hero.png";

export function Hero() {
  return (
    <div className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroBg} 
          alt="Luxury Hotel Bedroom" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div 
          initial="initial"
          animate="animate"
          variants={fadeIn}
          className="space-y-8"
        >
          <span className="inline-block py-1 px-3 rounded-full bg-white/15 border border-white/30 text-white backdrop-blur-sm text-sm font-semibold tracking-wider uppercase mb-4">
            Premium Hotel Solutions
          </span>
          
          <h1 className="text-5xl md:text-7xl font-serif font-bold tracking-tight leading-tight max-w-4xl mx-auto text-white drop-shadow-2xl" style={{textShadow: '0 4px 20px rgba(0,0,0,0.8)'}}>
            A Good Night's Sleep, <span className="italic">Every Night</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white max-w-2xl mx-auto font-light leading-relaxed drop-shadow-2xl" style={{textShadow: '0 2px 10px rgba(0,0,0,0.7)'}}>
            One brand. Complete expertise. Zero complexity. We partner exclusively with a single premium manufacturer—meaning superior quality, consistent support, and peace of mind for your guests.
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
