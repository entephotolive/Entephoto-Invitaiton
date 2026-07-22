import mongoose, { Schema, Document } from "mongoose";

export interface IGuestWish extends Document {
  invitationId: mongoose.Types.ObjectId;
  name: string;
  message: string;
  createdAt: Date;
  updatedAt: Date;
}

const GuestWishSchema: Schema = new Schema(
  {
    invitationId: { type: Schema.Types.ObjectId, ref: "Invitation", required: true },
    name: { type: String, required: true },
    message: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

GuestWishSchema.index({ invitationId: 1 });

// Prevent model recompilation in Next.js dev mode (hot reload)
const GuestWish =
  mongoose.models.GuestWish ||
  mongoose.model<IGuestWish>("GuestWish", GuestWishSchema);

export default GuestWish;
