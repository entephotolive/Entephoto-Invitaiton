"use client";

import { useBuilder } from "@/context/BuilderContext";

import WeddingPremiumTemplate from "./wedding/wedding-premium/WeddingPremiumTemplate";
import WeddingRoyalTemplate from "./wedding/wedding-royal/WeddingRoyalTemplate";
import WeddingBlackGoldTemplate from "./wedding/wedding-blackgold/WeddingBlackGoldTemplate";
import WeddingOceanica from "./wedding/wedding-ocianica"; 
import TraditionalTemplate from "./wedding/wedding-traditional";
import ModernTemplate from "./wedding/wedding-modern";

// Define an interface for incoming properties
interface WeddingTemplateProps {
  eventData?: any; 
}

export default function WeddingTemplate({ eventData: passedEventData }: WeddingTemplateProps) {
  const { eventData: contextEventData } = useBuilder();

  // If a public data object is passed via props, use it; otherwise, fall back to context
  const eventData = passedEventData || contextEventData;

  // Clean the string so "wedding-royal" or "royal" both reduce safely down to "royal"
  const templateKey = eventData?.template ? eventData.template.replace("wedding-", "") : "premium";

  switch (templateKey) {
    case "blackgold":
      return <WeddingBlackGoldTemplate eventData={eventData} />;

    case "traditional":
      return <TraditionalTemplate eventData={eventData} />;
   
    case "modern":
      return <ModernTemplate eventData={eventData} />;
    
    case "royal":
      return <WeddingRoyalTemplate eventData={eventData} />;

    case "oceanica":
    case "ocianica":
      return <WeddingOceanica eventData={eventData} />;

    case "premium":
    default:
      return <WeddingPremiumTemplate eventData={eventData} />;
  }
}