import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBullseye, faCompassDrafting, faCodeBranch, faRocket } from '@fortawesome/free-solid-svg-icons';

export const Process = () => {
  const { t } = useTranslation();

  const steps = [
    { id: 'step1', icon: faBullseye, label: '01', offset: 'lg:translate-y-0' },
    { id: 'step2', icon: faCompassDrafting, label: '02', offset: 'lg:translate-y-10' },
    { id: 'step3', icon: faCodeBranch, label: '03', offset: 'lg:translate-y-0' },
    { id: 'step4', icon: faRocket, label: '04', offset: 'lg:translate-y-10' },
  ];

  return (
    <section id="process" className="relative overflow-hidden bg-brand-950 py-24 text-white sm:py-28">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(201,51,67,0.32),transparent_32%),radial-gradient(circle_at_80%_0%,rgba(10,167,217,0.2),transparent_28%)]" />
      <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(#fff_1px,transparent_1px),linear-gradient(90deg,#fff_1px,transparent_1px)] [background-size:48px_48px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:items-start">
          <div className="lg:sticky lg:top-28">
            <span className="text-sm font-black uppercase tracking-[0.26em] text-brand-cyan">Proceso</span>
            <h2 className="mt-3 text-4xl font-black tracking-[-0.04em] sm:text-5xl">{t('process.title')}</h2>
            <p className="mt-5 max-w-md text-lg leading-8 text-brand-100/80">
              {t('process.subtitle')}
            </p>
          </div>

          <div className="relative grid gap-5 md:grid-cols-2">
            <div className="absolute left-1/2 top-10 hidden h-[calc(100%-5rem)] w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-brand-cyan/40 to-transparent lg:block" />
            {steps.map((step, index) => (
              <motion.article
                key={step.id}
                initial={{ opacity: 0, y: 34 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className={`group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.08] p-7 shadow-2xl backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:bg-white/[0.12] ${step.offset}`}
              >
                <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-brand-magenta/20 blur-2xl transition-opacity group-hover:opacity-100" />
                <div className="relative z-10">
                  <div className="mb-8 flex items-center justify-between">
                    <span className="text-6xl font-black tracking-[-0.08em] text-white/10">{step.label}</span>
                    <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-brand-accent shadow-lg shadow-brand-accent/25">
                      <FontAwesomeIcon icon={step.icon} />
                    </span>
                  </div>
                  <h3 className="text-2xl font-black tracking-[-0.02em]">{t(`process.${step.id}.title`)}</h3>
                  <p className="mt-3 text-base leading-7 text-brand-100/75">{t(`process.${step.id}.desc`)}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
