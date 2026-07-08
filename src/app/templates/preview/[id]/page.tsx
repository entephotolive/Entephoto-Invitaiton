"use client";

import React, { use } from "react";
import { dummyEventData, TEMPLATES } from "../../page";

export default function PreviewPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const template = TEMPLATES.find((t) => t.id === resolvedParams.id);

  if (!template) {
    return (
      <div className="flex h-screen items-center justify-center bg-white text-black">
        Template not found
      </div>
    );
  }

  const Component = template.Component;
  
  return (
    <>
      <style>{`
        body {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        body::-webkit-scrollbar {
          display: none;
        }
      `}</style>
      <div className="w-full min-h-screen bg-white">
        <Component eventData={{ ...dummyEventData, template: template.id }} />
      </div>
    </>
  );
}
