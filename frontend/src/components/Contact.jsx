import React, { useRef, useState } from "react";
import axios from "axios";
import ReCAPTCHA from "react-google-recaptcha";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { useT } from "../i18n";
import { SectionHeader } from "./Services";
import { Phone, EnvelopeSimple, Clock, PaperPlaneTilt, CheckCircle } from "@phosphor-icons/react";

const API = `${import.meta.env.VITE_BACKEND_URL}/api`;
const RECAPTCHA_SITE_KEY =
  import.meta.env.VITE_RECAPTCHA_SITE_KEY ||
  "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"; // Google test key
const PHONE = import.meta.env.VITE_CONTACT_PHONE || "2221401900";
const EMAIL = import.meta.env.VITE_CONTACT_EMAIL || "lalogalindo@gmail.com";

const formatPhone = (p) => {
  const d = (p || "").replace(/\D/g, "");
  if (d.length === 10) return `${d.slice(0, 3)} ${d.slice(3, 6)} ${d.slice(6)}`;
  return p;
};

export default function Contact() {
  const { t, lang } = useT();
  const recaptchaRef = useRef(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    subject: "",
    message: "",
  });
  const [token, setToken] = useState(null);
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);

  const update = (k) => (e) => setForm((p) => ({ ...p, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    if (!token) {
      toast.error(t("contact.form.error_recaptcha"));
      return;
    }
    setSending(true);
    try {
      await axios.post(`${API}/contact`, {
        ...form,
        recaptcha_token: token,
        locale: lang,
      });
      setDone(true);
      toast.success(t("contact.form.success_title"), {
        description: t("contact.form.success_desc"),
      });
      setForm({ name: "", email: "", company: "", subject: "", message: "" });
      recaptchaRef.current?.reset();
      setToken(null);
    } catch (err) {
      const status = err?.response?.status;
      if (status === 500) {
        toast.error(t("contact.form.error_quota"));
      } else if (status === 400) {
        toast.error(t("contact.form.error_recaptcha"));
        recaptchaRef.current?.reset();
        setToken(null);
      } else {
        toast.error(t("contact.form.error_generic"));
      }
    } finally {
      setSending(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative py-24 sm:py-32 overflow-hidden"
      data-testid="contact-section"
    >
      <div
        className="orb"
        style={{
          width: 460,
          height: 460,
          bottom: -180,
          left: -120,
          background: "var(--swirl-orange)",
        }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5">
            <SectionHeader
              label={t("contact.label")}
              title={t("contact.title")}
              lede={t("contact.lede")}
            />

            <div className="mt-10 space-y-3">
              <InfoRow
                icon={EnvelopeSimple}
                label={t("contact.info_email")}
                value={EMAIL}
                href={`mailto:${EMAIL}`}
                color="var(--brand-primary)"
                testid="contact-info-email"
              />
              <InfoRow
                icon={Phone}
                label={t("contact.info_phone")}
                value={formatPhone(PHONE)}
                href={`tel:+52${PHONE}`}
                color="var(--brand-accent)"
                testid="contact-info-phone"
              />
              <InfoRow
                icon={Clock}
                label={t("contact.info_hours")}
                value={t("contact.info_hours_value")}
                color="var(--swirl-green)"
                testid="contact-info-hours"
              />
            </div>
          </div>

          <motion.form
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55 }}
            onSubmit={submit}
            className="lg:col-span-7 rounded-3xl p-6 sm:p-8"
            style={{
              background: "var(--bg-elevated)",
              border: "1px solid var(--border-subtle)",
              boxShadow: "var(--shadow-card)",
            }}
            data-testid="contact-form"
          >
            {done && (
              <div
                className="mb-6 flex items-center gap-3 rounded-2xl px-4 py-3"
                style={{
                  border: "1px solid color-mix(in srgb, var(--swirl-green) 32%, transparent)",
                  background: "color-mix(in srgb, var(--swirl-green) 10%, transparent)",
                  color: "color-mix(in srgb, var(--swirl-green) 80%, var(--text-1))",
                }}
              >
                <CheckCircle size={20} weight="fill" />
                <div className="text-sm">
                  <div className="heading">{t("contact.form.success_title")}</div>
                  <div>{t("contact.form.success_desc")}</div>
                </div>
              </div>
            )}

            <div className="grid sm:grid-cols-2 gap-4">
              <Field label={t("contact.form.name")} required>
                <input
                  required
                  value={form.name}
                  onChange={update("name")}
                  className="input-glass"
                  data-testid="contact-input-name"
                />
              </Field>
              <Field label={t("contact.form.email")} required>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={update("email")}
                  className="input-glass"
                  data-testid="contact-input-email"
                />
              </Field>
              <Field label={t("contact.form.company")}>
                <input
                  value={form.company}
                  onChange={update("company")}
                  className="input-glass"
                  data-testid="contact-input-company"
                />
              </Field>
              <Field label={t("contact.form.subject")} required>
                <input
                  required
                  value={form.subject}
                  onChange={update("subject")}
                  className="input-glass"
                  data-testid="contact-input-subject"
                />
              </Field>
            </div>

            <div className="mt-4">
              <Field label={t("contact.form.message")} required>
                <textarea
                  required
                  value={form.message}
                  onChange={update("message")}
                  rows={6}
                  className="input-glass resize-y"
                  data-testid="contact-input-message"
                />
              </Field>
            </div>

            <div className="mt-5 flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
              <div data-testid="contact-recaptcha-wrapper">
                <ReCAPTCHA
                  ref={recaptchaRef}
                  sitekey={RECAPTCHA_SITE_KEY}
                  theme="light"
                  onChange={(t) => setToken(t)}
                  onExpired={() => setToken(null)}
                />
              </div>
              <button
                type="submit"
                disabled={sending}
                className="btn-pill btn-primary disabled:opacity-60 disabled:cursor-not-allowed"
                data-testid="contact-submit-button"
              >
                {sending ? t("contact.form.sending") : t("contact.form.submit")}
                <PaperPlaneTilt size={16} weight="bold" />
              </button>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}

function Field({ label, required, children }) {
  return (
    <label className="block">
      <span className="mono block mb-2" style={{ color: "var(--text-3)" }}>
        {label}
        {required && (
          <span className="ml-1" style={{ color: "var(--brand-accent)" }}>
            *
          </span>
        )}
      </span>
      {children}
    </label>
  );
}

function InfoRow({ icon: Icon, label, value, href, color, testid }) {
  const Wrapper = href ? "a" : "div";
  return (
    <Wrapper
      href={href}
      className="group flex items-center gap-4 rounded-2xl p-4 transition-colors"
      style={{
        background: "var(--bg-elevated)",
        border: "1px solid var(--border-subtle)",
        boxShadow: "var(--shadow-card)",
      }}
      data-testid={testid}
    >
      <span
        className="inline-flex items-center justify-center w-10 h-10 rounded-xl"
        style={{
          color,
          background: `color-mix(in srgb, ${color} 12%, transparent)`,
          border: `1px solid color-mix(in srgb, ${color} 22%, transparent)`,
        }}
      >
        <Icon size={20} weight="duotone" />
      </span>
      <div>
        <div className="mono" style={{ color: "var(--text-3)" }}>
          {label}
        </div>
        <div className="text-base" style={{ color: "var(--text-1)" }}>
          {value}
        </div>
      </div>
    </Wrapper>
  );
}
