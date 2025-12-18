export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-2xl font-serif font-bold text-white">Richa Foam<span className="text-accent">.</span></h3>
            <p className="text-sm leading-relaxed text-gray-400">
              Committed to your guests' good night's sleep. Premium quality mattresses, expert guidance, and lifetime support since 1995.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold text-white mb-4 uppercase tracking-wider text-sm">Products</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-accent transition-colors">Royal Suite Collection</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Orthopedic Series</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Memory Foam</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Custom Sizes</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4 uppercase tracking-wider text-sm">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-accent transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Manufacturing Process</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Sustainability</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Careers</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4 uppercase tracking-wider text-sm">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li>123 Industrial Area, Phase 1</li>
              <li>New Delhi, India 110020</li>
              <li className="pt-2">+91 98765 43210</li>
              <li>sales@richafoam.com</li>
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
