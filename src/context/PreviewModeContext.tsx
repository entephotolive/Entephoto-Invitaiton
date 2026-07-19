"use client";

import React, { createContext, useContext } from "react";

/**
 * PreviewModeContext
 *
 * When `isPreview` is true, template components should:
 * - Skip useCountdown setIntervals (return static zeros)
 * - Skip Framer Motion whileInView / entrance animations
 * - Skip any heavy side-effects that are unnecessary for a thumbnail
 *
 * This context is provided by the TemplatesShowcase page wrapper around
 * each LazyPreview card. Individual template components read it via
 * the usePreviewMode() hook.
 */
const PreviewModeContext = createContext<boolean>(false);

export function PreviewModeProvider({
  children,
  isPreview = false,
}: {
  children: React.ReactNode;
  isPreview?: boolean;
}) {
  return (
    <PreviewModeContext.Provider value={isPreview}>
      {children}
    </PreviewModeContext.Provider>
  );
}

/**
 * usePreviewMode
 * Returns true when the component is rendered inside a preview card thumbnail.
 */
export function usePreviewMode(): boolean {
  return useContext(PreviewModeContext);
}
