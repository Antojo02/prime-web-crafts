import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  Send, 
  Code, 
  Palette, 
  TrendingUp, 
  Users,
  CheckCircle,
  Star,
  Coffee,
  Laptop,
  Globe
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xgooedeg";

interface JobPosition {
  id: string;
  title: string;
  department: string;
  type: string;
  location: string;
  description: string;
  requirements: string[];
  icon: React.ReactNode;
}

const positions: JobPosition[] = [
  {
    id: "frontend-dev",
    title: "Desarrollador Frontend",
    department: "Desarrollo",
    type: "Freelance / Tiempo parcial",
    location: "Remoto",
    description: "Buscamos un desarrollador frontend apasionado por crear interfaces modernas y responsivas con React, TypeScript y Tailwind CSS.",
    requirements: [
      "Experiencia con React y TypeScript",
      "Conocimiento de Tailwind CSS",
      "Portfolio con proyectos anteriores",
      "Capacidad de trabajo en equipo",
    ],
    icon: <Code className="w-6 h-6" />,
  },
  {
    id: "ui-designer",
    title: "Diseñador UI/UX",
    department: "Diseño",
    type: "Freelance",
    location: "Remoto",
    description: "Buscamos un diseñador creativo para crear experiencias de usuario excepcionales y diseños visuales impactantes.",
    requirements: [
      "Experiencia con Figma o Adobe XD",
      "Portfolio de diseño web",
      "Conocimiento de principios UX",
      "Creatividad y atención al detalle",
    ],
    icon: <Palette className="w-6 h-6" />,
  },
  {
    id: "marketing",
    title: "Especialista en Marketing Digital",
    department: "Marketing",
    type: "Freelance",
    location: "Remoto",
    description: "Buscamos un experto en marketing digital para ayudar a nuestros clientes a crecer su presencia online.",
    requirements: [
      "Experiencia en SEO y SEM",
      "Conocimiento de redes sociales",
      "Habilidades analíticas",
      "Experiencia con Google Ads",
    ],
    icon: <TrendingUp className="w-6 h-6" />,
  },
];

const benefits = [
  { icon: <Laptop className="w-5 h-5" />, title: "Trabajo 100% Remoto", description: "Trabaja desde donde quieras" },
  { icon: <Clock className="w-5 h-5" />, title: "Horario Flexible", description: "Organiza tu tiempo como prefieras" },
  { icon: <Coffee className="w-5 h-5" />, title: "Proyectos Diversos", description: "Trabaja en proyectos variados e interesantes" },
  { icon: <Globe className="w-5 h-5" />, title: "Equipo Internacional", description: "Colabora con profesionales de todo el mundo" },
  { icon: <Star className="w-5 h-5" />, title: "Crecimiento Profesional", description: "Aprende y crece con nosotros" },
  { icon: <Users className="w-5 h-5" />, title: "Comunidad", description: "Forma parte de un equipo unido" },
];

