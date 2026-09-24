// src/components/ProjectsFolder.jsx
// Único ponto de contato com o Folder Float (React Bits).
// Se o nome do arquivo ou os props do componente baixado forem diferentes,
// só este arquivo precisa mudar.
import { useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowUpRight01Icon } from "@hugeicons/core-free-icons";

import FolderFloat from "@/components/FolderFloat"; // ajuste ao caminho/nome do arquivo baixado
import { GITHUB_URL, moreProjects } from "@/data/projects";

const openUrl = (url) => window.open(url, "_blank", "noopener,noreferrer");

// Sem hover (celular/tablet): a pasta já nasce aberta.
// Precisa ser calculado ANTES do primeiro render, porque defaultOpen só vale na montagem.
// (Por isso não uso o useHoverCapable, que começa em false e só atualiza depois.)
const startsOpen = () =>
  typeof window !== "undefined" &&
  !window.matchMedia("(hover: hover) and (pointer: fine)").matches;

export default function ProjectsFolder() {
  const [defaultOpen] = useState(startsOpen);

  return (
    <div className="relative z-10 flex flex-col items-center justify-center gap-3 sm:gap-4">
      {/* scale reduz a pasta no celular sem mexer no componente original */}
      <div className="origin-center scale-75 sm:scale-90">
        <FolderFloat
          // Ajuste estes props conforme a API do Folder Float
          label="Mais projetos"
          sublabel="Infinitas ideias ^^"
          notes={moreProjects}
          defaultOpen={defaultOpen}
          onSelect={(note) => openUrl(note.url)}
          
        />
      </div>

      {/* Link comum: funciona no teclado, no celular e mesmo se a pasta não abrir */}
      <a
        href={GITHUB_URL}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-1 text-xs text-muted-foreground transition-colors outline-none hover:text-foreground focus-visible:text-foreground focus-visible:underline sm:text-sm"
      >
        Ver todos no GitHub
        <HugeiconsIcon icon={ArrowUpRight01Icon} size={14} strokeWidth={1.8} />
      </a>
    </div>
  );
}
