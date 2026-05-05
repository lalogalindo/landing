import React from "react";
import { motion } from "framer-motion";
import { useT } from "../i18n";
import { ArrowRight, Sparkle, CursorClick } from "@phosphor-icons/react";

export default function Hero() {
  const { t } = useT();
  const ticker = t("hero.ticker") || [];

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="relative pt-32 sm:pt-36 pb-24 overflow-hidden" data-testid="hero-section">
      {/* Decorative orbs */}
      <div className="orb" style={{ width: 520, height: 520, top: -120, left: -80, background: "#00E5FF" }} />
      <div className="orb" style={{ width: 480, height: 480, top: 60, right: -120, background: "#FF00FF" }} />
      <div className="orb" style={{ width: 360, height: 360, bottom: -180, left: "30%", background: "#39FF14" }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 glass rounded-full px-3 py-1.5 mb-7"
              data-testid="hero-eyebrow"
            >
              <Sparkle size={14} weight="fill" className="text-cyan" />
              <span className="mono text-white/80">{t("hero.eyebrow")}</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.05 }}
              className="hero-h1"
              data-testid="hero-title"
            >
              <span className="text-white">{t("hero.title_a")}</span>{" "}
              <span className="brand-gradient-text">{t("hero.title_b")}</span>{" "}
              <span className="text-white/85">{t("hero.title_c")}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-7 max-w-xl text-base sm:text-lg text-soft leading-relaxed"
              data-testid="hero-lede"
            >
              {t("hero.lede")}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.32 }}
              className="mt-9 flex flex-wrap gap-3"
            >
              <button
                onClick={() => scrollTo("contact")}
                className="btn-pill btn-primary"
                data-testid="hero-cta-primary"
              >
                {t("hero.cta_primary")} <ArrowRight size={16} weight="bold" />
              </button>
              <button
                onClick={() => scrollTo("process")}
                className="btn-pill btn-ghost"
                data-testid="hero-cta-secondary"
              >
                <CursorClick size={16} weight="bold" /> {t("hero.cta_secondary")}
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="mt-12 grid grid-cols-3 gap-4 max-w-md"
              data-testid="hero-stats"
            >
              {[1, 2, 3].map((i) => (
                <div key={i} className="glass rounded-2xl p-4">
                  <div className="heading text-2xl font-bold tracking-tight">
                    {t(`hero.stat_${i}_value`)}
                  </div>
                  <div className="mono text-soft mt-1">{t(`hero.stat_${i}_label`)}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            <HeroVisual />
          </motion.div>
        </div>

        {/* Tech ticker */}
        <div className="mt-20 relative overflow-hidden" data-testid="hero-ticker">
          <div className="absolute inset-y-0 left-0 w-24 z-10 bg-gradient-to-r from-[#050510] to-transparent pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-24 z-10 bg-gradient-to-l from-[#050510] to-transparent pointer-events-none" />
          <div className="marquee">
            {[...ticker, ...ticker].map((tag, i) => (
              <span
                key={i}
                className="mono text-soft hover:text-white transition-colors whitespace-nowrap"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroVisual() {
  // Animated ‘control surface’ tile
  return (
    <div className="relative aspect-square max-w-[460px] ml-auto">
      {/* Outer glow ring */}
      <div
        className="absolute inset-0 rounded-[36px]"
        style={{
          background:
            "conic-gradient(from 90deg, #00E5FF, #FF00FF, #39FF14, #FF6600, #FF3366, #00E5FF)",
          filter: "blur(28px)",
          opacity: 0.45,
        }}
      />
      <div className="relative h-full w-full rounded-[32px] glass-strong p-6 overflow-hidden">
        <div className="absolute inset-0 divider-grid opacity-40" />
        {/* Header */}
        <div className="relative flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF3366]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF6600]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#39FF14]" />
          </div>
          <span className="mono text-soft">mercsoft.studio</span>
        </div>

        {/* Body lines */}
        <div className="relative mt-6 space-y-3">
          <Row color="#00E5FF" label="ai.assist" value="ON" w="w-3/5" />
          <Row color="#FF00FF" label="dashboard.realtime" value="LIVE" w="w-4/5" />
          <Row color="#39FF14" label="ecommerce.checkout" value="OK" w="w-2/3" />
          <Row color="#FF6600" label="cms.preview" value="DRAFT" w="w-1/2" />
          <Row color="#FF3366" label="agents.deployed" value="3" w="w-3/5" />
        </div>

        {/* Mini chart */}
        <div className="relative mt-6 h-24 rounded-2xl bg-white/5 border border-white/10 p-3">
          <svg viewBox="0 0 200 80" className="w-full h-full">
            <defs>
              <linearGradient id="g1" x1="0" x2="1" y1="0" y2="0">
                <stop offset="0" stopColor="#00E5FF" />
                <stop offset="1" stopColor="#FF00FF" />
              </linearGradient>
            </defs>
            <polyline
              fill="none"
              stroke="url(#g1)"
              strokeWidth="2.5"
              points="0,60 20,52 40,48 60,40 80,44 100,30 120,34 140,22 160,28 180,16 200,20"
            />
            <polyline
              fill="none"
              stroke="rgba(255,255,255,0.2)"
              strokeDasharray="3 4"
              strokeWidth="1"
              points="0,70 200,60"
            />
          </svg>
        </div>

        {/* Footer chips */}
        <div className="relative mt-5 flex flex-wrap gap-2">
          {["LLM", "RAG", "EDGE", "GRAPHQL", "STRIPE"].map((c) => (
            <span
              key={c}
              className="mono text-white/80 px-2.5 py-1 rounded-full bg-white/5 border border-white/10"
            >
              {c}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function Row({ color, label, value, w }) {
  return (
    <div className="flex items-center gap-3">
      <span className="w-1.5 h-1.5 rounded-full" style={{ background: color, boxShadow: `0 0 12px ${color}` }} />
      <span className="mono text-soft min-w-[160px]">{label}</span>
      <div className="flex-1 h-1 rounded-full bg-white/5 overflow-hidden">
        <div className={`h-full ${w}`} style={{ background: color, opacity: 0.85 }} />
      </div>
      <span className="mono text-white/85 min-w-[36px] text-right">{value}</span>
    </div>
  );
}
