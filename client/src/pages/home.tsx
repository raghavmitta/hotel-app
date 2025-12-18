import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { Features } from "@/components/features";
import { PromoForm } from "@/components/promo-form";
import { ProductShowcase } from "@/components/product-showcase";
import { LeadForm } from "@/components/lead-form";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground overflow-x-hidden selection:bg-accent/30">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <PromoForm />
        <ProductShowcase />
        <section id="about" className="py-24 bg-white text-center">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-3xl font-serif font-bold text-primary mb-6">About Richa Foam</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              With over two decades of expertise in foam technology and mattress manufacturing, Richa Foam Agency stands as a beacon of quality in the hospitality supply chain. We don't just sell mattresses; we engineer sleep experiences that keep your guests coming back. Our state-of-the-art facility ensures consistent quality across large-scale orders, making us the trusted partner for hotel chains across the country.
            </p>
          </div>
        </section>
        <LeadForm />
      </main>
      <Footer />
    </div>
  );
}
