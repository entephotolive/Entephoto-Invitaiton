"use client";

import { useBuilder } from "@/context/BuilderContext";

export default function PublishButton() {
  const { eventData, setEventData } =
    useBuilder();

  const handlePublish = async () => {
    try {
      const response = await fetch(
        "/api/events",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify(
            eventData
          ),
        }
      );

      const data =
        await response.json();

      if (!data.success) {
        alert(
          "Failed to publish"
        );
        return;
      }

      const shareLink =
        `${window.location.origin}/event/${data.slug}`;

      setEventData({
        ...eventData,
        slug: data.slug,
        shareLink,
      });

      await navigator.clipboard.writeText(
        shareLink
      );

      alert(
        `Published Successfully!\n\n${shareLink}`
      );
    } catch (error) {
      console.error(error);

      alert(
        "Something went wrong"
      );
    }
  };

  return (
    <button
      onClick={handlePublish}
      className="
        bg-rose-500
        hover:bg-rose-600
        text-white
        px-6
        py-3
        rounded-xl
        font-medium
      "
    >
      Publish
    </button>
  );
}