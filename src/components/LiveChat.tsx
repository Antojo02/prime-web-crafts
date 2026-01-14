import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Clock, CheckCheck, Loader2 } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xgooedeg";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
  status?: "sending" | "sent" | "error";
}

const quickMessages = [
  "Hola, quiero información sobre sus servicios",
  "Me interesa crear una página web",
  "¿Cuánto cuesta una web profesional?",
  "Quiero agendar una llamada gratuita",
];

const botResponses: Record<string, string> = {
  default: "¡Gracias por tu mensaje! Te responderemos muy pronto. Si es urgente, puedes llamarnos al +34 672 861 646.",
  servicios: "Ofrecemos diseño web, desarrollo a medida, SEO, y mantenimiento. ¿Qué tipo de proyecto tienes en mente?",
  precio: "Nuestros precios van desde 497€ para webs básicas hasta proyectos enterprise. ¿Te gustaría ver nuestra página de precios?",
  llamada: "¡Perfecto! Agenda una llamada gratuita en nuestra sección de contacto. Te contactaremos en menos de 24h.",
};

const getBotResponse = (message: string): string => {
  const lowerMessage = message.toLowerCase();
  if (lowerMessage.includes("servicio") || lowerMessage.includes("información")) {
    return botResponses.servicios;
  }
  if (lowerMessage.includes("precio") || lowerMessage.includes("cuesta") || lowerMessage.includes("costo")) {
    return botResponses.precio;
  }
  if (lowerMessage.includes("llamada") || lowerMessage.includes("agendar") || lowerMessage.includes("cita")) {
    return botResponses.llamada;
  }
  return botResponses.default;
};

export const LiveChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      text: "¡Hola! 👋 Bienvenido a PRIME WEB. ¿En qué podemos ayudarte hoy?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const sendToFormspree = async (text: string) => {
    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: text,
          timestamp: new Date().toISOString(),
          source: "Live Chat",
        }),
      });

      if (!response.ok) {
        throw new Error("Error al enviar mensaje");
      }
      return true;
    } catch (error) {
      console.error("Formspree error:", error);
      return false;
    }
  };

  const handleSendMessage = async (text?: string) => {
    const finalMessage = text || message;
    if (!finalMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: finalMessage,
      sender: "user",
      timestamp: new Date(),
      status: "sending",
    };

    setMessages((prev) => [...prev, userMessage]);
    setMessage("");
    setIsTyping(true);

    // Send to Formspree
    const success = await sendToFormspree(finalMessage);

    // Update message status
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === userMessage.id
          ? { ...msg, status: success ? "sent" : "error" }
          : msg
      )
    );

    if (success) {
      // Simulate bot typing
      setTimeout(() => {
        setIsTyping(false);
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: getBotResponse(finalMessage),
          sender: "bot",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, botMessage]);
      }, 1500);
    } else {
      setIsTyping(false);
      toast.error("No se pudo enviar el mensaje. Intenta de nuevo.");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" });
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
        className="fixed bottom-6 right-6 z-50 w-16 h-16 gradient-bg rounded-full flex items-center justify-center shadow-lg hover:opacity-90 transition-colors cursor-pointer glow"
        aria-label="Chat en vivo"
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
              <X className="text-primary-foreground" size={28} />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MessageCircle className="text-primary-foreground" size={28} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pulse animation */}
        {!isOpen && (
          <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-30" />
        )}

        {/* Notification badge */}
        {!isOpen && messages.length === 1 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 2 }}
            className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold"
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
            className="fixed bottom-24 right-6 z-50 w-[380px] max-w-[calc(100vw-48px)] bg-background rounded-2xl shadow-2xl border border-border overflow-hidden flex flex-col"
            style={{ maxHeight: "500px" }}
          >
            {/* Header */}
            <div className="gradient-bg p-4 text-primary-foreground shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                  <MessageCircle size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg">PRIME WEB</h3>
                  <div className="flex items-center gap-1 text-sm opacity-90">
                    <span className="w-2 h-2 rounded-full bg-green-300 animate-pulse" />
                    Chat en vivo
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

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-muted/30 min-h-[200px]">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-2 ${msg.sender === "user" ? "justify-end" : ""}`}
                >
                  {msg.sender === "bot" && (
                    <div className="w-8 h-8 rounded-full gradient-bg flex items-center justify-center shrink-0">
                      <MessageCircle size={14} className="text-primary-foreground" />
                    </div>
                  )}
                  <div
                    className={`p-3 rounded-2xl max-w-[75%] ${
                      msg.sender === "user"
                        ? "bg-primary text-primary-foreground rounded-br-none"
                        : "bg-background rounded-tl-none shadow-sm"
                    }`}
                  >
                    <p className="text-sm">{msg.text}</p>
                    <div className="flex items-center justify-end gap-1 mt-1">
                      <span className="text-[10px] opacity-70">{formatTime(msg.timestamp)}</span>
                      {msg.sender === "user" && msg.status === "sent" && (
                        <CheckCheck size={12} className="text-green-300" />
                      )}
                      {msg.sender === "user" && msg.status === "sending" && (
                        <Loader2 size={12} className="animate-spin" />
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Bot typing indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-2"
                >
                  <div className="w-8 h-8 rounded-full gradient-bg flex items-center justify-center shrink-0">
                    <MessageCircle size={14} className="text-primary-foreground" />
                  </div>
                  <div className="bg-background p-3 rounded-2xl rounded-tl-none shadow-sm">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Messages */}
            {messages.length <= 2 && (
              <div className="p-3 border-t border-border bg-background/50 shrink-0">
                <p className="text-xs text-muted-foreground mb-2">Mensajes rápidos:</p>
                <div className="flex flex-wrap gap-2">
                  {quickMessages.slice(0, 2).map((msg, index) => (
                    <button
                      key={index}
                      onClick={() => handleSendMessage(msg)}
                      className="text-xs px-3 py-1.5 bg-secondary hover:bg-primary/10 rounded-full transition-colors"
                    >
                      {msg.slice(0, 25)}...
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Area */}
            <div className="p-3 border-t border-border bg-background shrink-0">
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Escribe tu mensaje..."
                  className="flex-1 px-4 py-2 bg-muted rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
                <Button
                  onClick={() => handleSendMessage()}
                  size="icon"
                  className="rounded-full gradient-bg hover:opacity-90 shrink-0"
                  disabled={!message.trim()}
                >
                  <Send size={18} className="text-primary-foreground" />
                </Button>
              </div>
              <div className="flex items-center justify-center gap-4 mt-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Clock size={12} />
                  Respuesta rápida
                </span>
                <span>+34 672 861 646</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
