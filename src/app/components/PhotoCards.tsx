"use client";
import { urlFor } from "@/sanity/lib/image";
import { PHOTO_QUERYResult } from "@/sanity/types/type";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import SkeletonPhotoCards from "./SkeletonPhotoCards";
import Tags from "./Tags";

export default function PhotoCards({ list }: { list: PHOTO_QUERYResult }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (list && list.length > 0) {
        setIsLoading(false);
      }
    }, 3500);

    return () => clearTimeout(timeoutId);
  }, [list]);

  const safeList = Array.isArray(list) ? list : [];

  return (
    <div>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {isLoading ? (
          Array.from({ length: 12 }).map((_, idx) => (
            <SkeletonPhotoCards key={idx} />
          ))
        ) : safeList.length > 0 ? (
          safeList.map((item) => (
            <li key={item._id} className="text-2xl first:border-t-[1px] mt-5">
              <Link
                href={`photos/${item.slug.current}`}
                className="flex flex-col items-center"
              >
                <Image
                  className="aspect-square object-cover w-full"
                  src={urlFor(item.image).url()}
                  width={300}
                  height={300}
                  alt={item.image.alt}
                />
                <div className="w-full">
                  <h3 className="font-semibold">{item.title}</h3>
                  {item.tags && <Tags tags={item.tags} />}
                </div>
              </Link>
            </li>
          ))
        ) : (
          <li>No photos available</li>
        )}
      </ul>
    </div>
  );
}
