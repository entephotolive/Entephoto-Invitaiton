"use server";

import { connectDB } from "@/lib/mongodb";
import Invitation from "@/models/Invitation";
import Rsvp from "@/models/Rsvp";
import GuestWish from "@/models/GuestWish";
import { headers } from "next/headers";
import { checkRsvpRateLimit, checkWishRateLimit } from "@/lib/ratelimit";
import { rsvpSchema, wishSchema } from "@/lib/validations/guest";

// ---------------------------------------------------------------------------
// submitRsvp
// ---------------------------------------------------------------------------

export async function submitRsvp(data: {
  slug: string;
  name: string;
  guests: number;
  message: string;
  attending: boolean;
}) {
  try {
    // VULN-08: Validate the incoming payload with Zod before touching the DB.
    const parsed = rsvpSchema.safeParse(data);
    if (!parsed.success) {
      return {
        success: false,
        error: "Validation failed",
        fieldErrors: parsed.error.flatten().fieldErrors,
      };
    }
    const { slug, name, guests, message, attending } = parsed.data;

    // VULN-06: Redis-backed rate limiter (multi-instance safe).
    // Falls back to allow-all when UPSTASH env vars are not configured.
    const hdrs = await Promise.resolve(headers());
    const ip = hdrs.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    const rl = await checkRsvpRateLimit(ip);
    if (!rl.success) {
      return { success: false, error: "Too many requests. Please try again later." };
    }

    if (!slug || slug === "preview") {
      // Simulate success for builder preview where slug is not a real invitation.
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
      guestCount: guests,
      message,
      status: attending ? "ATTENDING" : "NOT_ATTENDING",
    });

    return { success: true };
  } catch (error: unknown) {
    console.error("[RSVP Server Action Error]", error);
    return { success: false, error: "Internal Server Error" };
  }
}

// ---------------------------------------------------------------------------
// submitWish
// ---------------------------------------------------------------------------

export async function submitWish(data: {
  slug: string;
  name: string;
  message: string;
}) {
  try {
    // VULN-08: Validate the incoming payload with Zod before touching the DB.
    const parsed = wishSchema.safeParse(data);
    if (!parsed.success) {
      return {
        success: false,
        error: "Validation failed",
        fieldErrors: parsed.error.flatten().fieldErrors,
      };
    }
    const { slug, name, message } = parsed.data;

    // VULN-06: Redis-backed rate limiter (multi-instance safe).
    const hdrs = await Promise.resolve(headers());
    const ip = hdrs.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    const rl = await checkWishRateLimit(ip);
    if (!rl.success) {
      return { success: false, error: "Too many requests. Please try again later." };
    }

    if (!slug || slug === "preview") {
      // Simulate success for builder preview.
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
  } catch (error: unknown) {
    console.error("[GuestWish Server Action Error]", error);
    return { success: false, error: "Internal Server Error" };
  }
}
