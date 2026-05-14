import { motion } from "framer-motion";
import { Calendar, Clock, Video, CheckCircle, X, Loader2, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const CALENDAR_URL = "https://calendar.app.google/YmrAxBXvCZBVtXuo7";

export const BookingSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);

  return (
    <>
      <section className="section-padding bg-gradient-to-b from-white via-slate-50 to-white text-slate-900 border-y border-slate-200">
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
              <p className="text-lg text-slate-600 mb-8">
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
                    <span className="font-medium text-slate-800">{item.text}</span>
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
              <div className="rounded-2xl p-8 text-center bg-white border border-slate-200 shadow-xl">
                <Calendar className="mx-auto text-primary mb-4" size={64} />
                <h3 className="text-xl font-display font-bold mb-2">Google Calendar</h3>
                <p className="text-slate-600 mb-6">
                  Selecciona el día y hora que mejor te convenga
                </p>
                <Button
                  variant="outline"
                  className="cursor-pointer text-slate-900 hover:text-slate-900 dark:bg-slate-900 dark:text-white dark:hover:text-white dark:border-slate-700"
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
          className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-2 sm:p-4"
          onClick={() => setIsModalOpen(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-background rounded-xl sm:rounded-2xl shadow-2xl w-full max-w-5xl h-[92vh] sm:h-[88vh] overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-3 sm:p-4 border-b shrink-0">
              <h3 className="font-display font-bold text-base sm:text-lg">Reserva tu Consultoría</h3>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" asChild>
                  <a href={CALENDAR_URL} target="_blank" rel="noopener noreferrer">
                    <ExternalLink size={16} className="sm:mr-1" /> <span className="hidden sm:inline">Abrir</span>
                  </a>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    setIsModalOpen(false);
                    setIframeLoaded(false);
                  }}
                >
                  <X size={20} />
                </Button>
              </div>
            </div>
            <div className="relative p-1 sm:p-2 bg-muted/30 flex-1 min-h-0">
              {!iframeLoaded && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 z-10">
                  <Loader2 className="animate-spin text-primary" size={36} />
                  <p className="text-sm text-muted-foreground">Cargando calendario…</p>
                  <a
                    href={CALENDAR_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-primary hover:underline"
                  >
                    ¿Tarda demasiado? Abrir en Google Calendar
                  </a>
                </div>
              )}
              <iframe
                src={CALENDAR_URL}
                loading="lazy"
                onLoad={() => setIframeLoaded(true)}
                className="w-full h-full rounded-lg"
                style={{ border: 0, opacity: iframeLoaded ? 1 : 0, transition: "opacity 0.4s" }}
                title="Reservar consultoría con PRIME WEB"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};
