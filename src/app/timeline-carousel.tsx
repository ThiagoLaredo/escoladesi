"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export type TimelineItem = { year: string; title: string; text: string };

type TimelineCarouselProps = { items: TimelineItem[] };

const SWIPE_THRESHOLD = 40;

export default function TimelineCarousel({ items }: TimelineCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [slidesPerView, setSlidesPerView] = useState(4);
  const touchStartX = useRef(0);
  const touchDeltaX = useRef(0);
  const maxIndex = Math.max(0, items.length - slidesPerView);

  useEffect(() => {
    const updateSlidesPerView = () => {
      const nextSlidesPerView = window.innerWidth <= 760 ? 1 : window.innerWidth <= 1024 ? 2 : window.innerWidth <= 1200 ? 3 : 4;
      setSlidesPerView(nextSlidesPerView);
      setActiveIndex((index) => Math.min(index, Math.max(0, items.length - nextSlidesPerView)));
    };
    updateSlidesPerView();
    window.addEventListener("resize", updateSlidesPerView);
    return () => window.removeEventListener("resize", updateSlidesPerView);
  }, [items.length]);

  const previousItem = () => setActiveIndex((index) => (index === 0 ? maxIndex : index - 1));
  const nextItem = () => setActiveIndex((index) => (index === maxIndex ? 0 : index + 1));

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = event.touches[0].clientX;
    touchDeltaX.current = 0;
  };
  const handleTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
    touchDeltaX.current = event.touches[0].clientX - touchStartX.current;
  };
  const handleTouchEnd = () => {
    if (touchDeltaX.current > SWIPE_THRESHOLD) previousItem();
    else if (touchDeltaX.current < -SWIPE_THRESHOLD) nextItem();
    touchDeltaX.current = 0;
  };

  return (
    <div className="timeline-carousel">
      <div
        aria-live="polite"
        className="timeline-slides"
        onTouchEnd={handleTouchEnd}
        onTouchMove={handleTouchMove}
        onTouchStart={handleTouchStart}
        style={{ transform: `translateX(-${activeIndex * (100 / slidesPerView)}%)` }}
      >
        {items.map((item) => (
          <article className="timeline-slide" key={`${item.year}-${item.title}`}>
            <p className="timeline-year">{item.year}</p>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </article>
        ))}
      </div>
      <div className="timeline-controls" aria-label="Navegação da linha do tempo">
        <button aria-label="Marco anterior" className="timeline-arrow" onClick={previousItem} type="button"><ChevronLeft aria-hidden="true" /></button>
        <div className="timeline-progress" aria-label={`Marco ${activeIndex + 1} de ${items.length}`}>
          <span>{String(activeIndex + 1).padStart(2, "0")}</span>
          <div className="timeline-progress-bar"><span style={{ width: `${((activeIndex + slidesPerView) / items.length) * 100}%` }} /></div>
          <span>{String(Math.min(activeIndex + slidesPerView, items.length)).padStart(2, "0")}</span>
        </div>
        <button aria-label="Próximo marco" className="timeline-arrow" onClick={nextItem} type="button"><ChevronRight aria-hidden="true" /></button>
      </div>
    </div>
  );
}
