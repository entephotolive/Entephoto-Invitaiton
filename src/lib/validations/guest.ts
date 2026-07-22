import { z } from "zod";

/**
 * VULN-08 — Zod validation schemas for guest-facing submissions.
 *
 * These schemas enforce required fields, correct types, and length bounds
 * before any data reaches MongoDB, preventing arbitrary payload shapes from
 * being written to the database.
 *
 * Note: Zod v4 removed `required_error` / `invalid_type_error` from primitive
 * constructors. Use `.min(1)` for required string checks and the `error`
 * option (or message overload) for custom messages instead.
 */

/** Submitted by a guest when RSVPing to an invitation. */
export const rsvpSchema = z.object({
  /** The invitation's SEO slug or "preview" (preview is allowed through separately). */
  slug: z.string().min(1, "Slug must not be empty"),

  /** Guest's full name — required, 1–100 characters. */
  name: z
    .string()
    .trim()
    .min(1, "Name must not be empty")
    .max(100, "Name must be 100 characters or fewer"),

  /** Number of guests attending — must be a positive integer, max 20. */
  guests: z
    .number({ error: "Guest count must be a number" })
    .int("Guest count must be a whole number")
    .min(1, "At least 1 guest is required")
    .max(20, "Guest count cannot exceed 20")
    .default(1),

  /** Optional personal message — max 500 characters. */
  message: z
    .string()
    .trim()
    .max(500, "Message must be 500 characters or fewer")
    .optional()
    .default(""),

  /** Whether the guest is attending. */
  attending: z.boolean({ error: "Attendance status is required" }),
});

export type RsvpInput = z.infer<typeof rsvpSchema>;

/** Submitted by a guest when leaving a wish/message. */
export const wishSchema = z.object({
  /** The invitation's SEO slug or "preview". */
  slug: z.string().min(1, "Slug must not be empty"),

  /** Guest's full name — required, 1–100 characters. */
  name: z
    .string()
    .trim()
    .min(1, "Name must not be empty")
    .max(100, "Name must be 100 characters or fewer"),

  /** The wish/message — required, 1–1000 characters. */
  message: z
    .string()
    .trim()
    .min(1, "Message must not be empty")
    .max(1000, "Message must be 1000 characters or fewer"),
});

export type WishInput = z.infer<typeof wishSchema>;
