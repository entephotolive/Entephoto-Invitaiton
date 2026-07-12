"use server";

import { cookies } from "next/headers";
import slugify from "slugify";
import mongoose from "mongoose";

import { connectDB } from "@/lib/mongodb";
import Invitation from "@/models/Invitation";
import { invitationSchema, InvitationInput } from "@/lib/validations/invitation";
import { verifySession } from "@/lib/session";

/**
 * Reads the userId from the secure session cookie.
 * Returns undefined if no valid session is found.
 */
async function getAuthenticatedUserId(): Promise<string | undefined> {
  const session = await verifySession();
  return session?.userId;
}

/**
 * SERVER ACTION: Create a new invitation
 * Validates with Zod, generates a unique slug, saves to MongoDB.
 */
export async function createInvitationAction(data: InvitationInput) {
  const validatedData = invitationSchema.parse(data);
  await connectDB();

  // Generate SEO-friendly slug from bride + groom names, or fallback to random
  let baseSlug = "invitation-" + Math.random().toString(36).substring(2, 8);
  if (validatedData.brideName && validatedData.groomName) {
    baseSlug = slugify(
      `${validatedData.brideName} and ${validatedData.groomName}`,
      { lower: true, strict: true }
    );
  }

  // Ensure uniqueness by appending a counter if needed
  let slug = baseSlug;
  let count = 1;
  while (await Invitation.findOne({ slug })) {
    slug = `${baseSlug}-${count}`;
    count++;
  }

  const userId = await getAuthenticatedUserId();

  const invitation = await Invitation.create({
    ...validatedData,
    slug,
    userId,
  });

  // Return a plain JS object (Server Actions cannot return Mongoose documents)
  return JSON.parse(JSON.stringify({ success: true, data: invitation }));
}

/**
 * SERVER ACTION: Get a single invitation by MongoDB ID or SEO slug.
 * Also calculates a live countdown to the wedding date.
 */
export async function getInvitationAction(identifier: string) {
  await connectDB();

  const isObjectId = mongoose.Types.ObjectId.isValid(identifier);
  const query = isObjectId ? { _id: identifier } : { slug: identifier };

  const invitation = await Invitation.findOne(query).lean();

  if (!invitation) {
    return { success: false, error: "Invitation not found" };
  }

  // Calculate countdown
  const now = new Date().getTime();
  const weddingTime = new Date((invitation as any).weddingDate).getTime();
  const timeRemaining = weddingTime - now;

  let countdown = null;
  if (timeRemaining > 0) {
    countdown = {
      days: Math.floor(timeRemaining / (1000 * 60 * 60 * 24)),
      hours: Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((timeRemaining % (1000 * 60)) / 1000),
    };
  }

  return JSON.parse(
    JSON.stringify({
      success: true,
      data: { ...invitation, countdown },
    })
  );
}

/**
 * SERVER ACTION: Get all invitations for the authenticated user.
 */
export async function getMyInvitationsAction() {
  const userId = await getAuthenticatedUserId();

  if (!userId) {
    return { success: false, error: "Unauthorized" };
  }

  await connectDB();

  const invitations = await Invitation.find({ userId })
    .sort({ createdAt: -1 })
    .lean();

  return JSON.parse(JSON.stringify({ success: true, data: invitations }));
}

/**
 * SERVER ACTION: Partially update an existing invitation by MongoDB ID.
 */
export async function updateInvitationAction(
  id: string,
  data: Partial<InvitationInput>
) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return { success: false, error: "Invalid ID format" };
  }
  
  const userId = await getAuthenticatedUserId();
  if (!userId) {
    return { success: false, error: "Unauthorized" };
  }

  const validatedData = invitationSchema.partial().parse(data);
  await connectDB();
  
  const existingInvitation = await Invitation.findById(id);
  if (!existingInvitation) {
    return { success: false, error: "Invitation not found" };
  }
  
  // Security: Check ownership
  if (existingInvitation.userId !== userId) {
    return { success: false, error: "Forbidden: You do not own this invitation" };
  }

  const updated = await Invitation.findByIdAndUpdate(
    id,
    { $set: validatedData },
    { new: true, runValidators: true }
  );

  if (!updated) {
    return { success: false, error: "Invitation not found" };
  }

  return JSON.parse(JSON.stringify({ success: true, data: updated }));
}

/**
 * SERVER ACTION: Delete an invitation by MongoDB ID.
 */
export async function deleteInvitationAction(id: string) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return { success: false, error: "Invalid ID format" };
  }
  
  const userId = await getAuthenticatedUserId();
  if (!userId) {
    return { success: false, error: "Unauthorized" };
  }

  await connectDB();
  
  const existingInvitation = await Invitation.findById(id);
  if (!existingInvitation) {
    return { success: false, error: "Invitation not found" };
  }
  
  // Security: Check ownership
  if (existingInvitation.userId !== userId) {
    return { success: false, error: "Forbidden: You do not own this invitation" };
  }

  const deleted = await Invitation.findByIdAndDelete(id);

  if (!deleted) {
    return { success: false, error: "Invitation not found" };
  }

  return { success: true, message: "Invitation successfully deleted" };
}

/**
 * SERVER ACTION: Get paginated list of all invitations (admin use).
 */
export async function getAllInvitationsAction(page = 1, limit = 10) {
  await connectDB();

  const skip = (page - 1) * limit;
  const total = await Invitation.countDocuments();
  const invitations = await Invitation.find()
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .lean();

  return JSON.parse(
    JSON.stringify({
      success: true,
      data: invitations,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    })
  );
}
