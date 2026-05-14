import { motion } from "framer-motion";
import { Award, Target, Users, Sparkles, TrendingUp, Code2 } from "lucide-react";

const pillars = [
  {
    icon: Target,
    title: "Enfoque en resultados",
    description:
      "Cada decisión de diseño y desarrollo está medida en términos de conversión, velocidad y SEO. No hacemos webs bonitas: hacemos webs que venden.",
  },
  {
    icon: Code2,
    title: "Tecnología profesional",
    description:
      "Stack moderno (React, Astro, WordPress headless) optimizado para Core Web Vitals, accesibilidad y mantenibilidad a largo plazo.",
  },
  {
    icon: Users,
    title: "Acompañamiento real",
    description:
      "Trato directo con quien construye tu proyecto. Cero intermediarios, cero promesas vacías. Entrega rápida y soporte continuo.",
  },
];

const process = [
  { step: "01", title: "Discovery", desc: "Entendemos tu negocio, tu cliente y tus objetivos comerciales." },
  { step: "02", title: "Estrategia", desc: "Definimos arquitectura, copy, SEO y métricas de éxito." },
  { step: "03", title: "Diseño & Build", desc: "Diseño UI a medida y desarrollo limpio, rápido y escalable." },
  { step: "04", title: "Lanzamiento", desc: "Optimización, analítica y plan de mejora continua." },
];

export const AboutSection = () => {
  return (
    <section id="sobre-nosotros" className="section-padding bg-secondary/30">
      <div className="container-tight">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Sobre PRIME WEB
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold mb-6">
            Una agencia pensada para{" "}
            <span className="gradient-text">hacer crecer tu negocio</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Más de una década combinada diseñando y desarrollando productos digitales para
            instituciones educativas, e-commerce y startups en España y LATAM.
          </p>
        </motion.div>

        {/* Pillars */}
        <div className="grid md:grid-cols-3 gap-6 mb-20">
          {pillars.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-card rounded-2xl p-6 hover:shadow-xl transition-all"
            >
              <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center mb-4">
                <p.icon className="text-primary-foreground" size={22} />
              </div>
              <h3 className="text-xl font-display font-bold mb-2">{p.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{p.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Process timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h3 className="text-2xl sm:text-3xl font-display font-bold text-center mb-12">
            Cómo trabajamos
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {process.map((s, i) => (
              <motion.div
                key={s.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative p-6 rounded-2xl border border-border bg-background hover:border-primary/40 transition-colors"
              >
                <span className="text-4xl font-display font-bold text-primary/20 block mb-2">
                  {s.step}
                </span>
                <h4 className="font-display font-bold text-lg mb-2">{s.title}</h4>
                <p className="text-sm text-muted-foreground">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Experience strip */}
        <div className="grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
          {[
            { icon: Award, label: "1 año", sub: "construyendo web" },
            { icon: TrendingUp, label: "+30%", sub: "tráfico orgánico medio" },
            { icon: Sparkles, label: "100%", sub: "código a medida" },
          ].map((e) => (
            <div key={e.label} className="text-center p-4">
              <e.icon className="mx-auto text-primary mb-2" size={28} />
              <div className="font-display font-bold text-2xl">{e.label}</div>
              <div className="text-sm text-muted-foreground">{e.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
