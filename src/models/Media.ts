import mongoose, { Schema, Document } from "mongoose";

export interface IMedia extends Document {
  userId: string;
  url: string;
  key: string;
  name: string;
  type: string;
  size: number;
  createdAt: Date;
}

const MediaSchema = new Schema<IMedia>(
  {
    userId: { type: String, required: true, index: true },
    url: { type: String, required: true },
    key: { type: String, required: true },
    name: { type: String, required: true },
    type: { type: String, required: true },
    size: { type: Number, required: true },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

export default mongoose.models.Media || mongoose.model<IMedia>("Media", MediaSchema);
