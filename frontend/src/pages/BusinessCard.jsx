import React, { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import {
  CaretDown,
  DownloadSimple,
  EnvelopeSimple,
  Globe,
  LinkedinLogo,
  Phone,
  QrCode,
  ShareNetwork,
  UserPlus,
  WhatsappLogo,
} from "@phosphor-icons/react";
import LOGO from "../assets/images/main-logo.png";
import { useT } from "../i18n";
import { COMPANY, getCardUrl } from "../config/team.js";
import "./BusinessCard.css";

/* ---------- helpers ---------- */

// Lightweight analytics: only forwards to an existing gtag, never sends personal data.
const track = (event, slug) => {
  try {
    if (typeof window.gtag === "function") window.gtag("event", event, { card: slug });
  } catch {
    /* noop */
  }
};

const vEsc = (s = "") =>
  String(s).replace(/\\/g, "\\\\").replace(/\r?\n/g, "\\n").replace(/;/g, "\\;").replace(/,/g, "\\,");

const isHttpUrl = (u) => {
  try {
    return ["http:", "https:"].includes(new URL(u).protocol);
  } catch {
    return false;
  }
};

function buildVCard(m, title, website) {
  const full = m.fullName || m.displayName;
  const first = m.firstName || full.split(" ")[0];
  const last = m.lastName || full.split(" ").slice(1).join(" ");
  const c = m.contactInfo || {};
  const lines = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `N:${vEsc(last)};${vEsc(first)};;;`,
    `FN:${vEsc(full)}`,
    `ORG:${vEsc(COMPANY.name)}`,
    title && `TITLE:${vEsc(title)}`,
    c.phone && `TEL;TYPE=CELL,VOICE:${c.phone.replace(/[^\d+]/g, "")}`,
    c.email && `EMAIL;TYPE=INTERNET,WORK:${vEsc(c.email)}`,
    website && `URL:${website}`,
    "END:VCARD",
  ].filter(Boolean);
  return lines.join("\r\n") + "\r\n";
}

function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function useCardMeta(title, description, url) {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = title;
    let meta = document.querySelector('meta[name="description"]');
    const createdMeta = !meta;
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "description";
      document.head.appendChild(meta);
    }
    const prevDesc = meta.getAttribute("content");
    meta.setAttribute("content", description);
    const link = document.createElement("link");
    link.rel = "canonical";
    link.href = url;
    document.head.appendChild(link);
    return () => {
      document.title = prevTitle;
      if (createdMeta) meta.remove();
      else meta.setAttribute("content", prevDesc ?? "");
      link.remove();
    };
  }, [title, description, url]);
}

/* ---------- card ---------- */

