"use client";

import { useCallback } from "react";
import { Image, Images, Music, Heart, Loader2, CheckCircle, Upload } from "lucide-react";
import { useUploadThing } from "@/lib/uploadthing";
import { compressImage } from "@/lib/storage";
import BuilderSection from "@/components/builder/BuilderSection";

interface Props {
  eventData: any;
  setEventData: (updater: any) => void;
}

// ─── Reusable Upload Drop Zone ────────────────────────────────────────────────
interface DropZoneProps {
  isUploading: boolean;
  isUploaded: boolean;
  uploadedLabel?: string;
  defaultLabel: string;
  hint?: string;
  accept?: string;
  multiple?: boolean;
  height?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function UploadDropZone({
  isUploading,
  isUploaded,
  uploadedLabel = "Uploaded — click to replace",
  defaultLabel,
  hint,
  accept = "image/*",
  multiple = false,
  height = "h-32",
  onChange,
}: DropZoneProps) {
  return (
    <label
      className={`flex flex-col items-center justify-center w-full ${height} border-2 border-dashed rounded-2xl cursor-pointer transition-all ${
        isUploading
          ? "border-[#b99863] bg-[#faf6f0]"
          : "border-zinc-200 hover:border-[#b99863] hover:bg-[#faf6f0]/50"
      }`}
    >
      <input
        type="file"
        accept={accept}
        multiple={multiple}
        className="hidden"
        disabled={isUploading}
        onChange={onChange}
      />
      {isUploading ? (
        <div className="flex flex-col items-center gap-2 text-[#b99863]">
          <Loader2 size={24} className="animate-spin" />
          <span className="text-xs font-medium">Uploading...</span>
        </div>
      ) : isUploaded ? (
        <div className="flex flex-col items-center gap-2 text-emerald-600">
          <CheckCircle size={24} />
          <span className="text-xs font-medium">{uploadedLabel}</span>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-2 text-zinc-400">
          <Upload size={24} />
          <span className="text-xs font-medium">{defaultLabel}</span>
          {hint && <span className="text-[11px] text-zinc-300">{hint}</span>}
        </div>
      )}
    </label>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────
export default function WeddingMediaTab({ eventData, setEventData }: Props) {
  // Uploader hooks (these must all be called unconditionally at the top level)
  const { startUpload: uploadCover, isUploading: coverUploading } =
    useUploadThing("coverPhotoUploader");
  const { startUpload: uploadPersonPhoto, isUploading: personPhotoUploading } =
    useUploadThing("coverPhotoUploader");
  const { startUpload: uploadGallery, isUploading: galleryUploading } =
    useUploadThing("galleryUploader");
  const { startUpload: uploadMusic, isUploading: musicUploading } =
    useUploadThing("musicUploader");

  // ── Generic single-photo uploader ──────────────────────────────────────────
  const handleSinglePhotoUpload = useCallback(
    async (
      e: React.ChangeEvent<HTMLInputElement>,
      field: string,
      uploader: typeof uploadCover
    ) => {
      const file = e.target.files?.[0];
      if (!file) return;
      try {
        const localPreview = URL.createObjectURL(file);
        setEventData((prev: any) => ({ ...prev, [field]: localPreview }));
        const compressed = await compressImage(file);
        const result = await uploader([compressed]);
        if (result?.[0]) {
          const url = result[0].ufsUrl ?? result[0].url;
          setEventData((prev: any) => ({ ...prev, [field]: url }));
        }
      } catch (err) {
        console.error(`[Upload: ${field}] Failed:`, err);
        alert("Photo upload failed. Please try again.");
      }
    },
    [setEventData]
  );

  // ── Gallery uploader ────────────────────────────────────────────────────────
  const handleGalleryUpload = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(e.target.files || []);
      if (!files.length) return;
      try {
        const localPreviews = files.map((f) => URL.createObjectURL(f));
        setEventData((prev: any) => ({
          ...prev,
          gallery: [...(prev.gallery || []), ...localPreviews],
        }));
        const compressed = await Promise.all(files.map((f) => compressImage(f)));
        const result = await uploadGallery(compressed);
        if (result) {
          const uploadedUrls = result.map((r) => r.ufsUrl ?? r.url);
          setEventData((prev: any) => {
            const withoutPreviews = (prev.gallery || []).filter(
              (url: string) => !localPreviews.includes(url)
            );
            return { ...prev, gallery: [...withoutPreviews, ...uploadedUrls] };
          });
        }
      } catch (err) {
        console.error("[Gallery Upload] Failed:", err);
        alert("Gallery upload failed. Please try again.");
      }
    },
    [setEventData, uploadGallery]
  );

  // ── Music uploader ──────────────────────────────────────────────────────────
  const handleMusicUpload = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      try {
        const result = await uploadMusic([file]);
        if (result?.[0]) {
          const url = result[0].ufsUrl ?? result[0].url;
          setEventData((prev: any) => ({ ...prev, musicUrl: url }));
        }
      } catch (err) {
        console.error("[Music Upload] Failed:", err);
        alert("Music upload failed. Please try again.");
      }
    },
    [setEventData, uploadMusic]
  );

  const removeGalleryImage = (index: number) => {
    const updated = (eventData.gallery || []).filter((_: string, i: number) => i !== index);
    setEventData((prev: any) => ({ ...prev, gallery: updated }));
  };

  return (
    <>
      {/* Hero Cover Photo */}
      <BuilderSection title="Hero Cover Photo" icon={<Image size={22} />}>
        <div className="space-y-4">
          <UploadDropZone
            isUploading={coverUploading}
            isUploaded={!!(eventData.heroImage && !eventData.heroImage.startsWith("blob:"))}
            uploadedLabel="Photo uploaded — click to replace"
            defaultLabel="Click to upload cover photo"
            hint="Auto-compressed · Max 8MB · WebP output"
            onChange={(e) => handleSinglePhotoUpload(e, "heroImage", uploadCover)}
          />
          {eventData.heroImage && (
            <img
              src={eventData.heroImage}
              alt="Cover Preview"
              className="w-full h-52 object-cover rounded-2xl border"
            />
          )}
        </div>
      </BuilderSection>

      {/* Couple Photos */}
      <BuilderSection title="Couple Photos (Optional)" icon={<Heart size={22} />}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Bride Photo */}
          <div className="space-y-4">
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-2">
              Bride Photo
            </label>
            <UploadDropZone
              isUploading={personPhotoUploading}
              isUploaded={!!(eventData.bridePhoto && !eventData.bridePhoto.startsWith("blob:"))}
              uploadedLabel="Click to replace"
              defaultLabel="Upload bride photo"
              onChange={(e) => handleSinglePhotoUpload(e, "bridePhoto", uploadPersonPhoto)}
            />
            {eventData.bridePhoto && (
              <div className="relative">
                <img
                  src={eventData.bridePhoto}
                  alt="Bride Preview"
                  className="w-full h-40 object-cover rounded-2xl border"
                />
                <button
                  type="button"
                  onClick={() => setEventData((prev: any) => ({ ...prev, bridePhoto: undefined }))}
                  className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center font-bold"
                >
                  &times;
                </button>
              </div>
            )}
          </div>

          {/* Groom Photo */}
          <div className="space-y-4">
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-2">
              Groom Photo
            </label>
            <UploadDropZone
              isUploading={personPhotoUploading}
              isUploaded={!!(eventData.groomPhoto && !eventData.groomPhoto.startsWith("blob:"))}
              uploadedLabel="Click to replace"
              defaultLabel="Upload groom photo"
              onChange={(e) => handleSinglePhotoUpload(e, "groomPhoto", uploadPersonPhoto)}
            />
            {eventData.groomPhoto && (
              <div className="relative">
                <img
                  src={eventData.groomPhoto}
                  alt="Groom Preview"
                  className="w-full h-40 object-cover rounded-2xl border"
                />
                <button
                  type="button"
                  onClick={() => setEventData((prev: any) => ({ ...prev, groomPhoto: undefined }))}
                  className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center font-bold"
                >
                  &times;
                </button>
              </div>
            )}
          </div>
        </div>
      </BuilderSection>

      {/* Gallery Album Grid */}
      <BuilderSection title="Gallery Album Grid" icon={<Images size={22} />}>
        <div className="space-y-4">
          <UploadDropZone
            isUploading={galleryUploading}
            isUploaded={false}
            defaultLabel="Click to upload gallery images"
            hint="Up to 10 images · Auto-compressed · Max 8MB each"
            multiple
            onChange={handleGalleryUpload}
          />
          {(eventData.gallery || []).length > 0 && (
            <div className="grid grid-cols-3 gap-3">
              {(eventData.gallery as string[]).map((image, index) => (
                <div key={index} className="relative group">
                  <img
                    src={image}
                    alt="Gallery item"
                    className="h-24 w-full object-cover rounded-xl border border-zinc-100"
                  />
                  <button
                    type="button"
                    onClick={() => removeGalleryImage(index)}
                    className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white rounded-full text-xs font-bold hidden group-hover:flex items-center justify-center"
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </BuilderSection>

      {/* Background Ambient Audio */}
      <BuilderSection title="Background Ambient Audio Track" icon={<Music size={22} />}>
        <div className="space-y-3">
          <UploadDropZone
            isUploading={musicUploading}
            isUploaded={!!(eventData.musicUrl && !eventData.musicUrl.startsWith("blob:"))}
            uploadedLabel="Audio uploaded — click to replace"
            defaultLabel="Click to upload background music"
            hint="MP3 / AAC / WAV · Max 32MB"
            accept="audio/*"
            height="h-24"
            onChange={handleMusicUpload}
          />
          {eventData.musicUrl && (
            <audio controls src={eventData.musicUrl} className="w-full rounded-xl" />
          )}
        </div>
      </BuilderSection>
    </>
  );
}
