"use client";

import { useState, useEffect } from "react";
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

  // Global → Local: sync when context changes externally (e.g. draft load)
  useEffect(() => {
    const globalStr = JSON.stringify(globalEventData);
    const localStr  = JSON.stringify(eventData);
    if (globalStr !== localStr) setEventData(globalEventData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [globalEventData]);

  // Local → Global: debounce at 500ms to avoid mid-keystroke re-renders
  useEffect(() => {
    const globalStr = JSON.stringify(globalEventData);
    const localStr  = JSON.stringify(eventData);
    if (globalStr === localStr) return;

    const timer = setTimeout(() => setGlobalEventData(eventData), 500);
    return () => clearTimeout(timer);
  }, [eventData, globalEventData, setGlobalEventData]);

  const tabProps = { eventData, setEventData };

  return (
    <div className="space-y-6">
      {activeTab === "details" && <WeddingDetailsTab {...tabProps} />}
      {activeTab === "modules" && <WeddingModulesTab {...tabProps} />}
      {activeTab === "media"   && <WeddingMediaTab   {...tabProps} />}
    </div>
  );
}
