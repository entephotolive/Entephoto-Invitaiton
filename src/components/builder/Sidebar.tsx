"use client";

import EventForm from "./EventForm";
import TemplatePicker from "./TemplatePicker";

export default function Sidebar() {
  return (
    <div className="p-6 space-y-8">
      <h1 className="text-3xl font-bold">
        Event Builder
      </h1>

      <TemplatePicker />

      <EventForm />
    </div>
  );
}