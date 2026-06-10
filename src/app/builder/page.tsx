"use client";

import { useState } from "react";
import { Menu } from "lucide-react";

import WeddingForm from "@/components/builder/forms/WeddingForm";
import WeddingTemplate from "@/components/templates/WeddingTemplate";
import PublishButton from "@/components/builder/PublishButton";

export default function BuilderPage() {
  const [showPreview, setShowPreview] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f8f5f0]">

      {/* Navbar */}
      <header
        className="
          sticky top-0 z-50
          h-20
          bg-white/90
          backdrop-blur-md
          border-b
          flex
          items-center
          justify-between
          px-6 lg:px-10
        "
      >
        <div>
          <h1 className="text-3xl font-bold text-[#43372f]">
            Evently
          </h1>

          <p className="text-sm text-zinc-500 hidden md:block">
           
          </p>
        </div>

        {/* Desktop Publish */}
        <PublishButton />

        {/* Mobile Menu */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="
            lg:hidden
            w-11
            h-11
            flex
            items-center
            justify-center
            rounded-xl
            border
            bg-white
          "
        >
          <Menu size={20} />
        </button>
      </header>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div
          className="
            lg:hidden
            bg-white
            border-b
            shadow-sm
            p-4
            space-y-3
          "
        >
          {!showPreview && (
            <button
              onClick={() => {
                setShowPreview(true);
                setMenuOpen(false);
              }}
              className="
                w-full
                text-left
                p-3
                rounded-xl
                hover:bg-zinc-100
              "
            >
              Preview
            </button>
          )}

          {showPreview && (
            <button
              onClick={() => {
                setShowPreview(false);
                setMenuOpen(false);
              }}
              className="
                w-full
                text-left
                p-3
                rounded-xl
                hover:bg-zinc-100
              "
            >
              Builder
            </button>
          )}

          <PublishButton />

        </div>
      )}

      {/* Desktop Layout */}
      <div
        className="
          hidden
          lg:grid
          lg:grid-cols-[520px_1fr]
          gap-6
          p-6
        "
      >
        {/* Builder */}
        <div
          className="
            bg-white
            rounded-[32px]
            shadow-xl
            overflow-hidden
          "
        >
          <div className="border-b bg-white px-6 py-5">
  <h1 className="text-3xl font-serif text-[#43372f]">
    Wedding Builder
  </h1>

  <p className="mt-1 text-sm text-zinc-500">
    Create your wedding invitation
  </p>
</div>

          <div className="p-6 overflow-y-auto max-h-[calc(100vh-140px)]">
            <WeddingForm />
          </div>
        </div>

        {/* Preview */}
        <div
          className="
            rounded-[32px]
            shadow-xl
            overflow-hidden
            bg-white
          "
        >
         <div className="border-b bg-white px-6 py-5">
  <h1 className="text-3xl font-serif text-[#43372f]">
    Live Preview
  </h1>

  <p className="mt-1 text-sm text-zinc-500">
    See your invitation update instantly
  </p>
</div>

          <div
            className="
              bg-gradient-to-br
              from-[#faf7f3]
              to-[#f3eee8]
              overflow-y-auto
              max-h-[calc(100vh-140px)]
            "
          >
            <WeddingTemplate />
          </div>
        </div>
      </div>

      {/* Mobile Builder */}
      {!showPreview && (
        <div className="lg:hidden p-4">
          <WeddingForm />
        </div>
      )}

      {/* Mobile Preview */}
      {showPreview && (
        <div
          className="
            lg:hidden
            bg-gradient-to-br
            from-[#faf7f3]
            to-[#f3eee8]
          "
        >
          <WeddingTemplate />
        </div>
      )}
    </div>
  );
}