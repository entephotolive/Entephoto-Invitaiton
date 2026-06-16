"use client";

import { useBuilder } from "@/context/BuilderContext";

import WeddingPremiumTemplate from "./wedding-premium/WeddingPremiumTemplate";
import WeddingRoyalTemplate from "./wedding-royal/WeddingRoyalTemplate";
import WeddingBlackGoldTemplate from "./wedding-blackgold/WeddingBlackGoldTemplate";

export default function WeddingTemplate() {
  const { eventData } = useBuilder();

  switch (eventData.template) {
    case "blackgold":
      return (
        <WeddingBlackGoldTemplate
          eventData={eventData}
        />
      );

    case "royal":
      return (
        <WeddingRoyalTemplate
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