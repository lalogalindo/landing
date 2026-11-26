import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Logo from "./Logo";
import { useT } from "../i18n";
import { ArrowRight, List, X } from "@phosphor-icons/react";

export default function Nav() {
  const { t } = useT();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { id: "about", label: t("nav.about"), to: "/about" },
    { id: "services", label: t("nav.services"), hash: "services" },
    { id: "process", label: t("nav.process"), hash: "process" },
    { id: "privacy", label: t("nav.privacy"), hash: "privacy" },
    { id: "contact", label: t("nav.contact"), hash: "contact" },
  ];

  const handleNavClick = (l) => {
    setOpen(false);
    if (l.to) {
      if (location.pathname === l.to) {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        navigate(l.to);
      }
      return;
    }
    if (l.hash) {
      if (location.pathname === "/") {
        const el = document.getElementById(l.hash);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        navigate(`/#${l.hash}`);
      }
    }
  };

  const handleHomeClick = () => {
    setOpen(false);
    if (location.pathname === "/") {
      const el = document.getElementById("hero");
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } else {
      navigate("/");
    }
  };

  const handleCtaClick = () => {
    setOpen(false);
    if (location.pathname === "/") {
      const el = document.getElementById("contact");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      navigate("/#contact");
    }
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
            onClick={handleHomeClick}
            className="flex items-center cursor-pointer"
            data-testid="nav-home-link"
            aria-label="MercSoft Home"
          >
            <Logo size={28} />
          </button>
          <nav className="hidden md:flex items-center gap-1">
            {links.map((l) => {
              const isActive = l.to && location.pathname === l.to;
              return (
                <button
                  key={l.id}
                  onClick={() => handleNavClick(l)}
                  className="px-4 py-2 text-sm rounded-full transition-colors cursor-pointer"
                  style={{
                    color: isActive ? "var(--brand-primary)" : "var(--text-2)",
                    fontWeight: isActive ? 600 : 400,
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--brand-primary)")}
                  onMouseLeave={(e) => {
                    if (!isActive) e.currentTarget.style.color = "var(--text-2)";
                  }}
                  data-testid={`nav-link-${l.id}`}
                >
                  {l.label}
                </button>
              );
            })}
          </nav>
          <div className="hidden md:block">
            <button
              onClick={handleCtaClick}
              className="btn-pill btn-primary cursor-pointer"
              data-testid="nav-cta-button"
            >
              {t("nav.cta")} <ArrowRight size={16} weight="bold" />
            </button>
          </div>
          <button
            className="md:hidden p-2 rounded-full cursor-pointer"
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
            {links.map((l) => {
              const isActive = l.to && location.pathname === l.to;
              return (
                <button
                  key={l.id}
                  onClick={() => handleNavClick(l)}
                  className="block w-full text-left px-4 py-3 rounded-xl transition-colors cursor-pointer"
                  style={{
                    color: isActive ? "var(--brand-primary)" : "var(--text-1)",
                    fontWeight: isActive ? 600 : 400,
                  }}
                  data-testid={`nav-mobile-link-${l.id}`}
                >
                  {l.label}
                </button>
              );
            })}
            <button
              onClick={handleCtaClick}
              className="btn-pill btn-primary w-full justify-center mt-2 cursor-pointer"
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
