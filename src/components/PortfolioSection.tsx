import { motion, useScroll, useTransform } from "framer-motion";
import { ExternalLink, ArrowRight, Globe, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRef, useState } from "react";

const projects = [
  {
    title: "Supermercado Esperanza",
    category: "E-commerce",
    description: "Tienda online de productos de supermercado con sistema de delivery integrado",
    url: "https://supermercadoesperanza.com/",
    color: "from-green-500 to-emerald-600",
    tech: ["WordPress", "WooCommerce", "PHP"],
  },
  {
    title: "Mundae Universidad",
    category: "Educación",
    description: "Plataforma educativa universitaria con cursos online y gestión académica",
    url: "https://mundaeuniversidad.com/",
    color: "from-blue-500 to-indigo-600",
    tech: ["Astro", "Content Islands", "CSS"],
  },
  {
    title: "Xpera",
    category: "Tecnología",
    description: "Soluciones tecnológicas innovadoras para empresas y startups",
    url: "https://xpera.es/",
    color: "from-purple-500 to-pink-600",
    tech: ["Next.js", "TypeScript", "Tailwind"],
  },
  {
    title: "Magna Master Institute",
    category: "Educación",
    description: "Instituto de formación profesional con programas de maestría y certificaciones internacionales",
    url: "https://magnamasterinstitute.com/",
    color: "from-amber-500 to-orange-600",
    tech: ["Astro", "Content Islands", "SSG"],
  },
];

const ProjectCard = ({ project, index }: { project: typeof projects[0]; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const rotate = useTransform(scrollYProgress, [0, 0.5, 1], [-2, 0, 2]);

  // Generate screenshot URL using a service
  const screenshotUrl = `https://api.microlink.io/?url=${encodeURIComponent(project.url)}&screenshot=true&meta=false&embed=screenshot.url`;

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      style={{ y, rotate }}
      className="group relative"
    >
      <motion.a
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ y: -12 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="block relative overflow-hidden rounded-2xl glass-card cursor-pointer"
      >
        {/* Gradient Background */}
        <div className={`relative aspect-[16/10] bg-gradient-to-br ${project.color} p-3 sm:p-4 overflow-hidden`}>
          {/* Animated Background Pattern */}
          <motion.div
            animate={{
              backgroundPosition: isHovered ? "100% 100%" : "0% 0%",
            }}
            transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />

          {/* Browser Window */}
          <motion.div
            animate={{
              scale: isHovered ? 1.02 : 1,
              boxShadow: isHovered
                ? "0 25px 50px -12px rgba(0, 0, 0, 0.5)"
                : "0 10px 30px -10px rgba(0, 0, 0, 0.3)",
            }}
            transition={{ duration: 0.4 }}
            className="relative h-full rounded-lg bg-white overflow-hidden"
          >
            {/* Browser Header */}
            <div className="flex items-center gap-1.5 px-3 py-2 bg-gray-100 border-b border-gray-200">
              <motion.div
                animate={{ scale: isHovered ? [1, 1.2, 1] : 1 }}
                transition={{ duration: 0.3 }}
                className="w-2.5 h-2.5 rounded-full bg-red-400"
              />
              <motion.div
                animate={{ scale: isHovered ? [1, 1.2, 1] : 1 }}
                transition={{ duration: 0.3, delay: 0.05 }}
                className="w-2.5 h-2.5 rounded-full bg-yellow-400"
              />
              <motion.div
                animate={{ scale: isHovered ? [1, 1.2, 1] : 1 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="w-2.5 h-2.5 rounded-full bg-green-400"
              />
              <div className="ml-2 flex-1 flex items-center gap-1 bg-white rounded px-2 py-0.5 text-[10px] text-gray-500">
                <Globe size={10} className="text-gray-400" />
                <span className="truncate">{project.url.replace("https://", "")}</span>
              </div>
            </div>

            {/* Screenshot Area */}
            <div className="relative h-[calc(100%-32px)] bg-gray-50 overflow-hidden">
              {!imageLoaded && !imageError && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full"
                  />
                </div>
              )}
              
              {imageError ? (
                <div className={`absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br ${project.color} text-white`}>
                  <Globe size={40} className="mb-2 opacity-80" />
                  <span className="text-sm font-medium">{project.title}</span>
                  <span className="text-xs opacity-70 mt-1">Haz clic para visitar</span>
                </div>
              ) : (
                <motion.img
                  src={screenshotUrl}
                  alt={`Preview de ${project.title}`}
                  onLoad={() => setImageLoaded(true)}
                  onError={() => setImageError(true)}
                  animate={{
                    scale: isHovered ? 1.05 : 1,
                  }}
                  transition={{ duration: 0.6 }}
                  className={`w-full h-full object-cover object-top transition-opacity duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                />
              )}

              {/* Hover Overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: isHovered ? 1 : 0 }}
                className="absolute inset-0 bg-black/40 flex items-center justify-center"
              >
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: isHovered ? 1 : 0.8, opacity: isHovered ? 1 : 0 }}
                  className="bg-white rounded-full p-4 shadow-xl"
                >
                  <ExternalLink size={24} className="text-gray-800" />
                </motion.div>
              </motion.div>
            </div>
          </motion.div>

          {/* Live Badge */}
          <motion.div
            animate={{
              y: [0, -3, 0],
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute top-5 right-5 flex items-center gap-1.5 bg-white/95 backdrop-blur px-3 py-1.5 rounded-full shadow-lg"
          >
            <motion.span
              animate={{ scale: [1, 1.3, 1], opacity: [1, 0.5, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-2 h-2 bg-green-500 rounded-full"
            />
            <span className="text-xs font-bold text-gray-800">LIVE</span>
          </motion.div>

          {/* Floating Sparkles */}
          {isHovered && (
            <>
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1, y: [-10, -20], x: [0, 10] }}
                exit={{ opacity: 0 }}
                className="absolute top-10 left-10"
              >
                <Sparkles size={16} className="text-white" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1, y: [-5, -15], x: [0, -10] }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.1 }}
                className="absolute bottom-20 right-10"
              >
                <Sparkles size={12} className="text-white" />
              </motion.div>
            </>
          )}
        </div>

        {/* Project Info */}
        <div className="p-5 sm:p-6">
          <div className="flex items-center justify-between mb-2">
            <motion.span
              animate={{ x: isHovered ? 5 : 0 }}
              className="text-sm text-primary font-semibold"
            >
              {project.category}
            </motion.span>
            <div className="flex gap-1">
              {project.tech.map((tech, i) => (
                <span
                  key={i}
                  className="text-[10px] px-2 py-0.5 bg-muted rounded-full text-muted-foreground"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
          <h3 className="text-xl font-display font-bold mb-2 group-hover:text-primary transition-colors">
            {project.title}
          </h3>
          <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
            {project.description}
          </p>
          <motion.span
            animate={{ x: isHovered ? 5 : 0 }}
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary"
          >
            Ver proyecto
            <motion.span animate={{ x: isHovered ? 5 : 0 }}>
              <ExternalLink size={16} />
            </motion.span>
          </motion.span>
        </div>

        {/* Bottom Gradient Line */}
        <motion.div
          animate={{ scaleX: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${project.color} origin-left`}
        />
      </motion.a>
    </motion.div>
  );
};

export const PortfolioSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section ref={sectionRef} id="portafolio" className="section-padding overflow-hidden">
      <div className="container-tight">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4"
          >
            ✨ Portafolio
          </motion.span>
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
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
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
