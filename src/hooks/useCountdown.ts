import { useState, useEffect } from "react";
import { usePreviewMode } from "@/context/PreviewModeContext";

const STATIC_ZEROS = { days: 0, hours: 0, minutes: 0, seconds: 0 };

export function useCountdown(date: string, time: string, rawWeddingDate?: string) {
  const isPreview = usePreviewMode();
  const [timeLeft, setTimeLeft] = useState(STATIC_ZEROS);

  useEffect(() => {
    // In preview mode (template gallery thumbnails), skip the interval entirely.
    // This prevents 34 simultaneous 1-second timers from running on the gallery page.
    if (isPreview) return;

    const calculateTimeLeft = () => {
      const dateString = rawWeddingDate || date;
      if (!dateString) return STATIC_ZEROS;

      let targetDate: Date;

      if (rawWeddingDate) {
        targetDate = new Date(rawWeddingDate);
        if (time) {
          const [hours, minutes] = time.split(':');
          targetDate.setHours(parseInt(hours || "0", 10));
          targetDate.setMinutes(parseInt(minutes || "0", 10));
        }
      } else {
        targetDate = new Date(`${dateString}T${time || "00:00"}`);
        if (isNaN(targetDate.getTime())) {
          targetDate = new Date(`${dateString} ${time || "00:00"}`);
        }
      }

      const difference = targetDate.getTime() - new Date().getTime();

      if (difference <= 0 || isNaN(difference)) {
        return STATIC_ZEROS;
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    };

    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [isPreview, date, time, rawWeddingDate]);

  return timeLeft;
}
