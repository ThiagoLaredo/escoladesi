"use client";

import Link from "next/link";
import { Mail, Menu, X } from "lucide-react";
import { FaInstagram, FaLinkedinIn } from "react-icons/fa6";
import { useState } from "react";

const navigationItems = [
  { href: "/", label: "home" },
  { href: "/sobre", label: "sobre" },
  { href: "#agenda", label: "agenda" },
  { href: "#pesquisa", label: "pesquisa" },
  { href: "/sob-medida", label: "sob medida" },
  { href: "/metodologia", label: "metodologia" },
  { href: "/news", label: "news" },
  { href: "#contato", label: "contato" },
];

export default function MobileMenu({ activeLabel = "home" }: { activeLabel?: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mobile-menu">
      <button aria-controls="mobile-navigation" aria-expanded={isOpen} aria-label={isOpen ? "Fechar menu" : "Abrir menu"} className="mobile-menu-trigger" onClick={() => setIsOpen((currentState) => !currentState)}>
        {isOpen ? <X aria-hidden="true" strokeWidth={1.5} /> : <Menu aria-hidden="true" strokeWidth={1.5} />}
      </button>
      <nav aria-label="Navegação mobile" className="mobile-menu-panel" hidden={!isOpen} id="mobile-navigation">
        {navigationItems.map((item) => item.href.startsWith("/") ? (
          <Link aria-current={item.label === activeLabel ? "page" : undefined} href={item.href} key={item.label} onClick={() => setIsOpen(false)}>{item.label}</Link>
        ) : (
          <a href={item.href} key={item.label} onClick={() => setIsOpen(false)}>{item.label}</a>
        ))}
        <div className="mobile-socials" aria-label="Redes sociais">
          <a href="mailto:ola@escoladesi.com.br" aria-label="Enviar e-mail para Escoladesi"><Mail aria-hidden="true" strokeWidth={1.75} /></a>
          <a href="https://www.instagram.com" aria-label="Instagram da Escoladesi" rel="noreferrer" target="_blank"><FaInstagram aria-hidden="true" /></a>
          <a href="https://www.linkedin.com" aria-label="LinkedIn da Escoladesi" rel="noreferrer" target="_blank"><FaLinkedinIn aria-hidden="true" /></a>
        </div>
      </nav>
    </div>
  );
}