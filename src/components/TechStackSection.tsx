import { motion } from "framer-motion";

const technologies = [
  { name: "React", icon: "⚛️" },
  { name: "TypeScript", icon: "🔷" },
  { name: "Tailwind CSS", icon: "🎨" },
  { name: "Node.js", icon: "🟢" },
  { name: "Next.js", icon: "▲" },
  { name: "Figma", icon: "🎯" },
  { name: "PostgreSQL", icon: "🐘" },
  { name: "Vercel", icon: "▼" },
  { name: "GitHub", icon: "🐙" },
  { name: "WordPress", icon: "📝" },
  { name: "Stripe", icon: "💳" },
  { name: "Firebase", icon: "🔥" },
];

// Duplicate for seamless loop
const doubledTech = [...technologies, ...technologies];

export const TechStackSection = () => {
  return (
    <section className="py-16 overflow-hidden">
      <div className="container-tight mb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-2xl sm:text-3xl font-display font-bold mb-3">
            Tecnologías que impulsan{" "}
            <span className="gradient-text">tus ideas</span>
          </h2>
          <p className="text-muted-foreground">
            Trabajamos con las herramientas más modernas del mercado
          </p>
        </motion.div>
      </div>

      {/* Infinite scroll */}
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10" />

        <motion.div
          animate={{ x: [0, -50 * technologies.length] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 25,
              ease: "linear",
            },
          }}
          className="flex gap-8"
        >
          {doubledTech.map((tech, index) => (
            <div
              key={index}
              className="flex-shrink-0 glass-card rounded-xl px-6 py-4 flex items-center gap-3 hover:border-primary/50 transition-colors"
            >
              <span className="text-2xl">{tech.icon}</span>
              <span className="font-medium whitespace-nowrap">{tech.name}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
