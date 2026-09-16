import { useEffect, useRef } from "react";

/**
 * Applies a subtle 3D tilt to an element based on pointer position.
 * Respects prefers-reduced-motion. maxTilt is in degrees.
 */
export function useTilt(maxTilt = 8) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    let frame = null;

    const handleMove = (e) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width; // 0..1
      const y = (e.clientY - rect.top) / rect.height; // 0..1
      const ry = (x - 0.5) * 2 * maxTilt; // rotateY
      const rx = (0.5 - y) * 2 * maxTilt; // rotateX

      if (frame) cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        el.style.setProperty("--rx", `${rx.toFixed(2)}deg`);
        el.style.setProperty("--ry", `${ry.toFixed(2)}deg`);
      });
    };

    const handleLeave = () => {
      if (frame) cancelAnimationFrame(frame);
      el.style.setProperty("--rx", `0deg`);
      el.style.setProperty("--ry", `0deg`);
    };

    el.addEventListener("pointermove", handleMove);
    el.addEventListener("pointerleave", handleLeave);

    return () => {
      el.removeEventListener("pointermove", handleMove);
      el.removeEventListener("pointerleave", handleLeave);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [maxTilt]);

  return ref;
}
