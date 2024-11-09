'use client'
import { urlFor } from "@/sanity/lib/image";
import { PHOTO_QUERYResult } from "@/sanity/types/type";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import SkeletonPhoto from "./SkeletonPhotoList";
import SkeletonPhotoList from "./SkeletonPhotoList";

export default function PhotosList({ list }: { list: PHOTO_QUERYResult }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simuler un délai de chargement de 3 secondes
    const timeoutId = setTimeout(() => {
      if (list && list.length > 0) {
        setIsLoading(false);
      }
    }, 3000); // Délai de 3 secondes

    // Nettoyage du timeout pour éviter les fuites de mémoire
    return () => clearTimeout(timeoutId);
  }, [list]);

  const safeList = Array.isArray(list) ? list : [];

  return (
    <div className="mt-20 mx-auto w-[90vw]">
      <ul className="flex flex-col">
        {isLoading ? (
          // Display skeletons if data is still loading
          Array.from({ length: 5 }).map((_, idx) => <SkeletonPhotoList key={idx} />)
        ) : // Render the actual list if data is loaded
        safeList.length > 0 ? (
          safeList.map((item) => (
            <li
              key={item._id}
              className="text-5xl border-black border-b-[1px] first:border-t-[1px]"
            >
              <Link
                href={`photos/${item.slug.current}`}
                className="flex justify-between items-center mx-auto"
              >
                <div className="flex flex-col gap-5">
                  <h3 className="font-semibold">{item.title}</h3>
                  <ul className="flex gap-3">
                    {item.tags &&
                      item.tags.map((tag) => (
                        <li
                          key={tag._id}
                          className="text-xl px-4 py-1 border-black border-[1px]"
                        >
                          {tag.name}
                        </li>
                      ))}
                  </ul>
                </div>
                <Image
                  className="aspect-square object-cover p-8"
                  src={urlFor(item.image).url()}
                  width={300}
                  height={300}
                  alt={item.image.alt}
                />
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
