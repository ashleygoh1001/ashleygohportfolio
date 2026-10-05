"use client";

import { useEffect, useRef } from "react";

type Props = {
  src: string;
  title: string;
};

export function EmbeddedFrame({ src, title }: Props) {
  const frameRef = useRef<HTMLIFrameElement>(null);
  const savedScrollY = useRef(0);
  const interacting = useRef(false);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;

    const handleFocus = () => {
      savedScrollY.current = window.scrollY;
      interacting.current = true;
    };
    const handleLoad = () => {
      if (interacting.current) {
        window.scrollTo({ top: savedScrollY.current, behavior: "instant" });
      }
    };
    frame.addEventListener("focus", handleFocus);
    frame.addEventListener("load", handleLoad);

    return () => {
      frame.removeEventListener("focus", handleFocus);
      frame.removeEventListener("load", handleLoad);
    };
  }, []);

  return (
    <iframe
      ref={frameRef}
      title={title}
      src={src}
      className="absolute inset-0 h-full w-full"
    />
  );
}