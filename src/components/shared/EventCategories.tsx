export default function EventCategories() {
  const events = [
    "Wedding",
    "Birthday",
    "Engagement",
    "Festival",
    "Corporate",
    "Graduation",
  ];

  return (
    <section
      id="categories"
      className="py-32 bg-zinc-50"
    >
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-center text-5xl font-bold mb-20">
          Event Categories
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          {events.map((event) => (
            <div
              key={event}
              className="rounded-3xl bg-white p-10 shadow-lg hover:-translate-y-2 transition"
            >
              <h3 className="text-2xl font-bold">
                {event}
              </h3>

              <p className="mt-4 text-zinc-600">
                Create stunning {event.toLowerCase()} websites
                and share them with your guests.
              </p>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}