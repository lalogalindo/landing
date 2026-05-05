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
    <section id="privacy" className="relative py-24 sm:py-32" data-testid="privacy-section">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <SectionHeader
          label={t("privacy.label")}
          title={t("privacy.title")}
          lede={t("privacy.updated")}
        />

        <div className="mt-10 glass rounded-2xl p-2 sm:p-4">
          <Accordion type="single" collapsible defaultValue="item-0" className="w-full">
            {sections.map((s, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="border-white/10"
                data-testid={`privacy-item-${i}`}
              >
                <AccordionTrigger className="text-white text-base sm:text-lg heading hover:no-underline px-3 sm:px-4">
                  {s.h}
                </AccordionTrigger>
                <AccordionContent className="text-soft leading-relaxed px-3 sm:px-4 pb-5 text-sm sm:text-base">
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
