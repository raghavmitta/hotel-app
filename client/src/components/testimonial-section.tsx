import { useState } from "react";
import { motion } from "framer-motion";
import thumb1 from "@assets/generated_images/a.jpeg";
import thumb2 from "@assets/generated_images/d.jpeg";
import thumb3 from "@assets/generated_images/c.jpeg";
import architect_thumb from "@assets/generated_images/architect.png";
import thumb5 from "@assets/generated_images/e.jpeg";
import thumb6 from "@assets/generated_images/f.jpeg";
import { Play, Stethoscope, Dumbbell, Users, PenTool, Mic2, Hotel } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";


export function TestimonialSection() {
  const testimonials = [
    {
      role: "Medical Opinion",
      name: "Orthopaedic Doctor",
      icon: <Stethoscope className="w-5 h-5 text-primary" />,
      quote: "I recommend Dr. Back for its superior lumbar support and spinal alignment.",
      category: "The Science",
      // ID extracted from your embed code: DPQv0TJCcIl
      videoUrl: "https://www.instagram.com/reel/DPQv0TJCcIl/embed/",
      image: thumb1

    },
    {
      role: "Fitness Perspective",
      name: "Elite Gym Trainer",
      icon: <Dumbbell className="w-5 h-5 text-primary" />,
      quote: "Deep sleep is the ultimate recovery tool. This is my go-to mattress for athletes.",
      category: "Performance",
      videoUrl: "https://www.instagram.com/reel/DPQv0TJCcIl/embed/",
      image: thumb2

    },
    {
      role: "Comfort & Wellness",
      name: "Senior Citizen",
      icon: <Users className="w-5 h-5 text-primary" />,
      quote: "After years of back pain, I finally wake up feeling refreshed and mobile.",
      category: "Lifestyle",
      videoUrl: "https://www.instagram.com/reel/DPQv0TJCcIl/embed/",
      image: thumb3

    },
    {
      role: "Design Expert",
      name: "Principal Architect",
      icon: <PenTool className="w-5 h-5 text-primary" />,
      quote: "The material density and construction quality are top-tier for modern homes.",
      category: "Engineering",
      videoUrl: "https://www.instagram.com/reel/DPQv0TJCcIl/embed/",
      image: architect_thumb
    },
    {
      role: "Energy Coach",
      name: "Motivational Speaker",
      icon: <Mic2 className="w-5 h-5 text-primary" />,
      quote: "My energy on stage starts with a solid night of rest on Richa Foam.",
      category: "Mindset",
      videoUrl: "https://www.instagram.com/reel/DPQv0TJCcIl/embed/",
      image: thumb5
    },
    {
      role: "Hospitality Choice",
      name: "Boutique Hotelier",
      icon: <Hotel className="w-5 h-5 text-primary" />,
      quote: "Our guests always ask about our mattresses. The durability is unmatched.",
      category: "Quality",
      videoUrl: "https://www.instagram.com/reel/DPQv0TJCcIl/embed/",
      image: thumb6
    }
  ];

  return (
    <section className="py-12 bg-slate-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with Precision Legacy Badge & Reduced Spacing */}
        <div className="text-center mb-10 flex flex-col items-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-gradient-to-b from-amber-50 to-amber-100 border-double border-4 border-amber-300 mb-4 shadow-xl relative animate-float-slow"
          >
            <div className="absolute inset-1.5 border border-amber-200/40 rounded-full" />
            
            <div className="flex flex-col items-center justify-center text-center z-10 p-2">
              <p className="text-[9px] font-bold text-amber-700 uppercase tracking-[0.15em] leading-tight">
                Established
              </p>
              <p className="text-4xl font-black text-amber-900 leading-[0.85] my-1 tracking-tighter">
                1985
              </p>
              <div className="h-[1px] w-12 bg-gradient-to-r from-transparent via-amber-400 to-transparent mb-1" />
              <p className="text-[8px] font-extrabold text-amber-800 uppercase tracking-wider leading-tight max-w-[80px]">
                40+ Years <br /> of Trust
              </p>
            </div>
          </motion.div>

          <h2 className="text-3xl md:text-5xl font-serif font-bold text-primary mb-3">
            Trusted by Experts. Loved by You.
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From medical professionals to fitness experts, see why Agra has trusted Richa Foam’s engineering for over 40 years.
          </p>
        </div>

        {/* Video Card Grid with Staggered Entrance & Hover Lift */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((item, index) => (
            <Dialog key={index}>
              <DialogTrigger asChild>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ y: -8 }}
                  className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all border border-gray-100 overflow-hidden cursor-pointer"
                >
                  {/* Thumbnail with Play Icon Scale Effect */}
                  <div className="relative aspect-video bg-slate-200 flex items-center justify-center overflow-hidden">
                    <img 
                    src={item.image} 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/40 z-10 group-hover:bg-black/20 transition-colors" />
                    <div className="z-20 w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                      <Play className="fill-current ml-1" size={20} />
                    </div>
                    <div className="absolute top-4 left-4 z-20 flex items-center gap-2 bg-white/95 px-3 py-1 rounded-full shadow-sm">
                      {item.icon}
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-700">{item.role}</span>
                    </div>
                  </div>

                  <div className="p-6 text-center">
                    <p className="italic text-muted-foreground mb-4 leading-relaxed line-clamp-2">
                      "{item.quote}"
                    </p>
                    <div className="border-t pt-4">
                      <h4 className="font-bold text-primary">{item.name}</h4>
                      <p className="text-xs text-muted-foreground">{item.category} Perspective</p>
                    </div>
                  </div>
                </motion.div>
              </DialogTrigger>
              
              <DialogContent className="sm:max-w-[400px] p-0 bg-black/95 border-none overflow-hidden rounded-2xl ring-0">
  <div className="relative w-full aspect-[9/16]">
    <iframe
      src={item.videoUrl}
      className="absolute inset-0 w-full h-full"
      frameBorder="0"
      scrolling="no"
      // Change 'allowTransparency' to 'allowtransparency' (lowercase)
      // or remove it entirely as it's often unnecessary now.
      allowtransparency="true" 
      allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
    ></iframe>
  </div>
</DialogContent>
            </Dialog>
          ))}
        </div>

        {/* Quality Promise Note with Reduced Spacing */}
        <div className="mt-12 p-6 bg-primary text-primary-foreground rounded-2xl shadow-xl relative overflow-hidden text-center">
          <h3 className="text-xl font-bold mb-2 italic">"40+ Years of Perfecting Sleep"</h3>
          <p className="opacity-90 text-sm max-w-2xl mx-auto leading-relaxed">
            We've worked with experts across industries to refine the science of orthopaedic support. Built on four decades of proven reliability.
          </p>
        </div>
      </div>
    </section>
  );
}