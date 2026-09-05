"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function CustomCursor() {
  const [cursorState, setCursorState] = useState<"default" | "pointer" | "project" | "text">("default");
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);

  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  const coords = useRef({
    targetX: -100,
    targetY: -100,
    currentX: -100,
    currentY: -100,
  });

  useEffect(() => {
    // Check if device uses touch or doesn't support fine pointer
    if (window.matchMedia("(pointer: coarse)").matches) {
      setIsTouchDevice(true);
      return;
    }

    let animFrameId: number;

    const handleMouseMove = (e: MouseEvent) => {
      coords.current.targetX = e.clientX;
      coords.current.targetY = e.clientY;
      setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      // Check if hovering over project card or element with data-cursor="project"
      const isProject = target.closest("[data-cursor='project']") || target.closest(".project-card");
      if (isProject) {
        setCursorState("project");
        return;
      }

      // Check if hovering over clickable element
      const isInteractive =
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") !== null ||
        target.closest("button") !== null ||
        target.getAttribute("role") === "button" ||
        target.getAttribute("data-cursor") === "pointer" ||
        window.getComputedStyle(target).cursor === "pointer";

      if (isInteractive) {
        setCursorState("pointer");
        return;
      }

      // Check if hovering over text
      const isText =
        ["H1", "H2", "H3", "H4", "H5", "H6", "P", "SPAN"].includes(target.tagName) &&
        !isInteractive &&
        target.innerText &&
        target.innerText.trim().length > 0;

      if (isText) {
        setCursorState("text");
        return;
      }

      setCursorState("default");
    };

    const handleMouseDown = (e: MouseEvent) => {
      setIsClicking(true);
      const newRipple = { x: e.clientX, y: e.clientY, id: Date.now() };
      setRipples((prev) => [...prev.slice(-3), newRipple]);
    };

    const handleMouseUp = () => setIsClicking(false);
    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    // Smooth RAF loop for cursor trailing physics
    const loop = () => {
      const { targetX, targetY, currentX, currentY } = coords.current;

      // Lerp trailing ring
      coords.current.currentX += (targetX - currentX) * 0.2;
      coords.current.currentY += (targetY - currentY) * 0.2;

      // Position outer ring
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${coords.current.currentX}px, ${coords.current.currentY}px, 0)`;
      }

      // Position inner dot with instantaneous 1:1 response
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${targetX}px, ${targetY}px, 0)`;
      }

      animFrameId = requestAnimationFrame(loop);
    };

    animFrameId = requestAnimationFrame(loop);

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      cancelAnimationFrame(animFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  if (isTouchDevice) return null;

  return (
    <>
      {/* Outer Trailing Ring / Interactive Halo */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] will-change-transform"
        style={{
          transform: "translate3d(-100px, -100px, 0)",
          opacity: isVisible ? 1 : 0,
          transition: "opacity 0.2s ease",
        }}
      >
        <motion.div
          className="flex items-center justify-center -translate-x-1/2 -translate-y-1/2 rounded-full backdrop-blur-[1px]"
          animate={{
            width:
              cursorState === "project"
                ? 84
                : cursorState === "pointer"
                ? 54
                : cursorState === "text"
                ? 6
                : isClicking
                ? 32
                : 38,
            height:
              cursorState === "project"
                ? 84
                : cursorState === "pointer"
                ? 54
                : cursorState === "text"
                ? 30
                : isClicking
                ? 32
                : 38,
            borderRadius: cursorState === "text" ? 4 : 9999,
            backgroundColor:
              cursorState === "project"
                ? "rgba(255, 31, 143, 0.25)"
                : cursorState === "pointer"
                ? "rgba(255, 255, 255, 0.12)"
                : cursorState === "text"
                ? "rgba(255, 255, 255, 0.5)"
                : "rgba(255, 255, 255, 0.03)",
            borderColor:
              cursorState === "project"
                ? "rgba(255, 31, 143, 0.8)"
                : cursorState === "pointer"
                ? "rgba(217, 70, 239, 0.7)"
                : "rgba(255, 255, 255, 0.35)",
            borderWidth: cursorState === "text" ? 0 : 1.5,
            boxShadow:
              cursorState === "project"
                ? "0 0 25px rgba(255, 31, 143, 0.6)"
                : cursorState === "pointer"
                ? "0 0 20px rgba(217, 70, 239, 0.45)"
                : "0 0 10px rgba(255, 255, 255, 0.15)",
          }}
          transition={{
            type: "spring",
            stiffness: 360,
            damping: 24,
            mass: 0.6,
          }}
        >
          {cursorState === "project" && (
            <motion.span
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="text-[11px] font-bold tracking-widest text-white uppercase"
            >
              VIEW
            </motion.span>
          )}
        </motion.div>
      </div>

      {/* Inner Precision Aiming Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[10000] will-change-transform"
        style={{
          transform: "translate3d(-100px, -100px, 0)",
          opacity: isVisible ? 1 : 0,
          transition: "opacity 0.15s ease",
        }}
      >
        <motion.div
          className="-translate-x-1/2 -translate-y-1/2 rounded-full"
          animate={{
            width: cursorState === "project" ? 0 : cursorState === "text" ? 0 : isClicking ? 10 : 6,
            height: cursorState === "project" ? 0 : cursorState === "text" ? 0 : isClicking ? 10 : 6,
            opacity: cursorState === "project" || cursorState === "text" ? 0 : 1,
            backgroundColor: isClicking ? "#ff1f8f" : "#ffffff",
            boxShadow: isClicking
              ? "0 0 12px #ff1f8f"
              : "0 0 8px rgba(255, 255, 255, 0.8)",
          }}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 30,
          }}
        />
      </div>

      {/* Click Shockwave Ripples */}
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.div
            key={ripple.id}
            initial={{ opacity: 0.8, scale: 0.2 }}
            animate={{ opacity: 0, scale: 2.2 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="fixed pointer-events-none z-[9998] rounded-full border border-[var(--accent-pink)]"
            style={{
              left: ripple.x - 25,
              top: ripple.y - 25,
              width: 50,
              height: 50,
            }}
          />
        ))}
      </AnimatePresence>
    </>
  );
}
