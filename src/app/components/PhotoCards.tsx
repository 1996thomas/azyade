"use client";
import { urlFor } from "@/sanity/lib/image";
import { Photo, PHOTO_QUERYResult } from "@/sanity/types/type";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import SkeletonPhotoList from "./SkeletonPhotoList";
import SkeletonPhotoCards from "./SkeletonPhotoCards";

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
    <div className=" mx-auto w-[80vw]">
      <ul className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {isLoading ? (
          Array.from({ length: 12 }).map((_, idx) => (
            <SkeletonPhotoCards key={idx} />
          ))
        ) : safeList.length > 0 ? (
          safeList.map((item) => (
            <li key={item._id} className="text-3xl first:border-t-[1px] mt-5">
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
                  <ul className="flex gap-3">
                    {item.tags &&
                      item.tags.map((tag) => (
                        <li
                          key={tag._id}
                          className="text-xl px-2 py-1 border-black border-[1px]"
                        >
                          {tag.name}
                        </li>
                      ))}
                  </ul>
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
