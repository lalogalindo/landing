import { useTranslation } from 'react-i18next';
import { TypeAnimation } from 'react-type-animation';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faChartLine, faCheck, faRobot, faDiagramProject } from '@fortawesome/free-solid-svg-icons';
import { trackEvent } from '../analytics/events';

export const Hero = () => {
  const { t, i18n } = useTranslation();
  const typewriterKey = i18n.language;

  const sequence = [
    String(t('hero.typewriter.0')), 1800,
    String(t('hero.typewriter.1')), 1800,
    String(t('hero.typewriter.2')), 1800,
    String(t('hero.typewriter.3')), 1800,
  ];

  const metrics = [
    { label: 'Leads', value: '+38%', tone: 'text-emerald-500' },
    { label: 'Horas ahorradas', value: '120', tone: 'text-brand-cyan' },
    { label: 'Procesos activos', value: '14', tone: 'text-brand-600' },
  ];

  return (
    <section className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,#ffe7eb_0,#f7fbff_34%,#ffffff_68%)] pt-28 lg:pt-32">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -left-32 top-20 h-80 w-80 rounded-full bg-brand-cyan/20 blur-3xl" />
        <div className="absolute right-0 top-10 h-[34rem] w-[34rem] rounded-full bg-brand-magenta/15 blur-[110px]" />
        <div className="absolute bottom-10 left-1/2 h-64 w-64 rounded-full bg-brand-green/20 blur-3xl" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-accent/35 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-14 px-4 pb-20 sm:px-6 lg:grid-cols-[0.92fr_1.08fr] lg:px-8 lg:pb-28">
        <motion.div
          initial={{ opacity: 0, x: -28 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-cyan/25 bg-white/80 px-4 py-2 text-sm font-semibold text-brand-700 shadow-sm backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_18px_rgba(52,211,153,0.9)]" />
            {t('hero.badge')}
          </span>

          <h1 className="mt-7 text-5xl font-black tracking-[-0.055em] text-brand-900 sm:text-6xl lg:text-7xl">
            {t('hero.title1')}{' '}
            <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-brand-accent via-brand-magenta to-brand-600">
              {t('hero.title2')}
              <span className="absolute -bottom-2 left-0 h-3 w-full rounded-full bg-brand-cyan/20 -z-10" />
            </span>
          </h1>

          <div className="mt-6 min-h-10 text-xl font-bold text-brand-600 sm:text-2xl">
            <TypeAnimation
              key={typewriterKey}
              sequence={sequence}
              wrapper="span"
              speed={48}
              repeat={Infinity}
            />
          </div>

          <p className="mt-5 max-w-xl text-lg leading-8 text-brand-700 sm:text-xl">
            {t('hero.subtitle')}
          </p>

          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <a
              href="#cta"
              className="btn-primary group w-full px-8 py-4 text-lg sm:w-auto"
              onClick={() => trackEvent('click_cta', { location: 'hero_primary' })}
            >
              {t('hero.cta')}
              <FontAwesomeIcon icon={faArrowRight} className="ml-3 text-sm transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#solutions"
              className="btn-secondary w-full px-8 py-4 text-lg sm:w-auto"
              onClick={() => trackEvent('click_cta', { location: 'hero_secondary' })}
            >
              {t('hero.secondary')}
            </a>
          </div>

          <div className="mt-10 grid max-w-xl grid-cols-3 gap-3">
            {metrics.map((metric) => (
              <div key={metric.label} className="rounded-2xl border border-white/80 bg-white/70 p-4 shadow-sm backdrop-blur">
                <p className={`text-2xl font-black ${metric.tone}`}>{metric.value}</p>
                <p className="mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-brand-500">{metric.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 34, rotate: 1 }}
          animate={{ opacity: 1, x: 0, rotate: 0 }}
          transition={{ duration: 0.85, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto w-full max-w-2xl lg:max-w-none"
        >
          <div className="absolute -inset-8 rounded-[3rem] bg-gradient-to-br from-brand-cyan/25 via-white/0 to-brand-magenta/20 blur-2xl" />
          <div className="relative rounded-[2rem] border border-white/80 bg-white/85 p-3 shadow-[0_30px_100px_rgba(201,51,67,0.18)] backdrop-blur-xl">
            <div className="overflow-hidden rounded-[1.55rem] border border-brand-100 bg-brand-950">
              <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.04] px-5 py-4">
                <div className="flex gap-2">
                  <span className="h-3 w-3 rounded-full bg-red-400" />
                  <span className="h-3 w-3 rounded-full bg-amber-300" />
                  <span className="h-3 w-3 rounded-full bg-emerald-400" />
                </div>
                <span className="rounded-full bg-brand-accent/15 px-3 py-1 text-xs font-bold text-brand-100">MercSoft OS</span>
              </div>

              <div className="grid gap-4 p-4 sm:grid-cols-[1.1fr_0.9fr] sm:p-6">
                <div className="rounded-3xl bg-white p-5 shadow-2xl">
                  <div className="mb-5 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.24em] text-brand-400">Dashboard</p>
                      <h3 className="mt-1 text-xl font-black text-brand-900">Operación inteligente</h3>
                    </div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-accent text-white shadow-lg shadow-brand-accent/25">
                      <FontAwesomeIcon icon={faChartLine} />
                    </div>
                  </div>
                  <div className="space-y-3">
                    {['Ventas sincronizadas', 'IA clasifica leads', 'CRM actualizado'].map((item, index) => (
                      <motion.div
                        key={item}
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.55 + index * 0.12 }}
                        className="flex items-center gap-3 rounded-2xl border border-brand-100 bg-brand-50/80 p-3"
                      >
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-brand-cyan shadow-sm">
                          <FontAwesomeIcon icon={faCheck} className="text-xs" />
                        </span>
                        <span className="text-sm font-bold text-brand-800">{item}</span>
                      </motion.div>
                    ))}
                  </div>
                  <div className="mt-5 h-24 rounded-2xl bg-gradient-to-br from-brand-accent to-brand-600 p-4 text-white">
                    <p className="text-xs font-semibold text-brand-100">Automatización activa</p>
                    <div className="mt-4 flex items-end gap-2">
                      {[34, 58, 42, 76, 63, 88, 70].map((height) => (
                        <span key={height} className="w-full rounded-t-lg bg-white/75" style={{ height }} />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                    className="rounded-3xl border border-white/10 bg-white/10 p-5 text-white shadow-2xl backdrop-blur"
                  >
                    <div className="mb-4 flex items-center gap-3">
                      <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-green text-brand-950">
                        <FontAwesomeIcon icon={faRobot} />
                      </span>
                      <div>
                        <p className="text-sm font-black">Bot WhatsApp + IA</p>
                        <p className="text-xs text-brand-100/70">Responde, califica y agenda</p>
                      </div>
                    </div>
                    <div className="space-y-3 text-sm">
                      <p className="w-4/5 rounded-2xl rounded-bl-sm bg-white/15 p-3 text-brand-100">¿Tienen integración con mi CRM?</p>
                      <p className="ml-auto w-5/6 rounded-2xl rounded-br-sm bg-brand-green p-3 font-semibold text-brand-950">Sí. Detecté tu stack y preparo el flujo.</p>
                    </div>
                  </motion.div>

                  <div className="rounded-3xl bg-white p-5 shadow-2xl">
                    <div className="flex items-center gap-3">
                      <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
                        <FontAwesomeIcon icon={faDiagramProject} />
                      </span>
                      <div>
                        <p className="text-sm font-black text-brand-900">Workflow</p>
                        <p className="text-xs font-semibold text-brand-500">API → IA → SaaS</p>
                      </div>
                    </div>
                    <div className="mt-5 grid grid-cols-3 items-center gap-2">
                      {['Lead', 'IA', 'Venta'].map((node) => (
                        <div key={node} className="rounded-2xl bg-brand-50 py-3 text-center text-xs font-black text-brand-700 ring-1 ring-brand-100">
                          {node}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
