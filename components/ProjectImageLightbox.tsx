"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type Props = {
  src: string;
  alt: string;
  title: string;
};

export function ProjectImageLightbox({ src, alt, title }: Props) {
  const frameRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(document.fullscreenElement === frameRef.current);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  const toggleFullscreen = async () => {
    if (!frameRef.current) return;
    if (document.fullscreenElement) {
      await document.exitFullscreen();
      return;
    }
    await frameRef.current.requestFullscreen();
  };

  return (
    <div
      ref={frameRef}
      className="relative h-full w-full bg-cream"
      data-fullscreen={isFullscreen}
    >
      <button
        type="button"
        onClick={toggleFullscreen}
        className="group absolute inset-0 z-10 cursor-zoom-in focus-visible:cursor-zoom-in"
        aria-label={`${isFullscreen ? "Minimize" : "View"} ${title}`}
      >
        <span className="sr-only">
          {isFullscreen ? "Minimize image" : "View image fullscreen"}
        </span>
      </button>
      <Image
        src={src}
        alt={alt}
        fill
        priority
        className="object-contain"
        sizes="100vw"
      />
      {isFullscreen && (
        <button
          type="button"
          onClick={toggleFullscreen}
          className="absolute right-4 top-4 z-20 rounded-[14px] border border-border-warm bg-surface/95 px-4 py-2 font-bold text-text-primary shadow-sm"
        >
          Minimize
        </button>
      )}
    </div>
  );
}
