"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState } from "react";

const programs = [
  ["grupo\n_de estudo", "encontros mensais pra conhecer gente interessante e seus jeitos de organizar a vida, o trabalho e sua comunicação.", "blue", "#contato"],
  ["oficina\nfalar _de si", "uma oficina online prática pra escrever, revisar e experimentar apresentações que façam sentido.", "peach", "/atividades/falar-de-si"],
  ["vender sem\nse vender_", "uma aula online prática e também reflexiva sobre comunicar o que você faz de um jeito interessante, confiável e humano.", "blue", "#contato"],
  ["escola\n_offline", "uma vivência que vira repertório e que pode sacudir nossas práticas de comunicação SIM!", "yellow", "#contato"],
] as const;

const SWIPE_THRESHOLD = 40;

export default function ProgramsCarousel() {
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
        {programs.map(([name, description, color, href]) => <article className={`program-card ${color}`} key={name}><h2>{name.split("\n").map((line) => <span key={line}>{line}</span>)}</h2><p>{description}</p><a href={href}>saiba mais</a></article>)}
      </div>
      <div className="program-controls" aria-label="Navegação dos programas">
        <button aria-label="Programa anterior" className="program-arrow" onClick={previousProgram}><ChevronLeft aria-hidden="true" strokeWidth={1.5} /></button>
        <div className="program-dots">
          {programs.map(([name], index) => <button aria-label={`Ver ${name.replace("\n", " ")}`} aria-current={index === activeIndex ? "true" : undefined} key={name} onClick={() => setActiveIndex(index)} />)}
        </div>
        <button aria-label="Próximo programa" className="program-arrow" onClick={nextProgram}><ChevronRight aria-hidden="true" strokeWidth={1.5} /></button>
      </div>
    </section>
  );
}