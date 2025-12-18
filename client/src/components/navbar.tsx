import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import logo from "@assets/generated_images/richa_foam_agency_professional_logo.png";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full z-50 backdrop-blur-md border-b border-white/10" style={{ backgroundColor: '#000080' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/">
              <img 
                src={logo} 
                alt="Richa Foam Agency" 
                className="h-16 w-auto cursor-pointer hover:opacity-80 transition-opacity"
                data-testid="logo-navbar"
              />
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-white/80 hover:text-white transition-colors font-medium">Why Us</a>
            <a href="#products" className="text-white/80 hover:text-white transition-colors font-medium">Products</a>
            <a href="#about" className="text-white/80 hover:text-white transition-colors font-medium">About</a>
            <Button size="lg" className="bg-secondary text-primary hover:bg-secondary/90 font-semibold px-6" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
              Get a Quote
            </Button>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-white p-2">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden border-t border-white/10 absolute w-full" style={{ backgroundColor: '#000080' }}>
          <div className="px-4 pt-2 pb-6 space-y-2 shadow-lg">
            <a href="#features" className="block px-3 py-3 text-base font-medium text-white/80 hover:bg-white/10 rounded-md" onClick={() => setIsOpen(false)}>Why Us</a>
            <a href="#products" className="block px-3 py-3 text-base font-medium text-white/80 hover:bg-white/10 rounded-md" onClick={() => setIsOpen(false)}>Products</a>
            <a href="#about" className="block px-3 py-3 text-base font-medium text-white/80 hover:bg-white/10 rounded-md" onClick={() => setIsOpen(false)}>About</a>
            <div className="pt-4">
              <Button className="w-full bg-secondary text-primary" size="lg" onClick={() => { setIsOpen(false); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}>
                Get a Quote
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
