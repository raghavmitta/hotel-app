import logo from "@assets/generated_images/richa_foam_agency_logo.png";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="space-y-4">
            <img 
              src={logo} 
              alt="Richa Foam Agency" 
              className="h-12 w-auto"
              data-testid="logo-footer"
            />
            <p className="text-sm leading-relaxed text-gray-400">
              Premium quality mattresses, expert guidance, and lifetime support for hotels across India since 1985.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4 uppercase tracking-wider text-sm">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#features" className="text-gray-400 hover:text-white transition-colors">Why Choose Us</a></li>
              <li><a href="#products" className="text-gray-400 hover:text-white transition-colors">Our Collections</a></li>
              <li><a href="#contact" className="text-gray-400 hover:text-white transition-colors">Get a Quote</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4 uppercase tracking-wider text-sm">Contact Us</h4>
            <ul className="space-y-3 text-sm">
              <li><span className="text-gray-400">Phone:</span> +91 7351001999</li>
              <li><span className="text-gray-400">Email:</span> sales@richafoam.com</li>
              <li><span className="text-gray-400">Address:</span> 21/50,Freeganj,Agra</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} Richa Foam Agency. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
