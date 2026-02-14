import { motion } from "framer-motion";
import { Code, Palette, Headphones, Rocket, Layout, RefreshCw } from "lucide-react";
import { Link } from "react-router-dom";

const services = [
  {
    icon: Layout,
    title: "Diseño Personalizado",
    description: "Creamos diseños únicos que reflejan la identidad de tu marca y cautivan a tu audiencia.",
    href: "/diseno-web",
  },
  {
    icon: Code,
    title: "Desarrollo Web",
    description: "Sitios rápidos, seguros y optimizados con las últimas tecnologías del mercado.",
    href: "/desarrollo",
  },
  {
    icon: Palette,
    title: "Branding Digital",
    description: "Construimos una identidad visual coherente que destaca en el mundo digital.",
    href: "/diseno-web",
  },
  {
    icon: Rocket,
    title: "SEO & Performance",
    description: "Optimización completa para que tu sitio aparezca en los primeros resultados.",
    href: "/seo",
  },
  {
    icon: RefreshCw,
    title: "Mantenimiento",
    description: "Actualizaciones continuas y mejoras para mantener tu sitio siempre al día.",
    href: "/mantenimiento",
  },
  {
    icon: Headphones,
    title: "Soporte 24/7",
    description: "Atención personalizada cuando la necesites, estamos contigo en cada paso.",
    href: "/mantenimiento",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export const ServicesSection = () => {
  return (
    <section id="servicios" className="section-padding bg-secondary/30">
      <div className="container-tight">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Nuestros Servicios
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold mb-6">
            Todo lo que necesitas para{" "}
            <span className="gradient-text">destacar online</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Soluciones completas de desarrollo web adaptadas a las necesidades de tu negocio.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Link
                to={service.href}
                className="group glass-card rounded-2xl p-8 hover:border-primary/50 transition-all duration-300 block"
              >
                <div className="w-14 h-14 gradient-bg rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <service.icon className="text-primary-foreground" size={28} />
                </div>
                <h3 className="text-xl font-display font-bold mb-3">{service.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{service.description}</p>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
