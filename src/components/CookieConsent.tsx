import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, Shield, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptAll = () => {
    localStorage.setItem("cookie-consent", JSON.stringify({ analytics: true, marketing: true, date: new Date().toISOString() }));
    setIsVisible(false);
  };

  const acceptEssential = () => {
    localStorage.setItem("cookie-consent", JSON.stringify({ analytics: false, marketing: false, date: new Date().toISOString() }));
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="fixed bottom-0 left-0 right-0 z-[90] p-4 md:p-6"
        >
          <div className="max-w-4xl mx-auto glass-card rounded-2xl p-6 shadow-2xl border border-border/50">
            <div className="flex items-start gap-4">
              <div className="hidden sm:flex w-12 h-12 rounded-xl bg-primary/10 items-center justify-center shrink-0">
                <Cookie className="text-primary" size={24} />
              </div>
              <div className="flex-1">
                <h3 className="font-display font-bold text-lg mb-1 flex items-center gap-2">
                  <Cookie className="sm:hidden text-primary" size={20} />
                  Utilizamos cookies
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Usamos cookies para mejorar tu experiencia, analizar el tráfico y personalizar contenido. 
                  Puedes aceptar todas o solo las esenciales.{" "}
                  <Link to="/cookies" className="text-primary hover:underline font-medium">
                    Política de cookies
                  </Link>
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button onClick={acceptAll} className="gradient-bg text-primary-foreground font-semibold cursor-pointer">
                    <Shield className="mr-2" size={16} />
                    Aceptar todas
                  </Button>
                  <Button onClick={acceptEssential} variant="outline" className="cursor-pointer">
                    Solo esenciales
                  </Button>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={acceptEssential} className="shrink-0 -mt-1 -mr-1">
                <X size={18} />
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
