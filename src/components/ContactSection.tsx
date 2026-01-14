import { motion } from "framer-motion";
import { Send, Phone, Mail, MapPin, MessageCircle, Calendar, Linkedin, Loader2, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useState } from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const WHATSAPP_NUMBER = "34672861646";
const LINKEDIN_URL = "https://www.linkedin.com/in/antoniojosetortajada";
const EMAIL = "antoniojosetortajada2002@gmail.com";
const FORMSPREE_ENDPOINT = "https://formspree.io/f/xgooedeg";

export const ContactSection = () => {
  const [date, setDate] = useState<Date>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

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
          preferredDate: date ? format(date, "PPP", { locale: es }) : "No especificada",
        }),
      });

      if (!response.ok) throw new Error("Error al enviar");

      setIsSubmitted(true);
      toast.success("¡Mensaje enviado correctamente! Te contactaremos pronto.");
      setFormData({ name: "", email: "", phone: "", message: "" });
      setDate(undefined);
    } catch (error) {
      toast.error("Error al enviar el mensaje. Intenta de nuevo.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsAppClick = () => {
    const message = `¡Hola! Soy ${formData.name || 'interesado'}. Me gustaría agendar una llamada${date ? ` para el ${format(date, "PPP", { locale: es })}` : ''}.`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, "_blank");
  };

  const handleAddToGoogleCalendar = () => {
    if (!date) return;
    
    const startDate = new Date(date);
    startDate.setHours(10, 0, 0);
    const endDate = new Date(date);
    endDate.setHours(11, 0, 0);
    
    const formatGoogleDate = (d: Date) => d.toISOString().replace(/-|:|\.\d{3}/g, '');
    
    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent('Llamada con PRIME WEB')}&dates=${formatGoogleDate(startDate)}/${formatGoogleDate(endDate)}&details=${encodeURIComponent(`Llamada de consultoría con PRIME WEB\nContacto: ${formData.name}\nEmail: ${formData.email}`)}&location=Videollamada`;
    
    window.open(googleCalendarUrl, "_blank");
  };

  return (
    <section id="contacto" className="section-padding bg-secondary/30">
      <div className="container-tight">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Contacto
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold mb-6">
            Hablemos de{" "}
            <span className="gradient-text">tu proyecto</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Estamos listos para ayudarte a llevar tu negocio al siguiente nivel.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2 space-y-8"
          >
            <div>
              <h3 className="text-xl font-display font-bold mb-6">Información de Contacto</h3>
              <div className="space-y-4">
                <a
                  href={`mailto:${EMAIL}`}
                  className="flex items-center gap-4 group"
                >
                  <div className="w-12 h-12 gradient-bg rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Mail className="text-primary-foreground" size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium">{EMAIL}</p>
                  </div>
                </a>

                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 group"
                >
                  <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Phone className="text-white" size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">WhatsApp</p>
                    <p className="font-medium">+34 672 861 646</p>
                  </div>
                </a>

                <a
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 group"
                >
                  <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Linkedin className="text-white" size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">LinkedIn</p>
                    <p className="font-medium">Antonio José Tortajada</p>
                  </div>
                </a>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 gradient-bg rounded-xl flex items-center justify-center">
                    <MapPin className="text-primary-foreground" size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Ubicación</p>
                    <p className="font-medium">100% Remoto</p>
                  </div>
                </div>
              </div>
            </div>

            {/* WhatsApp CTA */}
            <div className="glass-card rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <MessageCircle className="text-green-500" size={24} />
                <h4 className="font-semibold">¿Prefieres WhatsApp?</h4>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Escríbenos directamente y te respondemos en minutos.
              </p>
              <Button 
                variant="outline" 
                className="w-full border-green-500 text-green-600 hover:bg-green-50 cursor-pointer"
                onClick={handleWhatsAppClick}
              >
                <MessageCircle className="mr-2" size={18} />
                Abrir WhatsApp
              </Button>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <form onSubmit={handleSubmit} className="glass-card rounded-2xl p-8">
              <h3 className="text-xl font-display font-bold mb-6">Envíanos un mensaje</h3>
              <div className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Nombre</label>
                    <Input
                      placeholder="Tu nombre"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="bg-background"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Email</label>
                    <Input
                      type="email"
                      placeholder="tu@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="bg-background"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Teléfono (opcional)</label>
                  <Input
                    placeholder="+34 600 000 000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="bg-background"
                  />
                </div>
                
                {/* Calendar Date Picker */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Fecha preferida para la llamada</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal bg-background",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <Calendar className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP", { locale: es }) : <span>Selecciona una fecha</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <CalendarComponent
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        disabled={(date) => date < new Date() || date.getDay() === 0 || date.getDay() === 6}
                        initialFocus
                        className={cn("p-3 pointer-events-auto")}
                      />
                    </PopoverContent>
                  </Popover>
                  {date && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="mt-2 text-primary"
                      onClick={handleAddToGoogleCalendar}
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      Añadir a Google Calendar
                    </Button>
                  )}
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Cuéntanos sobre tu proyecto</label>
                  <Textarea
                    placeholder="¿Qué tipo de sitio web necesitas? ¿Cuáles son tus objetivos?"
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="bg-background resize-none"
                  />
                </div>
                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full gradient-bg text-primary-foreground font-semibold glow hover:opacity-90 transition-opacity cursor-pointer"
                  disabled={isSubmitting || isSubmitted}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 animate-spin" size={18} />
                      Enviando...
                    </>
                  ) : isSubmitted ? (
                    <>
                      <CheckCircle className="mr-2" size={18} />
                      ¡Mensaje Enviado!
                    </>
                  ) : (
                    <>
                      Enviar Mensaje
                      <Send className="ml-2" size={18} />
                    </>
                  )}
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
