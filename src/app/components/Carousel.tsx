"use client";
import { urlFor } from "@/sanity/lib/image";
import { Gallery } from "@/sanity/types/type";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import React, { useLayoutEffect, useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function Carousel({ gallery }: { gallery: Gallery }) {
  const sliderWrapper = useRef<HTMLDivElement | null>(null);
  const carouselContainer = useRef<HTMLDivElement | null>(null);
  const [maxScroll, setMaxScroll] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(1);

  // Function to update maxScroll based on current window size
  const updateMaxScroll = () => {
    if (sliderWrapper.current) {
      const calculatedMaxScroll =
        sliderWrapper.current.offsetWidth - window.innerWidth;
      setMaxScroll(calculatedMaxScroll);
    }
  };

  useLayoutEffect(() => {
    updateMaxScroll(); // Initial calculation

    if (maxScroll > 0 && sliderWrapper.current && carouselContainer.current) {
      const numSlides = gallery.images.length;

      const scrollTween = gsap.to(sliderWrapper.current, {
        x: -maxScroll,
        ease: "none",
        scrollTrigger: {
          trigger: carouselContainer.current,
          start: "5% top",
          end: () => `+=${maxScroll}`,
          scrub: 1,
          pin: true,
          onUpdate: (self) => {
            const newIndex = Math.min(
              Math.ceil(self.progress * 0.9 * numSlides),
              numSlides
            );
            setCurrentIndex(newIndex || 1);
          },
        },
      });

      return () => {
        scrollTween.kill();
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    }
  }, [maxScroll, gallery]);

  useLayoutEffect(() => {
    const handleResize = () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      updateMaxScroll();
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      ref={carouselContainer}
      className="w-full h-full overflow-hidden relative"
    >
      <div className="absolute top-[-10vw] left-5 text-[30vw] font-black tracking-tighter text-gray-100">
        {currentIndex} / {gallery.images.length}
      </div>
      <div
        className="slider-wrapper w-max h-screen flex items-center gap-[5vw] "
        ref={sliderWrapper}
      >
        {gallery.images.map((image, index) => (
          <div
            className={`slide h-auto w-[40vw] max-w-[80%] transition-all duration-300 ease-in-out ${
              currentIndex - 1 === index
                ? "scale-105 opacity-100"
                : "scale-90 brightness-50"
            }`}
            key={index}
          >
            <Image
              className="w-full object-cover"
              src={urlFor(image).url()}
              alt=""
              width={400}
              height={600}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
