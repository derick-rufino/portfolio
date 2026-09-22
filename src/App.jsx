import { useState, useEffect, useRef, useCallback } from "react";
import "./index.css";
import "./global.css";

import { Tabs, TabsList, TabsTrigger } from "@/components/motion/tabs";
import { ChromaticTextReveal } from "@/components/motion/chromatic-text-reveal";
import { Button } from "@/components/ui/button";

const SECTIONS = [
  { id: "hero", label: "Início" },
  { id: "stack", label: "Stack" },
  { id: "projects", label: "Projetos" },
];

const NAME = "Derick Rufino";
const BRAND = "DevPortfolio";

function App() {
  const [active, setActive] = useState("hero");
  const [heroVisible, setHeroVisible] = useState(true);
  const isClickScroll = useRef(false);
  const headerRef = useRef(null);

  const handleValueChange = useCallback((value) => {
    isClickScroll.current = true;
    setActive(value);
    document.getElementById(value)?.scrollIntoView({ behavior: "smooth" });
    window.clearTimeout(handleValueChange._t);
    handleValueChange._t = window.setTimeout(() => {
      isClickScroll.current = false;
    }, 700);
  }, []);

  // Scroll spy das tabs (igual antes)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (isClickScroll.current) return;
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { threshold: 0.5 },
    );
    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // Collapse do título: dispara exatamente quando o hero passa por baixo do header sticky,
  // usando a altura real do header (medida via ref) como rootMargin — não um valor chutado.
  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero || !headerRef.current) return;

    const headerHeight = headerRef.current.offsetHeight;
    const observer = new IntersectionObserver(
      ([entry]) => setHeroVisible(entry.isIntersecting),
      { rootMargin: `-${headerHeight}px 0px 0px 0px`, threshold: 0 },
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="dark main bg-background min-h-dvh min-w-dvw flex flex-col p-4">
      <header
        ref={headerRef}
        className="w-full h-fit p-2 flex flex-row justify-between items-center sticky top-0 z-50"
      >
        {/* container relativo: os dois textos ficam empilhados um sobre o outro */}
        <div className="relative h-6 overflow-hidden text-foreground grid">
          <span
            className={`col-start-1 row-start-1 whitespace-nowrap transition-all duration-300 ease-out ${
              heroVisible
                ? "translate-y-0 opacity-100"
                : "-translate-y-3 opacity-0 pointer-events-none"
            }`}
          >
            {BRAND}
          </span>
          <span
            className={`col-start-1 row-start-1 whitespace-nowrap transition-all duration-300 ease-out ${
              heroVisible
                ? "translate-y-3 opacity-0 pointer-events-none"
                : "translate-y-0 opacity-100"
            }`}
          >
            {NAME}
          </span>
        </div>

        <nav className="flex flex-row items-center gap-4 min-w-fit">
          <Tabs value={active} onValueChange={handleValueChange} variant="pill">
            <TabsList>
              {SECTIONS.map(({ id, label }) => (
                <TabsTrigger key={id} value={id}>
                  {label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          <Button
            size="lg"
            className="p-5 rounded-full"
            onClick={() =>
              document
                .getElementById("contact")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Entre em contato
          </Button>
        </nav>
      </header>

      <main>
        <section id="hero" className="min-h-dvh scroll-mt-10 py-4">
          <h1 className="text-6xl text-foreground">Derick Rufino</h1>
          <h2>
            <ChromaticTextReveal
              prefix="Desenvolvedor"
              words={["Frontend", "Web", "Mobile"]}
              startOnView={true}
              className="shrink-0 font-light tracking-[-0.04em] text-foreground text-[clamp(1rem,6cqw,1.5rem)]"
            />
          </h2>
        </section>

        <section id="stack" className="min-h-[90dvh] scroll-mt-10 py-4">
          {/* stack aqui */}
        </section>

        <section id="projects" className="min-h-[90dvh] scroll-mt-10 py-4">
          {/* projetos aqui */}
        </section>
      </main>
      <footer>
        <section id="contact" className="min-h-fit">
          {/* info de contato aqui */}
        </section>
      </footer>
    </div>
  );
}

export default App;
