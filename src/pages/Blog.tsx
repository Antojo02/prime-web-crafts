import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight, Search, Tag } from "lucide-react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FloatingTechElements } from "@/components/FloatingTechElements";
import { WhatsAppChat } from "@/components/WhatsAppChat";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  slug: string;
}

const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "10 Tendencias de Diseño Web para 2024",
    excerpt: "Descubre las últimas tendencias en diseño web que están definiendo el futuro digital. Desde el minimalismo hasta las experiencias inmersivas.",
    category: "Diseño Web",
    date: "15 Ene 2024",
    readTime: "5 min",
    image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=500&fit=crop",
    slug: "tendencias-diseno-web-2024",
  },
  {
    id: "2",
    title: "Guía Completa de SEO para Principiantes",
    excerpt: "Todo lo que necesitas saber para posicionar tu sitio web en Google. Estrategias probadas y técnicas actualizadas para 2024.",
    category: "SEO",
    date: "12 Ene 2024",
    readTime: "8 min",
    image: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=800&h=500&fit=crop",
    slug: "guia-seo-principiantes",
  },
  {
    id: "3",
    title: "Marketing Digital: Estrategias que Funcionan",
    excerpt: "Aprende las estrategias de marketing digital más efectivas para hacer crecer tu negocio online y aumentar tus conversiones.",
    category: "Marketing Digital",
    date: "8 Ene 2024",
    readTime: "6 min",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop",
    slug: "marketing-digital-estrategias",
  },
  {
    id: "4",
    title: "Cómo Optimizar la Velocidad de tu Web",
    excerpt: "La velocidad de carga es crucial para el SEO y la experiencia del usuario. Te mostramos cómo mejorarla paso a paso.",
    category: "SEO",
    date: "5 Ene 2024",
    readTime: "7 min",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop",
    slug: "optimizar-velocidad-web",
  },
  {
    id: "5",
    title: "UX/UI: Diseño Centrado en el Usuario",
    excerpt: "Descubre cómo crear experiencias de usuario excepcionales que conviertan visitantes en clientes leales.",
    category: "Diseño Web",
    date: "2 Ene 2024",
    readTime: "6 min",
    image: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=800&h=500&fit=crop",
    slug: "ux-ui-diseno-usuario",
  },
  {
    id: "6",
    title: "Redes Sociales para Empresas: Guía 2024",
    excerpt: "Maximiza tu presencia en redes sociales con estas estrategias probadas. Desde contenido hasta publicidad pagada.",
    category: "Marketing Digital",
    date: "28 Dic 2023",
    readTime: "9 min",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=500&fit=crop",
    slug: "redes-sociales-empresas-2024",
  },
];

const categories = ["Todos", "Diseño Web", "SEO", "Marketing Digital"];

const BlogCard = ({ post, index }: { post: BlogPost; index: number }) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group glass-card rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-500"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
        <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">
          {post.category}
        </Badge>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
          <span className="flex items-center gap-1">
            <Calendar size={14} />
            {post.date}
          </span>
          <span className="flex items-center gap-1">
            <Clock size={14} />
            {post.readTime}
          </span>
        </div>

        <h3 className="text-xl font-display font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
          {post.title}
        </h3>

        <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
          {post.excerpt}
        </p>

        <button className="flex items-center gap-2 text-primary font-semibold text-sm group-hover:gap-3 transition-all">
          Leer más
          <ArrowRight size={16} />
        </button>
      </div>
    </motion.article>
  );
};

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("Todos");

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === "Todos" || post.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen relative">
      <FloatingTechElements />
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-16 section-padding">
        <div className="container-tight">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              Blog
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold mb-6">
              Recursos y{" "}
              <span className="gradient-text">Conocimiento</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Artículos sobre diseño web, SEO, marketing digital y las últimas tendencias 
              para hacer crecer tu presencia online.
            </p>
          </motion.div>

          {/* Search and Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-4xl mx-auto mb-12"
          >
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
                <Input
                  type="text"
                  placeholder="Buscar artículos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 h-12 glass-card border-none"
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={activeCategory === category ? "default" : "outline"}
                  onClick={() => setActiveCategory(category)}
                  className={activeCategory === category ? "gradient-bg" : ""}
                >
                  <Tag size={14} className="mr-2" />
                  {category}
                </Button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="pb-20 section-padding">
        <div className="container-tight">
          {filteredPosts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, index) => (
                <BlogCard key={post.id} post={post} index={index} />
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <p className="text-xl text-muted-foreground">
                No se encontraron artículos con esos criterios.
              </p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => {
                  setSearchTerm("");
                  setActiveCategory("Todos");
                }}
              >
                Ver todos los artículos
              </Button>
            </motion.div>
          )}

          {/* Newsletter CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-20 glass-card rounded-3xl p-8 md:p-12 text-center"
          >
            <h3 className="text-2xl sm:text-3xl font-display font-bold mb-4">
              Suscríbete a nuestro{" "}
              <span className="gradient-text">Newsletter</span>
            </h3>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              Recibe las últimas tendencias, consejos y recursos directamente en tu bandeja de entrada.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="tu@email.com"
                className="h-12 flex-1"
              />
              <Button className="gradient-bg h-12 px-8">
                Suscribirse
              </Button>
            </form>
          </motion.div>
        </div>
      </section>

      <Footer />
      <WhatsAppChat />
    </div>
  );
};

export default Blog;
