import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export default function ThankYou() {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <Navbar />
      <main className="flex items-center justify-center min-h-[80vh] px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto py-24"
        >
          <div className="mb-8">
            <CheckCircle className="w-24 h-24 text-green-500 mx-auto" />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-6" data-testid="text-thank-you-title">
            Thank You!
          </h1>
          
          <p className="text-xl text-muted-foreground mb-4" data-testid="text-thank-you-message">
            Your request has been received successfully.
          </p>
          
          <p className="text-lg text-muted-foreground mb-8">
            Our sales team will contact you within <strong>24 hours</strong> to discuss your hotel mattress requirements and provide a custom quote.
          </p>
          
          <div className="bg-secondary/30 rounded-xl p-6 mb-8">
            <h3 className="font-semibold text-primary mb-2">What happens next?</h3>
            <ul className="text-left text-muted-foreground space-y-2">
              <li>1. Our team will review your requirements</li>
              <li>2. We'll prepare a customized quote for your property</li>
              <li>3. A dedicated account manager will reach out to you</li>
            </ul>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/">
              <Button size="lg" className="bg-primary text-white hover:bg-primary/90" data-testid="button-back-home">
                Back to Home
              </Button>
            </Link>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-primary text-primary hover:bg-primary/10"
              onClick={() => window.location.href = "tel:+919876543210"}
              data-testid="button-call-now"
            >
              Call Us Now
            </Button>
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}
