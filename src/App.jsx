import { useState, useEffect, useRef, useCallback } from "react";
import "./index.css";
import "./global.css";

import ProfilePic from "./assets/profile-picture.jpg";

import { Tabs, TabsList, TabsTrigger } from "@/components/motion/tabs";
import { ChromaticTextReveal } from "@/components/motion/chromatic-text-reveal";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/motion/popover";

import GradientWaves from "@/components/GradientWaves";
import StackSection from "@/components/StackSection";
import ProjectCard from "@/components/ProjectCard";
import ProjectsFolder from "@/components/ProjectsFolder";
import ContactSection from "@/components/ContactSection";
import ProgressiveBlur from "@/components/ProgressiveBlur";
import SectionHeading from "@/components/SectionHeading";
import { projects } from "@/data/projects";

const SECTIONS = [
  { id: "hero", label: "Início" },
  { id: "stack", label: "Stack" },
  { id: "projects", label: "Projetos" },
];

const NAME = "Derick Rufino";
const BRAND = "DevPortfolio";

// Largura máxima do conteúdo: alinha hero, stack e projetos na mesma coluna
const CONTAINER = "mx-auto w-full max-w-6xl px-4 sm:px-6";

function MenuIcon({ open }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      className="transition-transform duration-300"
    >
      {open ? (
        <>
          <line x1="6" y1="6" x2="18" y2="18" />
          <line x1="18" y1="6" x2="6" y2="18" />
        </>
      ) : (
        <>
          <line x1="4" y1="7" x2="20" y2="7" />
          <line x1="4" y1="12" x2="20" y2="12" />
          <line x1="4" y1="17" x2="20" y2="17" />
        </>
      )}
    </svg>
  );
}

