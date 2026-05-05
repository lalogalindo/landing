import React from "react";
import { motion } from "framer-motion";
import { useT } from "../i18n";
import { SectionHeader } from "./Services";
import { Target, Sparkle } from "@phosphor-icons/react";

export default function Process() {
  const { t } = useT();
  const steps = t("process.steps");

  return (
    <section
      id="process"
      className="relative py-24 sm:py-32 overflow-hidden"
      data-testid="process-section"
    >
      <div
        className="orb"
        style={{
          width: 460,
          height: 460,
          top: 80,
          right: -180,
          background: "var(--swirl-magenta)",
        }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeader
          label={t("process.label")}
          title={t("process.title")}
          lede={t("process.lede")}
        />

        <div
          className="mt-10 inline-flex items-center gap-2 rounded-full px-3 py-1.5"
          style={{
            background: "var(--brand-accent-soft)",
            border: "1px solid color-mix(in srgb, var(--brand-accent) 22%, transparent)",
            color: "var(--brand-accent)",
          }}
        >
          <Target size={14} weight="fill" />
          <span className="mono">{t("process.requirements_pill")}</span>
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
              className={`relative rounded-3xl p-7 ${s.highlight ? "lg:col-span-12" : "lg:col-span-4"}`}
              style={
                s.highlight
                  ? {
                      background:
                        "radial-gradient(1100px 220px at 0% 0%, color-mix(in srgb, var(--swirl-teal) 12%, transparent), transparent 60%), radial-gradient(800px 220px at 100% 100%, color-mix(in srgb, var(--swirl-magenta) 12%, transparent), transparent 60%), var(--bg-elevated)",
                      border: "1px solid color-mix(in srgb, var(--brand-accent) 35%, transparent)",
                      boxShadow: "var(--shadow-card-hover)",
                    }
                  : {
                      background: "var(--bg-elevated)",
                      border: "1px solid var(--border-subtle)",
                      boxShadow: "var(--shadow-card)",
                    }
              }
              data-testid={`process-step-${i}`}
            >
              <div className="flex items-start gap-6 flex-wrap lg:flex-nowrap">
                <div className="step-num min-w-[88px]">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="flex-1">
                  <div className="mono" style={{ color: "var(--brand-primary)" }}>
                    {s.tag}
                  </div>
                  <h3 className="heading mt-2 text-2xl sm:text-3xl font-semibold tracking-tight flex items-center gap-3 flex-wrap">
                    {s.name}
                    {s.highlight && (
                      <span
                        className="mono"
                        style={{
                          fontSize: 10,
                          letterSpacing: "0.18em",
                          padding: "4px 10px",
                          borderRadius: 9999,
                          color: "var(--brand-accent)",
                          background: "var(--brand-accent-soft)",
                          border: "1px solid color-mix(in srgb, var(--brand-accent) 28%, transparent)",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 4,
                        }}
                      >
                        <Sparkle size={10} weight="fill" />
                        PRIMARY FOCUS
                      </span>
                    )}
                  </h3>
                  <p
                    className={`mt-3 leading-relaxed ${s.highlight ? "text-base sm:text-lg max-w-3xl" : "text-sm"}`}
                    style={{ color: "var(--text-2)" }}
                  >
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
