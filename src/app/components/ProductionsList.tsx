"use client";
import { urlFor } from "@/sanity/lib/image";
import { Productions } from "@/sanity/types/type";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import SkeletonPhotoList from "./SkeletonPhotoList";

export default function ProductionsList({ list }: { list: Productions }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simuler un délai de chargement de 3 secondes
    const timeoutId = setTimeout(() => {
      if (list && list.length > 0) {
        setIsLoading(false);
      }
    }, 2000); // Délai de 3 secondes

    // Nettoyage du timeout pour éviter les fuites de mémoire
    return () => clearTimeout(timeoutId);
  }, [list]);

  const safeList = Array.isArray(list) ? list : [];

  return (
    <div className="mt-20 mx-auto w-[90vw]">
      <ul className="flex flex-col">
        {isLoading ? (
          Array.from({ length: 2 }).map((_, idx) => (
            <SkeletonPhotoList key={idx} />
          ))
        ) : safeList.length > 0 ? (
          safeList.map((item) => (
            <li
              key={item._id}
              className="text-5xl border-black border-b-[1px] first:border-t-[1px]"
            >
              <Link
                href={`productions/${item.slug.current}`}
                className="flex justify-between items-center mx-auto"
              >
                <div className="flex flex-col gap-5">
                  <h3 className="font-semibold">{item.title}</h3>
                </div>
                <Image
                  className="aspect-video object-cover p-8"
                  src={urlFor(item.poster).url()}
                  width={500}
                  height={300}
                  alt={item.poster.alt}
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
