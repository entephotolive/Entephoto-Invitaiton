import { connectDB } from "@/lib/mongodb";
import Event from "@/models/Event";

function generateSlug(
  brideName?: string,
  groomName?: string
) {
  if (brideName && groomName) {
    return `${brideName}-${groomName}`
      .toLowerCase()
      .replace(/\s+/g, "-");
  }

  return `invitation-${Math.random()
    .toString(36)
    .substring(2, 8)}`;
}

export async function POST(
  request: Request
) {
  try {
    await connectDB();

    const body =
      await request.json();

    const slug = generateSlug(
      body.brideName,
      body.groomName
    );

    const invitation =
      await Event.create({
        ...body,
        slug,
      });

    return Response.json({
      success: true,
      data: invitation,
      slug,
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        success: false,
        message:
          "Failed to create invitation",
      },
      {
        status: 500,
      }
    );
  }
}