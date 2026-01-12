import { motion } from "framer-motion";
import { Send, Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

export const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
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
                  href="mailto:hola@primeweb.com"
                  className="flex items-center gap-4 group"
                >
                  <div className="w-12 h-12 gradient-bg rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Mail className="text-primary-foreground" size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium">hola@primeweb.com</p>
                  </div>
                </a>

                <a
                  href="tel:+1234567890"
                  className="flex items-center gap-4 group"
                >
                  <div className="w-12 h-12 gradient-bg rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Phone className="text-primary-foreground" size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Teléfono</p>
                    <p className="font-medium">+1 234 567 890</p>
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
                className="w-full border-green-500 text-green-600 hover:bg-green-50"
              >
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
                    placeholder="+1 234 567 890"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="bg-background"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Cuéntanos sobre tu proyecto</label>
                  <Textarea
                    placeholder="¿Qué tipo de sitio web necesitas? ¿Cuáles son tus objetivos?"
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="bg-background resize-none"
                  />
                </div>
                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full gradient-bg text-primary-foreground font-semibold glow hover:opacity-90 transition-opacity"
                >
                  Enviar Mensaje
                  <Send className="ml-2" size={18} />
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
