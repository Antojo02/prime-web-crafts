import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "María García",
    role: "CEO, TechStart",
    content: "Increíble trabajo. Superaron todas nuestras expectativas. El sitio web que nos crearon ha aumentado nuestras conversiones en un 150%.",
    rating: 5,
  },
  {
    name: "Carlos Rodríguez",
    role: "Fundador, FitLife",
    content: "El equipo de PRIME WEB entendió perfectamente nuestra visión. El resultado es un sitio moderno, rápido y que nuestros usuarios aman.",
    rating: 5,
  },
  {
    name: "Ana Martínez",
    role: "Directora, Boutique Elegance",
    content: "Profesionales de principio a fin. La asesoría que nos dieron fue invaluable y el soporte post-lanzamiento es excepcional.",
    rating: 5,
  },
];

export const TestimonialsSection = () => {
  return (
    <section id="testimonios" className="section-padding bg-secondary/30">
      <div className="container-tight">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Testimonios
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold mb-6">
            Lo que dicen{" "}
            <span className="gradient-text">nuestros clientes</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            La satisfacción de nuestros clientes es nuestra mejor carta de presentación.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card rounded-2xl p-8 relative"
            >
              {/* Quote Icon */}
              <div className="absolute top-6 right-6 text-primary/20">
                <Quote size={48} />
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                ))}
              </div>

              {/* Content */}
              <p className="text-muted-foreground leading-relaxed mb-6">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 gradient-bg rounded-full flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-lg">
                    {testimonial.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16"
        >
          {[
            { value: "100+", label: "Proyectos Completados" },
            { value: "50+", label: "Clientes Satisfechos" },
            { value: "4.9", label: "Calificación Promedio" },
            { value: "24/7", label: "Soporte Disponible" },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <p className="text-3xl sm:text-4xl font-display font-bold gradient-text mb-2">
                {stat.value}
              </p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
