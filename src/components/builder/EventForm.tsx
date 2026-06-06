"use client";

import { useBuilder } from "@/context/BuilderContext";

export default function EventForm() {
  const { eventData, setEventData } = useBuilder();

  return (
    <div className="space-y-4">

      <input
        type="text"
        placeholder="Event Title"
        value={eventData.title}
        onChange={(e) =>
          setEventData({
            ...eventData,
            title: e.target.value,
          })
        }
        className="w-full border rounded-lg p-3"
      />

      <input
        type="text"
        placeholder="Host Name"
        value={eventData.host}
        onChange={(e) =>
          setEventData({
            ...eventData,
            host: e.target.value,
          })
        }
        className="w-full border rounded-lg p-3"
      />

      <input
        type="date"
        value={eventData.date}
        onChange={(e) =>
          setEventData({
            ...eventData,
            date: e.target.value,
          })
        }
        className="w-full border rounded-lg p-3"
      />

      <input
        type="text"
        placeholder="Venue"
        value={eventData.venue}
        onChange={(e) =>
          setEventData({
            ...eventData,
            venue: e.target.value,
          })
        }
        className="w-full border rounded-lg p-3"
      />

      <textarea
        placeholder="Description"
        value={eventData.description}
        onChange={(e) =>
          setEventData({
            ...eventData,
            description: e.target.value,
          })
        }
        className="w-full border rounded-lg p-3"
        rows={4}
      />

      <input
        type="text"
        placeholder="Hero Image URL"
        value={eventData.heroImage}
        onChange={(e) =>
          setEventData({
            ...eventData,
            heroImage: e.target.value,
          })
        }
        className="w-full border rounded-lg p-3"
      />

      <input
        type="text"
        placeholder="Ente Photo Album URL"
        value={eventData.entePhotoLink}
        onChange={(e) =>
          setEventData({
            ...eventData,
            entePhotoLink: e.target.value,
          })
        }
        className="w-full border rounded-lg p-3"
      />

    </div>
  );
}