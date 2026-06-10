"use client";

import { useBuilder } from "@/context/BuilderContext";
import BuilderSection from "@/components/builder/BuilderSection";

import {
  Users,
  CalendarDays,
  Timer,
  MapPin,
  Image,
  Images,
  Music,
  Mail,
  MessageCircle,
} from "lucide-react";

export default function WeddingForm() {
  const { eventData, setEventData } = useBuilder();

  return (
    <div className="space-y-6">

      <BuilderSection
        title="Couple Information"
        icon={<Users size={22} />}
      >

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
            className="w-full border rounded-xl p-4"
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
            className="w-full border rounded-xl p-4"
          />

        </div>

      </BuilderSection>

      <BuilderSection
        title="Wedding Schedule"
        icon={<CalendarDays size={22} />}
      >

        <div className="grid grid-cols-2 gap-4">

          <input
            type="date"
            value={eventData.date}
            onChange={(e) =>
              setEventData({
                ...eventData,
                date: e.target.value,
              })
            }
            className="border rounded-xl p-4"
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
            className="border rounded-xl p-4"
          />

        </div>

      </BuilderSection>

      <BuilderSection
        title="Countdown Timer"
        icon={<Timer size={22} />}
      >

        <label className="flex items-center gap-3">

          <input
            type="checkbox"
            checked={eventData.enableCountdown}
            onChange={(e) =>
              setEventData({
                ...eventData,
                enableCountdown: e.target.checked,
              })
            }
          />

          Enable Wedding Countdown

        </label>

      </BuilderSection>

            <BuilderSection
        title="Venue Details"
        icon={<MapPin size={22} />}
      >

        <div className="space-y-4">

          <input
            type="text"
            placeholder="Wedding Venue"
            value={eventData.venue}
            onChange={(e) =>
              setEventData({
                ...eventData,
                venue: e.target.value,
              })
            }
            className="w-full border rounded-xl p-4"
          />

          <textarea
            placeholder="Venue Address"
            rows={3}
            value={eventData.address}
            onChange={(e) =>
              setEventData({
                ...eventData,
                address: e.target.value,
              })
            }
            className="w-full border rounded-xl p-4"
          />

          <input
            type="text"
            placeholder="Google Maps Link"
            value={eventData.mapLink}
            onChange={(e) =>
              setEventData({
                ...eventData,
                mapLink: e.target.value,
              })
            }
            className="w-full border rounded-xl p-4"
          />

        </div>

      </BuilderSection>

      <BuilderSection
        title="Cover Photo"
        icon={<Image size={22} />}
      >

        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];

            if (!file) return;

            setEventData({
              ...eventData,
              heroImage: URL.createObjectURL(file),
            });
          }}
        />

      </BuilderSection>

      <BuilderSection
        title="Gallery Images"
        icon={<Images size={22} />}
      >

        <input
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => {
            const files = Array.from(
              e.target.files || []
            );

            const imageUrls = files.map((file) =>
              URL.createObjectURL(file)
            );

            setEventData({
              ...eventData,
              gallery: [
                ...eventData.gallery,
                ...imageUrls,
              ],
            });
          }}
        />

        <div className="grid grid-cols-3 gap-3 mt-4">

          {eventData.gallery.map(
            (image, index) => (
              <img
                key={index}
                src={image}
                alt=""
                className="
                  h-24
                  w-full
                  rounded-xl
                  object-cover
                "
              />
            )
          )}

        </div>

      </BuilderSection>

            <BuilderSection
        title="RSVP Settings"
        icon={<Mail size={22} />}
      >

        <label className="flex items-center gap-3">

          <input
            type="checkbox"
            checked={eventData.rsvpEnabled}
            onChange={(e) =>
              setEventData({
                ...eventData,
                rsvpEnabled: e.target.checked,
              })
            }
          />

          Enable RSVP

        </label>

      </BuilderSection>

      <BuilderSection
        title="Background Music"
        icon={<Music size={22} />}
      >

        <input
          type="file"
          accept="audio/*"
          onChange={(e) => {
            const file = e.target.files?.[0];

            if (!file) return;

            setEventData({
              ...eventData,
              musicUrl: URL.createObjectURL(file),
            });
          }}
        />

      </BuilderSection>

      <BuilderSection
        title="Guest Wishes"
        icon={<MessageCircle size={22} />}
      >

        <label className="flex items-center gap-3">

          <input
            type="checkbox"
            checked={eventData.enableGreetings}
            onChange={(e) =>
              setEventData({
                ...eventData,
                enableGreetings: e.target.checked,
              })
            }
          />

          Enable Guest Greetings

        </label>

      </BuilderSection>

    </div>
  );
}