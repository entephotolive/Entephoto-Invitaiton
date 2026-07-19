"use client";

import React, { useState, useEffect, useRef, useCallback, memo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { useBuilder } from "@/context/BuilderContext";
import { PreviewModeProvider } from "@/context/PreviewModeContext";



import { dummyEventData, TEMPLATES } from "@/lib/templates";

// ---------------------------------------------------------------------------
// Skeleton shown while a template's JS chunk is being downloaded (React.lazy)
// ---------------------------------------------------------------------------
function TemplateSkeleton() {
  return (
    <div className="w-full h-full bg-neutral-200 flex flex-col items-center justify-center gap-2 animate-pulse">
      <div className="w-6 h-6 border-2 border-neutral-400 border-t-neutral-700 rounded-full animate-spin" />
      <span className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold">
        Loading Theme
      </span>
    </div>
  );
}

// ---------------------------------------------------------------------------
// LazyPreview
// Renders the template inside a scaled-down box ONLY when it scrolls into view.
// The IntersectionObserver triggers the React.lazy chunk download.
// We wrap the component in PreviewModeProvider(isPreview=true) so that
// template-internal hooks (useCountdown, heavy animations) are suppressed.
// ---------------------------------------------------------------------------
function LazyPreview({
  Component,
  eventData,
}: {
  Component: React.ComponentType<{ eventData: any }>;
  eventData: any;
}) {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "300px" } // Start loading before card enters viewport
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="w-full h-full bg-neutral-100 flex items-center justify-center relative overflow-hidden"
    >
      {inView ? (
        // will-change: transform promotes this div to its own GPU compositing layer,
        // preventing main-thread repaints when the rest of the page updates.
        <div
          className="origin-top-left absolute top-0 left-0 bg-white pointer-events-none"
          style={{
            width: "400%",
            height: "400%",
            transform: "scale(0.25)",
            willChange: "transform",
          }}
        >
          <PreviewModeProvider isPreview>
            <React.Suspense fallback={<TemplateSkeleton />}>
              <Component eventData={eventData} />
            </React.Suspense>
          </PreviewModeProvider>
        </div>
      ) : (
        <TemplateSkeleton />
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// TemplateCard — memoized so that when hoveredId changes in the parent, only
// the previously-hovered card and the newly-hovered card re-render.
// All other cards skip their render entirely.
// Handlers are created inside using useCallback([], [id]) so they are stable
// across parent re-renders — which is required for React.memo to work.
// ---------------------------------------------------------------------------
interface TemplateCardProps {
  tmpl: (typeof TEMPLATES)[number];
  isHovered: boolean;
  setHoveredId: React.Dispatch<React.SetStateAction<string | null>>;
  setEventData: (updater: (prev: any) => any) => void;
  router: ReturnType<typeof useRouter>;
}

const TemplateCard = memo(function TemplateCard({
  tmpl,
  isHovered,
  setHoveredId,
  setEventData,
  router,
}: TemplateCardProps) {
  const eventData = { ...dummyEventData, template: tmpl.id };

  // Stable callbacks — deps are primitives or stable refs, never recreated
  const handleMouseEnter = useCallback(() => setHoveredId(tmpl.id), [tmpl.id, setHoveredId]);
  const handleMouseLeave = useCallback(() => setHoveredId(null), [setHoveredId]);
  const handleUseTemplate = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      setEventData((prev: any) => ({ ...prev, template: tmpl.id }));
      router.push("/builder");
    },
    [tmpl.id, setEventData, router]
  );

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative flex flex-col items-center w-full"
    >
      {/* Base thumbnail card */}
      <div
        className={`w-full aspect-[9/16] bg-white rounded-2xl overflow-hidden shadow-md border-4 border-white transition-all duration-300 relative cursor-pointer ${
          isHovered
            ? "ring-4 ring-primary/50"
            : "hover:shadow-xl hover:-translate-y-1"
        }`}
      >
        {/* Mini preview — IntersectionObserver handles deferred loading */}
        <LazyPreview Component={tmpl.Component} eventData={eventData} />

        {/* Transparent overlay to block accidental clicks inside mini preview */}
        <div className="absolute inset-0 z-10" />

        <div className="absolute bottom-0 left-0 w-full p-2 md:p-3 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-20 pointer-events-none">
          <p className="text-white font-bold text-xs md:text-sm truncate">
            {tmpl.name}
          </p>
        </div>
      </div>

      {/*
        Hover pop-up (scrollable full preview)
        Appears only for the single hovered card — all others skip rendering
        this subtree entirely because they receive isHovered=false.
        The inner template is also wrapped in PreviewModeProvider so timers/
        heavy animations stay off; only the scrollable preview needs to be live.
      */}
      {isHovered && (
        <div className="fixed md:absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[375px] h-[667px] max-w-[95vw] max-h-[90vh] bg-white rounded-2xl shadow-2xl z-[999] overflow-hidden flex flex-col border border-neutral-200 animate-in zoom-in-95 duration-200 cursor-auto">
          {/* Header Bar */}
          <div className="bg-neutral-900 text-white p-3 flex justify-between items-center shrink-0 shadow-md z-50">
            <h3 className="font-bold text-sm truncate mr-2">{tmpl.name}</h3>
            <button
              onClick={handleUseTemplate}
              className="px-3 py-1.5 bg-white text-black text-xs font-bold rounded-md hover:bg-neutral-200 transition shrink-0 shadow-sm"
            >
              Use Template
            </button>
          </div>

          {/*
            Scrollable content — we scale a 400% container down to 25% and enable
            overflow-y scrolling so the user can scroll through the full template.
          */}
          <div className="flex-1 relative bg-white overflow-hidden">
            <div
              className="absolute top-0 left-0 origin-top-left overflow-y-auto overflow-x-hidden bg-white [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
              style={{
                width: "400%",
                height: "400%",
                transform: "scale(0.25)",
                willChange: "transform",
              }}
            >
              {/* Hover popup shows live template (NOT preview mode) so animations run */}
              <React.Suspense fallback={<TemplateSkeleton />}>
                <tmpl.Component eventData={eventData} />
              </React.Suspense>
            </div>
          </div>
        </div>
      )}
    </div>
  );
});

// ---------------------------------------------------------------------------
// TemplatesShowcase — main page
// ---------------------------------------------------------------------------
export default function TemplatesShowcase() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const { setEventData } = useBuilder() as any;
  const router = useRouter();

  return (
    <div className="min-h-screen bg-neutral-100 p-6 md:p-12">
      <div className="max-w-[1400px] mx-auto">

        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-2">
              Template Gallery
            </h1>
            <p className="text-neutral-500 text-sm md:text-base">
              Tap or hover over any card to view and scroll the interactive preview.
            </p>
          </div>
          <Link
            href="/builder"
            className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm text-neutral-600 hover:text-black hover:shadow transition shrink-0"
          >
            <ArrowLeft size={16} /> Builder
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-8">
          {TEMPLATES.map((tmpl) => (
            <TemplateCard
              key={tmpl.id}
              tmpl={tmpl}
              isHovered={hoveredId === tmpl.id}
              setHoveredId={setHoveredId}
              setEventData={setEventData}
              router={router}
            />
          ))}
        </div>

      </div>
    </div>
  );
}
