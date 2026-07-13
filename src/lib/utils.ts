import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function hasValue(val: any): boolean {
  return val !== undefined && val !== null && String(val).trim() !== "";
}

/**
 * Converts any Google Maps link into a working iframe embed URL.
 *
 * Priority order for accuracy:
 * 1. Already a valid maps.google.com embed → use as-is
 * 2. <iframe> HTML pasted → extract src
 * 3. URL contains @lat,lng coordinates → use coordinates (most accurate!)
 * 4. URL contains ?q= search term → use q param
 * 5. URL is a /place/ URL → extract place name
 * 6. Fall back to venue + address text search
 */
export function getMapEmbedUrl(url: string, fallbackSearch?: string): string {
  const trimmed = url?.trim() ?? "";

  // ── Step 1: Already a valid maps.google.com embed URL ──
  if (trimmed.includes("maps.google.com") && trimmed.includes("output=embed")) {
    return trimmed;
  }

  // ── Step 2: User pasted an <iframe> HTML block, extract the src ──
  if (trimmed.startsWith("<iframe")) {
    const srcMatch = trimmed.match(/src="([^"]+)"/);
    if (srcMatch?.[1]) {
      return getMapEmbedUrl(srcMatch[1], fallbackSearch);
    }
  }

  if (trimmed.startsWith("http") && (trimmed.includes("google") || trimmed.includes("goo.gl"))) {
    // ── Step 3: Extract @lat,lng coordinates (MOST ACCURATE) ──
    // Matches patterns like /@12.345678,76.123456,17z or /@12.345678,76.123456,
    const coordMatch = trimmed.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);
    if (coordMatch) {
      const lat = coordMatch[1];
      const lng = coordMatch[2];
      return `https://maps.google.com/maps?q=${lat},${lng}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
    }

    try {
      const parsed = new URL(trimmed);

      // ── Step 4: Extract ?q= search param ──
      const q = parsed.searchParams.get("q");
      if (q) {
        return `https://maps.google.com/maps?q=${encodeURIComponent(q)}&t=&z=14&ie=UTF8&iwloc=&output=embed`;
      }

      // ── Step 5: Extract /place/Name/ from path ──
      const placeMatch = parsed.pathname.match(/\/maps\/place\/([^/@]+)/);
      if (placeMatch?.[1]) {
        const placeName = decodeURIComponent(placeMatch[1].replace(/\+/g, " "));
        return `https://maps.google.com/maps?q=${encodeURIComponent(placeName)}&t=&z=14&ie=UTF8&iwloc=&output=embed`;
      }
    } catch {
      // fall through
    }
  }

  // ── Step 6: Fallback to venue + address text search ──
  const search = fallbackSearch?.trim();
  if (search) {
    return `https://maps.google.com/maps?q=${encodeURIComponent(search)}&t=&z=14&ie=UTF8&iwloc=&output=embed`;
  }

  // Nothing usable — return empty so template shows "Map Not Available"
  return "";
}
