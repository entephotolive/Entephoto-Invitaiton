"use client";

import { useState } from "react";

interface Wish {
  name: string;
  message: string;
}

export default function WishesSection() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [wishes, setWishes] = useState<Wish[]>([]);

  const handleSubmit = () => {
    if (!name || !message) return;

    setWishes([
      ...wishes,
      {
        name,
        message,
      },
    ]);

    setName("");
    setMessage("");
  };

  return (
    <section className="max-w-4xl mx-auto py-24 px-6">
      <h2 className="text-4xl font-serif text-center mb-10">
        Guest Wishes
      </h2>

      <div className="bg-white rounded-3xl shadow p-8">

        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border rounded-xl p-4 mb-4"
        />

        <textarea
          placeholder="Write your wishes..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full border rounded-xl p-4 mb-4"
          rows={4}
        />

        <button
          onClick={handleSubmit}
          className="
            bg-rose-500
            text-white
            px-6
            py-3
            rounded-xl
          "
        >
          Send Wish
        </button>

      </div>

      <div className="mt-10 space-y-4">
        {wishes.map((wish, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl p-5 border"
          >
            <h4 className="font-semibold">
              {wish.name}
            </h4>

            <p className="text-zinc-600 mt-2">
              {wish.message}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}