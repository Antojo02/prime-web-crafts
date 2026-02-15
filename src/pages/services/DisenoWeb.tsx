import { motion, useScroll, useTransform } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BackToTop } from "@/components/BackToTop";
import { Button } from "@/components/ui/button";
import { Layout, Palette, Smartphone, Zap, CheckCircle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useRef } from "react";

const benefits = [
  "Diseño 100% personalizado a tu marca",
  "Responsive en todos los dispositivos",
  "Optimizado para conversiones",
  "Entrega rápida y profesional",
  "Revisiones ilimitadas",
  "Soporte post-lanzamiento",
];

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const fadeUp3D = {
  hidden: { opacity: 0, y: 80, rotateX: 8, scale: 0.95 },
  visible: { opacity: 1, y: 0, rotateX: 0, scale: 1, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const } },
};

export default function DisenoWeb() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);

  return (
    <div className="min-h-screen bg-background" style={{ perspective: "1200px" }}>
      <Navbar />

      <section ref={heroRef} className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 gradient-bg opacity-5" />
        <motion.div style={{ y: heroY, opacity: heroOpacity, scale: heroScale }} className="container-tight relative z-10">
          <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="max-w-3xl">
            <motion.span variants={fadeUp3D} className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              Diseño Web
            </motion.span>
            <motion.h1 variants={fadeUp3D} className="text-4xl md:text-6xl font-display font-bold mb-6">
              Diseños que <span className="gradient-text">enamoran</span>
            </motion.h1>
            <motion.p variants={fadeUp3D} className="text-xl text-muted-foreground mb-8">
              Creamos experiencias visuales únicas que conectan con tu audiencia y representan la esencia de tu marca.
            </motion.p>
            <motion.div variants={fadeUp3D}>
              <Button size="lg" className="gradient-bg text-primary-foreground glow cursor-pointer" asChild>
                <Link to="/#contacto">Solicitar Presupuesto <ArrowRight className="ml-2" size={18} /></Link>
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      <section className="py-20 bg-secondary/30">
        <div className="container-tight">
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {[
              { icon: Layout, title: "UI/UX Design", desc: "Interfaces intuitivas y atractivas" },
              { icon: Palette, title: "Branding", desc: "Identidad visual coherente" },
              { icon: Smartphone, title: "Responsive", desc: "Perfecto en cualquier dispositivo" },
              { icon: Zap, title: "Performance", desc: "Carga ultrarrápida" },
            ].map((f, i) => (
              <motion.div key={i} variants={fadeUp3D} whileHover={{ y: -10, rotateY: 5, scale: 1.03 }} transition={{ type: "spring", stiffness: 300 }} className="glass-card rounded-2xl p-6 text-center" style={{ transformStyle: "preserve-3d" }}>
                <div className="w-14 h-14 mx-auto gradient-bg rounded-xl flex items-center justify-center mb-4">
                  <f.icon className="text-primary-foreground" size={28} />
                </div>
                <h3 className="font-display font-bold mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 60, rotateX: 5 }} whileInView={{ opacity: 1, y: 0, rotateX: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }} className="glass-card rounded-2xl p-8 lg:p-12">
            <h2 className="text-3xl font-display font-bold mb-8">¿Qué incluye?</h2>
            <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid sm:grid-cols-2 gap-4">
              {benefits.map((b, i) => (
                <motion.div key={i} variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0, transition: { duration: 0.5 } } }} className="flex items-center gap-3">
                  <CheckCircle className="text-primary shrink-0" size={20} />
                  <span>{b}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
      <BackToTop />
    </div>
  );
}
