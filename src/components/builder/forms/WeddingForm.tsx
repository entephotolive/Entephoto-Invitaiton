"use client";

import { useState, useEffect, useRef } from "react";
import { useBuilder } from "@/context/BuilderContext";
import WeddingDetailsTab from "./tabs/WeddingDetailsTab";
import WeddingModulesTab from "./tabs/WeddingModulesTab";
import WeddingMediaTab from "./tabs/WeddingMediaTab";

interface WeddingFormProps {
  activeTab: "details" | "modules" | "media";
}

export default function WeddingForm({ activeTab }: WeddingFormProps) {
  const { eventData: globalEventData, setEventData: setGlobalEventData } = useBuilder() as any;

  // Local copy keeps form inputs snappy — changes propagate to global after 500ms
  const [eventData, setEventData] = useState<any>(globalEventData);
  
  // Track the last value we pushed to the global context to differentiate
  // between our own changes and external changes (e.g. TemplatePicker)
  const lastPushedGlobal = useRef(globalEventData);

  // Global → Local: sync when context changes externally (e.g. draft load or TemplatePicker)
  useEffect(() => {
    if (globalEventData !== lastPushedGlobal.current) {
      setEventData(globalEventData);
      lastPushedGlobal.current = globalEventData;
    }
  }, [globalEventData]);

  // Local → Global: debounce at 500ms to avoid mid-keystroke re-renders
  useEffect(() => {
    if (eventData === lastPushedGlobal.current) return;

    const timer = setTimeout(() => {
      lastPushedGlobal.current = eventData;
      setGlobalEventData(eventData);
    }, 500);
    return () => clearTimeout(timer);
  }, [eventData, setGlobalEventData]);

  const tabProps = { eventData, setEventData };

  return (
    <div className="space-y-6">
      {activeTab === "details" && <WeddingDetailsTab {...tabProps} />}
      {activeTab === "modules" && <WeddingModulesTab {...tabProps} />}
      {activeTab === "media"   && <WeddingMediaTab   {...tabProps} />}
    </div>
  );
}
