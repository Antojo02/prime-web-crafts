import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BackToTop } from "@/components/BackToTop";

export default function Terms() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-32 pb-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h1 className="text-4xl font-display font-bold mb-8">Términos y Condiciones</h1>
          <div className="prose prose-lg max-w-none text-muted-foreground space-y-6">
            <p><strong>Última actualización:</strong> Febrero 2026</p>

            <h2 className="text-2xl font-display font-bold text-foreground mt-8">1. Objeto</h2>
            <p>Los presentes términos regulan el uso del sitio web de PRIME WEB y la contratación de servicios de diseño y desarrollo web.</p>

            <h2 className="text-2xl font-display font-bold text-foreground mt-8">2. Servicios</h2>
            <p>PRIME WEB ofrece servicios de diseño web, desarrollo, SEO, branding digital y mantenimiento. Los detalles específicos se acordarán en cada presupuesto individual.</p>

            <h2 className="text-2xl font-display font-bold text-foreground mt-8">3. Precios y Pagos</h2>
            <p>Los precios se comunican en cada presupuesto personalizado. Se requiere un anticipo del 50% para iniciar el proyecto y el resto a la entrega.</p>

            <h2 className="text-2xl font-display font-bold text-foreground mt-8">4. Propiedad Intelectual</h2>
            <p>Una vez completado el pago, el cliente obtiene los derechos de uso del diseño y código desarrollado. PRIME WEB se reserva el derecho de incluir el proyecto en su portafolio.</p>

            <h2 className="text-2xl font-display font-bold text-foreground mt-8">5. Garantía</h2>
            <p>Ofrecemos garantía de corrección de errores durante el período especificado en cada plan contratado.</p>

            <h2 className="text-2xl font-display font-bold text-foreground mt-8">6. Limitación de Responsabilidad</h2>
            <p>PRIME WEB no será responsable de daños indirectos derivados del uso del sitio web desarrollado.</p>
          </div>
        </div>
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}
