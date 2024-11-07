import Carousel from "@/app/components/Carousel";
import { getPhoto } from "@/sanity/lib/fetch";
import { urlFor } from "@/sanity/lib/image";
import { PortableText } from "next-sanity";
import Image from "next/image";

type Props = Promise<{ slug: string }>;

export default async function Page({ params }: { params: Props }) {
  const { slug } = await params;
  const photo = await getPhoto(slug);
  return (
    <>
      <div className="flex justify-between h-[70vh] mb-10 w-[90vw] mx-auto mt-20">
        <div className="flex-1 gap-5 flex flex-col self-center p-5">
          <h2 className="text-5xl font-black leading-none tracking-tight">
            {photo.title}
          </h2>
          {photo.description !== undefined && (
            <div className="w-[80%]">
              <PortableText value={photo.description} />
            </div>
          )}
        </div>
        {photo?.image && (
          <Image
            className="bg-red-50 flex-1 object-cover"
            alt={photo.image.alt || "Image"}
            src={urlFor(photo.image).url()}
            width={800}
            height={800}
          />
        )}
      </div>
      <div className="">
        {photo.gallery !== undefined && <Carousel gallery={photo.gallery} />}
      </div>
    </>
  );
}
