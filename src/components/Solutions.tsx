import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLaptopCode, faCogs, faAddressBook, faCloud, faCommentDots, faRobot, faArrowTrendUp } from '@fortawesome/free-solid-svg-icons';

export const Solutions = () => {
  const { t } = useTranslation();

  const services = [
    { id: 'saas', icon: faCloud, accent: 'from-violet-500 to-blue-600', className: 'lg:col-span-2' },
    { id: 'automation', icon: faCogs, accent: 'from-orange-400 to-blue-600', className: '' },
    { id: 'whatsapp', icon: faCommentDots, accent: 'from-emerald-400 to-blue-600', className: '' },
    { id: 'ai', icon: faRobot, accent: 'from-indigo-500 to-cyan-500', className: 'lg:row-span-2' },
    { id: 'landing', icon: faLaptopCode, accent: 'from-sky-400 to-blue-600', className: '' },
    { id: 'crm', icon: faAddressBook, accent: 'from-blue-500 to-slate-700', className: 'lg:col-span-2' },
  ];

  return (
    <section id="solutions" className="relative overflow-hidden bg-white py-24 sm:py-28">
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_42%,#eef5ff_100%)]" />
      <div className="absolute left-0 top-28 h-72 w-72 rounded-full bg-blue-200/35 blur-3xl" />
      <div className="absolute right-0 bottom-12 h-96 w-96 rounded-full bg-indigo-200/35 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-14 grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <span className="text-sm font-black uppercase tracking-[0.26em] text-brand-accent">{t('solutions.eyebrow')}</span>
            <h2 className="mt-3 text-4xl font-black tracking-[-0.04em] text-brand-900 sm:text-5xl">{t('solutions.title')}</h2>
          </div>
          <p className="max-w-2xl text-lg leading-8 text-brand-600 lg:justify-self-end">
            {t('solutions.subtitle')}
          </p>
        </div>

        <motion.div
          className="grid auto-rows-fr grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-120px' }}
          variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
        >
          {services.map((service, index) => (
            <motion.article
              key={service.id}
              variants={{ hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className={`group relative min-h-[260px] overflow-hidden rounded-[2rem] border border-white bg-white p-7 shadow-[0_18px_70px_rgba(16,42,67,0.08)] ring-1 ring-brand-100/70 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_28px_90px_rgba(37,99,235,0.18)] ${service.className}`}
            >
              <div className={`absolute -right-20 -top-24 h-56 w-56 rounded-full bg-gradient-to-br ${service.accent} opacity-15 blur-2xl transition-opacity duration-500 group-hover:opacity-30`} />
              <div className="absolute bottom-0 left-0 h-28 w-full bg-gradient-to-t from-brand-50/90 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              <div className="relative z-10 flex h-full flex-col">
                <div className="flex items-start justify-between gap-5">
                  <div className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${service.accent} text-white shadow-lg shadow-blue-500/20 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3`}>
                    <FontAwesomeIcon icon={service.icon} className="text-xl" />
                  </div>
                  <span className="rounded-full border border-brand-100 bg-brand-50 px-3 py-1 text-xs font-black uppercase tracking-[0.16em] text-brand-500">
                    0{index + 1}
                  </span>
                </div>

                <div className="mt-8 flex-1">
                  <h3 className="text-2xl font-black tracking-[-0.02em] text-brand-900">{t(`solutions.items.${service.id}.title`)}</h3>
                  <p className="mt-4 max-w-md text-base leading-7 text-brand-600">
                    {t(`solutions.items.${service.id}.desc`)}
                  </p>
                </div>

                <div className="mt-8 flex items-center gap-3 text-sm font-black text-brand-accent opacity-80 transition-all duration-500 group-hover:gap-4 group-hover:opacity-100">
                  <FontAwesomeIcon icon={faArrowTrendUp} />
                  <span>{t('solutions.cardCta')}</span>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
