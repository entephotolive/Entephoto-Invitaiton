"use client";

import { useBuilder } from "@/context/BuilderContext";

import WeddingPremiumTemplate from "./wedding/wedding-premium/WeddingPremiumTemplate";
import WeddingRoyalTemplate from "./wedding/wedding-royal/WeddingRoyalTemplate";
import WeddingBlackGoldTemplate from "./wedding/wedding-blackgold/WeddingBlackGoldTemplate";
import WeddingOceanica from "./wedding/wedding-ocianica"; // Make sure this path is correct
import TraditionalTemplate from "./wedding/wedding-traditional";
import ModernTemplate from "./wedding/wedding-modern";

export default function WeddingTemplate() {
  const { eventData } = useBuilder();

  switch (eventData.template) {
    case "blackgold":
      return (
        <WeddingBlackGoldTemplate
          eventData={eventData}
        />
      );

      case "traditional":
      return (
        <TraditionalTemplate
          eventData={eventData}
        />
      );
   
      case "modern":
      return (
        <ModernTemplate
          eventData={eventData}
        />
      );
    
      
    case "royal":
      return (
        <WeddingRoyalTemplate
          eventData={eventData}
        />
      );

    case "oceanica":
      return (
        <WeddingOceanica
          eventData={eventData}
        />
      );

    case "premium":
    default:
      return (
        <WeddingPremiumTemplate
          eventData={eventData}
        />
      );
  }
}