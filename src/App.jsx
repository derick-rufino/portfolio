import { useState, useEffect, useRef, useCallback } from "react";
import "./index.css";
import "./global.css";

import ProfilePic from "./assets/profile-picture.jpg";

import { Tabs, TabsList, TabsTrigger } from "@/components/motion/tabs";
import { ChromaticTextReveal } from "@/components/motion/chromatic-text-reveal";
import { Button } from "@/components/ui/button";
import ChromaGrid from "@/components/ChromaGrid";

const SECTIONS = [
  { id: "hero", label: "Início" },
  { id: "stack", label: "Stack" },
  { id: "projects", label: "Projetos" },
];

const NAME = "Derick Rufino";
const BRAND = "DevPortfolio";

const stackItems = [
  {
    image:
      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
    title: "React",
    subtitle: "Biblioteca",
    borderColor: "#61DAFB",
    spotlightColor: "#8BE7FF",
    gradient: "linear-gradient(145deg, #0a0a0a, #0f2a33)",
    url: "https://react.dev",
  },
  {
    image:
      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
    title: "JavaScript",
    subtitle: "Linguagem",
    borderColor: "#f7df1e",
    spotlightColor: "#FFF34A",
    gradient: "linear-gradient(145deg, #0a0a0a, #33300a)",
    url: "https://developer.mozilla.org/pt-BR/docs/Web/JavaScript",
  },
  {
    image:
      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
    title: "Tailwind CSS",
    subtitle: "Framework CSS",
    borderColor: "#38bdf8",
    spotlightColor: "#6DD5FF",
    gradient: "linear-gradient(145deg, #0a0a0a, #0a2a33)",
    url: "https://tailwindcss.com",
  },
  {
    image:
      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg",
    title: "Node.js",
    subtitle: "Runtime",
    borderColor: "#68a063",
    spotlightColor: "#8BC77F",
    gradient: "linear-gradient(145deg, #0a0a0a, #142a12)",
    url: "https://nodejs.org",
  },
  {
    image:
      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
    title: "React Native",
    subtitle: "Mobile",
    borderColor: "#61DAFB",
    spotlightColor: "#8BE7FF",
    gradient: "linear-gradient(145deg, #0a0a0a, #0f2a33)",
    url: "https://reactnative.dev",
  },
  {
    image:
      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg",
    title: "MySQL",
    subtitle: "Banco de dados",
    borderColor: "#4479A1",
    spotlightColor: "#63B8E8",
    gradient: "linear-gradient(145deg, #0a0a0a, #0a1c2a)",
    url: "https://www.mysql.com",
  },
  {
    image:
      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/microsoftsqlserver/microsoftsqlserver-plain.svg",
    title: "SQL Server",
    subtitle: "Banco de dados",
    borderColor: "#CC2927",
    spotlightColor: "#F04A47",
    gradient: "linear-gradient(145deg, #0a0a0a, #2a0f0f)",
    url: "https://www.microsoft.com/pt-br/sql-server",
  },
  {
    image:
      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg",
    title: "Figma",
    subtitle: "Design",
    borderColor: "#F24E1E",
    spotlightColor: "#FF7043",
    gradient: "linear-gradient(145deg, #0a0a0a, #2a170f)",
    url: "https://figma.com",
  },
  {
    image:
      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg",
    title: "Git",
    subtitle: "Versionamento",
    borderColor: "#F05032",
    spotlightColor: "#FF7358",
    gradient: "linear-gradient(145deg, #0a0a0a, #2a130f)",
    url: "https://git-scm.com",
  },
];

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
            className={`text-xl font-medium font-heading col-start-1 row-start-1 whitespace-nowrap transition-all duration-300 ease-out ${
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
        <section
          id="hero"
          className="min-h-[95dvh] max-h-full scroll-mt-10 flex justify-around flex-wrap-reverse"
        >
          <div className="text-info pt-50">
            <h1 className="text-8xl text-foreground">Derick Rufino</h1>
            <h2>
              <ChromaticTextReveal
                prefix="Desenvolvedor"
                words={["Frontend", "Web", "Mobile"]}
                startOnView={true}
                className="pl-1.5 shrink-0 font-light tracking-[-0.04em] text-foreground text-[clamp(2rem,7cqw,2rem)]"
              />
            </h2>
          </div>
          <div className="image-info flex flex-col items-center w-fit max-w-md pt-25">
            <img
              src={ProfilePic}
              alt="Selfie de um jovem adulto, branco, cabelo escuro, sorrindo para a câmera."
              className="w-64 aspect-square object-cover rounded-full"
            />
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nobis
              incidunt quibusdam saepe dolorum beatae nam impedit ipsa sed totam
              ab eaque minus aliquid ducimus eveniet dolorem, porro iure sunt
              provident!
            </p>
          </div>
        </section>

        <section id="stack" className="min-h-[90dvh] scroll-mt-10 py-4">
          <h2>Stack</h2>
          <ChromaGrid imageSize="sm" items={stackItems} columns={3} radius={0.1} />
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
