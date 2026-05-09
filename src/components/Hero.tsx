import { useTranslation } from 'react-i18next';
import { TypeAnimation } from 'react-type-animation';
import { motion } from 'framer-motion';
import { trackEvent } from '../analytics/events';

export const Hero = () => {
  const { t, i18n } = useTranslation();

  // Re-render typewriter when language changes
  const typewriterKey = i18n.language;

  const sequence = [
    t('hero.typewriter.0', { returnObjects: true }), 2000,
    t('hero.typewriter.1', { returnObjects: true }), 2000,
    t('hero.typewriter.2', { returnObjects: true }), 2000,
    t('hero.typewriter.3', { returnObjects: true }), 2000,
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-brand-50">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-brand-200 rounded-full blur-[120px] opacity-50 -z-10 animate-pulse"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block py-1 px-3 rounded-full bg-brand-100 text-brand-800 text-sm font-semibold mb-6 border border-brand-200">
            {t('hero.badge')}
          </span>
        </motion.div>

        <motion.h1 
          className="text-5xl md:text-7xl font-extrabold tracking-tight text-brand-900 mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {t('hero.title1')} <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent to-indigo-600">
            {t('hero.title2')}
          </span>
        </motion.h1>

        <motion.div 
          className="text-2xl md:text-3xl font-bold text-brand-600 h-12 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <TypeAnimation
            key={typewriterKey}
            sequence={sequence as any}
            wrapper="span"
            speed={50}
            repeat={Infinity}
          />
        </motion.div>

        <motion.p 
          className="mt-4 text-xl text-brand-700 max-w-2xl mx-auto mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {t('hero.subtitle')}
        </motion.p>

        <motion.div 
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <a 
            href="#cta" 
            className="btn-primary w-full sm:w-auto text-lg px-8 py-4"
            onClick={() => trackEvent('click_cta', { location: 'hero_primary' })}
          >
            {t('hero.cta')}
          </a>
          <a 
            href="#solutions" 
            className="btn-secondary w-full sm:w-auto text-lg px-8 py-4"
            onClick={() => trackEvent('click_cta', { location: 'hero_secondary' })}
          >
            {t('hero.secondary')}
          </a>
        </motion.div>
      </div>
    </section>
  );
};
