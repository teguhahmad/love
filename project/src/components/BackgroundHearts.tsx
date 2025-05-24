import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

export const BackgroundHearts: React.FC = () => {
  // Generate a number of hearts with random properties
  const hearts = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    size: Math.random() * 30 + 10,
    x: Math.random() * 100,
    y: -Math.random() * 20 - 5,
    delay: Math.random() * 5,
    duration: Math.random() * 10 + 15,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden heart-bg">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute"
          initial={{ 
            x: `${heart.x}vw`, 
            y: `${heart.y}vh`, 
            opacity: 0,
            scale: 0
          }}
          animate={{ 
            y: '120vh', 
            opacity: [0, 0.5, 0.2, 0],
            scale: [0, 1, 0.8, 0.6]
          }}
          transition={{ 
            repeat: Infinity, 
            duration: heart.duration,
            delay: heart.delay, 
            ease: 'linear',
          }}
        >
          <Heart 
            size={heart.size} 
            className="text-white/10 fill-white/10"
          />
        </motion.div>
      ))}
    </div>
  );
};