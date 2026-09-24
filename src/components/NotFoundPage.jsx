import { useEffect } from "react";
import { useLocation } from "react-router";
import GradientWaves from "@/components/GradientWaves";
import { NotFoundTerminal } from "@/components/motion/not-found/terminal";

export default function NotFoundPage() {
  const { pathname, search } = useLocation();
  const attemptedPath = `${pathname}${search}`;

  useEffect(() => {
    document.title = "404 — Página não encontrada | Derick Rufino";
  }, []);

  return (
    <main className="dark relative isolate flex min-h-dvh w-full items-center justify-center overflow-hidden bg-background px-4 py-12">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 opacity-25 mask-[linear-gradient(to_bottom,transparent,black_25%,black_70%,transparent)]">
        <GradientWaves
          horizonColor="bg-background"
          waveColor="bg-chart-2"
          crestColor="bg-chart-3"
          speed={0.35}
          amplitude={1.5}
          waveScale={1.1}
          waveRatio={0.85}
          swell={24}
          turbulence={8}
          tilt={1.5}
          zoom={1.05}
          height={4.8}
          fogDepth={18}
          detail="low"
          brightness={0.75}
          opacity={0.8}
          mouseInteraction={false}
          grain={false}
          className="absolute inset-0"
        />
      </div>

      <div className="w-full max-w-xl">
        <NotFoundTerminal
          code="404"
          title="Página não encontrada"
          description="Esse endereço não existe ou não está mais disponível."
          path={attemptedPath}
          homeHref="/"
          homeLabel="Voltar ao início"
        />
      </div>
    </main>
  );
}
