import { motion } from "framer-motion";

export function ClientLogos() {
  // Placeholder hotel names - replace with actual logos/images later
  const hotels = [
    "The Oberoi Group",
    "ITC Hotels",
    "Taj Hotels",
    "Radisson Blu",
    "JW Marriott",
    "Hyatt Regency",
    "Four Seasons",
    "Grand Plaza Hotels"
  ];

  return (
    <section className="py-20 bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4">Trusted by Leading Hotels</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Premium hotels across India trust Richa Foam for guest comfort and operational reliability.
          </p>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {hotels.map((hotel, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100 flex items-center justify-center min-h-[120px]"
            >
              <p className="text-center font-semibold text-foreground/80 text-sm">{hotel}</p>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-16 p-8 bg-primary/5 rounded-2xl border border-primary/10">
          <h3 className="text-2xl font-bold text-primary mb-3">Single Brand, Superior Focus</h3>
          <p className="text-muted-foreground leading-relaxed">
            We partner exclusively with one premium mattress manufacturer. This focused approach means deep expertise, consistent quality, and complete warranty coverage. No brand juggling. No quality compromise. Just proven reliability that keeps your guests coming back.
          </p>
        </div>
      </div>
    </section>
  );
}
