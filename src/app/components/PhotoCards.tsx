import { urlFor } from "@/sanity/lib/image";
import { Photo } from "@/sanity/types/type";
import React from "react";

export default function PhotoCards({ photo }: { photo: Photo }) {
  return (
    <div
      style={{ backgroundImage: `url(${urlFor(photo.image).url()})` }}
      className="bg-cover bg-center relative h-[20vw] w-fit"
    >
      <p>{photo.title}</p>
      <p>{photo.description}</p>
    </div>
  );
}
