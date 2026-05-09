import { useTranslation } from 'react-i18next';
import { trackEvent } from '../analytics/events';

export const CTA = () => {
  const { t } = useTranslation();

  return (
    <section id="cta" className="py-24 bg-brand-900 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-800 rounded-full blur-[100px] opacity-50 -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-accent rounded-full blur-[100px] opacity-20 translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          {t('cta.title')}
        </h2>
        <p className="text-xl text-brand-200 mb-10 max-w-2xl mx-auto">
          {t('cta.subtitle')}
        </p>
        <button 
          onClick={() => {
            trackEvent('click_cta', { location: 'footer_cta' });
            // For now, smooth scroll to top, or open a mailto:
            window.location.href = "mailto:hello@mercsoft.dev";
          }}
          className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold rounded-xl text-brand-900 bg-white hover:bg-brand-50 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
        >
          {t('cta.button')}
        </button>
      </div>
    </section>
  );
};
