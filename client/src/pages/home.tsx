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
              At Richa Foam, we're committed to offering your guests a good night's sleep, every night. Over 20 years, we've learned what works in hospitality. We don't just sell mattresses—we partner with hotels to remove the complexity of sourcing quality sleep solutions. While factory owners want minimum orders and offer zero support, and big brands prioritize margin over your needs, we do the research, handle quality assurance, manage logistics, and provide lifetime support. One partner. One phone call. Better margins. Zero factory headaches.
            </p>
          </div>
        </section>
        <LeadForm />
      </main>
      <Footer />
    </div>
  );
}
