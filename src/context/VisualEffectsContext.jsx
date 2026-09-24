import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "portfolio:visual-effects-mode";
const VALID_MODES = new Set(["auto", "on", "reduced"]);

const VisualEffectsContext = createContext(null);

function readPreferences() {
  const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  const transparencyQuery = window.matchMedia(
    "(prefers-reduced-transparency: reduce)",
  );
  const memory = navigator.deviceMemory;
  const cores = navigator.hardwareConcurrency;

  return {
    reducedMotion: motionQuery.matches,
    reducedTransparency: transparencyQuery.matches,
    lowPerformance:
      (Number.isFinite(memory) && memory <= 2) ||
      (Number.isFinite(cores) && cores <= 2),
  };
}

function readSavedMode() {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    return VALID_MODES.has(saved) ? saved : "auto";
  } catch {
    return "auto";
  }
}

export function VisualEffectsProvider({ children }) {
  const [mode, setModeState] = useState("auto");
  const [preferences, setPreferences] = useState({
    reducedMotion: false,
    reducedTransparency: false,
    lowPerformance: false,
  });
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const transparencyQuery = window.matchMedia(
      "(prefers-reduced-transparency: reduce)",
    );
    const updatePreferences = () => setPreferences(readPreferences());

    setModeState(readSavedMode());
    updatePreferences();
    setReady(true);

    motionQuery.addEventListener("change", updatePreferences);
    transparencyQuery.addEventListener("change", updatePreferences);

    const onStorage = (event) => {
      if (event.key === STORAGE_KEY || event.key === null) {
        const saved = event.newValue;
        setModeState(VALID_MODES.has(saved) ? saved : "auto");
      }
    };
    window.addEventListener("storage", onStorage);

    return () => {
      motionQuery.removeEventListener("change", updatePreferences);
      transparencyQuery.removeEventListener("change", updatePreferences);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  const setMode = useCallback((nextMode) => {
    if (!VALID_MODES.has(nextMode)) return;
    setModeState(nextMode);
    try {
      window.localStorage.setItem(STORAGE_KEY, nextMode);
    } catch {
      // The in-memory preference still works when browser storage is blocked.
    }
  }, []);

  const automaticReduction =
    preferences.reducedMotion || preferences.lowPerformance;
  const reduced =
    !ready || mode === "reduced" || (mode === "auto" && automaticReduction);
  const simpleBlur =
    !ready ||
    mode === "reduced" ||
    (mode === "auto" &&
      (automaticReduction || preferences.reducedTransparency));

  const value = useMemo(
    () => ({ mode, setMode, ready, reduced, simpleBlur }),
    [mode, setMode, ready, reduced, simpleBlur],
  );

  return (
    <VisualEffectsContext.Provider value={value}>
      {children}
    </VisualEffectsContext.Provider>
  );
}

export function useVisualEffects() {
  const context = useContext(VisualEffectsContext);
  if (!context) {
    throw new Error("useVisualEffects must be used inside VisualEffectsProvider");
  }
  return context;
}
