// src/components/ProgressiveBlur.jsx
// Blur progressivo: camadas com blur crescente, cada uma com uma máscara que a esvanece.
// O blur é mais forte no topo e some suavemente pra baixo (sem "degrau" no fim do header).
import { cn } from "@/lib/utils";
import { useVisualEffects } from "@/context/VisualEffectsContext";

const LEVELS = [0.5, 1, 2, 4, 8, 16, 20, 28, 40]; // px, do mais fraco ao mais forte

export default function ProgressiveBlur({ className, levels = LEVELS }) {
  const { ready, simpleBlur } = useVisualEffects();
  const n = levels.length;

  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-x-0 top-0", className)}
    >
      {!ready || simpleBlur ? (
        <div
          className="absolute inset-0"
          style={{
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
          }}
        />
      ) : levels.map((blur, i) => {
        // A camada i cobre do topo até (n - i) / n da altura, com fade na borda
        const mask = `linear-gradient(to bottom, black ${((n - i - 1) / n) * 100}%, transparent ${((n - i) / n) * 100}%)`;
        return (
          <div
            key={blur}
            className="absolute inset-0"
            style={{
              backdropFilter: `blur(${blur}px)`,
              WebkitBackdropFilter: `blur(${blur}px)`,
              maskImage: mask,
              WebkitMaskImage: mask,
            }}
          />
        );
      })}
    </div>
  );
}
