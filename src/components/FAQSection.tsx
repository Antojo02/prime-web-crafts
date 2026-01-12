import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "¿Cuánto tiempo toma desarrollar un sitio web?",
    answer: "El tiempo de desarrollo varía según la complejidad del proyecto. Un sitio web básico puede estar listo en 2-3 semanas, mientras que proyectos más complejos pueden tomar 4-8 semanas. Durante la llamada de asesoría te daremos un estimado más preciso.",
  },
  {
    question: "¿Qué incluye el servicio de mantenimiento?",
    answer: "Nuestro servicio de mantenimiento incluye actualizaciones de seguridad, copias de seguridad regulares, monitoreo del rendimiento, corrección de errores, y pequeñas actualizaciones de contenido. También ofrecemos soporte técnico prioritario.",
  },
  {
    question: "¿Ofrecen servicios de hosting?",
    answer: "Sí, ofrecemos asesoría completa de hosting y podemos gestionar todo el proceso por ti. Te recomendamos las mejores opciones según las necesidades de tu proyecto y te ayudamos con la configuración inicial.",
  },
  {
    question: "¿Puedo ver el progreso de mi proyecto?",
    answer: "¡Por supuesto! Mantenemos comunicación constante durante todo el proceso. Tendrás acceso a una versión de desarrollo donde podrás ver los avances y darnos feedback en tiempo real.",
  },
  {
    question: "¿Qué pasa si no me gusta el diseño inicial?",
    answer: "Trabajamos contigo hasta que estés 100% satisfecho. Incluimos rondas de revisiones en todos nuestros paquetes y nos aseguramos de entender tu visión antes de comenzar el desarrollo.",
  },
  {
    question: "¿El sitio web será responsive?",
    answer: "Absolutamente. Todos nuestros sitios son 100% responsive y se adaptan perfectamente a cualquier dispositivo: móviles, tablets y computadoras de escritorio.",
  },
];

export const FAQSection = () => {
  return (
    <section id="faq" className="section-padding">
      <div className="container-tight">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:sticky lg:top-32"
          >
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              Preguntas Frecuentes
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold mb-6">
              ¿Tienes{" "}
              <span className="gradient-text">dudas?</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Aquí respondemos las preguntas más comunes. Si no encuentras lo que buscas, 
              no dudes en contactarnos.
            </p>
            <div className="glass-card rounded-xl p-6">
              <p className="font-medium mb-2">¿No encuentras tu respuesta?</p>
              <p className="text-sm text-muted-foreground mb-4">
                Agenda una llamada gratuita y resuelve todas tus dudas.
              </p>
              <a href="#contacto" className="text-primary font-medium hover:underline">
                Contactar ahora →
              </a>
            </div>
          </motion.div>

          {/* FAQ List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="glass-card rounded-xl px-6 border-none"
                >
                  <AccordionTrigger className="text-left font-semibold hover:no-underline py-6">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-6">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
