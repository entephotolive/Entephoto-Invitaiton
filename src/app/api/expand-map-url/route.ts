import { NextRequest, NextResponse } from "next/server";

/**
 * POST /api/expand-map-url
 * 
 * Accepts a short Google Maps URL (like maps.app.goo.gl/...) and follows
 * the server-side redirect chain to return the full expanded URL.
 * 
 * This cannot be done from the browser because of CORS restrictions — 
 * the server-side fetch bypasses that entirely.
 */
export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json();

    if (!url || typeof url !== "string") {
      return NextResponse.json({ error: "No URL provided" }, { status: 400 });
    }

    const trimmed = url.trim();

    // Only process if it looks like a Google Maps short link
    const isGoogleLink =
      trimmed.includes("goo.gl") ||
      trimmed.includes("maps.app.goo.gl") ||
      trimmed.includes("google.com/maps");

    if (!isGoogleLink) {
      return NextResponse.json({ error: "Not a Google Maps URL" }, { status: 400 });
    }

    // Use fetch with redirect: "follow" so Node follows all redirects
    // and we capture the final resolved URL
    const response = await fetch(trimmed, {
      method: "GET",
      redirect: "follow",
      headers: {
        // Mimic a browser user agent so Google doesn't block the request
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      },
    });

    // response.url is the final URL after all redirects
    const expandedUrl = response.url;

    if (!expandedUrl || expandedUrl === trimmed) {
      return NextResponse.json(
        { error: "Could not expand the short URL. Please paste the full Google Maps URL." },
        { status: 422 }
      );
    }

    return NextResponse.json({ expandedUrl });
  } catch (err: any) {
    console.error("[expand-map-url] Error:", err);
    return NextResponse.json(
      { error: "Failed to resolve the URL. Please paste the full Google Maps link instead." },
      { status: 500 }
    );
  }
}
