import { motion } from "framer-motion";
import { Instagram, Twitter, Linkedin, Facebook } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const footerLinks = {
  servicios: [
    { name: "Diseño Web", href: "/diseno-web" },
    { name: "Desarrollo", href: "/desarrollo" },
    { name: "SEO", href: "/seo" },
    { name: "Mantenimiento", href: "/mantenimiento" },
  ],
  empresa: [
    { name: "Portafolio", href: "/#portafolio" },
    { name: "Precios", href: "/precios" },
    { name: "Testimonios", href: "/#testimonios" },
    { name: "Contacto", href: "/#contacto" },
  ],
  legal: [
    { name: "Privacidad", href: "/privacidad" },
    { name: "Términos", href: "/terminos" },
    { name: "Cookies", href: "/cookies" },
  ],
};

const socialLinks = [
  { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/antoniojosetortajada", label: "LinkedIn" },
  { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
];

const SmartLink = ({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent) => {
    if (href.startsWith("/#")) {
      e.preventDefault();
      const sectionId = href.substring(2);
      if (location.pathname === "/") {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
      } else {
        navigate("/");
        setTimeout(() => {
          document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
        }, 300);
      }
    }
  };

  if (href.startsWith("/#")) {
    return <a href={href} onClick={handleClick} className={className}>{children}</a>;
  }

  return <Link to={href} className={className}>{children}</Link>;
};

export const Footer = () => {
  return (
    <footer className="bg-foreground text-background">
      <div className="container-tight section-padding pb-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 gradient-bg rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-display font-bold text-xl">P</span>
              </div>
              <span className="font-display font-bold text-xl text-background">
                PRIME WEB
              </span>
            </Link>
            <p className="text-background/70 max-w-xs mb-6">
              Transformamos ideas en experiencias digitales únicas. Tu éxito online es nuestra misión.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-colors"
                  aria-label={social.label}
                >
                  <social.icon size={18} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-4">Servicios</h4>
            <ul className="space-y-3">
              {footerLinks.servicios.map((link, index) => (
                <li key={index}>
                  <SmartLink href={link.href} className="text-background/70 hover:text-background transition-colors">
                    {link.name}
                  </SmartLink>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Empresa</h4>
            <ul className="space-y-3">
              {footerLinks.empresa.map((link, index) => (
                <li key={index}>
                  <SmartLink href={link.href} className="text-background/70 hover:text-background transition-colors">
                    {link.name}
                  </SmartLink>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link, index) => (
                <li key={index}>
                  <SmartLink href={link.href} className="text-background/70 hover:text-background transition-colors">
                    {link.name}
                  </SmartLink>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-background/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-background/50">
            © 2026 PRIME WEB. Todos los derechos reservados.
          </p>
          <p className="text-sm text-background/50">
            Hecho con ❤️ para impulsar tu negocio
          </p>
        </div>
      </div>
    </footer>
  );
};
