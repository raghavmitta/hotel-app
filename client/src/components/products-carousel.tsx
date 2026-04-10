/**
 * products-carousel.tsx — Product carousel with B2B pricing dialog
 *
 * Meta Events fired:
 *   ViewContent       → when user navigates to a product (prev/next)
 *   InitiateCheckout  → when dialog opens ("Inquire for B2B Pricing" click)
 *   Lead              → successful popup form submission
 *   QualifiedLead     → if quantity >= 10 (custom event)
 *   BulkInquiry       → custom event with product details always on submit
 */

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useMutation } from "@tanstack/react-query";
import { useLocation } from "wouter";

// UI Components
import {
  ChevronLeft, ChevronRight, Check, Zap, Building2,
  Users, Layers, ShieldCheck, Wind, Send
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog, DialogContent, DialogDescription, DialogHeader,
  DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useMetaEvent } from "@/hooks/useMetaEvent"; // ← ADD THIS

// Asset Imports
import hr from "@assets/generated_images/hr.png";
import regency from "@assets/generated_images/regency.png";
import comfort from "@assets/generated_images/comfort.png";
import eco from "@assets/generated_images/eco.png";
import regency_bonell from "@assets/generated_images/regency_bonell.png";
import comfort_bonell from "@assets/generated_images/comfort_bonell.png";
import eco_bonell from "@assets/generated_images/eco_bonell.png";

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  hotelName: z.string().min(2, "Hotel name is required"),
  quantity: z
    .string()
    .min(1, "Quantity is required")
    .refine((val) => parseInt(val) >= 1, { message: "Quantity must be at least 1" }),
  phone: z.string().regex(/^[6-9]\d{9}$/, "Please enter a valid 10-digit mobile number"),
  location: z.string().min(2, "City is required"),
});

const products = [
  {
    id: 1,
    name: "Zen Signature",
    tagline: "The Weightless Experience",
    hasToggle: false,
    property: "5-Star Luxury / Boutique Hotels",
    guest: "VIPs & Luxury Travelers",
    warranty: "10-Year Structural Warranty",
    options: [
      {
        type: "Pocketed Core",
        image: hr,
        feel: "Adaptive / High-Resilience Buoyancy",
        features: [
          { title: "High-Resilience Foam", desc: "Fast-recovery HR foam for buoyant support.", icon: <Zap size={16}/> },
          { title: "Acoustic Buffer", desc: "Specialized felt layers for a silent environment.", icon: <Layers size={16}/> },
          { title: "Perimeter Reinforcement", desc: "HD foam borders to maximize sleep surface.", icon: <ShieldCheck size={16}/> },
        ],
        advantage: "Best for high-rate suites where guest comfort and noise-reduction are paramount.",
      },
    ],
  },
  {
    id: 2,
    name: "Regency Series",
    tagline: "The Business Standard",
    hasToggle: true,
    property: "4-Star / Business Hotels",
    guest: "Corporate Executives & Frequent Flyers",
    warranty: "7-10 Year Commercial Warranty",
    options: [
      {
        type: "Pocketed Core",
        image: regency,
        feel: "Balanced / Responsive Support",
        features: [
          { title: "Micro-Plush Layer", desc: "Adaptive comfort for all body types.", icon: <Zap size={16}/> },
          { title: "Independent Coils", desc: "Pocketed system for zero-motion disturbance.", icon: <Layers size={16}/> },
          { title: "Fire-Shield Fabric", desc: "International hospitality safety standards.", icon: <ShieldCheck size={16}/> },
        ],
        advantage: "The universal choice for 4-star hotels requiring a premium feel.",
      },
      {
        type: "Bonnell Core",
        image: regency_bonell,
        feel: "Traditional / Ortho-Firm",
        features: [
          { title: "High-Tensile Core", desc: "Robust steel springs for active spinal support.", icon: <Zap size={16}/> },
          { title: "Lateral Stabilizers", desc: "Internal supports to maintain mattress shape.", icon: <ShieldCheck size={16}/> },
          { title: "Heavy-Duty Base", desc: "Reinforced layers for extended product life.", icon: <Layers size={16}/> },
        ],
        advantage: "Provides a traditional firm profile with heavy-duty structural integrity.",
      },
    ],
  },
  {
    id: 3,
    name: "Boutique Series",
    tagline: "The Climate Specialist",
    hasToggle: true,
    property: "Resorts & Wellness Retreats",
    guest: "Health-Conscious & Nature Lovers",
    warranty: "5-7 Year Commercial Warranty",
    options: [
      {
        type: "Pocketed Core",
        image: comfort,
        feel: "Medium-Firm / Quiet",
        features: [
          { title: "Silent-Isolation", desc: "Minimized internal friction for a quiet sleep.", icon: <Layers size={16}/> },
          { title: "Responsive Foam", desc: "Medium-firm support for spinal alignment.", icon: <Zap size={16}/> },
          { title: "Deep-Quilt Design", desc: "Modern aesthetics for boutique decor.", icon: <ShieldCheck size={16}/> },
        ],
        advantage: "Combines modern pocket-spring utility with a firm support system.",
      },
      {
        type: "Bonnell Core",
        image: comfort_bonell,
        feel: "Cooling / Ortho-Firm",
        features: [
          { title: "Rubberized Coir", desc: "Natural fiber for passive cooling.", icon: <Wind size={16}/> },
          { title: "Thermal Airflow", desc: "Prevents heat buildup in humid weather.", icon: <Zap size={16}/> },
          { title: "Firm Ortho-Core", desc: "Maximum support for back-health travelers.", icon: <ShieldCheck size={16}/> },
        ],
        advantage: "Ideally suited for tropical climates; natural coir acts as a cooling lung.",
      },
    ],
  },
  {
    id: 4,
    name: "Economy Series",
    tagline: "The ROI Workhorse",
    hasToggle: true,
    property: "Transit Hotels & High-Occupancy",
    guest: "Solo Travelers & Large Groups",
    warranty: "5-Year Essential Warranty",
    options: [
      {
        type: "Pocketed Core",
        image: eco,
        feel: "Standard / Balanced",
        features: [
          { title: "Modern Utility", desc: "Standard pocket springs for motion isolation.", icon: <Layers size={16}/> },
          { title: "Edge Stability", desc: "Stabilized borders for daily room turnover.", icon: <ShieldCheck size={16}/> },
          { title: "B2B Efficiency", desc: "Quality comfort layers at a competitive point.", icon: <Zap size={16}/> },
        ],
        advantage: "Offers modern sleep technology for budget-conscious properties.",
      },
      {
        type: "Bonnell Core",
        image: eco_bonell,
        feel: "Uniformly Firm",
        features: [
          { title: "High-Tensile Core", desc: "Heavy-duty steel springs for durability.", icon: <Zap size={16}/> },
          { title: "Felt-Guard Shield", desc: "Protects layers from internal spring wear.", icon: <Layers size={16}/> },
          { title: "Maximum ROI", desc: "Unmatched durability per rupee spent.", icon: <ShieldCheck size={16}/> },
        ],
        advantage: "The ultimate ROI workhorse; engineered to stay flat over time.",
      },
    ],
  },
];

