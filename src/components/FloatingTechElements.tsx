import { motion } from "framer-motion";
import { useState } from "react";

interface TechItem {
  text: string;
  color: string;
  docUrl: string;
}

const techItems: TechItem[] = [
  { text: "</>", color: "from-red-500 to-orange-500", docUrl: "https://developer.mozilla.org/es/docs/Web/HTML" },
  { text: "HTML", color: "from-orange-500 to-red-500", docUrl: "https://developer.mozilla.org/es/docs/Web/HTML" },
  { text: "CSS", color: "from-blue-500 to-cyan-500", docUrl: "https://developer.mozilla.org/es/docs/Web/CSS" },
  { text: "React", color: "from-cyan-400 to-blue-500", docUrl: "https://react.dev" },
  { text: "Astro", color: "from-purple-500 to-pink-500", docUrl: "https://astro.build" },
  { text: "JS", color: "from-yellow-400 to-orange-400", docUrl: "https://developer.mozilla.org/es/docs/Web/JavaScript" },
  { text: "TS", color: "from-blue-600 to-blue-400", docUrl: "https://www.typescriptlang.org" },
  { text: "Tailwind", color: "from-teal-400 to-cyan-400", docUrl: "https://tailwindcss.com" },
  { text: "Node", color: "from-green-500 to-emerald-400", docUrl: "https://nodejs.org" },
  { text: "Next.js", color: "from-gray-600 to-gray-400", docUrl: "https://nextjs.org" },
  { text: "Vite", color: "from-purple-500 to-yellow-400", docUrl: "https://vitejs.dev" },
  { text: "SQL", color: "from-indigo-500 to-purple-500", docUrl: "https://www.postgresql.org/docs/" },
  { text: "Python", color: "from-blue-500 to-yellow-400", docUrl: "https://python.org" },
  { text: "Git", color: "from-orange-600 to-red-500", docUrl: "https://git-scm.com/doc" },
  { text: "Docker", color: "from-blue-400 to-blue-600", docUrl: "https://docs.docker.com" },
  { text: "Vue", color: "from-green-400 to-emerald-500", docUrl: "https://vuejs.org" },
  { text: "Svelte", color: "from-orange-500 to-red-400", docUrl: "https://svelte.dev" },
  { text: "MongoDB", color: "from-green-600 to-green-400", docUrl: "https://www.mongodb.com/docs/" },
  { text: "GraphQL", color: "from-pink-500 to-purple-500", docUrl: "https://graphql.org" },
  { text: "AWS", color: "from-orange-400 to-yellow-500", docUrl: "https://aws.amazon.com/documentation/" },
];

// Generate random positions for elements scattered across the page
const generateRandomPositions = () => {
  return techItems.map((item, index) => ({
    ...item,
    id: index,
    initialX: Math.random() * 90 + 5, // 5-95%
    initialY: Math.random() * 400 + 50, // 50-450% (spread across multiple viewport heights)
    size: Math.random() * 0.4 + 0.8, // 0.8-1.2 scale
    rotateAmount: Math.random() * 20 - 10, // -10 to 10 degrees
    floatDuration: 8 + Math.random() * 8, // 8-16 seconds
    floatDelay: Math.random() * 5,
  }));
};

const FloatingElement = ({ item }: { item: ReturnType<typeof generateRandomPositions>[0] }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    window.open(item.docUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <motion.div
      className={`absolute px-3 py-1.5 rounded-lg bg-gradient-to-r ${item.color} text-white text-xs font-bold cursor-pointer select-none pointer-events-auto backdrop-blur-sm shadow-lg`}
      style={{
        left: `${item.initialX}%`,
        top: `${item.initialY}vh`,
        scale: item.size,
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: isHovered ? 0.95 : 0.25,
        scale: isHovered ? item.size * 1.3 : item.size,
        rotate: isHovered ? 0 : [item.rotateAmount, -item.rotateAmount, item.rotateAmount],
        y: isHovered ? 0 : [0, -20, 10, -15, 0],
        x: isHovered ? 0 : [0, 15, -10, 8, 0],
      }}
      transition={{
        opacity: { duration: 0.3 },
        scale: { duration: 0.3 },
        rotate: {
          duration: item.floatDuration,
          repeat: Infinity,
          ease: "easeInOut",
          delay: item.floatDelay,
        },
        y: {
          duration: item.floatDuration * 0.8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: item.floatDelay,
        },
        x: {
          duration: item.floatDuration,
          repeat: Infinity,
          ease: "easeInOut",
          delay: item.floatDelay + 1,
        },
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={handleClick}
      whileHover={{
        boxShadow: "0 0 30px rgba(255,255,255,0.5)",
        zIndex: 100,
      }}
      whileTap={{ scale: item.size * 1.1 }}
    >
      <motion.span
        animate={{
          textShadow: isHovered ? "0 0 10px rgba(255,255,255,0.8)" : "none",
        }}
      >
        {item.text}
      </motion.span>
      
      {/* Tooltip on hover */}
      {isHovered && (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap text-[10px] bg-background/90 text-foreground px-2 py-1 rounded shadow-lg"
        >
          Ver documentación →
        </motion.div>
      )}
    </motion.div>
  );
};

export const FloatingTechElements = () => {
  const [elements] = useState(() => generateRandomPositions());

  return (
    <div className="fixed inset-0 overflow-hidden -z-5 pointer-events-none">
      {elements.map((item) => (
        <FloatingElement key={item.id} item={item} />
      ))}
    </div>
  );
};
