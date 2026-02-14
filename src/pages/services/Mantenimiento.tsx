import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BackToTop } from "@/components/BackToTop";
import { Button } from "@/components/ui/button";
import { RefreshCw, Shield, Headphones, Clock, CheckCircle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const benefits = [
  "Actualizaciones de seguridad regulares",
  "Backups automáticos diarios",
  "Monitorización 24/7",
  "Corrección de bugs prioritaria",
  "Mejoras de rendimiento continuas",
  "Soporte técnico dedicado",
];

export default function Mantenimiento() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 gradient-bg opacity-5" />
        <div className="container-tight relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">Mantenimiento Web</span>
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">
              Tu web siempre <span className="gradient-text">actualizada</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">Nos encargamos de que tu sitio web funcione perfectamente, esté seguro y siempre al día.</p>
            <Button size="lg" className="gradient-bg text-primary-foreground glow cursor-pointer" asChild>
              <Link to="/#contacto">Contratar Mantenimiento <ArrowRight className="ml-2" size={18} /></Link>
            </Button>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-secondary/30">
        <div className="container-tight">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {[
              { icon: RefreshCw, title: "Updates", desc: "Actualizaciones constantes" },
              { icon: Shield, title: "Seguridad", desc: "Protección ante amenazas" },
              { icon: Headphones, title: "Soporte", desc: "Atención personalizada" },
              { icon: Clock, title: "24/7", desc: "Monitorización continua" },
            ].map((f, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="glass-card rounded-2xl p-6 text-center">
                <div className="w-14 h-14 mx-auto gradient-bg rounded-xl flex items-center justify-center mb-4">
                  <f.icon className="text-primary-foreground" size={28} />
                </div>
                <h3 className="font-display font-bold mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </motion.div>
            ))}
          </div>
          <div className="glass-card rounded-2xl p-8 lg:p-12">
            <h2 className="text-3xl font-display font-bold mb-8">¿Qué incluye?</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {benefits.map((b, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle className="text-primary shrink-0" size={20} />
                  <span>{b}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <Footer />
      <BackToTop />
    </div>
  );
}
