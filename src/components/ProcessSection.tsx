import { motion } from "framer-motion";
import { Search, PenTool, Code, Rocket } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Discovery",
    description: "Analizamos tu negocio, competencia y objetivos para definir la estrategia perfecta.",
    step: "01",
  },
  {
    icon: PenTool,
    title: "Design",
    description: "Creamos wireframes y diseños visuales únicos que reflejan tu marca.",
    step: "02",
  },
  {
    icon: Code,
    title: "Development",
    description: "Desarrollamos tu sitio con tecnología moderna, rápido y optimizado.",
    step: "03",
  },
  {
    icon: Rocket,
    title: "Launch",
    description: "Lanzamos tu proyecto y te acompañamos con soporte continuo.",
    step: "04",
  },
];

export const ProcessSection = () => {
  return (
    <section className="section-padding bg-secondary/30">
      <div className="container-tight">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Nuestro Proceso
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold mb-6">
            Del concepto al{" "}
            <span className="gradient-text">lanzamiento</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Un proceso claro y eficiente para transformar tu idea en realidad digital.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="relative text-center group"
            >
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-[60%] w-[80%] h-0.5 bg-border" />
              )}

              <div className="relative z-10 mb-6">
                <div className="w-20 h-20 mx-auto gradient-bg rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <step.icon className="text-primary-foreground" size={32} />
                </div>
                <span className="absolute -top-2 -right-2 w-8 h-8 bg-foreground text-background rounded-full flex items-center justify-center text-xs font-bold">
                  {step.step}
                </span>
              </div>

              <h3 className="text-xl font-display font-bold mb-3">{step.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
