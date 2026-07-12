"use server";

import { connectDB } from "@/lib/mongodb";
import Invitation from "@/models/Invitation";
import Rsvp from "@/models/Rsvp";
import GuestWish from "@/models/GuestWish";

export async function submitRsvp(data: { slug: string, name: string, guests: number, message: string, attending: boolean }) {
  try {
    const { slug, name, guests, message, attending } = data;

    if (!name) {
      return { success: false, error: "Name is required" };
    }

    if (!slug || slug === "preview") {
      // Simulate success for builder preview where slug is empty
      return { success: true };
    }

    await connectDB();

    const invitation = await Invitation.findOne({ slug });
    if (!invitation) {
      return { success: false, error: "Invitation not found" };
    }

    await Rsvp.create({
      invitationId: invitation._id,
      name,
      guestCount: guests || 1,
      message: message || "",
      status: attending ? "ATTENDING" : "NOT_ATTENDING",
    });

    return { success: true };
  } catch (error: any) {
    console.error("[RSVP Server Action Error]", error);
    return { success: false, error: "Internal Server Error" };
  }
}

export async function submitWish(data: { slug: string, name: string, message: string }) {
  try {
    const { slug, name, message } = data;

    if (!name || !message) {
      return { success: false, error: "Name and message are required" };
    }

    if (!slug || slug === "preview") {
      // Simulate success for builder preview where slug is empty
      return { success: true };
    }

    await connectDB();

    const invitation = await Invitation.findOne({ slug });
    if (!invitation) {
      return { success: false, error: "Invitation not found" };
    }

    await GuestWish.create({
      invitationId: invitation._id,
      name,
      message,
    });

    return { success: true };
  } catch (error: any) {
    console.error("[GuestWish Server Action Error]", error);
    return { success: false, error: "Internal Server Error" };
  }
}
