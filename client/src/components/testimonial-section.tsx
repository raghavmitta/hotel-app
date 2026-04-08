import { useState } from "react";
import { motion } from "framer-motion";
import { Play, Stethoscope, Dumbbell, Users, PenTool, Mic2, Hotel } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";

// Vite Imports confirmed as working
import thumb1 from "@assets/generated_images/architect.png";
import thumb2 from "@assets/generated_images/doctor.png";
import thumb3 from "@assets/generated_images/gym.png";
import thumb4 from "@assets/generated_images/old.png";
import thumb5 from "@assets/generated_images/motivation.png";
import thumb6 from "@assets/generated_images/hotel.png";

export function TestimonialSection() {
  const testimonials = [
    {
      role: "Fitness Perspective",
      name: "Siddhant Sachdeva",
      subtext: "Elite Gym Trainer",
      icon: <Dumbbell className="w-4 h-4 text-primary" />,
      quote: "Deep sleep is the ultimate recovery tool. I've used their mattresses for over 5 years—it truly helps me sleep better.",
      // UPDATED: Working Embed Link for your YouTube Short
      videoUrl: "https://www.youtube.com/embed/T9Sa_NnVVI0",
      image: thumb3
    },
    {
      role: "Design Expert",
      name: "Pushpendra Singh",
      subtext: "Principal Architect",
      icon: <PenTool className="w-4 h-4 text-primary" />,
      quote: "The structural integrity and material density in their foam engineering is what sets them apart for modern interior projects.",
      videoUrl: "https://www.youtube.com/embed/n9k7Vtk6s-M", // Update with unique IDs as needed
      image: thumb1
    },
    {
      role: "Medical Opinion",
      name: "Divya Pursnani",
      subtext: "Consultant Pathologist",
      icon: <Stethoscope className="w-4 h-4 text-primary" />,
      quote: "Quality sleep is vital for cellular repair. I recommend Richa Foam for its medically-sound material safety.",
      videoUrl: "https://www.youtube.com/embed/5w8nbn90Crs",
      image: thumb2
    },
    {
      role: "Comfort & Wellness",
      name: "Hemant Kumar",
      subtext: "Wellness Advocate",
      icon: <Users className="w-4 h-4 text-primary" />,
      quote: "At 70, morning stiffness used to be my daily struggle. Switching to Richa Foam’s series has restored my mobility.",
      videoUrl: "https://www.youtube.com/embed/zjRzRjoSTwY",
      image: thumb4
    },
    {
      role: "Energy Mentor",
      name: "Diwakar Panjwani",
      subtext: "Motivational Speaker & YouTuber",
      icon: <Mic2 className="w-4 h-4 text-primary" />,
      quote: "Your impact on the world is determined by your energy. I trust Richa Foam to provide restorative sleep.",
      videoUrl: "https://www.youtube.com/embed/9PfGi1ohynM",
      image: thumb5
    },
    {
      role: "Hospitality Choice",
      name: "Rishi Goyal",
      subtext: "Owner, Hotel Grand Mercure & Hotel Crystal Inn, Agra",
      icon: <Hotel className="w-4 h-4 text-primary" />,
      quote: "Our guests always ask about our mattresses. The durability is unmatched.",
      videoUrl: "https://www.youtube.com/embed/VFJZ3N_mW0w",
      image: thumb6
    }
  ];

  return (
    <section className="py-12 bg-slate-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-10 flex flex-col items-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-gradient-to-b from-amber-50 to-amber-100 border-double border-4 border-amber-300 mb-4 shadow-xl relative"
          >
            <div className="flex flex-col items-center justify-center text-center z-10 p-2 leading-none">
              <p className="text-[9px] font-bold text-amber-700 uppercase tracking-[0.15em] mb-1">Established</p>
              <p className="text-4xl font-black text-amber-900 leading-[0.85] my-1">1984</p>
              <p className="text-[8px] font-extrabold text-amber-800 uppercase tracking-wider leading-tight">40+ Years <br /> of Trust</p>
            </div>
          </motion.div>

          <h2 className="text-3xl md:text-5xl font-serif font-bold text-primary mb-3">
            Trusted by Experts. Loved by You.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((item, index) => (
            <Dialog key={index}>
              <DialogTrigger asChild>
                <motion.div
                  whileHover={{ y: -8 }}
                  className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all border border-gray-100 overflow-hidden cursor-pointer flex flex-col"
                >
                  <div className="relative aspect-video flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 bg-[#001533]" /> 
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="absolute right-0 bottom-0 h-full w-auto object-contain transition-transform z-10"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#001533]/95 via-[#001533]/40 to-transparent z-10" />
                    <div className="z-20 w-14 h-14 bg-white/10 backdrop-blur-md border border-white/30 text-white rounded-full flex items-center justify-center">
                      <Play className="fill-current ml-1" size={20} />
                    </div>
                  </div>

                  <div className="p-6 text-center flex-grow">
                    <div className="flex items-center justify-center gap-2 mb-3">
                      <div className="p-1.5 bg-slate-50 rounded-lg">{item.icon}</div>
                      <h4 className="font-bold text-primary text-lg">{item.name}</h4>
                    </div>
                    <p className="italic text-muted-foreground text-sm line-clamp-2">"{item.quote}"</p>
                    <div className="mt-4 pt-4 border-t border-slate-100">
                      <span className="text-[10px] text-amber-600 font-bold uppercase tracking-[0.2em]">{item.subtext}</span>
                    </div>
                  </div>
                </motion.div>
              </DialogTrigger>
              
              <DialogContent className="sm:max-w-[400px] p-0 bg-black border-none overflow-hidden rounded-[2rem] aspect-[9/16]">
                <iframe
                  width="100%"
                  height="100%"
                  // ADDED: rel=0 to prevent related videos, origin to help with local dev issues
                  src={`${item.videoUrl}?autoplay=1&modestbranding=1&rel=0`}
                  title={`Testimonial by ${item.name}`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </div>
    </section>
  );
}