import React from "react";
import { motion } from "framer-motion";
import { useT } from "../i18n";
import { SectionHeader } from "./Services";
import { Target, Sparkle } from "@phosphor-icons/react";

export default function Process() {
  const { t } = useT();
  const steps = t("process.steps");

  return (
    <section id="process" className="relative py-24 sm:py-32 overflow-hidden" data-testid="process-section">
      <div className="orb" style={{ width: 420, height: 420, top: 100, right: -160, background: "#00E5FF", opacity: 0.18 }} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeader
          label={t("process.label")}
          title={t("process.title")}
          lede={t("process.lede")}
        />

        <div className="mt-10 inline-flex items-center gap-2 glass rounded-full px-3 py-1.5">
          <Target size={14} weight="fill" className="text-magenta" />
          <span className="mono text-white/85">{t("process.requirements_pill")}</span>
        </div>

        {/* Timeline */}
        <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-6 relative">
          {steps.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.55, delay: i * 0.08 }}
              className={`relative rounded-3xl p-7 ${
                s.highlight
                  ? "lg:col-span-12 glass-strong border border-cyan-500/30"
                  : "lg:col-span-4 glass border border-white/10"
              }`}
              style={
                s.highlight
                  ? {
                      background:
                        "radial-gradient(1200px 200px at 0% 0%, rgba(0,229,255,0.10), transparent 60%), radial-gradient(800px 200px at 100% 100%, rgba(255,0,255,0.10), transparent 60%), rgba(10,11,20,0.7)",
                    }
                  : undefined
              }
              data-testid={`process-step-${i}`}
            >
              <div className="flex items-start gap-6 flex-wrap lg:flex-nowrap">
                <div className="step-num text-soft min-w-[88px]">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="flex-1">
                  <div className="mono text-cyan">{s.tag}</div>
                  <h3 className="heading mt-2 text-white text-2xl sm:text-3xl font-semibold tracking-tight flex items-center gap-3 flex-wrap">
                    {s.name}
                    {s.highlight && (
                      <span className="mono text-[10px] tracking-widest px-2 py-1 rounded-full glow-cyan text-cyan bg-white/5">
                        <Sparkle size={10} weight="fill" className="inline mr-1" />
                        PRIMARY FOCUS
                      </span>
                    )}
                  </h3>
                  <p className={`mt-3 leading-relaxed ${s.highlight ? "text-white/90 text-base sm:text-lg max-w-3xl" : "text-soft text-sm"}`}>
                    {s.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
