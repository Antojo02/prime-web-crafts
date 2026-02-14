import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BackToTop } from "@/components/BackToTop";

export default function Cookies() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-32 pb-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h1 className="text-4xl font-display font-bold mb-8">Política de Cookies</h1>
          <div className="prose prose-lg max-w-none text-muted-foreground space-y-6">
            <p><strong>Última actualización:</strong> Febrero 2026</p>

            <h2 className="text-2xl font-display font-bold text-foreground mt-8">1. ¿Qué son las Cookies?</h2>
            <p>Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo cuando visitas un sitio web. Permiten recordar tus preferencias y mejorar tu experiencia.</p>

            <h2 className="text-2xl font-display font-bold text-foreground mt-8">2. Cookies que Utilizamos</h2>
            <p><strong>Cookies técnicas:</strong> Necesarias para el funcionamiento básico del sitio.</p>
            <p><strong>Cookies analíticas:</strong> Nos ayudan a entender cómo los visitantes interactúan con el sitio web de forma anónima.</p>
            <p><strong>Cookies de preferencias:</strong> Recuerdan tus ajustes como el modo oscuro/claro.</p>

            <h2 className="text-2xl font-display font-bold text-foreground mt-8">3. Gestión de Cookies</h2>
            <p>Puedes configurar tu navegador para rechazar cookies o ser notificado cuando se envíen. Ten en cuenta que algunas funcionalidades del sitio podrían no funcionar correctamente.</p>

            <h2 className="text-2xl font-display font-bold text-foreground mt-8">4. Cookies de Terceros</h2>
            <p>Utilizamos servicios de terceros como Google Analytics que pueden establecer sus propias cookies. Consulta sus políticas de privacidad respectivas.</p>
          </div>
        </div>
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}
