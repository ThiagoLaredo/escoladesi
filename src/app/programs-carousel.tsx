"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState } from "react";
import type { Program } from "../lib/contentful";

const SWIPE_THRESHOLD = 40;

export default function ProgramsCarousel({ programs }: { programs: Program[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartX = useRef(0);
  const touchDeltaX = useRef(0);
  const previousProgram = () => setActiveIndex((index) => (index - 1 + programs.length) % programs.length);
  const nextProgram = () => setActiveIndex((index) => (index + 1) % programs.length);

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = event.touches[0].clientX;
    touchDeltaX.current = 0;
  };
  const handleTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
    touchDeltaX.current = event.touches[0].clientX - touchStartX.current;
  };
  const handleTouchEnd = () => {
    if (touchDeltaX.current > SWIPE_THRESHOLD) previousProgram();
    else if (touchDeltaX.current < -SWIPE_THRESHOLD) nextProgram();
    touchDeltaX.current = 0;
  };

  return (
    <section className="programs" id="agenda" aria-labelledby="programs-title">
      <h2 id="programs-title">próximas atividades</h2>
      <div
        className="program-track"
        style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {programs.map(({ name, subtituloDoCard, atividadesData, comNome, formato, description, color, href }) => {
          const fallbackText = subtituloDoCard || description;

          return <article className={`program-card ${color}`} key={name}><div className="program-card-head">{atividadesData ? <span className="program-card-date-badge">{atividadesData}</span> : null}</div><h2>{name.split("\n").map((line) => <span key={line}>{line}</span>)}</h2>{comNome || formato ? <p className="program-card-subtitle">{comNome ? <>_com {comNome}<br /></> : null}{formato ? <>_{formato}</> : null}</p> : fallbackText ? <p className="program-card-subtitle">{fallbackText}</p> : null}<a href={href}>saiba mais</a></article>;
        })}
      </div>
      <div className="program-controls" aria-label="Navegação dos programas">
        <button aria-label="Programa anterior" className="program-arrow" onClick={previousProgram}><ChevronLeft aria-hidden="true" strokeWidth={1.5} /></button>
        <div className="program-dots">
          {programs.map(({ name }, index) => <button aria-label={`Ver ${name.replace("\n", " ")}`} aria-current={index === activeIndex ? "true" : undefined} key={name} onClick={() => setActiveIndex(index)} />)}
        </div>
        <button aria-label="Próximo programa" className="program-arrow" onClick={nextProgram}><ChevronRight aria-hidden="true" strokeWidth={1.5} /></button>
      </div>
    </section>
  );
}