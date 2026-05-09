import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faBolt, faShieldHalved, faWandMagicSparkles } from '@fortawesome/free-solid-svg-icons';
import { trackEvent } from '../analytics/events';

export const CTA = () => {
  const { t } = useTranslation();

  const highlights = [
    { icon: faBolt, label: t('cta.highlights.speed') },
    { icon: faShieldHalved, label: t('cta.highlights.quality') },
    { icon: faWandMagicSparkles, label: t('cta.highlights.ai') },
  ];

  return (
    <section id="cta" className="relative overflow-hidden bg-white px-4 py-24 sm:px-6 sm:py-28 lg:px-8">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_0%,#ffe7eb_0,transparent_42%)]" />
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] bg-brand-950 p-8 shadow-[0_35px_120px_rgba(36,31,71,0.28)] sm:p-12 lg:p-16">
        <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-brand-accent/30 blur-3xl" />
        <div className="absolute -bottom-28 left-10 h-72 w-72 rounded-full bg-brand-cyan/20 blur-3xl" />
        <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(#fff_1px,transparent_1px),linear-gradient(90deg,#fff_1px,transparent_1px)] [background-size:42px_42px]" />

        <div className="relative z-10 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-black uppercase tracking-[0.2em] text-brand-100">
              {t('cta.eyebrow')}
            </span>
            <h2 className="mt-6 text-4xl font-black tracking-[-0.045em] text-white sm:text-5xl lg:text-6xl">
              {t('cta.title')}
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-brand-100/80 sm:text-xl">
              {t('cta.subtitle')}
            </p>
            <button
              onClick={() => {
                trackEvent('click_cta', { location: 'footer_cta' });
                window.location.href = 'mailto:hello@mercsoft.dev';
              }}
              className="group mt-9 inline-flex w-full items-center justify-center rounded-2xl bg-white px-8 py-4 text-lg font-black text-brand-900 shadow-2xl shadow-brand-950/30 transition-all duration-300 hover:-translate-y-1 hover:bg-brand-50 sm:w-auto"
            >
              {t('cta.button')}
              <FontAwesomeIcon icon={faArrowRight} className="ml-3 text-sm transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          <div className="grid gap-4">
            {highlights.map((item) => (
              <div key={item.label} className="group rounded-3xl border border-white/10 bg-white/[0.08] p-5 backdrop-blur transition-all duration-300 hover:bg-white/[0.13]">
                <div className="flex items-center gap-4">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-accent text-white shadow-lg shadow-brand-accent/25 transition-transform group-hover:scale-110">
                    <FontAwesomeIcon icon={item.icon} />
                  </span>
                  <p className="text-lg font-black text-white">{item.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
