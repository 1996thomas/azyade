"use client";
import React from "react";

export default function SkeletonPhotoList() {
  return (
    <li className="animate-pulse flex justify-between items-center border-b-[1px] border-gray-300 py-8">
      <div className="flex flex-col gap-5 w-2/3">
        <div className="bg-gray-300 h-8 w-1/3 "></div>
        <div className="flex gap-3">
          <div className="bg-gray-300 h-6 w-16 "></div>
          <div className="bg-gray-300 h-6 w-16 "></div>
        </div>
      </div>
      <div className="bg-gray-300 w-[400px] aspect-video "></div>
    </li>
  );
}
