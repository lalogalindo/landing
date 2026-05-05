import React from "react";
import { motion } from "framer-motion";
import { useT } from "../i18n";
import { ArrowRight, Sparkle, CursorClick } from "@phosphor-icons/react";

const SWIRL = [
  "var(--swirl-teal)",
  "var(--swirl-magenta)",
  "var(--swirl-green)",
  "var(--swirl-orange)",
  "var(--swirl-red)",
];

export default function Hero() {
  const { t } = useT();
  const ticker = t("hero.ticker") || [];

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative pt-32 sm:pt-36 pb-24 overflow-hidden"
      data-testid="hero-section"
    >
      {/* Decorative blobs (intensity controlled by --blob-opacity per theme) */}
      <div className="orb" style={{ width: 540, height: 540, top: -140, left: -100, background: "var(--swirl-teal)" }} />
      <div className="orb" style={{ width: 480, height: 480, top: 60, right: -120, background: "var(--swirl-magenta)" }} />
      <div className="orb" style={{ width: 360, height: 360, bottom: -180, left: "30%", background: "var(--swirl-orange)" }} />

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
              <Sparkle size={14} weight="fill" style={{ color: "var(--brand-accent)" }} />
              <span className="mono" style={{ color: "var(--text-2)" }}>{t("hero.eyebrow")}</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.05 }}
              className="hero-h1"
              data-testid="hero-title"
            >
              <span>{t("hero.title_a")}</span>{" "}
              <span className="brand-gradient-text">{t("hero.title_b")}</span>{" "}
              <span style={{ color: "var(--text-2)" }}>{t("hero.title_c")}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-7 max-w-xl text-base sm:text-lg leading-relaxed"
              style={{ color: "var(--text-2)" }}
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
                <div
                  key={i}
                  className="rounded-2xl p-4"
                  style={{
                    background: "var(--bg-elevated)",
                    border: "1px solid var(--border-subtle)",
                    boxShadow: "var(--shadow-card)",
                  }}
                >
                  <div className="heading text-2xl font-bold tracking-tight">
                    {t(`hero.stat_${i}_value`)}
                  </div>
                  <div className="mono mt-1" style={{ color: "var(--text-3)" }}>
                    {t(`hero.stat_${i}_label`)}
                  </div>
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
          <div
            className="absolute inset-y-0 left-0 w-24 z-10 pointer-events-none"
            style={{ background: "linear-gradient(90deg, var(--bg-page), transparent)" }}
          />
          <div
            className="absolute inset-y-0 right-0 w-24 z-10 pointer-events-none"
            style={{ background: "linear-gradient(-90deg, var(--bg-page), transparent)" }}
          />
          <div className="marquee">
            {[...ticker, ...ticker].map((tag, i) => (
              <span
                key={i}
                className="mono whitespace-nowrap transition-colors"
                style={{ color: "var(--text-3)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--brand-primary)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-3)")}
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
  return (
    <div className="relative aspect-square max-w-[460px] ml-auto">
      {/* Outer rainbow glow ring (subtle on light) */}
      <div
        className="absolute inset-0 rounded-[36px]"
        style={{
          background:
            "conic-gradient(from 90deg, var(--swirl-teal), var(--swirl-magenta), var(--swirl-green), var(--swirl-orange), var(--swirl-red), var(--swirl-teal))",
          filter: "blur(28px)",
          opacity: 0.55,
        }}
      />
      <div className="relative h-full w-full rounded-[32px] surface-inverse p-6 overflow-hidden">
        <div className="absolute inset-0 divider-grid opacity-40" />
        {/* Header */}
        <div className="relative flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full" style={{ background: "var(--swirl-red)" }} />
            <span className="w-2.5 h-2.5 rounded-full" style={{ background: "var(--swirl-orange)" }} />
            <span className="w-2.5 h-2.5 rounded-full" style={{ background: "var(--swirl-green)" }} />
          </div>
          <span className="mono mono-soft">mercsoft.studio</span>
        </div>

        {/* Body lines */}
        <div className="relative mt-6 space-y-3">
          <Row color={SWIRL[0]} label="ai.assist" value="ON" w="60%" />
          <Row color={SWIRL[1]} label="dashboard.realtime" value="LIVE" w="80%" />
          <Row color={SWIRL[2]} label="ecommerce.checkout" value="OK" w="66%" />
          <Row color={SWIRL[3]} label="cms.preview" value="DRAFT" w="50%" />
          <Row color={SWIRL[4]} label="agents.deployed" value="3" w="60%" />
        </div>

        {/* Mini chart */}
        <div
          className="relative mt-6 h-24 rounded-2xl p-3"
          style={{
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.10)",
          }}
        >
          <svg viewBox="0 0 200 80" className="w-full h-full">
            <defs>
              <linearGradient id="hgrad" x1="0" x2="1" y1="0" y2="0">
                <stop offset="0" stopColor="var(--swirl-teal)" />
                <stop offset="1" stopColor="var(--swirl-magenta)" />
              </linearGradient>
            </defs>
            <polyline
              fill="none"
              stroke="url(#hgrad)"
              strokeWidth="2.5"
              points="0,60 20,52 40,48 60,40 80,44 100,30 120,34 140,22 160,28 180,16 200,20"
            />
            <polyline
              fill="none"
              stroke="rgba(255,255,255,0.25)"
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
              className="mono px-2.5 py-1 rounded-full"
              style={{
                color: "rgba(255,255,255,0.92)",
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.12)",
              }}
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
      <span
        className="w-1.5 h-1.5 rounded-full"
        style={{ background: color, boxShadow: `0 0 10px ${color}` }}
      />
      <span className="mono mono-soft min-w-[160px]">{label}</span>
      <div
        className="flex-1 h-1 rounded-full overflow-hidden"
        style={{ background: "rgba(255,255,255,0.10)" }}
      >
        <div className="h-full" style={{ width: w, background: color, opacity: 0.9 }} />
      </div>
      <span className="mono min-w-[36px] text-right" style={{ color: "rgba(255,255,255,0.95)" }}>
        {value}
      </span>
    </div>
  );
}
