"use client";

import { useEffect, useState } from "react";

const phrases = [
  "autoconhecimento",
  "apresentação de si",
  "autenticidade",
  "técnicas e práticas",
  "linguagem autoral",
  "relacionamento humano",
  "reconhecimento",
  "autorresponsabilidade",
  "apresentação do trabalho",
  "aprendizado contínuo",
  "trocas e colaborações",
  "comunicação pessoal",
  "autoexpressão",
  "imagem pessoal",
];

export default function HeroRotatingPhrase() {
  const [phraseIndex, setPhraseIndex] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setPhraseIndex((currentIndex) => {
        let nextIndex = currentIndex;
        while (nextIndex === currentIndex) {
          nextIndex = Math.floor(Math.random() * phrases.length);
        }
        return nextIndex;
      });
    }, 3600);

    return () => window.clearInterval(interval);
  }, []);

  return <b>escola de _<span key={phrases[phraseIndex]}>{phrases[phraseIndex]}</span></b>;
}