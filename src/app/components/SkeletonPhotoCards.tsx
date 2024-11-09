"use client";
import React from "react";

export default function SkeletonPhotoCards() {
  return (
    <li className="animate-pulse flex flex-col gap-4">
      <div className="bg-gray-300 aspect-square w-full"></div>
      <div className="bg-gray-300 h-6 w-full"></div>
      <div className="h-6 w-[50%] flex gap-3 self-start">
        <div className="bg-gray-300 w-full"></div>
        <div className="bg-gray-300 w-full"></div>
      </div>
    </li>
  );
}
