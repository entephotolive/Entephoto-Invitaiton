import mongoose, { Schema, Document } from "mongoose";

/**
 * Invitation Mongoose model — mirrored from invitation-api/models/Invitation.ts
 * Uses the same MongoDB collection ("invitations") as the external API.
 */
export interface IInvitation extends Document {
  userId?: string;
  brideName?: string;
  groomName?: string;
  slug: string;
  coverPhoto?: string;
  weddingDate?: Date;
  weddingTime?: string;
  musicUrl?: string;
  gallery?: string[];
  loveStory?: {
    title: string;
    subtitle: string;
    description: string;
  }[];
  weddingSchedule?: {
    ceremony: string;
    time: string;
    description: string;
  }[];
  venueDetails?: {
    venueName: string;
    address: string;
    googleMapLink: string;
  };
  rsvpSettings?: {
    enabled: boolean;
  };
  guestWishesSettings?: {
    enabled: boolean;
  };
  template?: {
    templateId: string;
    templateName: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const InvitationSchema: Schema = new Schema(
  {
    userId: { type: String, required: false },
    brideName: { type: String },
    groomName: { type: String },
    slug: { type: String, required: true, unique: true },
    coverPhoto: { type: String },
    weddingDate: { type: Date },
    weddingTime: { type: String },
    musicUrl: { type: String, required: false },
    gallery: [{ type: String }],
    loveStory: [
      {
        title: { type: String },
        subtitle: { type: String },
        description: { type: String },
      },
    ],
    weddingSchedule: [
      {
        ceremony: { type: String },
        time: { type: String },
        description: { type: String },
      },
    ],
    venueDetails: {
      venueName: { type: String },
      address: { type: String },
      googleMapLink: { type: String },
    },
    rsvpSettings: {
      enabled: { type: Boolean, default: true },
    },
    guestWishesSettings: {
      enabled: { type: Boolean, default: true },
    },
    template: {
      templateId: { type: String },
      templateName: { type: String },
    },
  },
  {
    timestamps: true,
  }
);

// Prevent model recompilation in Next.js dev mode (hot reload)
const Invitation =
  mongoose.models.Invitation ||
  mongoose.model<IInvitation>("Invitation", InvitationSchema);

export default Invitation;
