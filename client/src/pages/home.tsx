import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { Features } from "@/components/features";
import { PromoForm } from "@/components/promo-form";
import { ProductShowcase } from "@/components/product-showcase";
import { ClientLogos } from "@/components/client-logos";
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
        <ClientLogos />
        <section id="about" className="py-24 bg-white text-center">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-3xl font-serif font-bold text-primary mb-6">About Richa Foam</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              At Richa Foam, we're committed to offering your guests a good night's sleep, every night. Over 20 years, we've learned what works in hospitality. We're your trusted distributor of premium mattresses—experts in one brand, not generalists across many. We handle logistics, quality assurance, customization, and lifetime support. Why deal directly with factories (MOQs, communication delays, zero support) when you can partner with us? One trusted source. Institutional pricing. Complete peace of mind.
            </p>
          </div>
        </section>
        <LeadForm />
      </main>
      <Footer />
    </div>
  );
}
