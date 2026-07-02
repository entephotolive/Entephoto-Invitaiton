import React, { useState } from "react";
import { useBuilder } from "@/context/BuilderContext";
import EventTypeSelector from "./EventTypeSelector";
import WeddingForm from "./forms/WeddingForm";

export default function EventForm() {
  const { eventData } = useBuilder() as any;
  
  // Typing this state strictly fixes the assignment error!
  const [activeTab, setActiveTab] = useState<"details" | "modules" | "media">("details"); 

  const renderFormContent = () => {
    const currentType = eventData?.eventType;

    if (!currentType) {
      return (
        <div className="text-center py-8 text-gray-500">
          Please select an event type above to get started.
        </div>
      );
    }

    if (currentType === "wedding") {
      return <WeddingForm activeTab={activeTab} />; 
    }

    return (
      <div className="p-12 text-center border-2 border-dashed border-gray-200 rounded-2xl bg-white shadow-sm">
        <div className="text-4xl">🚀</div>
        <h3 className="text-xl font-bold text-gray-800 capitalize mt-4">
          {currentType} Invitations
        </h3>
        <p className="text-gray-500 mt-2 max-w-sm mx-auto">
          We are putting the finishing touches on this section. This feature is coming soon!
        </p>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <EventTypeSelector />
      <div className="mt-6">
        {renderFormContent()}
      </div>
    </div>
  );
}