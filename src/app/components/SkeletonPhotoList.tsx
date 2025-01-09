"use client";
import React from "react";

export default function SkeletonPhotoList() {
  return (
    <li className="animate-pulse">
      <div className="flex lg:gap-10 flex-col justify-center items-center">
        {/* Skeleton pour l'image */}
        <div className="md:max-h-[40vw] w-fit flex justify-center ">
          <div className="aspect-video h-[500px] bg-gray-300 rounded-lg"></div>
        </div>
        <div className="flex flex-col mt-4">
          <div className="uppercase font-black flex justify-between flex-col">
            <div className="bg-gray-300 h-[5vw] w-[50vw] "></div>
            <div className="text-sm font-light underline self-end mt-2">
              <div className="bg-gray-300 h-[16px] w-[100px] "></div>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}
