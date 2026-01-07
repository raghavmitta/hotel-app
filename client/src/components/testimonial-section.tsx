import { motion } from "framer-motion";
import { Play, Stethoscope, Dumbbell, Users, PenTool, Mic2, Hotel } from "lucide-react";

export function TestimonialSection() {
  const testimonials = [
    {
      role: "Medical Opinion",
      name: "Orthopaedic Doctor",
      icon: <Stethoscope className="w-5 h-5 text-primary" />,
      quote: "I recommend Dr. Back for its superior lumbar support and spinal alignment.",
      category: "The Science"
    },
    {
      role: "Fitness Perspective",
      name: "Elite Gym Trainer",
      icon: <Dumbbell className="w-5 h-5 text-primary" />,
      quote: "Deep sleep is the ultimate recovery tool. This is my go-to mattress for athletes.",
      category: "Performance"
    },
    {
      role: "Comfort & Wellness",
      name: "Senior Citizen",
      icon: <Users className="w-5 h-5 text-primary" />,
      quote: "After years of back pain, I finally wake up feeling refreshed and mobile.",
      category: "Lifestyle"
    },
    {
      role: "Design Expert",
      name: "Principal Architect",
      icon: <PenTool className="w-5 h-5 text-primary" />,
      quote: "The material density and construction quality are top-tier for modern homes.",
      category: "Engineering"
    },
    {
      role: "Energy Coach",
      name: "Motivational Speaker",
      icon: <Mic2 className="w-5 h-5 text-primary" />,
      quote: "My energy on stage starts with a solid night of rest on Richa Foam.",
      category: "Mindset"
    },
    {
      role: "Hospitality Choice",
      name: "Boutique Hotelier",
      icon: <Hotel className="w-5 h-5 text-primary" />,
      quote: "Our guests always ask about our mattresses. The durability is unmatched.",
      category: "Quality"
    }
  ];

  return (
    <section className="py-24 bg-slate-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with 40-Year Legacy Badge */}
        <div className="text-center mb-16 relative">
          <div className="inline-flex flex-col items-center justify-center w-20 h-20 rounded-full bg-amber-50 border-2 border-amber-200 mb-6 shadow-sm">
            <span className="text-[10px] font-bold text-amber-700 uppercase leading-tight">Since</span>
            <span className="text-xl font-black text-amber-900 leading-tight">1985</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-primary mb-4">
            Trusted by Experts. Loved by You.
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From medical professionals to fitness experts, see why Agra has trusted Richa Foam’s engineering for over 40 years.
          </p>
        </div>

        {/* 3-Column Video Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all border border-gray-100 overflow-hidden"
            >
              {/* Video Thumbnail Placeholder */}
              <div className="relative aspect-video bg-slate-200 flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                <button className="z-20 w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                  <Play className="fill-current ml-1" size={20} />
                </button>
                <div className="absolute top-4 left-4 z-20 flex items-center gap-2 bg-white/95 px-3 py-1 rounded-full shadow-sm">
                  {item.icon}
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-700">{item.role}</span>
                </div>
              </div>

              {/* Text Content */}
              <div className="p-6">
                <p className="italic text-muted-foreground mb-6 leading-relaxed">
                  "{item.quote}"
                </p>
                <div className="flex items-center justify-between border-t pt-4">
                  <div>
                    <h4 className="font-bold text-primary">{item.name}</h4>
                    <p className="text-xs text-muted-foreground">{item.category} Perspective</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quality Promise Note */}
        <div className="mt-20 p-8 bg-primary text-primary-foreground rounded-2xl shadow-2xl relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-bold mb-3 italic">"40 Years of Perfecting Sleep"</h3>
              <p className="opacity-90 leading-relaxed max-w-3xl">
                We've worked with experts across industries to refine the science of orthopaedic support. 
                Whether it's for medical recovery or hospitality excellence, every Richa Foam product 
                is built on four decades of proven reliability.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}