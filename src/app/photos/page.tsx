import { getPhotos } from "@/sanity/lib/fetch";
import React from "react";
import PhotoCards from "../components/PhotoCards";

export default async function PhotosPage() {
  const photos = await getPhotos();
  return (
    <div className="flex justify-between flex-col mt-20  w-[90vw] mx-auto">
      <h2 className="text-4xl leading-none">
        PHOTOGRAPHIES{" "}
        <span className="opacity-15 ml-1 md:text-3xl text-2xl">
          ({photos.length})
        </span>
      </h2>

      <PhotoCards list={photos} />
    </div>
  );
}
