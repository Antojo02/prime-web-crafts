import { motion, useScroll, useTransform } from "framer-motion";

const techItems = [
  { text: "</>", color: "from-red-500 to-orange-500" },
  { text: "HTML", color: "from-orange-500 to-red-500" },
  { text: "CSS", color: "from-blue-500 to-cyan-500" },
  { text: "React", color: "from-cyan-400 to-blue-500" },
  { text: "Astro", color: "from-purple-500 to-pink-500" },
  { text: "JS", color: "from-yellow-400 to-orange-400" },
  { text: "TS", color: "from-blue-600 to-blue-400" },
  { text: "Tailwind", color: "from-teal-400 to-cyan-400" },
  { text: "Node", color: "from-green-500 to-emerald-400" },
  { text: "Next.js", color: "from-gray-600 to-gray-400" },
  { text: "Vite", color: "from-purple-500 to-yellow-400" },
  { text: "SQL", color: "from-indigo-500 to-purple-500" },
];

export const FloatingTechElements = () => {
  const { scrollYProgress } = useScroll();
  
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-5">
      {techItems.map((item, index) => {
        const startX = Math.random() * 100;
        const startY = Math.random() * 100;
        const duration = 15 + Math.random() * 10;
        const delay = index * 0.5;
        
        return (
          <motion.div
            key={index}
            className={`absolute px-3 py-1.5 rounded-lg bg-gradient-to-r ${item.color} text-white text-xs font-bold opacity-20 backdrop-blur-sm`}
            style={{
              left: `${startX}%`,
              top: `${startY}%`,
            }}
            animate={{
              x: [0, 50, -30, 20, 0],
              y: [0, -40, 30, -20, 0],
              rotate: [0, 10, -10, 5, 0],
              opacity: [0.1, 0.25, 0.15, 0.2, 0.1],
            }}
            transition={{
              duration,
              delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {item.text}
          </motion.div>
        );
      })}
    </div>
  );
};
