"use client";

import React, { Suspense } from "react";
import { TEMPLATES, dummyEventData } from "@/lib/templates";
import { useBuilder } from "@/context/BuilderContext";

export default function TemplatePicker() {
  const { eventData, setEventData } = useBuilder();

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">
        Templates
      </h2>

      <div className="grid grid-cols-1 gap-4">

        {TEMPLATES.map((template) => (
          <div
            key={template.id}
            onClick={() =>
              setEventData({
                ...eventData,
                template: template.id,
              })
            }
            className={`
              border rounded-xl overflow-hidden cursor-pointer
              transition-all
              ${
                eventData.template === template.id
                  ? "border-pink-500 ring-2 ring-pink-500"
                  : "border-gray-200"
              }
            `}
          >
            <div className="w-full h-40 overflow-hidden relative bg-white pointer-events-none rounded-t-xl flex justify-center">
              <div 
                className="w-[400px] h-[800px] origin-top bg-white"
                style={{ transform: "scale(0.35)", transformOrigin: "top center" }}
              >
                <Suspense fallback={
                  <div className="w-full h-[800px] flex items-center justify-center bg-zinc-50 animate-pulse">
                    <span className="text-zinc-400 text-sm font-medium">Loading Template...</span>
                  </div>
                }>
                  <template.Component eventData={dummyEventData as any} />
                </Suspense>
              </div>
            </div>

            <div className="p-3 text-left">
              <h3 className="font-medium">
                {template.name}
              </h3>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
}