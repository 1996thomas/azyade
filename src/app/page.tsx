"use client";
import { useEffect, useState } from "react";
import { getPhotos } from "@/sanity/lib/fetch";
import HeroProd from "./components/HeroProd";
import PhotosList from "./components/PhotosList";
import { Photo } from "@/sanity/types/type";

export default function Home() {
  const [photos, setPhotos] = useState<Photo[]>([]); // Explicitly set the type of photos
  useEffect(() => {
    async function fetchPhotos() {
      try {
        const data: Photo[] = await getPhotos();
        setPhotos(data);
      } catch (error) {
        console.error("Error fetching photos:", error);
      }
    }

    fetchPhotos();
  }, []);

  return (
    <div>
      <HeroProd />
      {photos.length > 0 && <PhotosList list={photos} />}
    </div>
  );
}
