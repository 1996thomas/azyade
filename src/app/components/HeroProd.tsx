"use client";
import React, { ReactElement, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import "../css/plyr.css";
import { useGSAP } from "@gsap/react";

export default function HeroProd() {
  const [importedComp, setImportedComp] = useState<ReactElement>();

  const plyrProps = {
    source: {
      type: "video",
      sources: [
        {
          src: "h3MASwVK7Kw",
          provider: "youtube",
        },
      ],
    },
  };

  useEffect(() => {
    const importComp = async () => {
      const myModule = await import("plyr-react");
      const Plyr = myModule.default;
      //@ts-expect-error/plyrProps-issues-to-be-fixed
      setImportedComp(<Plyr {...plyrProps}/>);
    };
    importComp();
  }, []);

  const videoRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const lastMousePos = useRef({ x: 0, y: 0 });
  const isHovering = useRef(false);

  const videoIntensity = 0.3;
  const textIntensity = 0.1;

  useGSAP(() => {
    const handleMove = (e: MouseEvent) => {
      if (!isHovering.current) return;

      const normalizedX = (e.clientX / window.innerWidth) * 2 - 1;
      const videoMousePos = {
        x: normalizedX * (window.innerWidth / 4) * videoIntensity,
        y: (e.clientY / 4 + window.scrollY) * videoIntensity,
      };
      const textMousePos = {
        x: normalizedX * (window.innerWidth / 4) * textIntensity,
        y: (e.clientY / 4 + window.scrollY) * textIntensity,
      };
      const speed = Math.sqrt(
        Math.pow((videoMousePos.x - lastMousePos.current.x) / 2, 2)
      );
      const maxY = window.scrollY + window.innerHeight - 30;
      const maxX = window.innerWidth - 30;

      gsap.to(videoRef.current, {
        x: gsap.utils.clamp(-maxX / 2, maxX / 2, videoMousePos.x - 20),
        y: gsap.utils.clamp(0, maxY, videoMousePos.y - 10),
        rotation:
          speed *
          videoIntensity *
          (videoMousePos.x > lastMousePos.current.x ? 1 : -1),
        duration: 1.3,
      });

      gsap.to(textRef.current, {
        x: -textMousePos.x,
        y: -textMousePos.y,
        duration: 1.3,
      });

      lastMousePos.current = videoMousePos;
    };

    const handleEnter = (e: MouseEvent) => {
      isHovering.current = true;

      const normalizedX = (e.clientX / window.innerWidth) * 2 - 1;
      const mousePos = {
        x: normalizedX * (window.innerWidth / 8) * videoIntensity,
        y: (e.clientY / 8 + window.scrollY) * videoIntensity,
      };
      gsap.to(videoRef.current, {
        x: gsap.utils.clamp(
          -window.innerWidth / 2,
          window.innerWidth / 2,
          mousePos.x
        ),
        y: gsap.utils.clamp(0, window.scrollY + window.innerHeight, mousePos.y),
        duration: 0.8,
      });
      lastMousePos.current = mousePos;
    };

    const handleLeave = () => {
      isHovering.current = false;
      gsap.killTweensOf([videoRef.current, textRef.current]);

      gsap.to([videoRef.current, textRef.current], {
        x: 0,
        y: 0,
        rotation: 0,
        duration: 0.8,
      });

      lastMousePos.current = { x: 0, y: 0 };
    };

    if (wrapperRef.current) {
      wrapperRef.current.addEventListener("mouseenter", handleEnter);
      wrapperRef.current.addEventListener("mouseleave", handleLeave);
      window.addEventListener("mousemove", handleMove);
    }

    return () => {
      if (wrapperRef.current) {
        wrapperRef.current.removeEventListener("mouseenter", handleEnter);
        wrapperRef.current.removeEventListener("mouseleave", handleLeave);
        window.removeEventListener("mousemove", handleMove);
      }
    };
  }, []);

  return (
    <div ref={wrapperRef} className="h-screen relative mt-10">
      <h1 className="font-black text-6xl absolute bottom-0 left-[50%] translate-x-[-50%] tracking-[1px] text-nowrap">
        AZIYADE ABAUZIT
      </h1>
      <div
        ref={videoRef}
        className="flex items-center justify-center w-[80vw] aspect-video overflow-hidden absolute top-0 left-[50%] translate-x-[-50%] bg-slate-500"
      >
        <div className="h-full w-full p-0">
          {importedComp && importedComp !== undefined && importedComp}
        </div>
      </div>
      <div className="pointer-events-none z-50 absolute p-3 w-[80vw] aspect-video top-0 left-[50%] translate-x-[-50%] flex items-end">
        <div
          ref={textRef}
          className="flex w-full items-end overflow-hidden justify-between"
        >
          <p className="text-5xl text-yellow-400 font-bold">SOLASTARGIE</p>
          <p className="text-4xl text-yellow-400">Un film de Aziyade Abauzit</p>
        </div>
      </div>
    </div>
  );
}
