import mongoose, { Schema, Document } from "mongoose";

export interface IRsvp extends Document {
  invitationId: mongoose.Types.ObjectId;
  name: string;
  guestCount: number;
  message?: string;
  status: "ATTENDING" | "NOT_ATTENDING";
  createdAt: Date;
  updatedAt: Date;
}

const RsvpSchema: Schema = new Schema(
  {
    invitationId: { type: Schema.Types.ObjectId, ref: "Invitation", required: true },
    name: { type: String, required: true },
    guestCount: { type: Number, required: true, default: 1 },
    message: { type: String },
    status: { type: String, enum: ["ATTENDING", "NOT_ATTENDING"], required: true },
  },
  {
    timestamps: true,
  }
);

// Prevent model recompilation in Next.js dev mode (hot reload)
const Rsvp =
  mongoose.models.Rsvp ||
  mongoose.model<IRsvp>("Rsvp", RsvpSchema);

export default Rsvp;
