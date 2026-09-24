// src/components/ContactSection.jsx
// Contato: e-mail (abrir ou copiar) + GitHub e LinkedIn.
// Usa Tooltip e AnimatedBadge da beUI.
import { useEffect, useRef, useState } from "react";
import { Copy, Check, Mail } from "lucide-react";

import { Tooltip } from "@/components/motion/tooltip";
import { AnimatedBadge } from "@/components/motion/animated-badge";
import SectionHeading from "@/components/SectionHeading";
import CvButton from "@/components/CvButton";

import { EMAIL, GITHUB_URL, LINKEDIN_URL } from "@/data/contact";

const icon = (name) =>
  `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${name}/${name}-original.svg`;

const SOCIALS = [
  {
    label: "GitHub",
    handle: "derick-rufino",
    url: GITHUB_URL,
    icon: icon("github"),
    iconClass: "invert", // ícone escuro: inverte pra aparecer no fundo escuro
  },
  {
    label: "LinkedIn",
    handle: "derick-rufino",
    url: LINKEDIN_URL,
    icon: icon("linkedin"),
  },
];

export default function ContactSection() {
  const [copied, setCopied] = useState(false);
  const timeout = useRef(null);

  useEffect(() => () => window.clearTimeout(timeout.current), []);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      window.clearTimeout(timeout.current);
      timeout.current = window.setTimeout(() => setCopied(false), 2200);
    } catch {
      // Sem permissão de clipboard: o link mailto continua funcionando
    }
  };

  return (
    <section
      id="contact"
      className="mx-auto w-full max-w-6xl scroll-mt-24 px-4 pt-8 pb-16 sm:px-6"
    >
      <SectionHeading title="Contato">
        Aberto a projetos freelance, estágios e conversas sobre interface e
        desenvolvimento.
      </SectionHeading>

      <div className="mt-6 flex flex-col gap-3">
        {/* E-mail: abre o app de e-mail ou copia o endereço */}
        <div className="flex flex-wrap items-center gap-2">
          <a
            href={`mailto:${EMAIL}`}
            className="inline-flex h-11 items-center gap-2.5 rounded-full bg-primary px-5 text-sm font-medium text-primary-foreground transition-colors outline-none hover:bg-primary/80 focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            <Mail className="size-4" aria-hidden="true" />
            {EMAIL}
          </a>

          <Tooltip content="Copiar e-mail">
            <button
              type="button"
              onClick={copyEmail}
              aria-label="Copiar e-mail"
              className="grid size-11 place-items-center rounded-full bg-card/70 text-muted-foreground transition-colors outline-none hover:bg-card hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              {copied ? (
                <Check className="size-4" aria-hidden="true" />
              ) : (
                <Copy className="size-4" aria-hidden="true" />
              )}
            </button>
          </Tooltip>

          {/* Área reservada pro aviso, com leitor de tela */}
          <span aria-live="polite" className="min-h-6">
            {copied && (
              <AnimatedBadge status="success" size="sm">
                E-mail copiado
              </AnimatedBadge>
            )}
          </span>
        </div>

        {/* Redes */}
        <ul className="flex flex-wrap gap-2">
          <li>
            <CvButton className="bg-card/70 text-foreground hover:bg-card" />
          </li>
          {SOCIALS.map((social) => (
            <li key={social.label}>
              <a
                href={social.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-11 items-center gap-2.5 rounded-full bg-card/70 px-4 text-sm transition-colors outline-none hover:bg-card focus-visible:ring-3 focus-visible:ring-ring/50"
              >
                <img
                  src={social.icon}
                  alt=""
                  width={20}
                  height={20}
                  loading="lazy"
                  draggable={false}
                  className={`size-5 object-contain ${social.iconClass ?? ""}`}
                />
                <span className="font-medium text-foreground">
                  {social.label}
                </span>
                <span className="text-muted-foreground">{social.handle}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>

      <p className="mt-16 text-xs text-muted-foreground">
        © {new Date().getFullYear()} Derick Rufino
      </p>
    </section>
  );
}
