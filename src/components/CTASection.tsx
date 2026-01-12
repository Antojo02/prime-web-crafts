import { motion } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

export const CTASection = () => {
  return (
    <section className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 gradient-bg opacity-95" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-30" />

      <div className="container-tight relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-primary-foreground mb-6">
            ¿Listo para transformar tu presencia digital?
          </h2>
          <p className="text-lg sm:text-xl text-primary-foreground/80 mb-10">
            Agenda una llamada gratuita de 30 minutos y descubre cómo podemos 
            ayudarte a alcanzar tus objetivos.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-primary font-semibold text-lg px-8 py-6 hover:bg-white/90 transition-colors group"
            >
              <Calendar className="mr-2" size={20} />
              Agendar Llamada Gratis
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
            </Button>
          </div>
          <p className="text-sm text-primary-foreground/60 mt-6">
            Sin compromiso. Sin costo. Solo posibilidades.
          </p>
        </motion.div>
      </div>
    </section>
  );
};
