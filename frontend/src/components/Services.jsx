import React from "react";
import { motion } from "framer-motion";
import { useT } from "../i18n";
import {
  ShoppingBag,
  ChartLineUp,
  PencilSimple,
  Brain,
  Compass,
  Code,
} from "@phosphor-icons/react";

const ITEMS = [
  { key: "ecommerce", icon: ShoppingBag, color: "#FF3366", glow: "glow-red", span: "lg:col-span-3" },
  { key: "dashboards", icon: ChartLineUp, color: "#00E5FF", glow: "glow-cyan", span: "lg:col-span-3" },
  { key: "ai", icon: Brain, color: "#FF00FF", glow: "glow-magenta", span: "lg:col-span-6" },
  { key: "self_managed", icon: PencilSimple, color: "#39FF14", glow: "glow-lime", span: "lg:col-span-4" },
  { key: "consulting", icon: Compass, color: "#FF6600", glow: "glow-orange", span: "lg:col-span-4" },
  { key: "custom", icon: Code, color: "#00E5FF", glow: "glow-cyan", span: "lg:col-span-4" },
];

export default function Services() {
  const { t } = useT();

  return (
    <section id="services" className="relative py-24 sm:py-32" data-testid="services-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeader
          label={t("services.label")}
          title={t("services.title")}
          lede={t("services.lede")}
        />

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4">
          {ITEMS.map((item, idx) => {
            const Icon = item.icon;
            const data = t(`services.items.${item.key}`);
            return (
              <motion.div
                key={item.key}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className={`bento-card spotlight ${item.span}`}
                style={{ color: item.color }}
                data-testid={`service-card-${item.key}`}
                onMouseMove={(e) => {
                  const r = e.currentTarget.getBoundingClientRect();
                  e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
                  e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
                }}
              >
                <div className="relative z-[1]">
                  <div
                    className={`inline-flex items-center justify-center w-11 h-11 rounded-xl mb-5 ${item.glow}`}
                    style={{ background: "rgba(255,255,255,0.04)", color: item.color }}
                  >
                    <Icon size={22} weight="duotone" />
                  </div>
                  <h3 className="heading text-white text-2xl font-semibold tracking-tight">
                    {data.name}
                  </h3>
                  <p className="text-soft mt-3 leading-relaxed text-sm">
                    {data.desc}
                  </p>
                </div>
                <div className="accent-bar" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function SectionHeader({ label, title, lede, align = "left" }) {
  return (
    <div className={`max-w-3xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      <div className="section-label">{label}</div>
      <h2 className="heading mt-3 text-white text-4xl sm:text-5xl font-bold tracking-tight">
        {title}
      </h2>
      {lede && <p className="text-soft mt-5 text-base sm:text-lg leading-relaxed">{lede}</p>}
    </div>
  );
}
