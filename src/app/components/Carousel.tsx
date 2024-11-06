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
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);

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
          start: "top top",
          end: () => `+=${maxScroll}`,
          scrub: 1,
          pin: true,
          onUpdate: (self) => {
            const newIndex = Math.min(
              Math.ceil(self.progress * numSlides),
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

  // Function to open zoomed image
  const openZoomedImage = (imageUrl: string) => {
    setZoomedImage(imageUrl);
    document.body.style.overflow = "hidden";
  };

  const closeZoomedImage = () => {
    setZoomedImage(null);
    document.body.style.overflow = "auto";
  };

  return (
    <div
      ref={carouselContainer}
      className="w-full h-full overflow-hidden relative"
    >
      <div className="absolute top-[-10vw] left-5 text-[30vw] font-black tracking-tighter text-gray-100">
        {currentIndex} / {gallery.images.length}
      </div>
      <div
        className="slider-wrapper w-max h-screen flex items-center gap-[5vw]"
        ref={sliderWrapper}
      >
        {gallery.images.map((image, index) => (
          <div
            onClick={() => openZoomedImage(`${urlFor(image).url()}`)}
            className={`slide h-auto w-[40vw] max-w-[80%] transition-all duration-300 ease-in-out`}
            key={index}
          >
            <Image
              className="w-full object-cover"
              src={urlFor(image).url()}
              alt=""
              width={800}
              height={800}
            />
          </div>
        ))}
      </div>
      {zoomedImage && (
        <div className="zoomed-image-container" onClick={closeZoomedImage}>
          <Image
            src={zoomedImage}
            alt="zoomed-image"
            layout="fill"
            objectFit="contain"
            className="object-cover"
          />
        </div>
      )}
    </div>
  );
}
