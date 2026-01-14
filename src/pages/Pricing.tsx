import { motion } from "framer-motion";
import { Check, Star, Zap, Crown, MessageCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FloatingTechElements } from "@/components/FloatingTechElements";
import { WhatsAppChat } from "@/components/WhatsAppChat";

const WHATSAPP_NUMBER = "34672861646";

interface PricingPlan {
  name: string;
  price: string;
  originalPrice?: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
  highlighted?: boolean;
  popular?: boolean;
}

const pricingPlans: PricingPlan[] = [
  {
    name: "Starter",
    price: "497€",
    description: "Perfecto para emprendedores y pequeños negocios que necesitan presencia online.",
    icon: <Zap className="w-6 h-6" />,
    features: [
      "Sitio web de 1-3 páginas",
      "Diseño responsive",
      "Formulario de contacto",
      "SEO básico",
      "Integración WhatsApp",
      "Hosting primer año incluido",
      "Soporte 30 días",
    ],
  },
  {
    name: "Profesional",
    price: "997€",
    originalPrice: "1.297€",
    description: "Ideal para negocios en crecimiento que buscan destacar y convertir más clientes.",
    icon: <Star className="w-6 h-6" />,
    features: [
      "Sitio web de 5-7 páginas",
      "Diseño personalizado premium",
      "Animaciones avanzadas",
      "Blog integrado",
      "SEO avanzado",
      "Google Analytics",
      "Integración redes sociales",
      "Chat en vivo",
      "Calendario de citas",
      "Hosting 2 años incluido",
      "Soporte 90 días prioritario",
    ],
    highlighted: true,
    popular: true,
  },
  {
    name: "Enterprise",
    price: "2.497€",
    description: "Solución completa para empresas que necesitan funcionalidades avanzadas.",
    icon: <Crown className="w-6 h-6" />,
    features: [
      "Sitio web ilimitado de páginas",
      "Diseño a medida exclusivo",
      "E-commerce integrado",
      "Sistema de pagos",
      "Panel de administración",
      "Base de datos",
      "API personalizada",
      "Multi-idioma",
      "SEO premium + SEM inicial",
      "Capacitación personalizada",
      "Hosting 3 años incluido",
      "Soporte prioritario 1 año",
    ],
  },
];

const additionalServices = [
  { name: "Mantenimiento mensual", price: "desde 49€/mes" },
  { name: "SEO mensual", price: "desde 199€/mes" },
  { name: "Rediseño web", price: "desde 297€" },
  { name: "Página adicional", price: "97€" },
  { name: "Blog setup", price: "197€" },
  { name: "E-commerce básico", price: "desde 497€" },
];

const PricingCard = ({ plan, index }: { plan: PricingPlan; index: number }) => {
  const handleContact = () => {
    const message = `¡Hola! Me interesa el plan ${plan.name} (${plan.price}). ¿Podemos hablar sobre mi proyecto?`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`relative rounded-2xl p-8 ${
        plan.highlighted
          ? "bg-gradient-to-br from-primary/10 via-primary/5 to-background border-2 border-primary shadow-2xl shadow-primary/20"
          : "glass-card border border-border"
      }`}
    >
      {plan.popular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <span className="px-4 py-1 bg-primary text-primary-foreground text-sm font-bold rounded-full">
            Más Popular
          </span>
        </div>
      )}

      <div className="text-center mb-8">
        <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl mb-4 ${
          plan.highlighted ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary"
        }`}>
          {plan.icon}
        </div>
        <h3 className="text-2xl font-display font-bold mb-2">{plan.name}</h3>
        <p className="text-muted-foreground text-sm mb-4">{plan.description}</p>
        <div className="flex items-center justify-center gap-2">
          {plan.originalPrice && (
            <span className="text-lg text-muted-foreground line-through">{plan.originalPrice}</span>
          )}
          <span className="text-4xl font-display font-bold gradient-text">{plan.price}</span>
        </div>
      </div>

      <ul className="space-y-3 mb-8">
        {plan.features.map((feature, idx) => (
          <motion.li
            key={idx}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 + idx * 0.05 }}
            className="flex items-start gap-3"
          >
            <Check className={`w-5 h-5 shrink-0 mt-0.5 ${plan.highlighted ? "text-primary" : "text-green-500"}`} />
            <span className="text-sm">{feature}</span>
          </motion.li>
        ))}
      </ul>

      <Button
        onClick={handleContact}
        className={`w-full cursor-pointer ${
          plan.highlighted
            ? "gradient-bg text-primary-foreground hover:opacity-90 glow"
            : "bg-secondary hover:bg-secondary/80"
        }`}
        size="lg"
      >
        <MessageCircle className="mr-2 w-5 h-5" />
        Solicitar Presupuesto
      </Button>
    </motion.div>
  );
};

const Pricing = () => {
  return (
    <div className="min-h-screen relative">
      <FloatingTechElements />
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="container-tight text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              Precios Transparentes
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold mb-6">
              Planes que se adaptan a{" "}
              <span className="gradient-text">tu negocio</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Sin sorpresas, sin costes ocultos. Elige el plan que mejor se adapte a tus necesidades
              y comienza a construir tu presencia digital hoy.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pb-20">
        <div className="container-tight">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <PricingCard key={plan.name} plan={plan} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-20 bg-secondary/30">
        <div className="container-tight">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-display font-bold mb-4">
              Servicios <span className="gradient-text">Adicionales</span>
            </h2>
            <p className="text-muted-foreground">
              Complementa tu web con estos servicios extra
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {additionalServices.map((service, index) => (
              <motion.div
                key={service.name}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="glass-card rounded-xl p-5 flex items-center justify-between hover:border-primary/50 transition-colors"
              >
                <span className="font-medium">{service.name}</span>
                <span className="text-primary font-bold">{service.price}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container-tight">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center glass-card rounded-2xl p-12"
          >
            <h2 className="text-3xl sm:text-4xl font-display font-bold mb-4">
              ¿No encuentras lo que buscas?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Cada proyecto es único. Cuéntanos tu idea y te prepararemos un presupuesto
              personalizado sin compromiso.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="gradient-bg text-primary-foreground glow cursor-pointer"
                onClick={() => window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("¡Hola! Necesito un presupuesto personalizado para mi proyecto web.")}`, "_blank")}
              >
                <MessageCircle className="mr-2 w-5 h-5" />
                Solicitar Presupuesto Personalizado
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="cursor-pointer"
                onClick={() => window.location.href = "/#contacto"}
              >
                Ver más información
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
      <WhatsAppChat />
    </div>
  );
};

export default Pricing;
