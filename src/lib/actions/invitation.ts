"use server";

import slugify from "slugify";
import mongoose from "mongoose";

import { connectDB } from "@/lib/mongodb";
import Invitation, { IInvitation } from "@/models/Invitation";
import Media from "@/models/Media";
import Rsvp from "@/models/Rsvp";
import GuestWish from "@/models/GuestWish";
import { invitationSchema, InvitationInput } from "@/lib/validations/invitation";
import { UTApi } from "uploadthing/server";
import { verifySession } from "@/lib/session";

/**
 * VULN-07 — Per-user invitation quota.
 * Adjust this constant to change the maximum number of invitations a single
 * user account may own. Chosen as 10 as a reasonable default for a wedding
 * invitation platform (one per event, with headroom for drafts/retries).
 */
const MAX_INVITATIONS_PER_USER = 10;

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
  try {
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

    // Ensure uniqueness in a single trip using a collision-resistant random suffix
    const randomSuffix = Math.random().toString(36).substring(2, 7);
    const slug = `${baseSlug}-${randomSuffix}`;

    const userId = await getAuthenticatedUserId();

    // VULN-07: Enforce per-user invitation quota before inserting.
    if (userId) {
      const existingCount = await Invitation.countDocuments({ userId });
      if (existingCount >= MAX_INVITATIONS_PER_USER) {
        return {
          success: false,
          error: `You have reached the maximum of ${MAX_INVITATIONS_PER_USER} invitations. Please delete an existing invitation to create a new one.`,
        };
      }
    }

    // Note (DB-02): Invitation creation is an atomic single-document write to the Invitation collection.
    // We do not instantiate associated RSVPs, GuestWishes, or Media during this phase,
    // so a multi-document MongoDB transaction is not strictly required.
    const invitation = await Invitation.create({
      ...validatedData,
      slug,
      userId,
    });

    // Return a plain JS object (Server Actions cannot return Mongoose documents)
    return JSON.parse(JSON.stringify({ success: true, data: invitation }));
  } catch (error: unknown) {
    console.error("Failed to create invitation:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Failed to create invitation" 
    };
  }
}

/**
 * SERVER ACTION: Get a single invitation by MongoDB ID or SEO slug.
 * Also calculates a live countdown to the wedding date.
 */
export async function getInvitationAction(identifier: string) {
  if (typeof identifier !== "string") {
    return { success: false, error: "Invalid identifier" };
  }

  const isObjectId = mongoose.Types.ObjectId.isValid(identifier);
  const isValidSlug = /^[a-z0-9-]+$/.test(identifier);

  if (!isObjectId && !isValidSlug) {
    return { success: false, error: "Invalid identifier format" };
  }

  await connectDB();

  const query = isObjectId ? { _id: identifier } : { slug: identifier };

  const invitation = await Invitation.findOne(query).lean();

  if (!invitation) {
    return { success: false, error: "Invitation not found" };
  }

  // Calculate countdown
  const now = new Date().getTime();
  const weddingTime = new Date((invitation as unknown as IInvitation).weddingDate || new Date()).getTime();
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

  // Cleanup UploadThing files and Media records
  const imageUrls = [
    existingInvitation.bridePhoto,
    existingInvitation.groomPhoto,
    existingInvitation.coverPhoto,
    ...(existingInvitation.gallery || []),
  ].filter(Boolean) as string[];

  if (imageUrls.length > 0) {
    const mediaRecords = await Media.find({ url: { $in: imageUrls } });
    const fileKeys = mediaRecords.map((m) => m.key);
    
    if (fileKeys.length > 0) {
      try {
        const utapi = new UTApi();
        await utapi.deleteFiles(fileKeys);
        await Media.deleteMany({ key: { $in: fileKeys } });
      } catch (err) {
        console.error("Failed to delete orphaned UploadThing files", err);
      }
    }
  }

  // Cleanup related FK documents
  await Rsvp.deleteMany({ invitationId: id });
  await GuestWish.deleteMany({ invitationId: id });

  const deleted = await Invitation.findByIdAndDelete(id);

  if (!deleted) {
    return { success: false, error: "Invitation not found" };
  }

  return { success: true, message: "Invitation successfully deleted" };
}
