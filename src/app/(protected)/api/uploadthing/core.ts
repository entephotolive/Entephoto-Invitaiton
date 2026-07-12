import { createUploadthing, type FileRouter } from "uploadthing/next";
import { verifySession } from "@/lib/session";
import { connectDB } from "@/lib/mongodb";
import Media from "@/models/Media";

const f = createUploadthing();

async function saveMediaToDb(userId: string, file: any, type: string) {
  try {
    await connectDB();
    await Media.create({
      userId,
      url: file.ufsUrl || file.url,
      key: file.key,
      name: file.name,
      type,
      size: file.size,
    });
  } catch (error) {
    console.error(`[UploadThing] Error saving ${type} to DB:`, error);
  }
}

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
    .onUploadComplete(async ({ metadata, file }) => {
      await saveMediaToDb(metadata.userId, file, "image");
      console.log("[UploadThing] Cover photo uploaded:", file.ufsUrl || file.url);
    }),

  // Gallery — up to 10 images, max 8MB each
  galleryUploader: f({ image: { maxFileSize: "8MB", maxFileCount: 10 } })
    .middleware(async () => {
      const session = await verifySession();
      if (!session) throw new Error("Unauthorized");
      return { userId: session.userId };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      await saveMediaToDb(metadata.userId, file, "image");
      console.log("[UploadThing] Gallery image uploaded:", file.ufsUrl || file.url);
    }),

  // Background music — single audio file, max 32MB
  musicUploader: f({ audio: { maxFileSize: "32MB", maxFileCount: 1 } })
    .middleware(async () => {
      const session = await verifySession();
      if (!session) throw new Error("Unauthorized");
      return { userId: session.userId };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      await saveMediaToDb(metadata.userId, file, "audio");
      console.log("[UploadThing] Music uploaded:", file.ufsUrl || file.url);
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
