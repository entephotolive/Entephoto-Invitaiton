import imageCompression from "browser-image-compression";

/**
 * Compress an image file before uploading to UploadThing.
 * 
 * Strategy:
 * - Target output: max 1920px wide, max 1MB
 * - Quality: 0.85 (visually lossless for wedding/ceremony photos)
 * - Uses WebP when supported for better compression ratios
 * - Falls back to the original file if compression produces a larger output
 */
export async function compressImage(file: File): Promise<File> {
  const options = {
    maxSizeMB: 1,           // Target max 1MB output
    maxWidthOrHeight: 1920, // Limit longest dimension to 1920px (Full HD)
    useWebWorker: true,     // Non-blocking compression
    initialQuality: 0.85,   // High quality — visually lossless for photos
    fileType: "image/webp", // Convert to WebP for better compression
    preserveExif: false,    // Strip EXIF to reduce file size
  };

  try {
    const compressed = await imageCompression(file, options);

    // Fallback: if compression made the file larger, return original
    if (compressed.size >= file.size) {
      console.log("[compressImage] Compression increased size — using original.");
      return file;
    }

    const savedKB = ((file.size - compressed.size) / 1024).toFixed(0);
    console.log(`[compressImage] Saved ~${savedKB}KB (${file.size} → ${compressed.size} bytes)`);

    return compressed;
  } catch (err) {
    console.warn("[compressImage] Compression failed, using original:", err);
    return file;
  }
}
