import Image from "next/image";
import Link from "next/link";
import { Mail } from "lucide-react";
import { FaInstagram, FaLinkedinIn } from "react-icons/fa6";

export default function SiteFooter() {
  return (
    <>
      <section className="newsletter" id="novidades">
        <h2>receba nossa newsletter</h2>
        <p>ideias construídas coletivamente nas aulas, toda semana em seu email</p>
        <form>
          <label className="sr-only" htmlFor="email">Seu email</label>
          <input id="email" type="email" placeholder="seu melhor email" />
          <button type="submit">enviar &#8594;</button>
        </form>
      </section>
      <footer id="contato">
        <Link className="footer-logo" href="/" aria-label="Escoladesi - início"><Image src="/logo-escola-de-si-1.png" alt="Escoladesi" width={872} height={148} /></Link>
        <div className="footer-contact">
          <a className="email-link" href="mailto:ola@escoladesi.com.br" aria-label="Enviar e-mail para Escoladesi"><Mail aria-hidden="true" strokeWidth={1.75} /></a>
          <div className="social-links">
            <a href="https://www.instagram.com" aria-label="Instagram da Escoladesi" rel="noreferrer" target="_blank"><FaInstagram aria-hidden="true" /></a>
            <a href="https://www.linkedin.com" aria-label="LinkedIn da Escoladesi" rel="noreferrer" target="_blank"><FaLinkedinIn aria-hidden="true" /></a>
          </div>
        </div>
        <span>© 2026</span>
      </footer>
    </>
  );
}