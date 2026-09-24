import { lazy, Suspense, useEffect, useRef, useState } from "react";

const ProjectsFolder = lazy(() => import("@/components/ProjectsFolder"));

function FolderPlaceholder() {
  return (
    <div
      aria-hidden="true"
      className="flex min-h-42.5 w-full flex-col items-center justify-center gap-3 sm:min-h-47.5"
    >
      <div className="h-28 w-37.5 rounded-xl bg-muted/30 sm:h-37 sm:w-50" />
      <div className="h-3 w-28 rounded-full bg-muted/30" />
    </div>
  );
}

export default function DeferredProjectsFolder() {
  const ref = useRef(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setShouldLoad(true);
        observer.disconnect();
      },
      { rootMargin: "240px 0px" },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="mt-12 flex h-full w-full items-center justify-center lg:mt-0"
    >
      {shouldLoad ? (
        <Suspense fallback={<FolderPlaceholder />}>
          <ProjectsFolder />
        </Suspense>
      ) : (
        <FolderPlaceholder />
      )}
    </div>
  );
}
