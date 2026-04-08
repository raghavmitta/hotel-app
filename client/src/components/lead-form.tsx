import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion } from "framer-motion";
import { useMutation } from "@tanstack/react-query";
import { useLocation } from "wouter";

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  hotelName: z.string().min(2, "Hotel name is required"),
  // UPDATED: Validates that the number is 1 or more
  quantity: z
    .string()
    .min(1, "Quantity is required")
    .refine((val) => parseInt(val) >= 1, {
      message: "Quantity must be at least 1",
    }),
  email: z.string().email("Invalid email address").optional().or(z.literal("")),
  phone: z.string().regex(/^[6-9]\d{9}$/, "Please enter a valid 10-digit mobile number"),
  location: z.string().min(2, "City is required"),
  message: z.string().optional()
});

export function LeadForm() {
  const [, setLocation] = useLocation();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      hotelName: "",
      email: "",
      phone: "+91 ",
      quantity: "",
      message: "",
      location: ""
    },
  });

// 1. Define your Google Script URL at the top
const GOOGLE_SHEET_URL = "https://script.google.com/macros/s/AKfycbxv62qFn2ok69pE6Tv5_lQmXKCwUPtbhoJuVCgPkSoLCEfHVIdGogP-FC6QlzBvHGb5fw/exec";

// ... inside LeadForm component

const submitLead = useMutation({
  mutationFn: async (values: z.infer<typeof formSchema>) => {
    // We wrap both fetch requests in Promise.all so they run at the same time
    const [phpResponse, googleResponse] = await Promise.all([
      // Path 1: Your existing PHP DB
      fetch("api/lead.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, source: "bottom_form" }),
      }),
      
      // Path 2: Google Sheet
      fetch(GOOGLE_SHEET_URL, {
        method: "POST",
        mode: "no-cors", // Google Apps Script requires no-cors for simple web apps
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          source: "bottom_form",
        }),
      })
    ]);

    if (!phpResponse.ok) {
      throw new Error("Failed to submit to database");
    }

    return phpResponse.json();
  },
  onSuccess: () => {
    form.reset();
    setLocation("/thank-you");
  },
  onError: (error) => {
    console.error("Lead capture failed:", error);
  },
});
 /* const submitLead = useMutation({
    mutationFn: async (values: z.infer<typeof formSchema>) => {
      const response = await fetch("api/lead.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          source: "contact_form",
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to submit lead");
      }
      return response.json();
    },
    onSuccess: () => {
      form.reset();
      setLocation("/thank-you");
    },
    onError: (error) => {
      console.error("Form submission error:", error);
    },
  });*/

  function onSubmit(values: z.infer<typeof formSchema>) {
    submitLead.mutate(values);
  }

  return (
    <section id="contact" className="py-24 bg-primary text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-white/5 skew-x-12 transform translate-x-1/4" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          <div className="space-y-8">
            <h2 className="text-4xl md:text-5xl font-serif font-bold leading-tight">
              Ready to Upgrade Your <br />
              <span className="text-white">Guest Experience?</span>
            </h2>
            <p className="text-lg text-gray-300 max-w-lg">
              Get a custom quote for your property today. We offer competitive bulk pricing and dedicated account management for hotel partners.
            </p>
            
            <div className="space-y-4 pt-4 border-t border-white/10">
              <div className="flex flex-col">
                <span className="text-sm text-white/80 uppercase tracking-wider font-bold mb-1">Direct Sales Line</span>
                <span className="text-2xl font-serif text-white">+91 73510 01999</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm text-white/80 uppercase tracking-wider font-bold mb-1">Email Support</span>
                <span className="text-2xl font-serif text-white">sales@richafoam.com</span>
              </div>
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl p-8 shadow-2xl text-foreground"
          >
            <h3 className="text-2xl font-bold mb-6 text-primary">Request a Quote</h3>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contact Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} className="bg-gray-50 border-gray-200 focus:bg-white transition-colors" data-testid="input-lead-name" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="hotelName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Hotel / Property Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Grand Plaza Hotel" {...field} className="bg-gray-50 border-gray-200 focus:bg-white transition-colors" data-testid="input-lead-hotel" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="john@hotel.com" {...field} className="bg-gray-50 border-gray-200 focus:bg-white transition-colors" data-testid="input-lead-email" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                 

<FormField
  control={form.control}
  name="phone"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Phone Number</FormLabel>
      <FormControl>
        <div className="relative flex items-center">
          {/* NON-ERASABLE PREFIX */}
          <span className="absolute left-3 text-gray-500 font-bold border-r pr-2 border-gray-300 pointer-events-none">
            +91
          </span>
          <Input 
            {...field}
            type="tel"
            maxLength={10}
            placeholder="7500210132" 
            className="pl-14 bg-gray-50 border-gray-200 focus:bg-white transition-colors" 
            onChange={(e) => {
              // Only allow numbers to be typed
              const val = e.target.value.replace(/\D/g, "");
              field.onChange(val);
            }}
          />
        </div>
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>
                </div>
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField 
  control={form.control} 
  name="quantity" 
  render={({ field }) => (
    <FormItem>
      <FormLabel className="text-[10px] uppercase font-black text-slate-400">
        Units Required
      </FormLabel>
      <FormControl>
        <Input 
          type="number" 
          min="1" // Prevents arrows from going below 1
          placeholder="25" 
          {...field} 
          className="h-12 rounded-xl bg-slate-50 border-slate-200" 
          onChange={(e) => {
            // Prevent manual typing of negative numbers or 0
            const val = e.target.value;
            if (val === "" || parseInt(val) >= 1) {
              field.onChange(val);
            }
          }}
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  )} 
/>
                          <FormField control={form.control} name="location" render={({ field }) => (
                                                      <FormItem><FormLabel className="text-[10px] uppercase font-black text-slate-400">Property City</FormLabel>
                                                      <FormControl><Input placeholder="Agra" {...field} className="h-12 rounded-xl bg-slate-50 border-slate-200" /></FormControl>
                                                      <FormMessage /></FormItem>
                                                    )} />
                                                    </div>

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Additional Requirements (Optional)</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Specific sizes, delivery timeline, custom requirements..." 
                          className="resize-none bg-gray-50 border-gray-200 focus:bg-white transition-colors min-h-[100px]" 
                          {...field}
                          data-testid="textarea-lead-message" 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full bg-secondary hover:bg-secondary/90 text-primary font-bold text-lg"
                  disabled={submitLead.isPending}
                  data-testid="button-lead-submit"
                >
                  {submitLead.isPending ? "Submitting..." : "Submit Request"}
                </Button>
              </form>
            </Form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
