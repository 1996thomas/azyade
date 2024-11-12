import { components } from "@/app/components/PortableTextComp";
import SwiperCarousel from "@/app/components/SwiperCarousel";
import Tags from "@/app/components/Tags";
import { getPhoto, getPhotoTags } from "@/sanity/lib/fetch";
import { urlFor } from "@/sanity/lib/image";
import { PortableText } from "next-sanity";
import Image from "next/image";

type Props = Promise<{ slug: string }>;
export const revalidate = 60; // Actualise toutes les 60 secondes

export default async function Page({ params }: { params: Props }) {
  const { slug } = await params;
  const photo = await getPhoto(slug);
  const tags = await getPhotoTags(slug);

  return (
    <>
      <div className="flex flex-col justify-between mb-10 py-2 w-[90vw] mx-auto mt-20 md:flex-row-reverse gap-5">
        {photo?.image && (
          <Image
            className="flex-1 w-full aspect-square h-auto object-cover lg:order-1 bg-red-100"
            alt={photo.image.alt || "Image"}
            src={urlFor(photo.image).url()}
            width={800}
            height={800}
          />
        )}
        <div className="flex-1 gap-5 flex flex-col w-full py-5 md:self-center  order-1">
          <h2 className="text-4xl md:text-6xl font-black leading-[.8]">
            {photo.title}
          </h2>
          {photo.description !== undefined && (
            <div className="lg:w-[80%] w-full  text-sm lg:text-base ">
              <PortableText value={photo.description} components={components} />
            </div>
          )}
          <Tags tags={tags} />
        </div>
      </div>
      <div className="">
        <h3 className="w-[90vw] mx-auto flex md:text-6xl text-4xl leading-none">
          Galerie
          <span className="opacity-15 ml-1 md:text-3xl text-2xl">
            ({photo.gallery?.images.length})
          </span>
        </h3>
        {photo.gallery !== undefined && (
          <SwiperCarousel gallery={photo.gallery} />
        )}
      </div>
    </>
  );
}
