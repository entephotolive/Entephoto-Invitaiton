import { useState, useEffect } from "react";

export function useCountdown(date: string, time: string, rawWeddingDate?: string) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const dateString = rawWeddingDate || date;
      if (!dateString) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

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
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
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
  }, [date, time, rawWeddingDate]);

  return timeLeft;
}
