import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  hotelName: z.string().min(2, "Hotel name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number is required"),
  quantity: z.string().min(1, "Please select a quantity"),
  message: z.string().optional(),
});

export function PromoForm() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      hotelName: "",
      email: "",
      phone: "",
      quantity: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast({
      title: "Request Received",
      description: "Thank you! You'll receive exclusive early-bird pricing within 24 hours.",
    });
    form.reset();
  }

  return (
    <section className="py-24 bg-gradient-to-br from-accent/5 via-white to-primary/5 relative overflow-hidden">
      {/* Decorative elements */}
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
              <p className="text-sm text-foreground/80 font-semibold">
                ✓ Exceptional pricing + expert guidance (no factory negotiations)
              </p>
              <p className="text-sm text-foreground/80 font-semibold">
                ✓ Flexible orders, fast delivery, zero hassle
              </p>
              <p className="text-sm text-foreground/80 font-semibold">
                ✓ Lifetime support + warranty claims we handle for you
              </p>
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
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-semibold">Contact Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} className="bg-gray-50 border-gray-200 focus:bg-white transition-colors text-sm" />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="hotelName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-semibold">Hotel / Property</FormLabel>
                        <FormControl>
                          <Input placeholder="Grand Plaza Hotel" {...field} className="bg-gray-50 border-gray-200 focus:bg-white transition-colors text-sm" />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-semibold">Email</FormLabel>
                        <FormControl>
                          <Input placeholder="john@hotel.com" {...field} className="bg-gray-50 border-gray-200 focus:bg-white transition-colors text-sm" />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-semibold">Phone</FormLabel>
                        <FormControl>
                          <Input placeholder="+1 (555) 000-0000" {...field} className="bg-gray-50 border-gray-200 focus:bg-white transition-colors text-sm" />
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="quantity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-semibold">Estimated Quantity</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-gray-50 border-gray-200 focus:bg-white transition-colors text-sm">
                            <SelectValue placeholder="Select quantity range" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="10-50">10 - 50 units</SelectItem>
                          <SelectItem value="51-100">51 - 100 units</SelectItem>
                          <SelectItem value="101-500">101 - 500 units</SelectItem>
                          <SelectItem value="500+">500+ units</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-semibold">Special Requirements (Optional)</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Project timeline, custom sizes, delivery date..." 
                          className="resize-none bg-gray-50 border-gray-200 focus:bg-white transition-colors min-h-[80px] text-sm" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />

                <Button type="submit" size="lg" className="w-full bg-primary hover:bg-primary/90 text-white font-bold text-base py-3">
                  Get Early Bird Pricing
                </Button>
              </form>
            </Form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
