import { getPhotos } from "@/sanity/lib/fetch";
import React from "react";
import PhotosList from "../components/PhotosList";

export default async function PhotosPage() {
  const photos = await getPhotos();
  return (
    <div className="flex justify-between">
      <PhotosList list={photos} />
    </div>
  );
}
