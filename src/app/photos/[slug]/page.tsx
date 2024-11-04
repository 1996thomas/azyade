import Carousel from "@/app/components/Carousel";
import { getPhoto } from "@/sanity/lib/fetch";
import { urlFor } from "@/sanity/lib/image";
import {
  PortableText,
} from "next-sanity";
import Image from "next/image";

type Props = Promise<{ slug: string }>;

export default async function Page({ params }: { params: Props }) {
  const { slug } = await params;
  const photo = await getPhoto(slug);
  // console.log(photo.gallery?.images);
  return (
    <>
      <div className="flex justify-between h-screen">
        <div className="flex-1 flex flex-col gap-10 self-center p-5">
          <h2 className="text-5xl font-black leading-none tracking-tight">
            {photo.title}
          </h2>
          {photo.description !== undefined && (
            <PortableText value={photo.description} />
          )}
        </div>
        {photo?.image && (
          <Image
            className="bg-red-50 flex-1 object-cover"
            alt={photo.image.alt || "Image"}
            src={urlFor(photo.image).url()}
            width={300}
            height={300}
          />
        )}
      </div>
      <div className="">
        {photo.gallery !== undefined && <Carousel gallery={photo.gallery} />}
      </div>
    </>
  );
}
