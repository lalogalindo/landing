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
    <footer className="relative border-t border-white/10 mt-10" data-testid="site-footer">
      <div className="absolute inset-0 divider-grid opacity-30 pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10">
          <div className="max-w-xl">
            <Logo size={32} />
            <p className="mt-5 text-soft leading-relaxed">{t("footer.tagline")}</p>
          </div>
          <div className="flex flex-wrap gap-x-10 gap-y-4">
            <FooterCol label="Email">
              <a href={`mailto:${EMAIL}`} className="text-white hover:text-cyan transition-colors" data-testid="footer-email-link">
                {EMAIL}
              </a>
            </FooterCol>
            <FooterCol label="Phone">
              <a href={`tel:+52${PHONE}`} className="text-white hover:text-cyan transition-colors" data-testid="footer-phone-link">
                {formatPhone(PHONE)}
              </a>
            </FooterCol>
            {/* Social links — placeholder, uncomment and update URLs when ready
            <FooterCol label="Social">
              <a href="#" className="text-white hover:text-cyan transition-colors">LinkedIn</a>
              <a href="#" className="text-white hover:text-cyan transition-colors ml-3">GitHub</a>
              <a href="#" className="text-white hover:text-cyan transition-colors ml-3">X</a>
            </FooterCol>
            */}
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="mono text-soft" data-testid="footer-copyright">
            {t("footer.copyright")}
          </p>
          <p className="mono text-soft">{t("footer.built_with")}</p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ label, children }) {
  return (
    <div>
      <div className="mono text-soft mb-2">{label}</div>
      <div className="text-base">{children}</div>
    </div>
  );
}
