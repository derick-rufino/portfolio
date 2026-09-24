// src/components/ProjectCard.jsx
// Card compacto: 2 colunas no celular, 4 no desktop.
// Card inteiro clicável (link esticado no título), com fallback quando a imagem não carrega.
// Botão do topo:
//   - com `repo`: pílula "GitHub" que leva ao repositório
//   - sem `repo`: só a seta (decorativa), e o clique cai no link do card (site do projeto)
import { useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowUpRight01Icon } from "@hugeicons/core-free-icons";

import { Tooltip } from "@/components/motion/tooltip";
import TechBadge from "@/components/TechBadge";
import { TECH } from "@/data/tech";

export default function ProjectCard({ project }) {
  const [imgFailed, setImgFailed] = useState(false);

  const hasSite = project.url && project.url !== "#";
  const hasRepo = Boolean(project.repo);
  // A cor do placeholder vem da primeira tecnologia da lista
  const accent = TECH[project.badges[0]]?.color ?? "#61DAFB";

  return (
    <article
      style={{ "--tc": accent }}
      className="group relative flex min-w-0 flex-col overflow-hidden rounded-2xl bg-card/70 transition-colors duration-300 hover:bg-card"
    >
      {/* Imagem */}
      <div className="relative aspect-16/10 w-full overflow-hidden bg-[color-mix(in_oklab,var(--tc)_10%,var(--card))]">
        {imgFailed ? (
          <div
            aria-hidden="true"
            className="grid size-full place-items-center font-heading text-4xl sm:text-5xl"
            style={{ color: `color-mix(in oklab, ${accent} 55%, transparent)` }}
          >
            {project.title[0]}
          </div>
        ) : (
          <img
            src={project.image}
            alt={`Preview do projeto ${project.title}`}
            draggable={false}
            loading="lazy"
            onError={() => setImgFailed(true)}
            className="size-full object-cover transition-transform duration-500 ease-out motion-safe:group-hover:scale-[1.03]"
          />
        )}
      </div>

      {/* Conteúdo */}
      <div className="flex flex-1 flex-col gap-2 p-3 sm:gap-2.5 sm:p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="min-w-0 text-sm leading-tight font-medium text-foreground sm:text-base">
            {hasSite ? (
              <a
                href={project.url}
                target="_blank"
                rel="noreferrer"
                className="outline-none after:absolute after:inset-0 focus-visible:after:ring-2 focus-visible:after:ring-ring focus-visible:after:ring-inset"
              >
                {project.title}
              </a>
            ) : (
              project.title
            )}
          </h3>

          {hasRepo ? (
            // relative z-10: fica acima do link esticado do card
            <Tooltip content="Ver repositório no GitHub">
              <a
                href={project.repo}
                target="_blank"
                rel="noreferrer"
                aria-label={`Ver repositório de ${project.title} no GitHub`}
                className="relative z-10 inline-flex h-6 shrink-0 items-center gap-1 rounded-full bg-muted/60 pr-1.5 pl-2.5 text-[11px] font-medium text-muted-foreground transition-colors duration-300 outline-none hover:bg-foreground/10 hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring sm:h-7 sm:pl-3 sm:text-xs"
              >
                GitHub
                <HugeiconsIcon
                  icon={ArrowUpRight01Icon}
                  size={14}
                  strokeWidth={1.8}
                />
              </a>
            </Tooltip>
          ) : (
            <Tooltip content={hasSite ? "Abrir projeto" : "Link em breve"}>
              <span
                aria-hidden="true"
                className={`grid size-6 shrink-0 place-items-center rounded-full bg-muted/60 text-muted-foreground transition-colors duration-300 sm:size-7 ${
                  hasSite
                    ? "group-hover:bg-foreground/10 group-hover:text-foreground"
                    : "opacity-40"
                }`}
              >
                <HugeiconsIcon
                  icon={ArrowUpRight01Icon}
                  size={15}
                  strokeWidth={1.8}
                />
              </span>
            </Tooltip>
          )}
        </div>

        <p className="line-clamp-2 text-xs leading-relaxed text-muted-foreground sm:line-clamp-3 sm:text-[13px]">
          {project.description}
        </p>

        {/* mt-auto empurra as badges pro fim; no celular só as 3 primeiras aparecem */}
        <div className="mt-auto flex flex-wrap gap-1 pt-1 max-sm:[&>*:nth-child(n+4)]:hidden sm:gap-1.5">
          {project.badges.map((id) => (
            <TechBadge key={id} id={id} />
          ))}
        </div>
      </div>
    </article>
  );
}
