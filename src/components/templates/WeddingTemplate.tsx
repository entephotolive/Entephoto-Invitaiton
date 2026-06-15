"use client";

import { useBuilder } from "@/context/BuilderContext";
import WeddingPremiumTemplate from "@/components/templates/wedding-premium/WeddingPremiumTemplate";

export default function WeddingTemplate() {
  const { eventData } = useBuilder();

  return (
    <WeddingPremiumTemplate
      eventData={eventData}
    />
  );
}