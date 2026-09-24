import { lazy, Suspense, useEffect } from "react";
import { useLocation } from "react-router";
import { NotFoundTerminal } from "@/components/motion/not-found/terminal";
import { useVisualEffects } from "@/context/VisualEffectsContext";

const GradientWaves = lazy(() => import("@/components/GradientWaves"));

export default function NotFoundPage() {
  const { ready: effectsReady, reduced: reduceEffects } = useVisualEffects();
  const { pathname, search } = useLocation();
  const attemptedPath = `${pathname}${search}`;

  useEffect(() => {
    const homeTitle = "Derick Rufino | Desenvolvedor Frontend e Mobile";
    const homeDescription =
      "Desenvolvedor frontend e mobile com foco em React, React Native e interfaces digitais com movimento e personalidade.";
    const notFoundTitle = "404 — Página não encontrada | Derick Rufino";
    const notFoundDescription = `O endereço ${attemptedPath} não foi encontrado no portfólio de Derick Rufino.`;
    const setMeta = (selector, value) =>
      document.querySelector(selector)?.setAttribute("content", value);

    document.title = notFoundTitle;
    setMeta('meta[name="description"]', notFoundDescription);
    setMeta('meta[property="og:title"]', notFoundTitle);
    setMeta('meta[property="og:description"]', notFoundDescription);
    setMeta('meta[name="twitter:title"]', notFoundTitle);
    setMeta('meta[name="twitter:description"]', notFoundDescription);
    setMeta('meta[name="robots"]', "noindex, follow");

    return () => {
      document.title = homeTitle;
      setMeta('meta[name="description"]', homeDescription);
      setMeta('meta[property="og:title"]', homeTitle);
      setMeta('meta[property="og:description"]', homeDescription);
      setMeta('meta[name="twitter:title"]', homeTitle);
      setMeta('meta[name="twitter:description"]', homeDescription);
      setMeta('meta[name="robots"]', "index, follow");
    };
  }, [attemptedPath]);

  return (
    <main className="dark relative isolate flex min-h-dvh w-full items-center justify-center overflow-hidden bg-background px-4 py-12">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 opacity-25 mask-[linear-gradient(to_bottom,transparent,black_25%,black_70%,transparent)]">
        {!effectsReady || reduceEffects ? (
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(ellipse at 50% 38%, rgb(255 255 255 / 0.1), transparent 64%), linear-gradient(180deg, rgb(255 255 255 / 0.03), transparent 58%)",
            }}
          />
        ) : (
          <Suspense fallback={null}>
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
          </Suspense>
        )}
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
