import { useEffect, useRef } from "react";

declare global {
  interface Window {
    pannellum?: any;
  }
}

const PANNELLUM_CSS = "https://cdn.jsdelivr.net/npm/pannellum@2.5.6/build/pannellum.css";
const PANNELLUM_JS = "https://cdn.jsdelivr.net/npm/pannellum@2.5.6/build/pannellum.js";

function loadOnce(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.pannellum) return Promise.resolve();
  return new Promise((resolve, reject) => {
    if (!document.querySelector(`link[href="${PANNELLUM_CSS}"]`)) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = PANNELLUM_CSS;
      document.head.appendChild(link);
    }
    const existing = document.querySelector<HTMLScriptElement>(`script[src="${PANNELLUM_JS}"]`);
    if (existing) {
      existing.addEventListener("load", () => resolve());
      existing.addEventListener("error", () => reject(new Error("pannellum failed")));
      if (window.pannellum) resolve();
      return;
    }
    const script = document.createElement("script");
    script.src = PANNELLUM_JS;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("pannellum failed"));
    document.head.appendChild(script);
  });
}

export function PanoramaViewer({ imageUrl, title }: { imageUrl: string; title?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<any>(null);

  useEffect(() => {
    let cancelled = false;
    loadOnce().then(() => {
      if (cancelled || !ref.current || !window.pannellum) return;
      viewerRef.current = window.pannellum.viewer(ref.current, {
        type: "equirectangular",
        panorama: imageUrl,
        autoLoad: true,
        showControls: true,
        title,
        hfov: 110,
      });
    });
    return () => {
      cancelled = true;
      try {
        viewerRef.current?.destroy?.();
      } catch {}
    };
  }, [imageUrl, title]);

  return (
    <div className="relative w-full aspect-[16/9] md:aspect-[21/9] rounded-2xl overflow-hidden bg-foreground/90 shadow-2xl">
      <div ref={ref} className="absolute inset-0" />
    </div>
  );
}
