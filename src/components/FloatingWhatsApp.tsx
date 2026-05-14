import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Clock, Send } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const WHATSAPP_NUMBER = "34672861646";
const PREDEFINED_MESSAGE =
  "¡Hola PRIME WEB! 👋 Me gustaría recibir información sobre vuestros servicios de diseño y desarrollo web.";

const SCHEDULE = [
  { days: "Lunes – Viernes", hours: "9:00 – 20:00" },
  { days: "Sábado", hours: "10:00 – 14:00" },
  { days: "Domingo", hours: "Cerrado" },
];

const isWithinBusinessHours = () => {
  const now = new Date();
  const day = now.getDay(); // 0 Sun, 6 Sat
  const hour = now.getHours();
  if (day === 0) return false;
  if (day === 6) return hour >= 10 && hour < 14;
  return hour >= 9 && hour < 20;
};

export const FloatingWhatsApp = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState(PREDEFINED_MESSAGE);
  const online = isWithinBusinessHours();

  const send = () => {
    const text = message.trim() || PREDEFINED_MESSAGE;
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`,
      "_blank",
    );
    setOpen(false);
  };

  return (
    <>
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.2, type: "spring", stiffness: 260, damping: 20 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-6 left-6 z-50 w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-2xl hover:bg-green-600 transition-colors cursor-pointer"
        aria-label="WhatsApp PRIME WEB"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X className="text-white" size={24} />
            </motion.div>
          ) : (
            <motion.div key="msg" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
              <MessageCircle className="text-white" size={24} />
            </motion.div>
          )}
        </AnimatePresence>
        {!open && <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-30" />}
        <span
          className={`absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full border-2 border-background ${
            online ? "bg-green-400" : "bg-amber-400"
          }`}
        />
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-24 left-6 z-50 w-[340px] max-w-[calc(100vw-48px)] bg-background rounded-2xl shadow-2xl border border-border overflow-hidden"
          >
            <div className="bg-green-500 p-4 text-white flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-white/20 flex items-center justify-center">
                <MessageCircle size={22} />
              </div>
              <div className="flex-1">
                <h3 className="font-bold">PRIME WEB</h3>
                <div className="flex items-center gap-1.5 text-xs opacity-90">
                  <span className={`w-2 h-2 rounded-full ${online ? "bg-green-300 animate-pulse" : "bg-amber-300"}`} />
                  {online ? "En línea ahora" : "Fuera de horario · te responderemos pronto"}
                </div>
              </div>
            </div>

            <div className="p-4 space-y-4">
              <div className="bg-muted/50 rounded-xl p-3">
                <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground mb-2">
                  <Clock size={14} className="text-primary" />
                  Horario de atención
                </div>
                <ul className="space-y-1 text-sm">
                  {SCHEDULE.map((s) => (
                    <li key={s.days} className="flex justify-between">
                      <span className="text-muted-foreground">{s.days}</span>
                      <span className="font-medium">{s.hours}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <label className="text-xs text-muted-foreground mb-1.5 block">Mensaje predefinido (puedes editarlo)</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={3}
                  className="w-full text-sm p-3 rounded-lg border border-border bg-muted/30 focus:outline-none focus:ring-2 focus:ring-green-500/40 resize-none"
                />
              </div>

              <Button onClick={send} className="w-full bg-green-500 hover:bg-green-600 text-white">
                <Send size={16} className="mr-2" />
                Enviar por WhatsApp
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
