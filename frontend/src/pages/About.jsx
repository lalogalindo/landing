import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Nav from "../components/Nav.jsx";
import Footer from "../components/Footer.jsx";
import Chatbot from "../components/Chatbot.jsx";
import { SectionHeader } from "../components/Services.jsx";
import { useT } from "../i18n";
import { TEAM_MEMBERS } from "../config/team.js";
import {
  ArrowRight,
  Sparkle,
  Cpu,
  Target,
  UsersThree,
  ShoppingBag,
  ChartLineUp,
  Brain,
  Code,
  IdentificationCard,
} from "@phosphor-icons/react";

export default function About() {
  const { t, lang } = useT();

  const principles = [
    {
      icon: Target,
      color: "var(--brand-accent)",
      title: t("about.principles.0.title"),
      desc: t("about.principles.0.desc"),
    },
    {
      icon: Cpu,
      color: "var(--swirl-teal)",
      title: t("about.principles.1.title"),
      desc: t("about.principles.1.desc"),
    },
    {
      icon: UsersThree,
      color: "var(--brand-primary)",
      title: t("about.principles.2.title"),
      desc: t("about.principles.2.desc"),
    },
  ];

  const serviceHighlights = [
    { icon: ShoppingBag, label: t("services.items.ecommerce.name"), desc: t("services.items.ecommerce.desc") },
    { icon: ChartLineUp, label: t("services.items.dashboards.name"), desc: t("services.items.dashboards.desc") },
    { icon: Brain, label: t("services.items.ai.name"), desc: t("services.items.ai.desc") },
    { icon: Code, label: t("services.items.consulting.name"), desc: t("services.items.consulting.desc") },
  ];

  return (
    <div className="relative min-h-screen text-white grain" data-testid="about-page">
      <Nav />
      <main>
        {/* 1. Hero Section */}
        <section className="relative pt-36 sm:pt-44 pb-20 px-4 sm:px-6 overflow-hidden">
          <div className="max-w-5xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold mono mb-6"
              style={{
                background: "rgba(255, 255, 255, 0.05)",
                border: "1px solid var(--border-subtle)",
                color: "var(--brand-primary)",
              }}
            >
              <Sparkle size={14} weight="fill" />
              {t("about.hero_eyebrow")}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="heading text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight"
            >
              <span>{t("about.hero_title_a")}</span>{" "}
              <span className="gradient-text">{t("about.hero_title_b")}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.2 }}
              className="mt-6 text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed"
              style={{ color: "var(--text-2)" }}
            >
              {t("about.hero_lede")}
            </motion.p>
          </div>
        </section>

        {/* 2. Company Introduction */}
        <section
          className="relative py-20 px-4 sm:px-6"
          style={{ background: "var(--bg-section)", borderTop: "1px solid var(--border-subtle)" }}
        >
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-5">
                <SectionHeader
                  label={t("about.intro_label")}
                  title={t("about.intro_title")}
                />
              </div>
              <div className="lg:col-span-7">
                <div
                  className="bento-card p-8 sm:p-10 rounded-3xl"
                  style={{
                    background: "var(--bg-elevated)",
                    border: "1px solid var(--border-subtle)",
                  }}
                >
                  <p className="text-base sm:text-lg leading-relaxed" style={{ color: "var(--text-1)" }}>
                    {t("about.intro_text")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. What We Do Overview */}
        <section className="relative py-20 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <SectionHeader
              label={t("about.services_label")}
              title={t("about.services_title")}
              lede={t("about.services_lede")}
            />
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {serviceHighlights.map((srv, idx) => {
                const Icon = srv.icon;
                return (
                  <div
                    key={idx}
                    className="bento-card p-6 rounded-2xl flex flex-col justify-between"
                    style={{ background: "var(--bg-elevated)", border: "1px solid var(--border-subtle)" }}
                  >
                    <div>
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                        style={{ background: "rgba(255,255,255,0.06)", color: "var(--brand-accent)" }}
                      >
                        <Icon size={20} weight="bold" />
                      </div>
                      <h3 className="heading text-lg font-semibold" style={{ color: "var(--text-1)" }}>
                        {srv.label}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--text-2)" }}>
                        {srv.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 4. Our Approach (3 Principles) */}
        <section
          className="relative py-20 px-4 sm:px-6"
          style={{ background: "var(--bg-section)", borderTop: "1px solid var(--border-subtle)" }}
        >
          <div className="max-w-7xl mx-auto">
            <SectionHeader
              label={t("about.approach_label")}
              title={t("about.approach_title")}
            />
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
              {principles.map((pr, idx) => {
                const Icon = pr.icon;
                return (
                  <div
                    key={idx}
                    className="bento-card p-8 rounded-3xl"
                    style={{ background: "var(--bg-elevated)", border: "1px solid var(--border-subtle)" }}
                  >
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6"
                      style={{ background: "rgba(255,255,255,0.06)", color: pr.color }}
                    >
                      <Icon size={24} weight="bold" />
                    </div>
                    <div className="mono text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: pr.color }}>
                      0{idx + 1}
                    </div>
                    <h3 className="heading text-xl font-bold mb-3" style={{ color: "var(--text-1)" }}>
                      {pr.title}
                    </h3>
                    <p className="text-sm sm:text-base leading-relaxed" style={{ color: "var(--text-2)" }}>
                      {pr.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 5. Our Team */}
        <section className="relative py-20 px-4 sm:px-6" data-testid="about-team-section">
          <div className="max-w-7xl mx-auto">
            <SectionHeader
              label={t("about.team_label")}
              title={t("about.team_title")}
              lede={t("about.team_lede")}
            />
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {TEAM_MEMBERS.map((member) => (
                <TeamMemberCard key={member.slug} member={member} lang={lang} t={t} />
              ))}
            </div>
          </div>
        </section>

        {/* 6. Contact CTA */}
        <section
          className="relative py-24 px-4 sm:px-6"
          style={{ background: "var(--bg-section)", borderTop: "1px solid var(--border-subtle)" }}
        >
          <div className="max-w-4xl mx-auto text-center">
            <div
              className="bento-card p-10 sm:p-14 rounded-3xl relative overflow-hidden"
              style={{
                background: "var(--bg-elevated)",
                border: "1px solid var(--border-subtle)",
                boxShadow: "var(--shadow-card-hover)",
              }}
            >
              <div className="section-label mx-auto">{t("about.cta_label")}</div>
              <h2 className="heading mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
                {t("about.cta_title")}
              </h2>
              <p className="mt-4 text-base sm:text-lg max-w-2xl mx-auto" style={{ color: "var(--text-2)" }}>
                {t("about.cta_lede")}
              </p>
              <div className="mt-8 flex justify-center">
                <Link to="/#contact" className="btn-pill btn-primary text-base">
                  {t("about.cta_btn")} <ArrowRight size={18} weight="bold" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
}

function TeamMemberCard({ member, lang, t }) {
  const roleText = member.role?.[lang] || member.role?.en || "";
  const bioText = member.bio?.[lang] || member.bio?.en || "";

  return (
    <div
      className="bento-card p-8 rounded-3xl flex flex-col justify-between"
      style={{
        background: "var(--bg-elevated)",
        border: "1px solid var(--border-subtle)",
        boxShadow: "var(--shadow-card)",
      }}
      data-testid={`team-card-${member.slug}`}
    >
      <div>
        <div className="flex items-center gap-4 mb-6">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center font-bold text-xl tracking-wider shadow"
            style={{
              background: "linear-gradient(135deg, var(--brand-primary), var(--brand-accent))",
              color: "#ffffff",
            }}
          >
            {member.avatar ? (
              <img
                src={member.avatar}
                alt={member.displayName}
                className="w-full h-full object-cover rounded-2xl"
              />
            ) : (
              member.initials || member.displayName.charAt(0)
            )}
          </div>
          <div>
            <h3 className="heading text-xl font-bold" style={{ color: "var(--text-1)" }}>
              {member.displayName}
            </h3>
            <p className="text-sm font-medium mt-0.5" style={{ color: "var(--brand-primary)" }}>
              {roleText}
            </p>
          </div>
        </div>
        <p className="text-sm leading-relaxed" style={{ color: "var(--text-2)" }}>
          {bioText}
        </p>
      </div>

      <div className="mt-8 pt-5 border-t" style={{ borderColor: "var(--border-subtle)" }}>
        <Link
          to={`/${member.slug}`}
          className="inline-flex items-center gap-2 text-sm font-semibold transition-colors group cursor-pointer"
          style={{ color: "var(--brand-accent)" }}
          data-testid={`team-card-link-${member.slug}`}
        >
          <IdentificationCard size={18} weight="bold" />
          <span>{t("about.view_card")}</span>
          <ArrowRight
            size={14}
            weight="bold"
            className="transition-transform group-hover:translate-x-1"
          />
        </Link>
      </div>
    </div>
  );
}
