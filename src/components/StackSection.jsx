// src/components/StackSection.jsx
// Stack agrupada por categoria. Cada grupo é uma linha: título à esquerda, cards pequenos à direita.
import { useState } from "react";
import { STACK_GROUPS, TECH } from "@/data/tech";
import { cn } from "@/lib/utils";

function TechIcon({ tech }) {
  const [failed, setFailed] = useState(false);

  // Sem ícone (ou ícone quebrado): mostra a inicial na cor da tecnologia
  if (!tech.icon || failed) {
    return (
      <span
        aria-hidden="true"
        className="grid size-9 place-items-center rounded-xl text-base font-semibold"
        style={{
          color: tech.color,
          background: `color-mix(in oklab, ${tech.color} 18%, transparent)`,
        }}
      >
        {tech.name[0]}
      </span>
    );
  }

  return (
    <img
      src={tech.icon}
      alt=""
      width={36}
      height={36}
      loading="lazy"
      draggable={false}
      onError={() => setFailed(true)}
      className={cn("size-9 object-contain", tech.iconClass)}
    />
  );
}

function TechTile({ tech }) {
  // Posição do mouse alimenta o spotlight da cor da tecnologia
  const handleMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  return (
    <a
      href={tech.url}
      target="_blank"
      rel="noreferrer"
      title={tech.role}
      aria-label={`${tech.name}: ${tech.role}`}
      onPointerMove={handleMove}
      style={{ "--tc": tech.color }}
      className="group relative flex aspect-square flex-col items-center justify-center gap-2.5 overflow-hidden rounded-2xl bg-[color-mix(in_oklab,var(--tc)_7%,var(--card))] p-2 text-center transition-colors duration-300 outline-none hover:bg-[color-mix(in_oklab,var(--tc)_11%,var(--card))] focus-visible:ring-2 focus-visible:ring-ring"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(90px circle at var(--mx, 50%) var(--my, 50%), color-mix(in oklab, var(--tc) 28%, transparent), transparent 70%)",
        }}
      />
      <span className="relative">
        <TechIcon tech={tech} />
      </span>
      <span className="relative text-xs font-medium text-foreground">
        {tech.name}
      </span>
    </a>
  );
}

export default function StackSection() {
  return (
    <div className="mt-6 flex flex-col gap-2">
      {STACK_GROUPS.map((group) => (
        <div
          key={group.id}
          className="grid gap-4 py-5 md:grid-cols-[14rem_1fr] md:gap-10"
        >
          <div>
            <h3 className="text-lg font-medium text-foreground">
              {group.title}
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              {group.description}
            </p>
          </div>

          {/* Tiles ligeiramente menores no celular; tamanho original a partir de md. */}
          <ul className="grid grid-cols-[repeat(auto-fill,minmax(5.25rem,6rem))] gap-2.5 md:grid-cols-[repeat(auto-fill,minmax(6rem,7rem))]">
            {group.items.map((id) => (
              <li key={id}>
                <TechTile tech={TECH[id]} />
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
