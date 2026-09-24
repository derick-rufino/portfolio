import { StrictMode } from "react";
import { MemoryRouter, Route, Routes } from "react-router";
import App from "./App.jsx";
import NotFoundPage from "./components/NotFoundPage.jsx";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { VisualEffectsProvider } from "@/context/VisualEffectsContext";
import VisualEffectsControl from "@/components/VisualEffectsControl";

export function render(url = "/") {
  return (
    <StrictMode>
      <VisualEffectsProvider>
        <MemoryRouter initialEntries={[url]}>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </MemoryRouter>
        <VisualEffectsControl />
        <SpeedInsights />
      </VisualEffectsProvider>
    </StrictMode>
  );
}
