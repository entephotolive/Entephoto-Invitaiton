import { connectDB } from "@/lib/mongodb";
import Event from "@/models/Event";

function generateSlug() {
  return Math.random()
    .toString(36)
    .substring(2, 8);
}

export async function POST(
  request: Request
) {
  try {
    await connectDB();

    const body =
      await request.json();

    const slug =
      generateSlug();

    const event =
      await Event.create({
        ...body,
        slug,
      });

    return Response.json({
      success: true,
      slug,
      event,
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        success: false,
      },
      {
        status: 500,
      }
    );
  }
}