// src/components/TechBadge.jsx
// Badge tingida com a cor da tecnologia, com o ícone dela dentro.
// O AnimatedBadge da beUI só tem estados fixos (success, warning...), por isso este aqui é próprio.
import { useState } from "react";
import { TECH } from "@/data/tech";
import { cn } from "@/lib/utils";

export default function TechBadge({ id, className }) {
  const [iconFailed, setIconFailed] = useState(false);

  const tech = TECH[id];
  const name = tech?.name ?? id;
  const color = tech?.color ?? "#94a3b8"; // cinza se o id não existir
  const showIcon = tech?.icon && !iconFailed;

  return (
    <span
      style={{ "--tc": color }}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full py-1 pr-2.5 pl-2 text-[11px] leading-none font-medium",
        "bg-[color-mix(in_oklab,var(--tc)_14%,transparent)]",
        "text-[color-mix(in_oklab,var(--tc)_65%,white)]",
        "ring-1 ring-inset ring-[color-mix(in_oklab,var(--tc)_28%,transparent)]",
        className,
      )}
    >
      {showIcon ? (
        <img
          src={tech.icon}
          alt=""
          width={14}
          height={14}
          loading="lazy"
          draggable={false}
          onError={() => setIconFailed(true)}
          className={cn("size-3.5 shrink-0 object-contain", tech.iconClass)}
        />
      ) : (
        // Sem ícone (UI/UX, API) ou ícone quebrado: ponto na cor da tecnologia
        <span aria-hidden="true" className="size-1.5 rounded-full bg-(--tc)" />
      )}
      {name}
    </span>
  );
}