function App() {
  const [active, setActive] = useState("hero");
  const [nameVisible, setNameVisible] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  const isClickScroll = useRef(false);
  const clickScrollTimeout = useRef(null);
  const headerRef = useRef(null);
  const nameRef = useRef(null); // h1 do hero

  const handleValueChange = useCallback((value) => {
    isClickScroll.current = true;
    setActive(value);

    document.getElementById(value)?.scrollIntoView({ behavior: "smooth" });

    window.clearTimeout(clickScrollTimeout.current);
    clickScrollTimeout.current = window.setTimeout(() => {
      isClickScroll.current = false;
    }, 700);
  }, []);

  const goToContact = useCallback(() => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    return () => window.clearTimeout(clickScrollTimeout.current);
  }, []);

  // Scroll spy: a seção ativa é a que cruza uma faixa fina no meio da tela.
  // Funciona igual pra seção curta (stack) e pra seção alta (projetos).
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (isClickScroll.current) return;
        const current = entries.find((entry) => entry.isIntersecting);
        if (current) setActive(current.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );

    SECTIONS.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  // Troca BRAND por NAME assim que o header passa do h1 do hero.
  // "passed" só é true quando o h1 saiu por CIMA (não conta se estiver abaixo da dobra).
  useEffect(() => {
    const name = nameRef.current;
    const header = headerRef.current;
    if (!name || !header) return;

    let observer;

    const updateObserver = () => {
      observer?.disconnect();
      observer = new IntersectionObserver(
        ([entry]) => {
          const headerBottom = entry.rootBounds?.top ?? header.offsetHeight;
          const passed =
            !entry.isIntersecting &&
            entry.boundingClientRect.bottom <= headerBottom;
          setNameVisible(!passed);
        },
        { rootMargin: `-${header.offsetHeight}px 0px 0px 0px`, threshold: 0 },
      );
      observer.observe(name);
    };

    updateObserver();

    const resizeObserver = new ResizeObserver(updateObserver);
    resizeObserver.observe(header);

    return () => {
      resizeObserver.disconnect();
      observer?.disconnect();
    };
  }, []);

  return (
    // overflow-x-clip (não hidden): "hidden" cria um scroll container e quebra o position: sticky
    <div className="dark main min-h-dvh w-full overflow-x-clip bg-background">
      <header ref={headerRef} className="sticky top-0 z-50 w-full">
        {/* Progressive blur + leve escurecimento, se estendem um pouco abaixo do header */}
        <ProgressiveBlur className="-z-10 h-[calc(100%+2.5rem)]" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[calc(100%+2.5rem)] bg-linear-to-b from-background/70 to-transparent"
        />

        <div
          className={`${CONTAINER} flex h-fit items-center justify-between py-2`}
        >
          <div className="relative grid h-6 overflow-hidden text-foreground">
            <span
              className={`col-start-1 row-start-1 whitespace-nowrap transition-all duration-300 ease-out ${
                nameVisible
                  ? "translate-y-0 opacity-100"
                  : "pointer-events-none -translate-y-3 opacity-0"
              }`}
            >
              {BRAND}
            </span>

            <span
              className={`col-start-1 row-start-1 whitespace-nowrap font-heading text-lg font-medium transition-all duration-300 ease-out sm:text-xl ${
                nameVisible
                  ? "pointer-events-none translate-y-3 opacity-0"
                  : "translate-y-0 opacity-100"
              }`}
            >
              {NAME}
            </span>
          </div>

          <nav className="hidden min-w-fit flex-row items-center gap-4 md:flex">
            <Tabs
              value={active}
              onValueChange={handleValueChange}
              variant="pill"
            >
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
              className="rounded-full p-5"
              onClick={goToContact}
            >
              Entre em contato
            </Button>
          </nav>

          <div className="md:hidden">
            <Popover
              open={mobileOpen}
              onOpenChange={setMobileOpen}
              trigger="click"
              side="bottom"
              align="end"
              sideOffset={10}
            >
              <PopoverTrigger>
                <button
                  type="button"
                  aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
                  className="flex size-10 items-center justify-center rounded-full border border-border text-foreground"
                >
                  <MenuIcon open={mobileOpen} />
                </button>
              </PopoverTrigger>

              <PopoverContent className="w-56 p-2">
                <nav className="flex flex-col">
                  {SECTIONS.map(({ id, label }) => (
                    <button
                      key={id}
                      type="button"
                      onClick={() => {
                        handleValueChange(id);
                        setMobileOpen(false);
                      }}
                      className={`rounded-lg px-2 py-2.5 text-left text-base transition-colors ${
                        active === id
                          ? "bg-muted font-medium text-foreground"
                          : "text-muted-foreground hover:bg-muted/60"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </nav>

                <Button
                  size="lg"
                  className="mt-2 w-full rounded-full"
                  onClick={() => {
                    goToContact();
                    setMobileOpen(false);
                  }}
                >
                  Entre em contato
                </Button>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </header>

      <main>
        {/* Hero: fundo em largura total, conteúdo dentro do container */}
        <section
          id="hero"
          className="relative isolate min-h-[95dvh] scroll-mt-12"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[calc(100%+180px)] overflow-hidden opacity-35 mask-[linear-gradient(to_bottom,black_55%,black_72%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,black_55%,black_72%,transparent_100%)]"
          >
            <GradientWaves
              horizonColor="bg-background"
              waveColor="bg-chart-2"
              crestColor="bg-chart-3"
              speed={0.5}
              amplitude={2}
              waveScale={1.2}
              waveRatio={0.85}
              swell={28}
              turbulence={10}
              tilt={1.5}
              zoom={1.05}
              height={4.8}
              fogDepth={18}
              detail="medium"
              brightness={0.85}
              opacity={0.9}
              mouseInteraction
              parallaxStrength={10}
              grain
              grainIntensity={0.025}
              className="absolute inset-0"
            />
          </div>

          <div
            className={`${CONTAINER} flex min-h-[95dvh] flex-col-reverse items-center justify-center gap-10 text-center md:flex-row md:items-start md:justify-between md:gap-6 md:text-left`}
          >
            <div className="text-info flex flex-col items-center pt-0 md:items-start md:pt-32 lg:pt-50">
              <h1
                ref={nameRef}
                className="text-5xl leading-[1.05] text-foreground sm:text-6xl md:text-7xl lg:text-8xl"
              >
                Derick Rufino
              </h1>

              <h2>
                <ChromaticTextReveal
                  prefix="Desenvolvedor"
                  words={["Frontend", "Web", "Mobile"]}
                  startOnView={true}
                  className="shrink-0 pl-1.5 font-light tracking-[-0.04em] text-foreground text-[clamp(1.25rem,5cqw,2rem)]"
                />
              </h2>
            </div>

            <div className="image-info flex w-full max-w-xs flex-col items-center pt-4 sm:max-w-sm md:max-w-md md:pt-16 lg:pt-25">
              <img
                src={ProfilePic}
                alt="Selfie de um jovem adulto, branco, cabelo escuro, sorrindo para a câmera."
                draggable={false}
                className="aspect-square size-40 rounded-full object-cover sm:size-52 md:size-64"
              />

              <p className="mt-4 max-w-md text-sm text-muted-foreground sm:text-base">
                Desenvolvedor frontend e mobile, estudante de Desenvolvimento de
                Software Multiplataforma. Trabalho com React e React Native e
                gosto de interfaces com movimento e personalidade. Também
                desenho e ilustro, o que me ajuda a pensar o produto além do
                código. Atuo como freelancer e estou aberto a estágios.
              </p>
            </div>
          </div>
        </section>

        <div className={CONTAINER}>
          <section id="stack" className="scroll-mt-12 py-16">
            <SectionHeading title="Stack">
              O que eu uso para construir, do código ao design.
            </SectionHeading>
            <StackSection />
          </section>

          <section id="projects" className="scroll-mt-16 py-16">
            <SectionHeading title="Projetos">
              Alguns projetos que representam meu trabalho com produto,
              interface e desenvolvimento.
            </SectionHeading>

            <div className="mx-auto mt-8 grid max-w-xl grid-cols-2 items-stretch gap-3 sm:gap-4 lg:max-w-5xl lg:grid-cols-4">
              {projects.map((project) => (
                <ProjectCard key={project.title} project={project} />
              ))}

              <ProjectsFolder />
            </div>
          </section>
        </div>
      </main>

      <footer>
        <ContactSection />
      </footer>
    </div>
  );
}

export default App;
