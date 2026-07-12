import { NextResponse } from "next/server";
import { UTApi } from "uploadthing/server";
import { connectDB } from "@/lib/mongodb";
import Invitation from "@/models/Invitation";
import Media from "@/models/Media";

const utapi = new UTApi();

export async function GET(request: Request) {
  try {
    // 1. Security Check: Ensure this endpoint can only be triggered by your authorized cron service.
    const authHeader = request.headers.get("authorization");
    const secret = process.env.CRON_SECRET;
    
    if (!secret) {
      console.warn("[Cron] CRON_SECRET is not configured in your environment variables.");
      return NextResponse.json({ error: "Server misconfiguration. Missing CRON_SECRET." }, { status: 500 });
    }
    
    if (authHeader !== `Bearer ${secret}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    // 2. Fetch Expired Invitations (weddingDate < NOW - 24 hours)
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const expiredInvitations = await Invitation.find({
      weddingDate: { $lt: oneDayAgo },
    });

    if (!expiredInvitations || expiredInvitations.length === 0) {
      return NextResponse.json({ success: true, message: "No expired invitations found." });
    }

    let allMediaUrls: string[] = [];
    let invitationIdsToDelete: string[] = [];

    // Collect all associated file URLs
    for (const invite of expiredInvitations) {
      invitationIdsToDelete.push(invite._id.toString());

      if (invite.coverPhoto) allMediaUrls.push(invite.coverPhoto);
      if (invite.musicUrl) allMediaUrls.push(invite.musicUrl);
      if (invite.gallery && Array.isArray(invite.gallery)) {
        allMediaUrls.push(...invite.gallery);
      }
    }

    // Filter out empty URLs or external non-uploadthing URLs
    allMediaUrls = allMediaUrls.filter(url => url && typeof url === "string" && url.includes("utfs.io"));

    if (allMediaUrls.length > 0) {
      // Find the exact UploadThing file keys logged in the Media collection
      const associatedMedia = await Media.find({ url: { $in: allMediaUrls } });
      const fileKeys = associatedMedia.map(m => m.key);

      // Physically delete the files from UploadThing servers
      if (fileKeys.length > 0) {
        await utapi.deleteFiles(fileKeys);
        console.log(`[Cron] Deleted ${fileKeys.length} files from UploadThing.`);
      }

      // Delete the corresponding Media records from MongoDB
      await Media.deleteMany({ url: { $in: allMediaUrls } });
      console.log(`[Cron] Deleted ${associatedMedia.length} Media records from MongoDB.`);
    }

    // 3. Delete the Expired Invitations from MongoDB
    const result = await Invitation.deleteMany({ _id: { $in: invitationIdsToDelete } });
    console.log(`[Cron] Deleted ${result.deletedCount} Invitations from MongoDB.`);

    return NextResponse.json({ 
      success: true, 
      message: `Successfully cleaned up ${result.deletedCount} invitations and their media files.`
    });

  } catch (error: any) {
    console.error("[Cron] Cleanup Error:", error);
    return NextResponse.json({ error: "Internal Server Error", details: error.message }, { status: 500 });
  }
}
