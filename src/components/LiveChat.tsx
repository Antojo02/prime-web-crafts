import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Clock, CheckCheck, Loader2, User, Briefcase, ArrowRight } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xgooedeg";
const WHATSAPP_NUMBER = "34672861646";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
  status?: "sending" | "sent" | "error";
}

interface UserData {
  nombre: string;
  apellidos: string;
  email: string;
  tipoProyecto: string;
  presupuesto: string;
  descripcion: string;
}

type ConversationStep = 
  | "welcome" 
  | "nombre" 
  | "apellidos" 
  | "email"
  | "tipoProyecto" 
  | "presupuesto" 
  | "descripcion" 
  | "resumen"
  | "finalizado";

const projectTypes = [
  "Página web corporativa",
  "Tienda online / E-commerce",
  "Landing page",
  "Blog / Portal de noticias",
  "Aplicación web",
  "Rediseño web",
  "Otro",
];

const budgetRanges = [
  "Menos de 500€",
  "500€ - 1.000€",
  "1.000€ - 2.500€",
  "2.500€ - 5.000€",
  "Más de 5.000€",
  "No estoy seguro",
];

const stepMessages: Record<ConversationStep, string> = {
  welcome: "¡Hola! 👋 Soy el asistente virtual de PRIME WEB. Estoy aquí para conocer tu proyecto y conectarte con nuestro equipo. ¿Comenzamos?",
  nombre: "¡Perfecto! Para comenzar, ¿cuál es tu nombre?",
  apellidos: "Encantado de conocerte. ¿Cuáles son tus apellidos?",
  email: "¿Cuál es tu correo electrónico para poder contactarte?",
  tipoProyecto: "¿Qué tipo de proyecto tienes en mente?",
  presupuesto: "¿Cuál es tu presupuesto aproximado para este proyecto?",
  descripcion: "Cuéntame más sobre tu proyecto. ¿Qué necesitas exactamente? ¿Tienes alguna referencia o idea en mente?",
  resumen: "",
  finalizado: "¡Gracias por tu tiempo! Antonio se pondrá en contacto contigo muy pronto. 🚀",
};

