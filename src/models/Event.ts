import mongoose from "mongoose";

const EventSchema =
  new mongoose.Schema(
    {
      slug: String,

      brideName: String,
      groomName: String,

      date: String,
      time: String,

      venue: String,
      address: String,
      mapLink: String,

      heroImage: String,

      gallery: [String],

      musicUrl: String,

      enableCountdown: Boolean,
      enableGreetings: Boolean,
      rsvpEnabled: Boolean,
    },
    {
      timestamps: true,
    }
  );

export default
  mongoose.models.Event ||
  mongoose.model(
    "Event",
    EventSchema
  );