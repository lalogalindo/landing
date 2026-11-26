import React from "react";
import { Link } from "react-router-dom";
import Nav from "../components/Nav.jsx";
import Footer from "../components/Footer.jsx";
import { useT } from "../i18n";
import { ArrowLeft, WarningCircle } from "@phosphor-icons/react";

export default function NotFound() {
  const { t } = useT();

  return (
    <div className="relative min-h-screen text-white grain flex flex-col justify-between" data-testid="not-found-page">
      <Nav />
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 pt-32 pb-20">
        <div className="max-w-md w-full text-center">
          <div
            className="bento-card p-10 sm:p-12 rounded-3xl"
            style={{
              background: "var(--bg-elevated)",
              border: "1px solid var(--border-subtle)",
              boxShadow: "var(--shadow-card-hover)",
            }}
          >
            <div
              className="w-16 h-16 rounded-2xl mx-auto flex items-center justify-center mb-6"
              style={{ background: "rgba(239, 68, 68, 0.1)", color: "#ef4444" }}
            >
              <WarningCircle size={32} weight="bold" />
            </div>

            <span className="mono text-4xl sm:text-5xl font-extrabold tracking-tight" style={{ color: "var(--brand-accent)" }}>
              {t("not_found.title")}
            </span>
            <h1 className="heading text-xl sm:text-2xl font-bold mt-2" style={{ color: "var(--text-1)" }}>
              {t("not_found.subtitle")}
            </h1>
            <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--text-2)" }}>
              {t("not_found.desc")}
            </p>

            <div className="mt-8 flex justify-center">
              <Link to="/" className="btn-pill btn-primary text-sm inline-flex items-center gap-2">
                <ArrowLeft size={16} weight="bold" />
                {t("not_found.back_home")}
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
