import { createUploadthing, type FileRouter } from "uploadthing/next";
import { verifySession } from "@/lib/session";

const f = createUploadthing();

/**
 * UploadThing File Router
 * 
 * Industry standard: define separate routes per upload type
 * so permissions and limits can be configured independently.
 */
export const ourFileRouter = {
  // Hero cover photo — single image, max 8MB
  coverPhotoUploader: f({ image: { maxFileSize: "8MB", maxFileCount: 1 } })
    .middleware(async () => {
      const session = await verifySession();
      if (!session) throw new Error("Unauthorized");
      return { userId: session.userId };
    })
    .onUploadComplete(async ({ file }) => {
      console.log("[UploadThing] Cover photo uploaded:", file.url);
    }),

  // Gallery — up to 10 images, max 8MB each
  galleryUploader: f({ image: { maxFileSize: "8MB", maxFileCount: 10 } })
    .middleware(async () => {
      const session = await verifySession();
      if (!session) throw new Error("Unauthorized");
      return { userId: session.userId };
    })
    .onUploadComplete(async ({ file }) => {
      console.log("[UploadThing] Gallery image uploaded:", file.url);
    }),

  // Background music — single audio file, max 32MB
  musicUploader: f({ audio: { maxFileSize: "32MB", maxFileCount: 1 } })
    .middleware(async () => {
      const session = await verifySession();
      if (!session) throw new Error("Unauthorized");
      return { userId: session.userId };
    })
    .onUploadComplete(async ({ file }) => {
      console.log("[UploadThing] Music uploaded:", file.url);
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
