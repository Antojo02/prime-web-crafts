import { motion } from "framer-motion";
import { ExternalLink, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const projects = [
  {
    title: "TechStart Pro",
    category: "Startup",
    description: "Plataforma SaaS para gestión empresarial",
    color: "from-blue-500 to-cyan-500",
  },
  {
    title: "Boutique Elegance",
    category: "E-commerce",
    description: "Tienda online de moda exclusiva",
    color: "from-pink-500 to-rose-500",
  },
  {
    title: "FitLife App",
    category: "Salud & Fitness",
    description: "Aplicación web de entrenamiento personal",
    color: "from-green-500 to-emerald-500",
  },
  {
    title: "Gastro Deluxe",
    category: "Restaurante",
    description: "Web con reservas y menú digital",
    color: "from-orange-500 to-amber-500",
  },
];

export const PortfolioSection = () => {
  return (
    <section id="portafolio" className="section-padding">
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
            Portafolio
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold mb-6">
            Proyectos que hablan{" "}
            <span className="gradient-text">por sí mismos</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Descubre cómo hemos ayudado a negocios como el tuyo a destacar en internet.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-2xl glass-card"
            >
              {/* Project Image Placeholder */}
              <div className={`aspect-[4/3] bg-gradient-to-br ${project.color} p-8 flex items-center justify-center`}>
                <div className="text-center text-white">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-display font-bold">{project.title.charAt(0)}</span>
                  </div>
                  <p className="font-medium opacity-90">{project.title}</p>
                </div>
              </div>

              {/* Project Info */}
              <div className="p-6">
                <span className="text-sm text-primary font-medium">{project.category}</span>
                <h3 className="text-xl font-display font-bold mt-1 mb-2">{project.title}</h3>
                <p className="text-muted-foreground mb-4">{project.description}</p>
                <button className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline group">
                  Ver proyecto
                  <ExternalLink size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors duration-300" />
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-12"
        >
          <Button variant="outline" size="lg" className="font-semibold group">
            Ver todos los proyectos
            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
