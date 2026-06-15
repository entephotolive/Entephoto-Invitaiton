"use client";

import { useEffect, useRef, useState } from "react";
import { Play, Pause, Music2 } from "lucide-react";

interface Props {
  musicUrl: string;
}

export default function MusicPlayer({
  musicUrl,
}: Props) {
  const audioRef =
    useRef<HTMLAudioElement>(null);

  const [playing, setPlaying] =
    useState(false);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    if (playing) {
      audio.play().catch(() => {});
    } else {
      audio.pause();
    }
  }, [playing]);

  if (!musicUrl) return null;

  return (
    <>
      <audio
        ref={audioRef}
        loop
      >
        <source
          src={musicUrl}
        />
      </audio>

      <button
        onClick={() =>
          setPlaying(!playing)
        }
        className="
          fixed
          bottom-6
          right-6
          z-50
          w-16
          h-16
          rounded-full
          bg-rose-500
          hover:bg-rose-600
          text-white
          shadow-xl
          flex
          items-center
          justify-center
          transition
        "
      >
        {playing ? (
          <Pause size={24} />
        ) : (
          <Play size={24} />
        )}
      </button>

      {!playing && (
        <div
          className="
            fixed
            bottom-24
            right-6
            z-50
            bg-white
            px-4
            py-2
            rounded-full
            shadow
            flex
            items-center
            gap-2
          "
        >
          <Music2
            size={16}
            className="text-rose-500"
          />

          <span className="text-sm">
            Play Music
          </span>
        </div>
      )}
    </>
  );
}