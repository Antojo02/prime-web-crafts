import { motion } from "framer-motion";
import { ExternalLink, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const projects = [
  {
    title: "Supermercado Esperanza",
    category: "E-commerce",
    description: "Tienda online de productos de supermercado con delivery",
    url: "https://supermercadoesperanza.com/",
    image: "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=800&h=600&fit=crop",
    color: "from-green-500 to-emerald-500",
  },
  {
    title: "Mundae Universidad",
    category: "Educación",
    description: "Plataforma educativa universitaria moderna",
    url: "https://mundaeuniversidad.com/",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=600&fit=crop",
    color: "from-blue-500 to-indigo-500",
  },
  {
    title: "Xpera",
    category: "Tecnología",
    description: "Soluciones tecnológicas innovadoras",
    url: "https://xpera.es/",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
    color: "from-purple-500 to-pink-500",
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
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {projects.map((project, index) => (
            <motion.a
              key={index}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative overflow-hidden rounded-2xl glass-card cursor-pointer block"
            >
              {/* Project Image with iframe preview effect */}
              <div className={`aspect-[4/3] bg-gradient-to-br ${project.color} p-4 relative overflow-hidden`}>
                <div className="absolute inset-4 rounded-lg bg-white shadow-2xl overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200">
                    {/* Browser mockup */}
                    <div className="flex items-center gap-1.5 px-3 py-2 bg-gray-300">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                      <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                      <div className="ml-2 flex-1 bg-white/80 rounded text-[8px] px-2 py-0.5 text-gray-500 truncate">
                        {project.url}
                      </div>
                    </div>
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                
                {/* Floating tech icons */}
                <motion.div
                  animate={{ y: [0, -5, 0], rotate: [0, 5, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute top-2 right-2 bg-white/90 backdrop-blur px-2 py-1 rounded text-xs font-bold text-gray-800"
                >
                  LIVE
                </motion.div>
              </div>

              {/* Project Info */}
              <div className="p-6">
                <span className="text-sm text-primary font-medium">{project.category}</span>
                <h3 className="text-xl font-display font-bold mt-1 mb-2 group-hover:text-primary transition-colors">{project.title}</h3>
                <p className="text-muted-foreground mb-4">{project.description}</p>
                <span className="inline-flex items-center gap-2 text-sm font-medium text-primary group-hover:underline">
                  Ver proyecto
                  <ExternalLink size={16} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors duration-300 pointer-events-none" />
            </motion.a>
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
