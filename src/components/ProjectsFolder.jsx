// src/components/ProjectsFolder.jsx
// Único ponto de contato com o Folder Float (React Bits).
// Se o nome do arquivo ou os props do componente baixado forem diferentes,
// só este arquivo precisa mudar.
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowUpRight01Icon } from "@hugeicons/core-free-icons";

import FolderFloat from "@/components/FolderFloat"; // ajuste ao caminho/nome do arquivo baixado
import { GITHUB_URL } from "@/data/contact";

const GITHUB_PILLS = ["GitHub", "Projetos", "Repositórios", "Código-fonte"];

export default function ProjectsFolder() {
  return (
    <div className="relative z-10 flex flex-col items-center justify-center gap-3 sm:gap-4">
      {/* scale reduz a pasta no celular sem mexer no componente original */}
      <div className="origin-center scale-75 sm:scale-90">
        <FolderFloat
          label="Mais projetos"
          sublabel="Infinitas ideias ^^"
          items={GITHUB_PILLS}
          pillColors={["#60a5fa", "#fbbf24", "#f472b6", "#4ade80"]}
          itemTextColor="#18181b"
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
