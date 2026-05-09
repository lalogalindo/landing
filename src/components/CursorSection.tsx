import { useRef, useState } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBrain, faChartSimple, faPlugCircleBolt } from '@fortawesome/free-solid-svg-icons';

export const CursorSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useSpring(420, { stiffness: 260, damping: 32 });
  const y = useSpring(210, { stiffness: 260, damping: 32 });

  const handleMouseMove = (event: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    x.set(event.clientX - rect.left);
    y.set(event.clientY - rect.top);
  };

  const tiltX = useTransform(y, [0, 440], [6, -6]);
  const tiltY = useTransform(x, [0, 840], [-7, 7]);

  return (
    <section className="relative overflow-hidden bg-white py-20 sm:py-24" id="interactive">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent" />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div
          ref={containerRef}
          className="group relative min-h-[430px] overflow-hidden rounded-[2.5rem] bg-brand-950 shadow-[0_28px_110px_rgba(16,42,67,0.22)]"
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => {
            setIsHovered(false);
            x.set(420);
            y.set(210);
          }}
          style={{ perspective: 1000 }}
        >
          <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(#fff_1px,transparent_1px),linear-gradient(90deg,#fff_1px,transparent_1px)] [background-size:44px_44px]" />
          <motion.div
            className="absolute left-0 top-0 h-72 w-72 rounded-full bg-blue-400 blur-[90px]"
            style={{
              x: useTransform(x, (value) => value - 144),
              y: useTransform(y, (value) => value - 144),
              opacity: isHovered ? 0.45 : 0.2,
            }}
          />

          <motion.div
            className="relative z-10 grid min-h-[430px] gap-8 p-8 sm:p-10 lg:grid-cols-[0.9fr_1.1fr] lg:p-12"
            style={{ rotateX: isHovered ? tiltX : 0, rotateY: isHovered ? tiltY : 0 }}
            transition={{ type: 'spring', stiffness: 220, damping: 28 }}
          >
            <div className="flex flex-col justify-center">
              <span className="text-sm font-black uppercase tracking-[0.24em] text-blue-300">Momento visual</span>
              <h2 className="mt-4 max-w-xl text-4xl font-black tracking-[-0.04em] text-white sm:text-5xl">
                Sistemas que conectan datos, equipos y decisiones.
              </h2>
              <p className="mt-5 max-w-lg text-lg leading-8 text-blue-100/75">
                Diseñamos flujos donde cada integración trabaja como una capa de inteligencia para tu operación.
              </p>
            </div>

            <div className="grid content-center gap-4 sm:grid-cols-3">
              {[
                { icon: faPlugCircleBolt, title: 'APIs', text: 'Conexión real' },
                { icon: faBrain, title: 'IA', text: 'Decisiones útiles' },
                { icon: faChartSimple, title: 'Métricas', text: 'Control visible' },
              ].map((item) => (
                <div key={item.title} className="rounded-3xl border border-white/10 bg-white/[0.09] p-5 text-white backdrop-blur transition-all duration-300 hover:-translate-y-2 hover:bg-white/[0.14]">
                  <span className="mb-8 flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-brand-accent">
                    <FontAwesomeIcon icon={item.icon} />
                  </span>
                  <h3 className="text-xl font-black">{item.title}</h3>
                  <p className="mt-2 text-sm font-medium text-blue-100/70">{item.text}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
