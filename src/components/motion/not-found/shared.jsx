"use client";;
import { motion, useReducedMotion } from "motion/react";
import { Link } from "react-router";
import { SPRING_PRESS } from "@/lib/ease";
import { useHoverCapable } from "@/lib/hooks/use-hover-capable";
import { cn } from "@/lib/utils";

const MotionLink = motion(Link);

export const NOT_FOUND_DEFAULTS = {
  code: "404",
  title: "Page not found",

  description:
    "The page you are looking for moved, vanished, or never existed.",

  homeHref: "/",
  homeLabel: "Back home",
};

/** The primary action returns the visitor to the home page. */
export function NotFoundActions({
  homeHref = NOT_FOUND_DEFAULTS.homeHref,
  homeLabel = NOT_FOUND_DEFAULTS.homeLabel,
  className
}) {
  const reduce = useReducedMotion();
  const canHover = useHoverCapable();
  const whileTap = reduce ? undefined : { scale: 0.96 };
  const whileHover = reduce || !canHover ? undefined : { scale: 1.02 };

  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-center gap-3",
        className,
      )}
    >
      <MotionLink
        to={homeHref}
        whileTap={whileTap}
        whileHover={whileHover}
        transition={SPRING_PRESS}
        draggable={false}
        className="inline-flex h-11 select-none items-center justify-center rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
      >
        {homeLabel}
      </MotionLink>
    </div>
  );
}

/** Centers a variant and gives it a consistent minimum stage height. */
export function NotFoundStage({
  className,
  children
}) {
  return (
    <div
      className={cn(
        "flex min-h-[420px] w-full flex-col items-center justify-center gap-8 px-4 text-center",
        className,
      )}
    >
      {children}
    </div>
  );
}
