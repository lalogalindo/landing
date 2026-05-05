import React from "react";
import Logo from "./Logo";
import { useT } from "../i18n";

const PHONE = process.env.REACT_APP_CONTACT_PHONE || "2221401900";
const EMAIL = process.env.REACT_APP_CONTACT_EMAIL || "lalogalindo@gmail.com";

const formatPhone = (p) => {
  const d = (p || "").replace(/\D/g, "");
  if (d.length === 10) return `${d.slice(0, 3)} ${d.slice(3, 6)} ${d.slice(6)}`;
  return p;
};

export default function Footer() {
  const { t } = useT();
  return (
    <footer
      className="relative mt-10"
      style={{
        background: "var(--bg-section)",
        borderTop: "1px solid var(--border-subtle)",
      }}
      data-testid="site-footer"
    >
      <div className="absolute inset-0 divider-grid opacity-30 pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10">
          <div className="max-w-xl">
            <Logo size={32} />
            <p
              className="mt-5 leading-relaxed"
              style={{ color: "var(--text-2)" }}
            >
              {t("footer.tagline")}
            </p>
          </div>
          <div className="flex flex-wrap gap-x-10 gap-y-4">
            <FooterCol label="Email">
              <a
                href={`mailto:${EMAIL}`}
                className="transition-colors"
                style={{ color: "var(--text-1)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--brand-accent)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-1)")}
                data-testid="footer-email-link"
              >
                {EMAIL}
              </a>
            </FooterCol>
            <FooterCol label="Phone">
              <a
                href={`tel:+52${PHONE}`}
                className="transition-colors"
                style={{ color: "var(--text-1)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--brand-accent)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-1)")}
                data-testid="footer-phone-link"
              >
                {formatPhone(PHONE)}
              </a>
            </FooterCol>
            {/* Social links — placeholder. Uncomment and update URLs when ready.
            <FooterCol label="Social">
              <a href="#" style={{ color: 'var(--text-1)' }}>LinkedIn</a>
              <a href="#" className="ml-3" style={{ color: 'var(--text-1)' }}>GitHub</a>
              <a href="#" className="ml-3" style={{ color: 'var(--text-1)' }}>X</a>
            </FooterCol>
            */}
          </div>
        </div>

        <div
          className="mt-12 pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
          style={{ borderTop: "1px solid var(--border-divider)" }}
        >
          <p className="mono" style={{ color: "var(--text-3)" }} data-testid="footer-copyright">
            {t("footer.copyright")}
          </p>
          <p className="mono" style={{ color: "var(--text-3)" }}>
            {t("footer.built_with")}
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ label, children }) {
  return (
    <div>
      <div className="mono mb-2" style={{ color: "var(--text-3)" }}>
        {label}
      </div>
      <div className="text-base">{children}</div>
    </div>
  );
}
