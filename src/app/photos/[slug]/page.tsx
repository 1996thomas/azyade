import SwiperCarousel from "@/app/components/SwiperCarousel";
import { getPhoto, getPhotoTags } from "@/sanity/lib/fetch";
import { urlFor } from "@/sanity/lib/image";
import { PortableText } from "next-sanity";
import Image from "next/image";

type Props = Promise<{ slug: string }>;

export default async function Page({ params }: { params: Props }) {
  const { slug } = await params;
  const photo = await getPhoto(slug);
  const tags = await getPhotoTags(slug);

  return (
    <>
      <div className="flex flex-col justify-between mb-10 p-1 lg:w-[80vw] mx-auto mt-36 lg:flex-row-reverse ">
        {photo?.image && (
          <Image
            className="flex-1 w-full aspect-square h-auto object-cover lg:order-1"
            alt={photo.image.alt || "Image"}
            src={urlFor(photo.image).url()}
            width={800}
            height={800}
          />
        )}
        <div className="flex-1 gap-5 flex flex-col self-center p-5  order-1">
          <h2 className="text-4xl font-black lg:text-5xl">{photo.title}</h2>
          {photo.description !== undefined && (
            <div className="w-[80%] text-xl lg:text-2xl ">
              <PortableText value={photo.description} />
            </div>
          )}
          <ul className="flex gap-3">
            {tags &&
              tags.map((tag, key) => (
                <li
                  key={key}
                  className="text-xl px-4 py-1 border-black border-[1px]"
                >
                  {tag.name}
                </li>
              ))}
          </ul>
        </div>
      </div>
      <div className="">
        {photo.gallery !== undefined && (
          <SwiperCarousel gallery={photo.gallery} />
        )}
      </div>
    </>
  );
}
