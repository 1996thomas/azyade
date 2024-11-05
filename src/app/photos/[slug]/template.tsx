"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

export default function Template({ children }: { children: React.ReactNode }) {
  const overlay = useRef(null);
  const content = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline();

    tl.fromTo(
      overlay.current,
      { y: "100%", opacity: 1 },
      {
        y: "0%",
        duration: 0.8,
        ease: "power1.inOut",
      }
    )
      .to(overlay.current, {
        y: "-100%",
        duration: 0.8,
        ease: "power1.inOut",
        onComplete: () => {
          if (overlay.current) {
            (overlay.current as HTMLElement).style.display = "none";
          }
        },
      })
      .fromTo(
        content.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1,
          ease: "power1.inOut",
        }
      );
  }, []);

  return (
    <>
      <div
        ref={overlay}
        className="fixed top-0 left-0 h-full w-full bg-black z-50"
      ></div>

      {/* Content with fade-in effect */}
      <div ref={content} className="relative">
        {children}
      </div>
    </>
  );
}
