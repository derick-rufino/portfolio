import { useState } from "react";
import { Tooltip } from "@/components/motion/tooltip";
import { Tabs, TabsList, TabsTrigger } from "@/components/motion/tabs";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useVisualEffects } from "@/context/VisualEffectsContext";

function EffectsIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="size-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
    >
      <circle cx="8" cy="12" r="4.7" opacity=".3" />
      <circle cx="12" cy="12" r="4.7" opacity=".62" />
      <circle cx="16" cy="12" r="4.7" className="fill-background/80" />
    </svg>
  );
}

export default function VisualEffectsControl() {
  const [open, setOpen] = useState(false);
  const { mode, setMode } = useVisualEffects();

  return (
    <div
      className="fixed right-4 bottom-4 z-[60]"
      style={{ bottom: "max(1rem, env(safe-area-inset-bottom))" }}
    >
      <Popover open={open} onOpenChange={setOpen}>
        <Tooltip
          content="Ativar ou desativar animações"
          className="hidden w-max !whitespace-nowrap px-3.5 py-2 text-center leading-5 md:block"
        >
          <PopoverTrigger
            render={
              <button
                type="button"
                aria-label="Preferências de animações e efeitos visuais"
                className="flex size-9 items-center justify-center rounded-full border border-border bg-background/90 text-muted-foreground shadow-sm backdrop-blur-sm transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                <EffectsIcon />
              </button>
            }
          />
        </Tooltip>

        <PopoverContent
          side="top"
          align="end"
          sideOffset={10}
          className="w-[min(18rem,calc(100vw-2rem))] gap-3 p-3"
        >
          <div className="flex flex-col gap-0.5">
            <PopoverTitle className="text-sm">Animações e efeitos</PopoverTitle>
            <PopoverDescription className="text-xs leading-relaxed">
              Automático respeita o sistema e os recursos reportados pelo aparelho.
            </PopoverDescription>
          </div>

          <Tabs
            value={mode}
            onValueChange={setMode}
            variant="pill"
            className="w-full"
          >
            <TabsList className="w-full justify-between">
              <TabsTrigger
                value="auto"
                className="min-w-0 flex-1 px-2 text-xs"
                indicatorClassName="bg-muted"
              >
                Auto
              </TabsTrigger>
              <TabsTrigger
                value="on"
                className="min-w-0 flex-1 px-2 text-xs"
                indicatorClassName="bg-muted"
              >
                Ligado
              </TabsTrigger>
              <TabsTrigger
                value="reduced"
                className="min-w-0 flex-1 px-2 text-xs"
                indicatorClassName="bg-muted"
              >
                Reduzido
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </PopoverContent>
      </Popover>
    </div>
  );
}
