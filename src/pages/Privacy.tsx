import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BackToTop } from "@/components/BackToTop";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-32 pb-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h1 className="text-4xl font-display font-bold mb-8">Política de Privacidad</h1>
          <div className="prose prose-lg max-w-none text-muted-foreground space-y-6">
            <p><strong>Última actualización:</strong> Febrero 2026</p>

            <h2 className="text-2xl font-display font-bold text-foreground mt-8">1. Responsable del Tratamiento</h2>
            <p>PRIME WEB, con domicilio en España, es el responsable del tratamiento de los datos personales recogidos a través de este sitio web.</p>

            <h2 className="text-2xl font-display font-bold text-foreground mt-8">2. Datos que Recopilamos</h2>
            <p>Recopilamos los datos que nos proporcionas voluntariamente a través de formularios: nombre, email, teléfono y mensaje. También recopilamos datos de navegación de forma anónima.</p>

            <h2 className="text-2xl font-display font-bold text-foreground mt-8">3. Finalidad</h2>
            <p>Los datos se utilizan para responder consultas, gestionar presupuestos, mejorar nuestros servicios y enviar comunicaciones comerciales (con consentimiento).</p>

            <h2 className="text-2xl font-display font-bold text-foreground mt-8">4. Base Legal</h2>
            <p>El tratamiento se basa en el consentimiento del interesado y en el interés legítimo para la gestión de clientes potenciales.</p>

            <h2 className="text-2xl font-display font-bold text-foreground mt-8">5. Derechos del Usuario</h2>
            <p>Puedes ejercer tus derechos de acceso, rectificación, supresión, limitación, portabilidad y oposición enviando un email a antoniojosetortajada2002@gmail.com.</p>

            <h2 className="text-2xl font-display font-bold text-foreground mt-8">6. Conservación</h2>
            <p>Los datos se conservarán mientras exista una relación comercial o durante el tiempo necesario para cumplir obligaciones legales.</p>
          </div>
        </div>
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}
