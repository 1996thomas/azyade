"use client";
import { Gallery } from "@/sanity/types/type";
import React, {useState } from "react";
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
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);

  const openZoomedImage = (imageUrl: string) => {
    setZoomedImage(imageUrl);
    document.body.style.overflow = "hidden";
  };

  const closeZoomedImage = () => {
    setZoomedImage(null);
    document.body.style.overflow = "auto";
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
          className="mySwiper"
        >
          {gallery.images.map((image, i) => (
            <SwiperSlide key={i}>
              <div className="p-2">
                <Image
                  onClick={() => openZoomedImage(`${urlFor(image).url()}`)}
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
