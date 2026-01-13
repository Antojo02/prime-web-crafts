import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Phone, Clock } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const WHATSAPP_NUMBER = "34672616466";

const quickMessages = [
  "Hola, quiero información sobre sus servicios",
  "Me interesa crear una página web",
  "¿Cuánto cuesta una web profesional?",
  "Quiero agendar una llamada gratuita",
];

export const WhatsAppChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");

  const handleSendMessage = (text?: string) => {
    const finalMessage = text || message;
    if (!finalMessage.trim()) return;
    
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(finalMessage)}`;
    window.open(url, "_blank");
    setMessage("");
    setIsOpen(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Button */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 260, damping: 20 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-green-500 rounded-full flex items-center justify-center shadow-lg hover:bg-green-600 transition-colors cursor-pointer"
        aria-label="Chat de WhatsApp"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="text-white" size={28} />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MessageCircle className="text-white" size={28} />
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Pulse animation */}
        {!isOpen && (
          <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-30" />
        )}
        
        {/* Notification badge */}
        {!isOpen && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 2 }}
            className="absolute -top-1 -right-1 w-5 h-5 bg-primary rounded-full flex items-center justify-center text-white text-xs font-bold"
          >
            1
          </motion.span>
        )}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, type: "spring" }}
            className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-48px)] bg-background rounded-2xl shadow-2xl border border-border overflow-hidden"
          >
            {/* Header */}
            <div className="bg-green-500 p-4 text-white">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                  <MessageCircle size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg">PRIME WEB</h3>
                  <div className="flex items-center gap-1 text-sm opacity-90">
                    <span className="w-2 h-2 rounded-full bg-green-300 animate-pulse" />
                    En línea
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Chat Body */}
            <div className="p-4 bg-muted/30 min-h-[200px]">
              {/* Welcome Message */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="flex gap-2 mb-4"
              >
                <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center shrink-0">
                  <MessageCircle size={16} className="text-white" />
                </div>
                <div className="bg-background p-3 rounded-2xl rounded-tl-none shadow-sm max-w-[80%]">
                  <p className="text-sm">
                    ¡Hola! 👋 Bienvenido a <strong>PRIME WEB</strong>. ¿En qué podemos ayudarte hoy?
                  </p>
                  <span className="text-xs text-muted-foreground mt-1 block">
                    Respuesta en menos de 5 minutos
                  </span>
                </div>
              </motion.div>

              {/* Quick Messages */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="space-y-2"
              >
                <p className="text-xs text-muted-foreground mb-2">Mensajes rápidos:</p>
                {quickMessages.map((msg, index) => (
                  <motion.button
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    onClick={() => handleSendMessage(msg)}
                    className="block w-full text-left p-2 text-sm bg-background hover:bg-primary/5 border border-border hover:border-primary/30 rounded-lg transition-all duration-200 group"
                  >
                    <span className="group-hover:text-primary transition-colors">{msg}</span>
                  </motion.button>
                ))}
              </motion.div>
            </div>

            {/* Input Area */}
            <div className="p-3 border-t border-border bg-background">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Escribe tu mensaje..."
                  className="flex-1 px-4 py-2 bg-muted rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-green-500/50"
                />
                <Button
                  onClick={() => handleSendMessage()}
                  size="icon"
                  className="rounded-full bg-green-500 hover:bg-green-600 shrink-0"
                >
                  <Send size={18} />
                </Button>
              </div>
              <div className="flex items-center justify-center gap-4 mt-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Clock size={12} />
                  Respuesta rápida
                </span>
                <span className="flex items-center gap-1">
                  <Phone size={12} />
                  +34 672 616 466
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
