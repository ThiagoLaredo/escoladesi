"use client";

import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import type { PartnerLogo, Testimonial } from "../lib/contentful";

type AccordionSectionsProps = {
  partnerLogos: PartnerLogo[];
  testimonials: Testimonial[];
};

export default function AccordionSections({ partnerLogos, testimonials }: AccordionSectionsProps) {
  const items = testimonials;
  const hasPartnerLogos = partnerLogos.length > 0;
  const hasTestimonials = items.length > 0;
  if (!hasPartnerLogos && !hasTestimonials) return null;

  const [openSection, setOpenSection] = useState<"partners" | "testimonials" | null>(null);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const testimonial = hasTestimonials ? items[testimonialIndex] : null;

  function toggleSection(section: "partners" | "testimonials") {
    setOpenSection((currentSection) => currentSection === section ? null : section);
  }

  function showPreviousTestimonial() {
    setTestimonialIndex((currentIndex) => (currentIndex - 1 + items.length) % items.length);
  }

  function showNextTestimonial() {
    setTestimonialIndex((currentIndex) => (currentIndex + 1) % items.length);
  }

  return (
    <section className="accordions" aria-label="Mais sobre a Escoladesi">
      {hasPartnerLogos ? (
        <>
          <button aria-controls="partner-logos" aria-expanded={openSection === "partners"} onClick={() => toggleSection("partners")}>
            com quem já trabalhamos<ChevronDown aria-hidden="true" strokeWidth={1} />
          </button>
          <div className="accordion-content" hidden={openSection !== "partners"} id="partner-logos">
            <div className="partner-logos" aria-label="Empresas parceiras">
              {partnerLogos.map((partnerLogo) => (
                <span key={partnerLogo.url}>
                  <img alt={partnerLogo.title} loading="lazy" src={partnerLogo.url} />
                </span>
              ))}
            </div>
          </div>
        </>
      ) : null}

      {hasTestimonials ? (
        <>
          <button aria-controls="testimonial-carousel" aria-expanded={openSection === "testimonials"} onClick={() => toggleSection("testimonials")}>
            depoimentos<ChevronDown aria-hidden="true" strokeWidth={1} />
          </button>
          <div className="accordion-content" hidden={openSection !== "testimonials"} id="testimonial-carousel">
            <div className="testimonial-carousel">
              <button aria-label="Depoimento anterior" className="carousel-control" onClick={showPreviousTestimonial}><ChevronLeft aria-hidden="true" strokeWidth={1.25} /></button>
              <figure>
                <blockquote>“{testimonial?.quote}”</blockquote>
                <figcaption>{testimonial?.author}</figcaption>
              </figure>
              <button aria-label="Próximo depoimento" className="carousel-control" onClick={showNextTestimonial}><ChevronRight aria-hidden="true" strokeWidth={1.25} /></button>
            </div>
            <p className="carousel-count" aria-live="polite">{testimonialIndex + 1} / {items.length}</p>
          </div>
        </>
      ) : null}
    </section>
  );
}