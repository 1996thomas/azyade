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
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadedImages, setLoadedImages] = useState<string[]>([]);

  const updateMaxScroll = () => {
    if (sliderWrapper.current) {
      const calculatedMaxScroll =
        sliderWrapper.current.offsetWidth - window.innerWidth;
      setMaxScroll(calculatedMaxScroll);
    }
  };

  useLayoutEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    if (maxScroll > 0 && sliderWrapper.current && carouselContainer.current) {
      const scrollTween = gsap.to(sliderWrapper.current, {
        x: -maxScroll,
        ease: "none",
        scrollTrigger: {
          trigger: carouselContainer.current,
          start: "top top",
          end: () => `+=${maxScroll}`,
          scrub: 1,
          pin: true,
        },
      });

      return () => {
        scrollTween.kill();
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    }

    return () => clearTimeout(timeoutId);
  }, [maxScroll, gallery]);

  useLayoutEffect(() => {
    const handleResize = () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      updateMaxScroll();
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const openZoomedImage = (imageUrl: string) => {
    setZoomedImage(imageUrl);
    document.body.style.overflow = "hidden";
  };

  const closeZoomedImage = () => {
    setZoomedImage(null);
    document.body.style.overflow = "auto";
  };

  const handleImageLoad = (url: string) => {
    if (!isLoading) {
      if (!loadedImages.includes(url)) {
        setLoadedImages((prev) => [...prev, url]);
      }
      updateMaxScroll();
    }
  };

  return (
    <>
      <div ref={carouselContainer} className="w-full overflow-hidden relative">
        <div
          className="slider-wrapper w-max mb- h-[100vh] flex items-center gap-[5vw]"
          ref={sliderWrapper}
        >
          {isLoading
            ? Array.from({ length: 5 }).map((_, idx) => (
                <div
                  key={idx}
                  className="skeleton-slide aspect-[3/4] h-auto w-[30vw] p-10 bg-gray-200"
                ></div>
              ))
            : gallery.images.map((image, index) => (
                <div
                  onClick={() => openZoomedImage(`${urlFor(image).url()}`)}
                  className={`slide h-auto w-[40vw] transition-all duration-300 ease-in-out p-10 `}
                  key={index}
                >
                  <div
                    className={`image-container w-full h-full relative transition-opacity duration-1000 ease-in-out bg-slate-500 ${
                      loadedImages.includes(urlFor(image).url())
                        ? "opacity-100"
                        : "opacity-0"
                    }`}
                  >
                    <Image
                      className="w-full object-cover p-10"
                      src={urlFor(image).url()}
                      alt={image.alt || "Photo de couverture"}
                      width={800}
                      height={800}
                      onLoad={() => handleImageLoad(urlFor(image).url())}
                    />
                  </div>
                </div>
              ))}
        </div>
      </div>
      <div>
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
    </>
  );
}
