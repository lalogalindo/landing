import React, { useEffect, useState } from "react";
import Logo from "./Logo";
import { useT } from "../i18n";
import { ArrowRight, List, X } from "@phosphor-icons/react";

export default function Nav() {
  const { t } = useT();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { id: "services", label: t("nav.services") },
    { id: "process", label: t("nav.process") },
    { id: "privacy", label: t("nav.privacy") },
    { id: "contact", label: t("nav.contact") },
  ];

  const scrollTo = (id) => {
    setOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "py-2" : "py-4"
      }`}
      data-testid="site-nav"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div
          className={`flex items-center justify-between rounded-full px-4 sm:px-5 py-2.5 transition-all ${
            scrolled ? "glass-strong" : "glass"
          }`}
          style={scrolled ? { boxShadow: "var(--shadow-nav)" } : undefined}
        >
          <button
            onClick={() => scrollTo("hero")}
            className="flex items-center"
            data-testid="nav-home-link"
          >
            <Logo size={28} />
          </button>
          <nav className="hidden md:flex items-center gap-1">
            {links.map((l) => (
              <button
                key={l.id}
                onClick={() => scrollTo(l.id)}
                className="px-4 py-2 text-sm rounded-full transition-colors"
                style={{ color: "var(--text-2)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--brand-primary)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-2)")}
                data-testid={`nav-link-${l.id}`}
              >
                {l.label}
              </button>
            ))}
          </nav>
          <div className="hidden md:block">
            <button
              onClick={() => scrollTo("contact")}
              className="btn-pill btn-primary"
              data-testid="nav-cta-button"
            >
              {t("nav.cta")} <ArrowRight size={16} weight="bold" />
            </button>
          </div>
          <button
            className="md:hidden p-2 rounded-full"
            style={{ color: "var(--text-1)" }}
            onClick={() => setOpen(!open)}
            aria-label="Menu"
            data-testid="nav-mobile-toggle"
          >
            {open ? <X size={20} weight="bold" /> : <List size={20} weight="bold" />}
          </button>
        </div>

        {open && (
          <div
            className="md:hidden mt-2 glass-strong rounded-2xl p-3 space-y-1"
            data-testid="nav-mobile-menu"
          >
            {links.map((l) => (
              <button
                key={l.id}
                onClick={() => scrollTo(l.id)}
                className="block w-full text-left px-4 py-3 rounded-xl"
                style={{ color: "var(--text-1)" }}
                data-testid={`nav-mobile-link-${l.id}`}
              >
                {l.label}
              </button>
            ))}
            <button
              onClick={() => scrollTo("contact")}
              className="btn-pill btn-primary w-full justify-center mt-2"
              data-testid="nav-mobile-cta"
            >
              {t("nav.cta")} <ArrowRight size={16} weight="bold" />
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
