"use client";

import { useState } from "react";

export default function RSVPSection() {
  const [name, setName] = useState("");
  const [status, setStatus] = useState("attending");
  const [guests, setGuests] = useState(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    alert(
      `Thank you ${name}! RSVP Submitted.`
    );

    setName("");
    setGuests(1);
    setStatus("attending");
  };

  return (
    <section
      id="rsvp"
      className="py-24 bg-white"
    >
      <div className="max-w-3xl mx-auto px-6">

        <div className="text-center mb-16">

          <p className="text-rose-500 uppercase tracking-[4px] mb-3 font-heading text-5xl">
            Join Us
          </p>

         

        </div>

        <form
          onSubmit={handleSubmit}
          className="
            bg-[#fffaf7]
            rounded-[32px]
            border
            p-8
            md:p-12
            shadow-sm
          "
        >

          <div className="space-y-6">

            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              required
              className="
                w-full
                rounded-2xl
                border
                p-4
                outline-none
              "
            />

            <select
              value={status}
              onChange={(e) =>
                setStatus(e.target.value)
              }
              className="
                w-full
                rounded-2xl
                border
                p-4
              "
            >
              <option value="attending">
                Will Attend
              </option>

              <option value="not-attending">
                Cannot Attend
              </option>
            </select>

            <input
              type="number"
              min={1}
              value={guests}
              onChange={(e) =>
                setGuests(
                  Number(e.target.value)
                )
              }
              className="
                w-full
                rounded-2xl
                border
                p-4
              "
            />

            <button
              type="submit"
              className="
                w-full
                bg-rose-500
                hover:bg-rose-600
                text-white
                py-4
                rounded-2xl
                transition
              "
            >
              Submit 
            </button>

          </div>

        </form>

      </div>
    </section>
  );
}