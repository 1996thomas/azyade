import { getPhotos } from "@/sanity/lib/fetch";
import React from "react";
import PhotoCards from "../components/PhotoCards";

export default async function PhotosPage() {
  const photos = await getPhotos();
  return (
    <div className="flex justify-between flex-col mt-20  w-[90vw] mx-auto">
      <h2 className="text-4xl leading-none">PHOTOGRAPHIE</h2>

      <PhotoCards list={photos} />
    </div>
  );
}