function PhysicalCard({ member, title, website, c, t }) {
  const [flipped, setFlipped] = useState(false);
  const tiltRef = useRef(null);
  const name = member.fullName || member.displayName;
  const webLabel = website.replace(/^https?:\/\//, "");

  const onMove = (e) => {
    if (e.pointerType !== "mouse" || !tiltRef.current) return;
    const r = tiltRef.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    tiltRef.current.style.setProperty("--ry", `${x * 10}deg`);
    tiltRef.current.style.setProperty("--rx", `${-y * 8}deg`);
  };
  const onLeave = () => {
    tiltRef.current?.style.setProperty("--ry", "0deg");
    tiltRef.current?.style.setProperty("--rx", "0deg");
  };

  return (
    <div className="bc-stage">
      <div className="bc-tilt" ref={tiltRef} onPointerMove={onMove} onPointerLeave={onLeave}>
        <button
          type="button"
          className={`bc-card ${flipped ? "is-flipped" : ""}`}
          aria-pressed={flipped}
          aria-label={t("card.flip_label")}
          onClick={() => setFlipped((f) => !f)}
          data-testid="card-flip"
        >
          <span className="bc-face bc-front" aria-hidden={flipped}>
            <img src={LOGO} alt="MercSoft" draggable={false} />
          </span>
          <span className="bc-face bc-back" aria-hidden={!flipped}>
            <span className="bc-symbol" style={{ backgroundImage: `url(${LOGO})` }} />
            <span className="bc-info">
              <span className="bc-name">{name}</span>
              <span className="bc-role">{title}</span>
              <span className="bc-rule" />
              {c.email && (
                <span className="bc-row">
                  <EnvelopeSimple weight="fill" /> {c.email}
                </span>
              )}
              {c.phone && (
                <span className="bc-row">
                  <Phone weight="fill" /> {c.phoneDisplay || c.phone}
                </span>
              )}
              <span className="bc-row">
                <Globe weight="fill" /> {webLabel}
              </span>
            </span>
          </span>
        </button>
      </div>
    </div>
  );
}

/* ---------- page ---------- */

export default function BusinessCard({ member }) {
  const { t, lang, setLang } = useT();
  const [qrOpen, setQrOpen] = useState(false);
  const [qrSrc, setQrSrc] = useState(null);
  const slug = member?.slug;
  const url = member ? getCardUrl(member) : COMPANY.website;
  const title = member ? member.title?.[lang] || member.title?.en || member.role?.[lang] || member.role?.en || "" : "";
  const name = member ? member.fullName || member.displayName : "";
  const c = member?.contactInfo || {};
  const website = c.website || COMPANY.website;
  const linkedin = (member?.socialLinks || []).find((s) => /linkedin/i.test(s.label || s.name || s.url || "") && isHttpUrl(s.url))?.url;

  useCardMeta(
    member ? `${name} | MercSoft` : "MercSoft",
    member ? `${name} — ${title}. ${t("card.descriptor")}` : t("card.descriptor"),
    url
  );

  useEffect(() => {
    if (slug) track("card_view", slug);
  }, [slug]);

  const openQr = useCallback(async () => {
    const next = !qrOpen;
    setQrOpen(next);
    track("qr_toggle", slug);
    if (next && !qrSrc) {
      const QR = (await import("qrcode")).default;
      setQrSrc(
        await QR.toDataURL(url, {
          width: 640,
          margin: 4,
          errorCorrectionLevel: "M",
          color: { dark: "#000000", light: "#FFFFFF" },
        })
      );
    }
  }, [qrOpen, qrSrc, slug, url]);

  if (!member) {
    return (
      <div className="bc-page">
        <main className="bc-main" style={{ textAlign: "center" }}>
          <p>{t("card.not_found")}</p>
          <Link to="/" className="bc-cta" style={{ marginTop: 16 }}>
            {t("card.back_to_home")}
          </Link>
        </main>
      </div>
    );
  }

  const save = () => {
    const blob = new Blob([buildVCard(member, title, website)], { type: "text/vcard;charset=utf-8" });
    downloadBlob(blob, member.vcfFilename || `${slug}-mercsoft.vcf`);
    track("contact_save", slug);
    toast.success(t("card.saved"));
  };

  const share = async () => {
    track("share", slug);
    if (navigator.share) {
      try {
        await navigator.share({ title: `${name} | MercSoft`, url });
      } catch {
        /* user cancelled */
      }
      return;
    }
    try {
      await navigator.clipboard.writeText(url);
      toast.success(t("card.copied"));
    } catch {
      toast.error(t("card.copy_error"));
    }
  };

  const digits = (c.phone || "").replace(/\D/g, "");
  const actions = [
    digits && { k: "whatsapp", Icon: WhatsappLogo, href: `https://wa.me/${digits}`, ext: true, ev: "whatsapp_click" },
    c.phone && { k: "call", Icon: Phone, href: `tel:${c.phone.replace(/[^\d+]/g, "")}` },
    c.email && { k: "email", Icon: EnvelopeSimple, href: `mailto:${c.email}` },
    { k: "website", Icon: Globe, href: website, ext: true },
    linkedin && { k: "linkedin", Icon: LinkedinLogo, href: linkedin, ext: true },
    { k: "share", Icon: ShareNetwork, onClick: share },
  ].filter(Boolean);

  const renderAction = ({ k, Icon, href, ext, onClick, ev }, i) => {
    const inner = (
      <>
        <Icon size={22} weight="regular" aria-hidden="true" />
        <span>{t(`card.${k}`)}</span>
      </>
    );
    const style = { "--i": i + 5 };
    return onClick ? (
      <button key={k} type="button" className="bc-action bc-in" style={style} onClick={onClick}>
        {inner}
      </button>
    ) : (
      <a
        key={k}
        className="bc-action bc-in"
        style={style}
        href={href}
        onClick={() => ev && track(ev, slug)}
        {...(ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {inner}
      </a>
    );
  };

  const downloadQr = () => {
    if (!qrSrc) return;
    const a = document.createElement("a");
    a.href = qrSrc;
    a.download = `${slug}-mercsoft-qr.png`;
    a.click();
    track("qr_download", slug);
  };

  return (
    <div className="bc-page" data-testid="business-card">
      <div className="bc-bg" aria-hidden="true">
        <i className="bc-blob b1" />
        <i className="bc-blob b2" />
        <i className="bc-blob b3" />
      </div>

      <main className="bc-main">
        <div className="bc-lang bc-in" style={{ "--i": 0 }} role="group" aria-label={t("card.lang_label")}>
          {["es", "en"].map((l) => (
            <button
              key={l}
              type="button"
              aria-pressed={lang === l}
              className={lang === l ? "active" : ""}
              onClick={() => setLang(l)}
            >
              {l.toUpperCase()}
            </button>
          ))}
        </div>

        <div className="bc-in" style={{ "--i": 1 }}>
          <PhysicalCard member={member} title={title} website={website} c={c} t={t} />
        </div>
        <p className="bc-hint bc-in" style={{ "--i": 2 }}>
          {t("card.tap_flip")}
        </p>

        <header className="bc-id bc-in" style={{ "--i": 3 }}>
          <h1>{name}</h1>
          <p className="bc-title">{title}</p>
          <p className="bc-desc">{t("card.descriptor")}</p>
        </header>

        <button type="button" className="bc-cta bc-in" style={{ "--i": 4 }} onClick={save} data-testid="card-save">
          <UserPlus size={20} weight="bold" aria-hidden="true" />
          {t("card.save")}
        </button>

        <div
          className="bc-grid"
          style={{ gridTemplateColumns: `repeat(${Math.min(actions.length, 3)}, minmax(0, 1fr))` }}
        >
          {actions.map(renderAction)}
        </div>

        <section className="bc-qr bc-in" style={{ "--i": 11 }}>
          <button
            type="button"
            className="bc-qr-toggle"
            aria-expanded={qrOpen}
            aria-controls="bc-qr-panel"
            onClick={openQr}
          >
            <QrCode size={20} aria-hidden="true" />
            <span>{qrOpen ? t("card.qr_hide") : t("card.qr_show")}</span>
            <CaretDown size={16} className="bc-caret" aria-hidden="true" />
          </button>
          <div id="bc-qr-panel" className={`bc-qr-panel ${qrOpen ? "open" : ""}`}>
            <div className="bc-qr-inner">
              <div className="bc-qr-box">
                {qrSrc && <img src={qrSrc} alt={t("card.qr_alt")} width="200" height="200" />}
              </div>
              <button type="button" className="bc-link" onClick={downloadQr} tabIndex={qrOpen ? 0 : -1}>
                <DownloadSimple size={16} aria-hidden="true" /> {t("card.qr_download")}
              </button>
            </div>
          </div>
        </section>
      </main>

      <footer className="bc-foot bc-in" style={{ "--i": 12 }}>
        <Link to="/">
          {t("card.powered")} <strong>MercSoft</strong>
        </Link>
      </footer>
    </div>
  );
}
