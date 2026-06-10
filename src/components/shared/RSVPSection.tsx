"use client";

import { useState } from "react";

export default function RSVPSection() {
  const [name, setName] = useState("");
  const [attending, setAttending] = useState("yes");
  const [guests, setGuests] = useState(1);

  const handleSubmit = () => {
    alert(
      `RSVP Submitted!\nName: ${name}\nAttending: ${attending}\nGuests: ${guests}`
    );

    // Later:
    // Save to database
  };

  return (
    <section className="max-w-3xl mx-auto py-20 px-6">
      <h2 className="text-4xl font-serif text-center mb-10 text-[#43372f]">
        ATTENDING
      </h2>

      <div className="bg-white rounded-3xl shadow-lg p-8 border">

        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="
            w-full
            border
            rounded-xl
            p-4
            mb-4
            focus:outline-none
            focus:ring-2
            focus:ring-rose-300
          "
        />

        <select
          value={attending}
          onChange={(e) => setAttending(e.target.value)}
          className="
            w-full
            border
            rounded-xl
            p-4
            mb-4
            focus:outline-none
            focus:ring-2
            focus:ring-rose-300
          "
        >
          <option value="yes">
            Will Attend
          </option>

          <option value="no">
            Not Attend
          </option>
        </select>

        <input
          type="number"
          min={1}
          value={guests}
          onChange={(e) =>
            setGuests(Number(e.target.value))
          }
          placeholder="Number of Guests"
          className="
            w-full
            border
            rounded-xl
            p-4
            mb-6
            focus:outline-none
            focus:ring-2
            focus:ring-rose-300
          "
        />

        <button
          onClick={handleSubmit}
          className="
            w-full
            bg-rose-500
            hover:bg-rose-600
            text-white
            py-4
            rounded-xl
            font-medium
            transition
          "
        >
          Submit 
        </button>

      </div>
    </section>
  );
}