import { useState, useRef } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';

export const CursorSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Magic cursor positioning
  const x = useSpring(0, { stiffness: 300, damping: 30 });
  const y = useSpring(0, { stiffness: 300, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);
  };

  // Tilt effect
  const tiltX = useTransform(y, [0, 400], [10, -10]);
  const tiltY = useTransform(x, [0, 800], [-10, 10]);

  return (
    <section className="py-24 bg-white relative overflow-hidden" id="interactive">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div 
          ref={containerRef}
          className="relative w-full h-[400px] rounded-3xl bg-brand-900 overflow-hidden shadow-2xl group cursor-none flex items-center justify-center"
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => {
            setIsHovered(false);
            x.set(400); // Center roughly
            y.set(200);
          }}
          style={{ perspective: 1000 }}
        >
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center z-10"
            style={{ rotateX: isHovered ? tiltX : 0, rotateY: isHovered ? tiltY : 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
             <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
               Precision in every detail.
             </h2>
             <p className="text-brand-200 text-lg md:text-xl max-w-lg">
               Software should feel seamless. Move your cursor to experience the interactivity we build into our products.
             </p>
          </motion.div>

          {/* Custom Pointer/Glow Effect */}
          <motion.div 
            className="absolute top-0 left-0 w-64 h-64 bg-brand-accent rounded-full opacity-30 blur-[80px] pointer-events-none mix-blend-screen"
            style={{
              x: useTransform(x, (v) => v - 128),
              y: useTransform(y, (v) => v - 128),
              opacity: isHovered ? 0.6 : 0
            }}
          />
          
          <motion.div
            className="absolute top-0 left-0 w-6 h-6 border-2 border-white rounded-full pointer-events-none z-20 mix-blend-difference hidden md:block"
            style={{
              x: useTransform(x, (v) => v - 12),
              y: useTransform(y, (v) => v - 12),
              opacity: isHovered ? 1 : 0,
              scale: isHovered ? 1 : 0.5
            }}
          />
        </div>

      </div>
    </section>
  );
};
