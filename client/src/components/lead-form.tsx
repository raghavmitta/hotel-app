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
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number is required"),
  quantity: z.string().min(1, "Please select a quantity"),
  message: z.string().optional(),
});

export function LeadForm() {
  const [, setLocation] = useLocation();
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

  const submitLead = useMutation({
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
  });

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
                        <FormLabel>Email Address</FormLabel>
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
                          <Input placeholder="+91 7500210132" {...field} className="bg-gray-50 border-gray-200 focus:bg-white transition-colors" data-testid="input-lead-phone" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="quantity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Estimated Quantity</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-gray-50 border-gray-200 focus:bg-white transition-colors" data-testid="select-lead-quantity">
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
                      <FormMessage />
                    </FormItem>
                  )}
                />

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