const GOOGLE_SHEET_URL = "https://script.google.com/macros/s/AKfycbxv62qFn2ok69pE6Tv5_lQmXKCwUPtbhoJuVCgPkSoLCEfHVIdGogP-FC6QlzBvHGb5fw/exec";

export function ProductsCarousel() {
  const [, setLocation] = useLocation();
  const { sendEvent } = useMetaEvent();         // ← ADD THIS
  const [currentIndex, setCurrentIndex] = useState(0);
  const [springType, setSpringType] = useState(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const current = products[currentIndex];
  const activeOption = current.options[current.hasToggle ? springType : 0] || current.options[0];

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", hotelName: "", phone: "", quantity: "", location: "" },
  });

  // ── Navigate products + fire ViewContent ─────────────────────────────────
  const next = useCallback(() => {
    const nextIndex = (currentIndex + 1) % products.length;
    setCurrentIndex(nextIndex);
    setSpringType(0);
    // Fire ViewContent for the newly viewed product
    sendEvent({
      event_name:    "ViewContent",
      product_name:  products[nextIndex].name,
      spring_type:   products[nextIndex].options[0].type,
      source:        "product_carousel",
    });
  }, [currentIndex, sendEvent]);

  const prev = useCallback(() => {
    const prevIndex = (currentIndex - 1 + products.length) % products.length;
    setCurrentIndex(prevIndex);
    setSpringType(0);
    sendEvent({
      event_name:    "ViewContent",
      product_name:  products[prevIndex].name,
      spring_type:   products[prevIndex].options[0].type,
      source:        "product_carousel",
    });
  }, [currentIndex, sendEvent]);

  // ── Dialog open = InitiateCheckout ───────────────────────────────────────
  const handleDialogOpen = useCallback((open: boolean) => {
    setIsDialogOpen(open);
    if (open) {
      sendEvent({
        event_name:    "InitiateCheckout",
        product_name:  current.name,
        spring_type:   activeOption.type,
        source:        "product_carousel_popup",
      });
    }
  }, [sendEvent, current.name, activeOption.type]);

  const submitLead = useMutation({
    mutationFn: async (values: z.infer<typeof formSchema>) => {
      const [phpResponse] = await Promise.all([
        fetch("api/lead.php", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...values,
            source: "product_carousel_popup",
            message: `Product Inquiry: ${current.name} (${activeOption.type})`,
          }),
        }),
        fetch(GOOGLE_SHEET_URL, {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...values,
            source: "product_carousel_popup",
            message: `Product Inquiry: ${current.name} (${activeOption.type})`,
          }),
        }),
      ]);
      if (!phpResponse.ok) throw new Error("Failed to submit to database");
      return phpResponse.json();
    },
    onSuccess: (_, values) => {
      // ── Lead event ────────────────────────────────────────────────────
      sendEvent({
        event_name:    "Lead",
        phone:         values.phone,
        name:          values.name,
        hotel_name:    values.hotelName,
        quantity:      values.quantity,
        city:          values.location,
        location:      values.location,
        product_name:  current.name,
        spring_type:   activeOption.type,
        source:        "product_carousel_popup",
      });

      // ── BulkInquiry custom event (always fires from carousel) ─────────
      sendEvent({
        event_name:        "CustomEvent",
        event_custom_name: "BulkInquiry",
        phone:             values.phone,
        name:              values.name,
        hotel_name:        values.hotelName,
        quantity:          values.quantity,
        city:              values.location,
        product_name:      current.name,
        spring_type:       activeOption.type,
        source:            "product_carousel_popup",
      });

      // ── QualifiedLead if qty ≥ 10 ─────────────────────────────────────
      if (parseInt(values.quantity) >= 10) {
        sendEvent({
          event_name:        "CustomEvent",
          event_custom_name: "QualifiedLead",
          phone:             values.phone,
          name:              values.name,
          hotel_name:        values.hotelName,
          quantity:          values.quantity,
          city:              values.location,
          product_name:      current.name,
          source:            "product_carousel_popup",
        });
      }

      form.reset();
      setIsDialogOpen(false);
      setLocation("/thank-you");
    },
    onError: (error) => {
      setIsDialogOpen(false);
      console.error("Lead capture failed:", error);
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    submitLead.mutate(values);
  }

  return (
    <section className="py-16 bg-white font-sans text-[#001c44]">
      <div className="max-w-[1500px] mx-auto px-6">

        <div className="border-b border-slate-200 pb-10 mb-10">
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-amber-600 mb-2">{current.tagline}</p>
          <h2 className="text-6xl font-serif font-bold leading-none">{current.name}</h2>
        </div>

        <div className="grid lg:grid-cols-4 gap-0 border border-slate-200 rounded-[3.5rem] overflow-hidden bg-slate-50/20 shadow-sm">

          {/* Left panel */}
          <div className="p-10 border-r border-slate-100 bg-white space-y-10">
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-slate-400"><Building2 size={18}/><h4 className="text-[10px] font-black uppercase tracking-widest">Property Category</h4></div>
                <p className="text-xl font-bold leading-tight">{current.property}</p>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-slate-400"><Users size={18}/><h4 className="text-[10px] font-black uppercase tracking-widest">Guest Target</h4></div>
                <p className="text-xl font-bold leading-tight">{current.guest}</p>
              </div>
            </div>

            {current.hasToggle && (
              <div className="pt-6 border-t border-slate-100 space-y-3">
                <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Select Core Build</h4>
                <div className="flex flex-col gap-2">
                  {current.options.map((opt, i) => (
                    <button key={i} onClick={() => setSpringType(i)}
                      className={`w-full py-3 px-4 rounded-xl text-[10px] font-black uppercase tracking-widest text-left border transition-all ${springType === i ? "bg-[#001c44] border-[#001c44] text-white shadow-lg" : "bg-slate-50 border-slate-200 text-slate-400 hover:bg-slate-100"}`}>
                      {opt.type}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="pt-6 border-t border-slate-100">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Resulting Feel</p>
              <p className="text-lg font-bold text-amber-600">{activeOption.feel}</p>
            </div>
          </div>

          {/* Middle panel — features */}
          <div className="p-10 border-r border-slate-100 bg-white flex flex-col justify-between">
            <div className="space-y-8">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Engineering Highlights</h4>
              <div className="space-y-6">
                <AnimatePresence mode="wait">
                  <motion.div key={`${current.id}-${springType}`} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }}>
                    {activeOption.features.map((feat, i) => (
                      <div key={i} className="flex gap-4 mb-6 last:mb-0">
                        <div className="mt-1 w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-[#001c44] border border-slate-100 flex-shrink-0">{feat.icon}</div>
                        <div>
                          <p className="text-sm font-bold text-[#001c44] leading-none mb-1">{feat.title}</p>
                          <p className="text-xs text-slate-500 leading-relaxed font-medium">{feat.desc}</p>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
            <div className="pt-6 border-t border-slate-100">
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#001c44] flex items-center gap-2"><Zap size={14}/> Operational Advantage</h4>
              <p className="text-xs leading-relaxed text-slate-500 italic mt-2">"{activeOption.advantage}"</p>
            </div>
          </div>

          {/* Right panel — image + actions */}
          <div className="lg:col-span-2 p-12 flex flex-col justify-between bg-white relative">
            <div className="relative aspect-video flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.img
                  key={`${current.id}-${springType}`}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  src={activeOption.image}
                  className="w-full h-full object-contain"
                />
              </AnimatePresence>
            </div>

            <div className="space-y-8 mt-12">
              <div className="flex items-center gap-6 pb-6 border-b border-slate-100">
                <div className="flex gap-2">
                  <Button onClick={prev} variant="outline" className="h-12 w-12 rounded-xl border-slate-200 bg-white hover:bg-slate-50 transition-all"><ChevronLeft size={20}/></Button>
                  <Button onClick={next} variant="outline" className="h-12 w-12 rounded-xl border-slate-200 bg-white hover:bg-slate-50 transition-all"><ChevronRight size={20}/></Button>
                </div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Model 0{currentIndex + 1} / 04</p>
              </div>

              <div className="flex flex-col md:flex-row items-center gap-6">
                <Dialog open={isDialogOpen} onOpenChange={handleDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="flex-1 h-16 bg-[#001c44] hover:bg-slate-800 text-white rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] shadow-xl">
                      Inquire for B2B Commercial Pricing
                    </Button>
                  </DialogTrigger>

                  <DialogContent className="sm:max-w-[450px] rounded-3xl p-8 border-none shadow-2xl">
                    <DialogHeader>
                      <DialogTitle className="text-2xl font-serif text-[#001c44]">Property Inquiry</DialogTitle>
                      <DialogDescription>
                        Capturing requirements for <span className="font-bold text-[#001c44]">{current.name}</span> — {activeOption.type}.
                      </DialogDescription>
                    </DialogHeader>

                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
                        <FormField control={form.control} name="name" render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-[10px] uppercase font-black text-slate-400">Contact Name</FormLabel>
                            <FormControl><Input placeholder="John Doe" {...field} className="h-12 rounded-xl bg-slate-50 border-slate-200" /></FormControl>
                            <FormMessage />
                          </FormItem>
                        )} />

                        <FormField control={form.control} name="hotelName" render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-[10px] uppercase font-black text-slate-400">Hotel Name</FormLabel>
                            <FormControl><Input placeholder="Grand Plaza Hotel" {...field} className="h-12 rounded-xl bg-slate-50 border-slate-200" /></FormControl>
                            <FormMessage />
                          </FormItem>
                        )} />

                        <FormField control={form.control} name="phone" render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-[10px] uppercase font-black text-slate-400">Phone Number</FormLabel>
                            <FormControl>
                              <div className="relative flex items-center">
                                <span className="absolute left-3 text-gray-500 font-bold border-r pr-2 border-gray-300 pointer-events-none">+91</span>
                                <Input {...field} type="tel" maxLength={10} placeholder="7500210132"
                                  className="pl-14 h-12 rounded-xl bg-slate-50 border-slate-200"
                                  onChange={(e) => { field.onChange(e.target.value.replace(/\D/g, "")); }} />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )} />

                        <div className="grid grid-cols-2 gap-4">
                          <FormField control={form.control} name="quantity" render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-[10px] uppercase font-black text-slate-400">Units Required</FormLabel>
                              <FormControl>
                                <Input type="number" min="1" placeholder="25" {...field}
                                  className="h-12 rounded-xl bg-slate-50 border-slate-200"
                                  onChange={(e) => { const val = e.target.value; if (val === "" || parseInt(val) >= 1) field.onChange(val); }} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )} />
                          <FormField control={form.control} name="location" render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-[10px] uppercase font-black text-slate-400">Property City</FormLabel>
                              <FormControl><Input placeholder="Agra" {...field} className="h-12 rounded-xl bg-slate-50 border-slate-200" /></FormControl>
                              <FormMessage />
                            </FormItem>
                          )} />
                        </div>

                        <Button type="submit" disabled={submitLead.isPending}
                          className="w-full h-14 bg-amber-500 hover:bg-amber-600 text-[#001c44] font-black uppercase tracking-widest text-xs rounded-xl flex gap-2 mt-4">
                          {submitLead.isPending ? "Submitting..." : "Submit Inquiry"} <Send size={16} />
                        </Button>
                      </form>
                    </Form>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}