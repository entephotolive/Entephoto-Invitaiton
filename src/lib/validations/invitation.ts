import { z } from "zod";

/**
 * Invitation validation schema — mirrored from invitation-api/lib/validations/invitation.ts
 * Keeps the same validation rules as the external API for consistency.
 */
export const invitationSchema = z.object({
  brideName: z.string().optional(),
  groomName: z.string().optional(),
  brideParents: z.string().optional(),
  groomParents: z.string().optional(),
  bridePhoto: z.string().url("Bride photo must be a valid URL").optional().or(z.literal("")),
  groomPhoto: z.string().url("Groom photo must be a valid URL").optional().or(z.literal("")),
  coverPhoto: z.string().url("Cover photo must be a valid URL").optional().or(z.literal("")),
  weddingDate: z.string().datetime().or(z.date()).optional(),
  weddingTime: z.string().optional(),
  enableCountdown: z.boolean().optional(),
  musicUrl: z.string().url("Music URL must be valid").optional().or(z.literal("")),
  gallery: z.array(z.string()).optional(),
  loveStory: z
    .array(
      z.object({
        title: z.string().optional(),
        subtitle: z.string().optional(),
        description: z.string().optional(),
      })
    )
    .optional(),
  weddingSchedule: z
    .array(
      z.object({
        ceremony: z.string(),
        time: z.string(),
        description: z.string(),
      })
    )
    .optional(),
  venueDetails: z
    .object({
      venueName: z.string(),
      address: z.string(),
      googleMapLink: z.string().url().or(z.literal("")),
    })
    .optional(),
  rsvpSettings: z
    .object({
      enabled: z.boolean(),
    })
    .optional(),
  guestWishesSettings: z
    .object({
      enabled: z.boolean(),
    })
    .optional(),
  template: z
    .object({
      templateId: z.string().optional(),
      templateName: z.string().optional(),
    })
    .optional(),
});

export type InvitationInput = z.infer<typeof invitationSchema>;
