"use client";

import { useEffect, useState } from "react";

interface Petal {
  id: number;
  left: number;
  delay: number;
  duration: number;
}

export default function FloatingPetals() {
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    const generated = Array.from(
      { length: 20 },
      (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 10,
        duration: 10 + Math.random() * 8,
      })
    );

    setPetals(generated);
  }, []);

  return (
    <>
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="falling-petal text-2xl"
          style={{
            left: `${petal.left}%`,
            animationDelay: `${petal.delay}s`,
            animationDuration: `${petal.duration}s`,
          }}
        >
          🌸
        </div>
      ))}
    </>
  );
}