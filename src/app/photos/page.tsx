import { getPhotos } from "@/sanity/lib/fetch";
import React from "react";
import PhotoCards from "../components/PhotoCards";
import Link from "next/link";

export default async function PhotosPage() {
  const photos = await getPhotos();
  return (
    <div className="flex justify-between">
      {photos.map((photo) => (
        <Link key={photo._id} href={`/photos/${photo.slug.current}`}>
          <PhotoCards photo={photo} />
        </Link>
      ))}
    </div>
  );
}
