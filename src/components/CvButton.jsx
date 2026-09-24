// src/components/CvButton.jsx
// Botão de baixar currículo. O visual de cada lugar vem pelo className.
import { Download } from "lucide-react";

import { CV_URL, CV_FILENAME } from "@/data/contact";
import { cn } from "@/lib/utils";

export default function CvButton({ className }) {
  return (
    <a
      href={CV_URL}
      download={CV_FILENAME}
      className={cn(
        "inline-flex h-11 items-center gap-2.5 rounded-full px-5 text-sm font-medium transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
        className,
      )}
    >
      <Download className="size-4" aria-hidden="true" />
      Baixar currículo
    </a>
  );
}
