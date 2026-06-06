"use client";

import { templates } from "@/lib/templates";
import { useBuilder } from "@/context/BuilderContext";

export default function TemplatePicker() {
  const { eventData, setEventData } = useBuilder();

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">
        Templates
      </h2>

      <div className="grid grid-cols-3 gap-3">

        {templates.map((template) => (
          <button
            key={template.id}
            onClick={() =>
              setEventData({
                ...eventData,
                template: template.id as any,
              })
            }
            className={`border rounded-lg p-3 transition
              ${
                eventData.template === template.id
                  ? "border-black bg-black text-white"
                  : ""
              }`}
          >
            {template.name}
          </button>
        ))}

      </div>
    </div>
  );
}