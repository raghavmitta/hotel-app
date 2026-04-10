/**
 * promo-form.tsx — "Claim Your Quote" (first form, mid-page)
 *
 * Meta Events fired:
 *   InitiateCheckout  → first field focus
 *   Lead              → successful submission
 *   QualifiedLead     → if quantity >= 10 (custom event)
 */

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { useRef, useCallback } from "react";
import { useMetaEvent } from "@/hooks/useMetaEvent"; // ← ADD THIS

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  hotelName: z.string().min(2, "Hotel name is required"),
  quantity: z
    .string()
    .min(1, "Quantity is required")
    .refine((val) => parseInt(val) >= 1, { message: "Quantity must be at least 1" }),
  email: z.string().email("Invalid email address").optional().or(z.literal("")),
  phone: z.string().regex(/^[6-9]\d{9}$/, "Please enter a valid 10-digit mobile number"),
  location: z.string().min(2, "City is required"),
  message: z.string().optional(),
});

const GOOGLE_SHEET_URL = "https://script.google.com/macros/s/AKfycbxv62qFn2ok69pE6Tv5_lQmXKCwUPtbhoJuVCgPkSoLCEfHVIdGogP-FC6QlzBvHGb5fw/exec";

export function PromoForm() {
  const [, setLocation] = useLocation();
  const { sendEvent } = useMetaEvent();         // ← ADD THIS
  const initiatedRef = useRef(false);           // fire InitiateCheckout only once

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "", hotelName: "", email: "", phone: "",
      quantity: "", message: "", location: "",
    },
  });

  // Fire InitiateCheckout on first field interaction
  const handleFirstFocus = useCallback(() => {
    if (initiatedRef.current) return;
    initiatedRef.current = true;
    sendEvent({
      event_name: "InitiateCheckout",
      source: "first_form",
    });
  }, [sendEvent]);

  const submitLead = useMutation({
    mutationFn: async (values: z.infer<typeof formSchema>) => {
      const [phpResponse] = await Promise.all([
        fetch("api/lead.php", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...values, source: "first_form" }),
        }),
        fetch(GOOGLE_SHEET_URL, {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...values, source: "first_form" }),
        }),
      ]);
      if (!phpResponse.ok) throw new Error("Failed to submit to database");
      return phpResponse.json();
    },
    onSuccess: (_, values) => {
      // ── Lead event ────────────────────────────────────────────────────
      sendEvent({
        event_name: "Lead",
        email:      values.email,
        phone:      values.phone,
        name:       values.name,
        hotel_name: values.hotelName,
        quantity:   values.quantity,
        city:       values.location,
        location:   values.location,
        message:    values.message,
        source:     "first_form",
      });

      // ── QualifiedLead if qty ≥ 10 ─────────────────────────────────────
      if (parseInt(values.quantity) >= 10) {
        sendEvent({
          event_name:        "CustomEvent",
          event_custom_name: "QualifiedLead",
          email:             values.email,
          phone:             values.phone,
          name:              values.name,
          hotel_name:        values.hotelName,
          quantity:          values.quantity,
          city:              values.location,
          source:            "first_form",
        });
      }

      form.reset();
      setLocation("/thank-you");
    },
    onError: (error) => {
      console.error("Lead capture failed:", error);
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    submitLead.mutate(values);
  }

  return (
    <section className="py-24 bg-gradient-to-br from-accent/5 via-white to-primary/5 relative overflow-hidden">
      <div className="absolute top-10 right-10 w-40 h-40 bg-accent/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-1/4 w-60 h-60 bg-primary/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="flex items-center gap-3">
              <Sparkles className="w-6 h-6 text-accent" />
              <span className="text-accent font-bold tracking-wider uppercase text-sm">Exclusive Offer</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold leading-tight text-primary">
              Why Deal Direct with Factories? <br />
              <span className="text-accent">Get a Trusted Partner Instead</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-lg leading-relaxed">
              Factory direct means MOQs, communication delays, and zero support. Richa Foam is your expert distributor—we handle logistics, quality assurance, and lifetime support. One trusted source. Complete peace of mind.
            </p>
            <div className="space-y-3 pt-6 border-l-4 border-accent pl-6">
              <p className="text-sm text-foreground/80 font-semibold">✓ Exceptional pricing + expert guidance (no factory negotiations)</p>
              <p className="text-sm text-foreground/80 font-semibold">✓ Flexible orders, fast delivery, zero hassle</p>
              <p className="text-sm text-foreground/80 font-semibold">✓ Lifetime support + warranty claims we handle for you</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl p-8 shadow-2xl border border-accent/20"
          >
            <h3 className="text-2xl font-bold mb-2 text-primary">Claim Your Quote</h3>
            <p className="text-muted-foreground mb-6 text-sm">Fill out your details and we'll send pricing within 24 hours.</p>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <FormField control={form.control} name="name" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-semibold">Contact Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="John Doe" {...field}
                          onFocus={handleFirstFocus}
                          className="bg-gray-50 border-gray-200 focus:bg-white transition-colors text-sm"
                          data-testid="input-promo-name"
                        />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="hotelName" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-semibold">Hotel / Property</FormLabel>
                      <FormControl>
                        <Input placeholder="Grand Plaza Hotel" {...field}
                          className="bg-gray-50 border-gray-200 focus:bg-white transition-colors text-sm"
                          data-testid="input-promo-hotel" />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <FormField control={form.control} name="email" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-semibold">Email (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="john@hotel.com" {...field}
                          className="bg-gray-50 border-gray-200 focus:bg-white transition-colors text-sm"
                          data-testid="input-promo-email" />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="phone" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <div className="relative flex items-center">
                          <span className="absolute left-3 text-gray-500 font-bold border-r pr-2 border-gray-300 pointer-events-none">+91</span>
                          <Input {...field} type="tel" maxLength={10} placeholder="7500210132"
                            className="pl-14 bg-gray-50 border-gray-200 focus:bg-white transition-colors"
                            onChange={(e) => { field.onChange(e.target.value.replace(/\D/g, "")); }} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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
                      <FormControl>
                        <Input placeholder="Agra" {...field} className="h-12 rounded-xl bg-slate-50 border-slate-200" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                </div>

                <FormField control={form.control} name="message" render={({ field }) => (
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
                )} />

                <Button type="submit" size="lg"
                  className="w-full bg-primary hover:bg-primary/90 text-white font-bold text-base py-3"
                  disabled={submitLead.isPending}
                  data-testid="button-promo-submit">
                  {submitLead.isPending ? "Submitting..." : "Get Early Bird Pricing"}
                </Button>
              </form>
            </Form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}