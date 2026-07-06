import { createRouteHandler } from "uploadthing/next";
import { ourFileRouter } from "./core";

// Next.js App Router handler — required by UploadThing
export const { GET, POST } = createRouteHandler({
  router: ourFileRouter,
});
