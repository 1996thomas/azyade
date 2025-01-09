"use client";
import { Productions } from "@/sanity/types/type";
import React, { useState, useEffect } from "react";
import SkeletonPhotoList from "./SkeletonPhotoList";
import RealCard from "./RealCard";

export default function ProductionsList({ list }: { list: Productions }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (list && list.length > 0) {
        setIsLoading(false);
      }
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, [list]);

  const safeList = Array.isArray(list) ? list : [];

  return (
    <div className="mt-20 mx-auto w-[90vw]">
      <ul className="flex flex-col gap-9">
        {isLoading ? (
          Array.from({ length: 2 }).map((_, idx) => (
            <li key={idx}>
              <SkeletonPhotoList key={idx} />
            </li>
          ))
        ) : safeList.length > 0 ? (
          safeList.map((item) => (
            <li
              key={item._id}
              className="border-b-[2px] lg:pb-20 pb-10 border-gray-500 last:border-none"
            >
              <RealCard data={item} />
            </li>
          ))
        ) : (
          <li>No photos available</li>
        )}
      </ul>
    </div>
  );
}
