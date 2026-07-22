"use server";

import { connectDB } from "@/lib/mongodb";
import Invitation from "@/models/Invitation";
import Rsvp from "@/models/Rsvp";
import GuestWish from "@/models/GuestWish";
import { headers } from "next/headers";

// Simple in-memory rate limiter
// CAVEAT: This will not work correctly across multi-instance or serverless edge environments
// without a shared store like Redis. For a single-instance deployment, this is sufficient.
const rateLimitCache = new Map<string, { count: number; expiresAt: number }>();

function checkRateLimit(ip: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const record = rateLimitCache.get(ip);

  if (!record || record.expiresAt < now) {
    rateLimitCache.set(ip, { count: 1, expiresAt: now + windowMs });
    return true;
  }

  if (record.count >= limit) {
    return false;
  }

  record.count += 1;
  return true;
}

export async function submitRsvp(data: { slug: string, name: string, guests: number, message: string, attending: boolean }) {
  try {
    const { slug, name, guests, message, attending } = data;

    if (!name) {
      return { success: false, error: "Name is required" };
    }

    const hdrs = await Promise.resolve(headers());
    const ip = hdrs.get("x-forwarded-for") || "unknown";
    if (!checkRateLimit(`rsvp_${ip}`, 5, 60000)) { // 5 requests per minute
      return { success: false, error: "Too many requests. Please try again later." };
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

    const hdrs = await Promise.resolve(headers());
    const ip = hdrs.get("x-forwarded-for") || "unknown";
    if (!checkRateLimit(`wish_${ip}`, 10, 60000)) { // 10 requests per minute
      return { success: false, error: "Too many requests. Please try again later." };
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
