import { generateReactHelpers } from "@uploadthing/react";
import type { OurFileRouter } from "@/app/(protected)/api/uploadthing/core";

/**
 * UploadThing React helpers — provides useUploadThing hook
 * used in form components to upload files with progress tracking.
 */
export const { useUploadThing, uploadFiles } =
  generateReactHelpers<OurFileRouter>();
