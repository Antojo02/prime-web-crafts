import { motion } from "framer-motion";
import { Calendar, Clock, Video, CheckCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export const BookingSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <section className="section-padding">
        <div className="container-tight">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                Reserva tu Consultoría
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold mb-6">
                Agenda una llamada{" "}
                <span className="gradient-text">gratuita</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                30 minutos para analizar tu proyecto, resolver dudas y diseñar un plan de acción personalizado.
              </p>

              <div className="space-y-4 mb-8">
                {[
                  { icon: Clock, text: "30 minutos de consultoría gratuita" },
                  { icon: Video, text: "Videollamada o llamada telefónica" },
                  { icon: CheckCircle, text: "Plan de acción personalizado" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <item.icon className="text-primary" size={20} />
                    </div>
                    <span className="font-medium">{item.text}</span>
                  </div>
                ))}
              </div>

              <Button
                size="lg"
                className="gradient-bg text-primary-foreground font-semibold glow hover:opacity-90 cursor-pointer"
                onClick={() => setIsModalOpen(true)}
              >
                <Calendar className="mr-2" size={20} />
                Reservar Consultoría Gratis
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="hidden lg:block"
            >
              <div className="glass-card rounded-2xl p-8 text-center">
                <Calendar className="mx-auto text-primary mb-4" size={64} />
                <h3 className="text-xl font-display font-bold mb-2">Google Calendar</h3>
                <p className="text-muted-foreground mb-6">
                  Selecciona el día y hora que mejor te convenga
                </p>
                <Button
                  variant="outline"
                  className="cursor-pointer"
                  onClick={() => setIsModalOpen(true)}
                >
                  Abrir Calendario
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Google Calendar Modal */}
      {isModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          onClick={() => setIsModalOpen(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-background rounded-2xl shadow-2xl w-full max-w-3xl max-h-[85vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="font-display font-bold text-lg">Reserva tu Consultoría</h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsModalOpen(false)}
              >
                <X size={20} />
              </Button>
            </div>
            <div className="p-2">
              <iframe
                src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ1ENS987BXNL5VCg8PpnRx7MHxBF7bMgv5RZ9NFfsYfYsUFqZ3Y-Q3n-xTR6Bqgontctwsvxwiv?gv=true"
                style={{ border: 0 }}
                width="100%"
                height="500"
                frameBorder="0"
                title="Google Calendar - Reservar Consultoría"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};
