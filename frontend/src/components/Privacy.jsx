import React from "react";
import { useT } from "../i18n";
import { SectionHeader } from "./Services";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";

export default function Privacy() {
  const { t } = useT();
  const sections = t("privacy.sections");

  return (
    <section
      id="privacy"
      className="relative py-24 sm:py-32"
      style={{ background: "var(--bg-section)" }}
      data-testid="privacy-section"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <SectionHeader
          label={t("privacy.label")}
          title={t("privacy.title")}
          lede={t("privacy.updated")}
        />

        <div
          className="mt-10 rounded-2xl p-2 sm:p-4"
          style={{
            background: "var(--bg-elevated)",
            border: "1px solid var(--border-subtle)",
            boxShadow: "var(--shadow-card)",
          }}
        >
          <Accordion type="single" collapsible defaultValue="item-0" className="w-full">
            {sections.map((s, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="border-b"
                style={{ borderColor: "var(--border-divider)" }}
                data-testid={`privacy-item-${i}`}
              >
                <AccordionTrigger
                  className="text-base sm:text-lg heading hover:no-underline px-3 sm:px-4"
                  style={{ color: "var(--text-1)" }}
                >
                  {s.h}
                </AccordionTrigger>
                <AccordionContent
                  className="leading-relaxed px-3 sm:px-4 pb-5 text-sm sm:text-base"
                  style={{ color: "var(--text-2)" }}
                >
                  {s.p}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
