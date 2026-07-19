"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

interface ScratchToRevealProps {
  children: React.ReactNode;
  width?: number | string;
  height?: number | string;
  onReveal?: () => void;
  revealThreshold?: number; // 0 to 1, percentage of area scratched to reveal
  overlayColor?: string;
  overlayText?: string;
}

export const ScratchToReveal: React.FC<ScratchToRevealProps> = ({
  children,
  width = "100%",
  height = "100%",
  onReveal,
  revealThreshold = 0.5,
  overlayColor = "#d6b273", // gold
  overlayText = "Scratch to Reveal"
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const isDrawingRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container || isRevealed) return;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    // Set canvas dimensions to match container
    const rect = container.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;

    // Draw overlay background
    ctx.fillStyle = overlayColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw gradient
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, overlayColor);
    gradient.addColorStop(1, "#b99863");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add overlay text
    ctx.font = "bold 24px serif";
    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(overlayText, canvas.width / 2, canvas.height / 2);

    // Setup scratch settings
    ctx.globalCompositeOperation = "destination-out";
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.lineWidth = 40;

    const getCoordinates = (e: MouseEvent | TouchEvent) => {
      const rect = canvas.getBoundingClientRect();
      let clientX, clientY;

      if ("touches" in e) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else {
        clientX = (e as MouseEvent).clientX;
        clientY = (e as MouseEvent).clientY;
      }

      // Calculate scale to handle when CSS width doesn't match canvas pixel width
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;

      return {
        x: (clientX - rect.left) * scaleX,
        y: (clientY - rect.top) * scaleY,
      };
    };

    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      if (e.cancelable) e.preventDefault();
      isDrawingRef.current = true;
      const { x, y } = getCoordinates(e);
      ctx.beginPath();
      ctx.moveTo(x, y);
    };

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      if (!isDrawingRef.current) return;
      if (e.cancelable) e.preventDefault();
      const { x, y } = getCoordinates(e);
      ctx.lineTo(x, y);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(x, y);
    };

    const checkReveal = () => {
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const pixels = imageData.data;
      let transparentPixels = 0;
      const totalPixels = pixels.length / 4;

      for (let i = 3; i < pixels.length; i += 4) {
        if (pixels[i] === 0) {
          transparentPixels++;
        }
      }

      if (transparentPixels / totalPixels > revealThreshold) {
        setIsRevealed(true);
        if (onReveal) onReveal();
      }
    };

    const handlePointerUp = () => {
      if (isDrawingRef.current) {
        isDrawingRef.current = false;
        checkReveal();
      }
    };

    canvas.addEventListener("mousedown", handlePointerDown);
    canvas.addEventListener("mousemove", handlePointerMove, { passive: false });
    canvas.addEventListener("mouseup", handlePointerUp);
    canvas.addEventListener("mouseleave", handlePointerUp);

    canvas.addEventListener("touchstart", handlePointerDown, { passive: false });
    canvas.addEventListener("touchmove", handlePointerMove, { passive: false });
    canvas.addEventListener("touchend", handlePointerUp);

    return () => {
      canvas.removeEventListener("mousedown", handlePointerDown);
      canvas.removeEventListener("mousemove", handlePointerMove);
      canvas.removeEventListener("mouseup", handlePointerUp);
      canvas.removeEventListener("mouseleave", handlePointerUp);

      canvas.removeEventListener("touchstart", handlePointerDown);
      canvas.removeEventListener("touchmove", handlePointerMove);
      canvas.removeEventListener("touchend", handlePointerUp);
    };
  }, [isRevealed, overlayColor, overlayText, revealThreshold, onReveal]);

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden select-none"
      style={{ width, height, touchAction: "none" }}
    >
      {/* Hidden Content */}
      <div className="w-full h-full">
        {children}
      </div>

      {/* Canvas Overlay */}
      <motion.canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full cursor-crosshair rounded-[32px]"
        initial={{ opacity: 1 }}
        animate={{ opacity: isRevealed ? 0 : 1, pointerEvents: isRevealed ? "none" : "auto" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />
    </div>
  );
};
