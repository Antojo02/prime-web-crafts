import { motion } from "framer-motion";
import { Shield, Lock, Zap, Award, Users, Star, Clock, Globe } from "lucide-react";

const metrics = [
  { value: "20+", label: "Proyectos lanzados", icon: Globe },
  { value: "98%", label: "Clientes satisfechos", icon: Users },
  { value: "4.9", label: "Calificación media", icon: Star },
  { value: "<24h", label: "Tiempo de respuesta", icon: Clock },
];

const trustBadges = [
  { icon: Shield, label: "RGPD Compliant" },
  { icon: Lock, label: "SSL & datos cifrados" },
  { icon: Zap, label: "Core Web Vitals 90+" },
  { icon: Award, label: "Garantía de entrega" },
];

export const MetricsSection = () => {
  return (
    <section className="py-16 border-y border-border bg-background">
      <div className="container-tight space-y-12">
        {/* Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="text-center p-6 rounded-2xl glass-card hover:shadow-lg transition-shadow"
            >
              <m.icon className="mx-auto text-primary mb-3" size={28} />
              <div className="text-3xl sm:text-4xl font-display font-bold gradient-text mb-1">
                {m.value}
              </div>
              <div className="text-sm text-muted-foreground">{m.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="border-t border-border pt-8"
        >
          <p className="text-center text-xs uppercase tracking-widest text-muted-foreground mb-6">
            Trabajamos con los más altos estándares
          </p>
          <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-6">
            {trustBadges.map((b) => (
              <div
                key={b.label}
                className="flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-muted/30 text-sm font-medium"
              >
                <b.icon size={16} className="text-primary" />
                {b.label}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
