import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

export const Process = () => {
  const { t } = useTranslation();

  const steps = ['step1', 'step2', 'step3', 'step4'];

  return (
    <section id="process" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-900">{t('process.title')}</h2>
        </div>

        <div className="relative">
          {/* Connecting line */}
          <div className="absolute top-1/2 left-0 w-full h-1 bg-brand-100 -translate-y-1/2 hidden lg:block rounded-full"></div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div 
                key={step}
                className="relative z-10 flex flex-col items-center text-center group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
              >
                <div className="w-16 h-16 rounded-full bg-white border-4 border-brand-200 flex items-center justify-center text-2xl font-bold text-brand-700 mb-6 group-hover:border-brand-accent group-hover:text-brand-accent transition-colors duration-300 shadow-sm">
                  {index + 1}
                </div>
                <h3 className="text-xl font-bold text-brand-900 mb-2">{t(`process.${step}.title`)}</h3>
                <p className="text-brand-600">{t(`process.${step}.desc`)}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