export default function Careers() {
  const [selectedPosition, setSelectedPosition] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    portfolio: "",
    mensaje: "",
    puesto: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          timestamp: new Date().toISOString(),
          source: "Trabaja con Nosotros - PRIME WEB",
        }),
      });

      if (!response.ok) throw new Error("Error al enviar");

      toast.success("¡Solicitud enviada! Te contactaremos pronto.");
      setFormData({
        nombre: "",
        email: "",
        telefono: "",
        portfolio: "",
        mensaje: "",
        puesto: "",
      });
      setSelectedPosition(null);
    } catch (error) {
      toast.error("Error al enviar. Por favor, intenta de nuevo.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const openApplicationForm = (positionId: string) => {
    setSelectedPosition(positionId);
    setFormData((prev) => ({ ...prev, puesto: positions.find((p) => p.id === positionId)?.title || "" }));
    
    // Scroll to form
    setTimeout(() => {
      document.getElementById("application-form")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 gradient-bg opacity-5" />
        <div className="container-tight relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
              🚀 Únete a Nuestro Equipo
            </span>
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">
              Trabaja con <span className="gradient-text">Nosotros</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Buscamos profesionales apasionados por el desarrollo web y el diseño digital.
              Forma parte de un equipo creativo y en constante crecimiento.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-muted/30">
        <div className="container-tight">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-display font-bold mb-4">
              ¿Por qué trabajar con nosotros?
            </h2>
            <p className="text-muted-foreground">
              Ofrecemos un ambiente de trabajo flexible y colaborativo
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-background rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 mx-auto mb-4 rounded-full gradient-bg flex items-center justify-center text-primary-foreground">
                  {benefit.icon}
                </div>
                <h3 className="font-semibold mb-2">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-20">
        <div className="container-tight">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-display font-bold mb-4">
              Posiciones <span className="gradient-text">Abiertas</span>
            </h2>
            <p className="text-muted-foreground">
              Explora nuestras oportunidades actuales
            </p>
          </motion.div>

          <div className="space-y-6">
            {positions.map((position, index) => (
              <motion.div
                key={position.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`bg-background rounded-2xl p-6 border transition-all ${
                  selectedPosition === position.id
                    ? "border-primary shadow-lg"
                    : "border-border hover:border-primary/50 hover:shadow-md"
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <div className="w-14 h-14 rounded-xl gradient-bg flex items-center justify-center text-primary-foreground shrink-0">
                    {position.icon}
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2">{position.title}</h3>
                    <p className="text-muted-foreground text-sm mb-3">{position.description}</p>
                    
                    <div className="flex flex-wrap gap-3 text-sm">
                      <span className="flex items-center gap-1 text-muted-foreground">
                        <Briefcase size={14} />
                        {position.department}
                      </span>
                      <span className="flex items-center gap-1 text-muted-foreground">
                        <Clock size={14} />
                        {position.type}
                      </span>
                      <span className="flex items-center gap-1 text-muted-foreground">
                        <MapPin size={14} />
                        {position.location}
                      </span>
                    </div>
                  </div>

                  <Button
                    onClick={() => openApplicationForm(position.id)}
                    className="gradient-bg text-primary-foreground hover:opacity-90 shrink-0"
                  >
                    Aplicar Ahora
                  </Button>
                </div>

                {/* Requirements */}
                <div className="mt-4 pt-4 border-t border-border">
                  <p className="text-sm font-medium mb-2">Requisitos:</p>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {position.requirements.map((req, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle size={14} className="text-primary shrink-0" />
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section id="application-form" className="py-20 bg-muted/30">
        <div className="container-tight">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <div className="text-center mb-10">
              <h2 className="text-3xl font-display font-bold mb-4">
                Envía tu <span className="gradient-text">Solicitud</span>
              </h2>
              <p className="text-muted-foreground">
                Completa el formulario y nos pondremos en contacto contigo
              </p>
            </div>

            <form onSubmit={handleSubmit} className="bg-background rounded-2xl p-8 shadow-lg space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="nombre" className="block text-sm font-medium mb-2">
                    Nombre Completo *
                  </label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-muted border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    placeholder="Tu nombre"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-muted border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    placeholder="tu@email.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="telefono" className="block text-sm font-medium mb-2">
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    id="telefono"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg bg-muted border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    placeholder="+34 600 000 000"
                  />
                </div>

                <div>
                  <label htmlFor="puesto" className="block text-sm font-medium mb-2">
                    Puesto de Interés *
                  </label>
                  <select
                    id="puesto"
                    name="puesto"
                    value={formData.puesto}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-muted border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  >
                    <option value="">Selecciona un puesto</option>
                    {positions.map((pos) => (
                      <option key={pos.id} value={pos.title}>
                        {pos.title}
                      </option>
                    ))}
                    <option value="Otro">Otro / Propuesta libre</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="portfolio" className="block text-sm font-medium mb-2">
                  Portfolio / LinkedIn / GitHub
                </label>
                <input
                  type="url"
                  id="portfolio"
                  name="portfolio"
                  value={formData.portfolio}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg bg-muted border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  placeholder="https://tuportfolio.com"
                />
              </div>

              <div>
                <label htmlFor="mensaje" className="block text-sm font-medium mb-2">
                  ¿Por qué quieres trabajar con nosotros? *
                </label>
                <textarea
                  id="mensaje"
                  name="mensaje"
                  value={formData.mensaje}
                  onChange={handleInputChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg bg-muted border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
                  placeholder="Cuéntanos sobre ti, tu experiencia y qué te motiva..."
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full gradient-bg text-primary-foreground hover:opacity-90 py-6 text-lg font-semibold"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      ⏳
                    </motion.span>
                    Enviando...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Send size={20} />
                    Enviar Solicitud
                  </span>
                )}
              </Button>
            </form>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