export const LiveChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [currentStep, setCurrentStep] = useState<ConversationStep>("welcome");
  const [userData, setUserData] = useState<UserData>({
    nombre: "",
    apellidos: "",
    email: "",
    tipoProyecto: "",
    presupuesto: "",
    descripcion: "",
  });
  const [isSending, setIsSending] = useState(false);
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

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Initial welcome message
      addBotMessage(stepMessages.welcome);
    }
  }, [isOpen]);

  const addBotMessage = (text: string, delay: number = 800) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          text,
          sender: "bot",
          timestamp: new Date(),
        },
      ]);
    }, delay);
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const processUserResponse = (text: string) => {
    const updatedData = { ...userData };

    switch (currentStep) {
      case "welcome":
        setCurrentStep("nombre");
        addBotMessage(stepMessages.nombre);
        break;

      case "nombre":
        if (text.trim().length < 2) {
          addBotMessage("Por favor, introduce un nombre válido (mínimo 2 caracteres).");
          return;
        }
        updatedData.nombre = text.trim();
        setUserData(updatedData);
        setCurrentStep("apellidos");
        addBotMessage(stepMessages.apellidos);
        break;

      case "apellidos":
        if (text.trim().length < 2) {
          addBotMessage("Por favor, introduce tus apellidos (mínimo 2 caracteres).");
          return;
        }
        updatedData.apellidos = text.trim();
        setUserData(updatedData);
        setCurrentStep("email");
        addBotMessage(stepMessages.email);
        break;

      case "email":
        if (!validateEmail(text.trim())) {
          addBotMessage("Por favor, introduce un correo electrónico válido (ejemplo: tu@email.com).");
          return;
        }
        updatedData.email = text.trim();
        setUserData(updatedData);
        setCurrentStep("tipoProyecto");
        addBotMessage(stepMessages.tipoProyecto);
        break;

      case "tipoProyecto":
        updatedData.tipoProyecto = text.trim();
        setUserData(updatedData);
        setCurrentStep("presupuesto");
        addBotMessage(stepMessages.presupuesto);
        break;

      case "presupuesto":
        updatedData.presupuesto = text.trim();
        setUserData(updatedData);
        setCurrentStep("descripcion");
        addBotMessage(stepMessages.descripcion);
        break;

      case "descripcion":
        if (text.trim().length < 10) {
          addBotMessage("Por favor, describe tu proyecto con más detalle (mínimo 10 caracteres).");
          return;
        }
        updatedData.descripcion = text.trim();
        setUserData(updatedData);
        setCurrentStep("resumen");
        showSummary(updatedData);
        break;
    }
  };

  const showSummary = (data: UserData) => {
    const summaryText = `📋 Resumen de tu consulta:

👤 Nombre: ${data.nombre} ${data.apellidos}
📧 Email: ${data.email}
🎯 Proyecto: ${data.tipoProyecto}
💰 Presupuesto: ${data.presupuesto}
📝 Descripción: ${data.descripcion}

¿Los datos son correctos? Haz clic en "Enviar y Contactar" para finalizar y hablar con Antonio directamente.`;

    addBotMessage(summaryText, 1000);
  };

  const sendToFormspree = async (data: UserData): Promise<boolean> => {
    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre: data.nombre,
          apellidos: data.apellidos,
          email: data.email,
          tipoProyecto: data.tipoProyecto,
          presupuesto: data.presupuesto,
          descripcion: data.descripcion,
          timestamp: new Date().toISOString(),
          source: "Chat IA - PRIME WEB",
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

  const openWhatsApp = (data: UserData) => {
    const message = encodeURIComponent(
`🚀 *NUEVA CONSULTA - PRIME WEB*

👤 *Nombre:* ${data.nombre} ${data.apellidos}
📧 *Email:* ${data.email}
🎯 *Tipo de proyecto:* ${data.tipoProyecto}
💰 *Presupuesto:* ${data.presupuesto}
📝 *Descripción:* ${data.descripcion}

---
Enviado desde el chat de PRIME WEB`
    );
    
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, "_blank");
  };

  const handleFinalize = async () => {
    setIsSending(true);
    
    // Send to Formspree first
    const success = await sendToFormspree(userData);
    
    if (success) {
      // Add final message
      addBotMessage(stepMessages.finalizado, 500);
      setCurrentStep("finalizado");
      
      // Wait a moment then open WhatsApp
      setTimeout(() => {
        openWhatsApp(userData);
        toast.success("¡Datos enviados! Te redirigimos a WhatsApp para contactar con Antonio.");
        setIsSending(false);
      }, 1500);
    } else {
      toast.error("Error al enviar. Por favor, intenta de nuevo.");
      setIsSending(false);
    }
  };

  const handleSendMessage = async (text?: string) => {
    const finalMessage = text || message;
    if (!finalMessage.trim() || currentStep === "finalizado") return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: finalMessage,
      sender: "user",
      timestamp: new Date(),
      status: "sent",
    };

    setMessages((prev) => [...prev, userMessage]);
    setMessage("");

    processUserResponse(finalMessage);
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

  const handleQuickOption = (option: string) => {
    handleSendMessage(option);
  };

  const resetConversation = () => {
    setMessages([]);
    setCurrentStep("welcome");
    setUserData({
      nombre: "",
      apellidos: "",
      email: "",
      tipoProyecto: "",
      presupuesto: "",
      descripcion: "",
    });
    addBotMessage(stepMessages.welcome);
  };

  const renderQuickOptions = () => {
    if (currentStep === "welcome") {
      return (
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => handleSendMessage("¡Sí, comencemos!")}
            className="text-xs px-3 py-1.5 bg-primary text-primary-foreground rounded-full transition-colors hover:opacity-90 flex items-center gap-1"
          >
            ¡Sí, comencemos! <ArrowRight size={12} />
          </button>
        </div>
      );
    }

    if (currentStep === "tipoProyecto") {
      return (
        <div className="flex flex-wrap gap-2">
          {projectTypes.map((type, index) => (
            <button
              key={index}
              onClick={() => handleQuickOption(type)}
              className="text-xs px-3 py-1.5 bg-secondary hover:bg-primary/20 rounded-full transition-colors"
            >
              {type}
            </button>
          ))}
        </div>
      );
    }

    if (currentStep === "presupuesto") {
      return (
        <div className="flex flex-wrap gap-2">
          {budgetRanges.map((range, index) => (
            <button
              key={index}
              onClick={() => handleQuickOption(range)}
              className="text-xs px-3 py-1.5 bg-secondary hover:bg-primary/20 rounded-full transition-colors"
            >
              {range}
            </button>
          ))}
        </div>
      );
    }

    if (currentStep === "resumen") {
      return (
        <div className="flex flex-wrap gap-2">
          <Button
            onClick={handleFinalize}
            disabled={isSending}
            className="gradient-bg text-primary-foreground text-sm px-4 py-2 rounded-full flex items-center gap-2"
          >
            {isSending ? (
              <>
                <Loader2 size={14} className="animate-spin" />
                Enviando...
              </>
            ) : (
              <>
                <Send size={14} />
                Enviar y Contactar
              </>
            )}
          </Button>
          <button
            onClick={resetConversation}
            className="text-xs px-3 py-1.5 bg-secondary hover:bg-destructive/20 rounded-full transition-colors"
          >
            Empezar de nuevo
          </button>
        </div>
      );
    }

    if (currentStep === "finalizado") {
      return (
        <div className="flex flex-wrap gap-2">
          <button
            onClick={resetConversation}
            className="text-xs px-3 py-1.5 bg-primary text-primary-foreground rounded-full transition-colors hover:opacity-90"
          >
            Nueva consulta
          </button>
        </div>
      );
    }

    return null;
  };

  const getInputPlaceholder = (): string => {
    switch (currentStep) {
      case "nombre":
        return "Escribe tu nombre...";
      case "apellidos":
        return "Escribe tus apellidos...";
      case "email":
        return "tu@email.com";
      case "tipoProyecto":
        return "Selecciona o escribe el tipo...";
      case "presupuesto":
        return "Selecciona tu presupuesto...";
      case "descripcion":
        return "Describe tu proyecto con detalle...";
      default:
        return "Escribe tu mensaje...";
    }
  };

  const getStepIcon = () => {
    switch (currentStep) {
      case "nombre":
      case "apellidos":
      case "email":
        return <User size={14} className="text-muted-foreground" />;
      case "tipoProyecto":
      case "presupuesto":
      case "descripcion":
        return <Briefcase size={14} className="text-muted-foreground" />;
      default:
        return null;
    }
  };

  const getProgressPercentage = (): number => {
    const steps: ConversationStep[] = ["welcome", "nombre", "apellidos", "email", "tipoProyecto", "presupuesto", "descripcion", "resumen", "finalizado"];
    const currentIndex = steps.indexOf(currentStep);
    return Math.round(((currentIndex + 1) / steps.length) * 100);
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
        {!isOpen && messages.length === 0 && (
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
            className="fixed bottom-24 right-6 z-50 w-[400px] max-w-[calc(100vw-48px)] bg-background rounded-2xl shadow-2xl border border-border overflow-hidden flex flex-col"
            style={{ maxHeight: "550px" }}
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
                    Asistente Virtual
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              
              {/* Progress bar */}
              {currentStep !== "welcome" && currentStep !== "finalizado" && (
                <div className="mt-3">
                  <div className="h-1 bg-white/20 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-white"
                      initial={{ width: 0 }}
                      animate={{ width: `${getProgressPercentage()}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                  <p className="text-xs mt-1 opacity-80">Progreso: {getProgressPercentage()}%</p>
                </div>
              )}
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
                    className={`p-3 rounded-2xl max-w-[80%] ${
                      msg.sender === "user"
                        ? "bg-primary text-primary-foreground rounded-br-none"
                        : "bg-background rounded-tl-none shadow-sm"
                    }`}
                  >
                    <p className="text-sm whitespace-pre-line">{msg.text}</p>
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

            {/* Quick Options */}
            {renderQuickOptions() && (
              <div className="p-3 border-t border-border bg-background/50 shrink-0">
                <p className="text-xs text-muted-foreground mb-2 flex items-center gap-1">
                  {getStepIcon()}
                  Opciones rápidas:
                </p>
                {renderQuickOptions()}
              </div>
            )}

            {/* Input Area */}
            {currentStep !== "resumen" && currentStep !== "finalizado" && (
              <div className="p-3 border-t border-border bg-background shrink-0">
                <div className="flex gap-2">
                  <input
                    ref={inputRef}
                    type={currentStep === "email" ? "email" : "text"}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder={getInputPlaceholder()}
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
                    Respuesta inmediata
                  </span>
                  <span>+34 672 861 646</span>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
