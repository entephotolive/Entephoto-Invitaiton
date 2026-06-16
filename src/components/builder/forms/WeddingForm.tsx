"use client";

import { useBuilder } from "@/context/BuilderContext";
import BuilderSection from "@/components/builder/BuilderSection";
import TemplatePicker from "../TemplatePicker";

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
  Heart,
} from "lucide-react";

export default function WeddingForm() {
  const { eventData, setEventData } = useBuilder();

  return (
    <div className="space-y-6">
        <TemplatePicker />

      {/* Couple Information */}

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

      {/* Love Story */}

      <BuilderSection
        title="Love Story"
        icon={<Heart size={22} />}
      >

        {eventData.loveStory.map(
          (story, index) => (
            <div
  key={index}
  className="border rounded-xl p-4 mb-4"
>

  <div className="flex justify-between items-center mb-4">
    <h3 className="font-semibold">
      Story {index + 1}
    </h3>

    {eventData.loveStory.length > 1 && (
      <button
        type="button"
        onClick={() => {
          const updatedStories =
            eventData.loveStory.filter(
              (_, i) => i !== index
            );

          setEventData({
            ...eventData,
            loveStory: updatedStories,
          });
        }}
        className="
          px-3
          py-2
          bg-red-500
          hover:bg-red-600
          text-white
          rounded-lg
          text-sm
        "
      >
        Remove
      </button>
    )}
  </div>

              <input
                type="text"
                placeholder="Story Title"
                value={story.title}
                onChange={(e) => {
                  const updated = [
                    ...eventData.loveStory,
                  ];

                  updated[index].title =
                    e.target.value;

                  setEventData({
                    ...eventData,
                    loveStory: updated,
                  });
                }}
                className="w-full border rounded-xl p-3 mb-3"
              />

              <input
                type="text"
                placeholder="Subtitle"
                value={story.subtitle}
                onChange={(e) => {
                  const updated = [
                    ...eventData.loveStory,
                  ];

                  updated[index].subtitle =
                    e.target.value;

                  setEventData({
                    ...eventData,
                    loveStory: updated,
                  });
                }}
                className="w-full border rounded-xl p-3 mb-3"
              />

              <textarea
                rows={4}
                placeholder="Story Description"
                value={story.description}
                onChange={(e) => {
                  const updated = [
                    ...eventData.loveStory,
                  ];

                  updated[index].description =
                    e.target.value;

                  setEventData({
                    ...eventData,
                    loveStory: updated,
                  });
                }}
                className="w-full border rounded-xl p-3 mb-3"
              />

              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file =
                    e.target.files?.[0];

                  if (!file) return;

                  const updated = [
                    ...eventData.loveStory,
                  ];

                  updated[index].image =
                    URL.createObjectURL(file);

                  setEventData({
                    ...eventData,
                    loveStory: updated,
                  });
                }}
              />

            </div>
          )
        )}

        <button
          onClick={() =>
            setEventData({
              ...eventData,
              loveStory: [
                ...eventData.loveStory,
                {
                  title: "",
                  subtitle: "",
                  description: "",
                  image: "",
                },
              ],
            })
          }
          className="
          px-4 py-2
          bg-pink-500
          text-white
          rounded-xl
          "
        >
          + Add Story
        </button>

      </BuilderSection>

            {/* Wedding Schedule */}

      <BuilderSection
        title="Wedding Schedule"
        icon={<CalendarDays size={22} />}
      >

        {eventData.schedule.map(
          (item, index) => (
            <div
              key={index}
              className="border rounded-xl p-4 mb-4"
            >

              <input
                type="text"
                placeholder="Event Title"
                value={item.title}
                onChange={(e) => {
                  const updated = [
                    ...eventData.schedule,
                  ];

                  updated[index].title =
                    e.target.value;

                  setEventData({
                    ...eventData,
                    schedule: updated,
                  });
                }}
                className="w-full border rounded-xl p-3 mb-3"
              />

              <input
                type="text"
                placeholder="Time"
                value={item.time}
                onChange={(e) => {
                  const updated = [
                    ...eventData.schedule,
                  ];

                  updated[index].time =
                    e.target.value;

                  setEventData({
                    ...eventData,
                    schedule: updated,
                  });
                }}
                className="w-full border rounded-xl p-3 mb-3"
              />

              <textarea
                rows={3}
                placeholder="Description"
                value={item.description}
                onChange={(e) => {
                  const updated = [
                    ...eventData.schedule,
                  ];

                  updated[index].description =
                    e.target.value;

                  setEventData({
                    ...eventData,
                    schedule: updated,
                  });
                }}
                className="w-full border rounded-xl p-3"
              />

            </div>
          )
        )}

        <button
          onClick={() =>
            setEventData({
              ...eventData,
              schedule: [
                ...eventData.schedule,
                {
                  title: "",
                  time: "",
                  description: "",
                },
              ],
            })
          }
          className="
          px-4 py-2
          bg-pink-500
          text-white
          rounded-xl
          "
        >
          + Add Schedule Event
        </button>

      </BuilderSection>

      {/* Wedding Date */}

      <BuilderSection
        title="Wedding Date"
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

      {/* Countdown */}

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
                enableCountdown:
                  e.target.checked,
              })
            }
          />

          Enable Wedding Countdown

        </label>

      </BuilderSection>

      {/* Venue */}

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
            rows={3}
            placeholder="Venue Address"
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

            {/* Hero Image */}

      <BuilderSection
        title="Cover Photo"
        icon={<Image size={22} />}
      >

        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file =
              e.target.files?.[0];

            if (!file) return;

            setEventData({
              ...eventData,
              heroImage:
                URL.createObjectURL(file),
            });
          }}
        />

        {eventData.heroImage && (
          <img
            src={eventData.heroImage}
            alt=""
            className="
              mt-4
              w-full
              h-52
              object-cover
              rounded-xl
            "
          />
        )}

      </BuilderSection>

      {/* Gallery */}

      <BuilderSection
        title="Gallery Images"
        icon={<Images size={22} />}
      >

        <input
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => {

            const files =
              Array.from(
                e.target.files || []
              );

            const urls =
              files.map((file) =>
                URL.createObjectURL(file)
              );

            setEventData({
              ...eventData,
              gallery: [
                ...eventData.gallery,
                ...urls,
              ],
            });

          }}
        />

        <div
          className="
            grid
            grid-cols-3
            gap-3
            mt-4
          "
        >

          {eventData.gallery.map(
            (image, index) => (
              <img
                key={index}
                src={image}
                alt=""
                className="
                  h-24
                  w-full
                  object-cover
                  rounded-xl
                "
              />
            )
          )}

        </div>

      </BuilderSection>

      {/* RSVP */}

      <BuilderSection
        title="RSVP Settings"
        icon={<Mail size={22} />}
      >

        <label
          className="
            flex
            items-center
            gap-3
          "
        >

          <input
            type="checkbox"
            checked={
              eventData.rsvpEnabled
            }
            onChange={(e) =>
              setEventData({
                ...eventData,
                rsvpEnabled:
                  e.target.checked,
              })
            }
          />

          Enable RSVP Form

        </label>

      </BuilderSection>

      {/* Background Music */}

      <BuilderSection
        title="Background Music"
        icon={<Music size={22} />}
      >

        <input
          type="file"
          accept="audio/*"
          onChange={(e) => {

            const file =
              e.target.files?.[0];

            if (!file) return;

            setEventData({
              ...eventData,
              musicUrl:
                URL.createObjectURL(file),
            });

          }}
        />

      </BuilderSection>

      {/* Guest Wishes */}

      <BuilderSection
        title="Guest Wishes"
        icon={
          <MessageCircle size={22} />
        }
      >

        <label
          className="
            flex
            items-center
            gap-3
          "
        >

          <input
            type="checkbox"
            checked={
              eventData.enableGreetings
            }
            onChange={(e) =>
              setEventData({
                ...eventData,
                enableGreetings:
                  e.target.checked,
              })
            }
          />

          Enable Guest Wishes

        </label>

      </BuilderSection>

    </div>
  );
}