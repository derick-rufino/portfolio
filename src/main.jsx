import { StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import "./index.css";
import App from "./App.jsx";
import NotFoundPage from "./components/NotFoundPage.jsx";

import { SpeedInsights } from "@vercel/speed-insights/react";

hydrateRoot(
  document.getElementById("root"),
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
    <SpeedInsights />
  </StrictMode>,
);
