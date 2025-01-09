"use client";
import { Gallery } from "@/sanity/types/type";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import { useWindowSize } from "@uidotdev/usehooks";

export default function SwiperCarousel({ gallery }: { gallery: Gallery }) {
  const { width } = useWindowSize();
  const [zoomedImageIndex, setZoomedImageIndex] = useState<number | null>(null);

  const openZoomedImage = (index: number) => {
    setZoomedImageIndex(index);
    document.body.style.overflow = "hidden";
  };

  const closeZoomedImage = () => {
    setZoomedImageIndex(null);
    document.body.style.overflow = "auto";
  };

  const nextImage = () => {
    if (zoomedImageIndex !== null) {
      const nextIndex = (zoomedImageIndex + 1) % gallery.images.length;
      setZoomedImageIndex(nextIndex);
    }
  };

  const previousImage = () => {
    if (zoomedImageIndex !== null) {
      const previousIndex = (zoomedImageIndex + 1) % gallery.images.length;
      setZoomedImageIndex(previousIndex);
    }
  };

  return (
    <div className="">
      {width && (
        <Swiper
          slidesPerView={width > 768 ? 3 : 1}
          loop
          centeredSlides={true}
          grabCursor={true}
          pagination={{
            clickable: true,
          }}
          navigation
          modules={[Pagination, Navigation]}
        >
          {gallery.images.map((image, i) => (
            <SwiperSlide key={i}>
              <div className="p-2 ">
                <Image
                  onClick={() => openZoomedImage(i)}
                  src={urlFor(image).url()}
                  loading="eager"
                  alt={image.alt || "Carousel Image"}
                  width={650}
                  height={500}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
      {zoomedImageIndex !== null && (
        <div className="zoomed-image-container" onClick={closeZoomedImage}>
          <div className="fixed z-50 md:top-[50%] md:translate-y-[-50%] bottom-10 text-xl flex w-[95vw] mx-auto text-white justify-between md:text-2xl ">
            <button
              className="hover:text-yellow-400"
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
            >
              PRÉCÉDENTE
            </button>
            <button
              className="hover:text-yellow-400"
              onClick={(e) => {
                e.stopPropagation();
                previousImage();
              }}
            >
              SUIVANTE
            </button>
          </div>
          <Image
            src={urlFor(gallery.images[zoomedImageIndex]).url()}
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
