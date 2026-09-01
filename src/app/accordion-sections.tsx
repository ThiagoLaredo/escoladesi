"use client";

import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

const partnerLogos = ["tarzi", "mira", "aura", "nativa", "norte", "modo"];

const testimonials = [
  { quote: "encontrei um jeito mais verdadeiro de apresentar meu trabalho e minhas ideias.", author: "participante da escola" },
  { quote: "foi um processo potente para reconhecer minha trajetória e transformá-la em comunicação.", author: "participante da escola" },
  { quote: "saí com mais clareza, repertório e vontade de seguir falando de mim no meu próprio ritmo.", author: "participante da escola" },
];

export default function AccordionSections() {
  const [openSection, setOpenSection] = useState<"partners" | "testimonials" | null>(null);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const testimonial = testimonials[testimonialIndex];

  function toggleSection(section: "partners" | "testimonials") {
    setOpenSection((currentSection) => currentSection === section ? null : section);
  }

  function showPreviousTestimonial() {
    setTestimonialIndex((currentIndex) => (currentIndex - 1 + testimonials.length) % testimonials.length);
  }

  function showNextTestimonial() {
    setTestimonialIndex((currentIndex) => (currentIndex + 1) % testimonials.length);
  }

  return (
    <section className="accordions" aria-label="Mais sobre a Escoladesi">
      <button aria-controls="partner-logos" aria-expanded={openSection === "partners"} onClick={() => toggleSection("partners")}>
        com quem já trabalhamos<ChevronDown aria-hidden="true" strokeWidth={1} />
      </button>
      <div className="accordion-content" hidden={openSection !== "partners"} id="partner-logos">
        <div className="partner-logos" aria-label="Empresas parceiras">
          {partnerLogos.map((partner) => <span key={partner}>{partner}</span>)}
        </div>
      </div>

      <button aria-controls="testimonial-carousel" aria-expanded={openSection === "testimonials"} onClick={() => toggleSection("testimonials")}>
        depoimentos<ChevronDown aria-hidden="true" strokeWidth={1} />
      </button>
      <div className="accordion-content" hidden={openSection !== "testimonials"} id="testimonial-carousel">
        <div className="testimonial-carousel">
          <button aria-label="Depoimento anterior" className="carousel-control" onClick={showPreviousTestimonial}><ChevronLeft aria-hidden="true" strokeWidth={1.25} /></button>
          <figure>
            <blockquote>“{testimonial.quote}”</blockquote>
            <figcaption>{testimonial.author}</figcaption>
          </figure>
          <button aria-label="Próximo depoimento" className="carousel-control" onClick={showNextTestimonial}><ChevronRight aria-hidden="true" strokeWidth={1.25} /></button>
        </div>
        <p className="carousel-count" aria-live="polite">{testimonialIndex + 1} / {testimonials.length}</p>
      </div>
    </section>
  );
}