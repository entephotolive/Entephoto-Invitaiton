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

    {eventData.eventType === "wedding" && (
  <div className="space-y-4">

    <input
      type="text"
      placeholder="Bride Name"
      value={eventData.brideName}
      onChange={(e) =>
        setEventData({
          ...eventData,
          brideName: e.target.value,
        })
      }
      className="w-full border rounded-lg p-3"
    />

    <input
      type="text"
      placeholder="Groom Name"
      value={eventData.groomName}
      onChange={(e) =>
        setEventData({
          ...eventData,
          groomName: e.target.value,
        })
      }
      className="w-full border rounded-lg p-3"
    />

    <input
      type="time"
      value={eventData.time}
      onChange={(e) =>
        setEventData({
          ...eventData,
          time: e.target.value,
        })
      }
      className="w-full border rounded-lg p-3"
    />

    <input
      type="text"
      placeholder="Wedding Address"
      value={eventData.address}
      onChange={(e) =>
        setEventData({
          ...eventData,
          address: e.target.value,
        })
      }
      className="w-full border rounded-lg p-3"
    />

  </div>
)}

    </div>
  );
}