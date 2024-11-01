import { getPhoto } from "@/sanity/lib/fetch";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";

type Props = Promise<{ slug: string }>;

export default async function Page({ params }: { params: Props }) {
  const { slug } = await params;
  const photo = await getPhoto(slug);
  console.log(photo.gallery?.images);
  return (
    <>
      <div>
        <p>{photo?.title}</p>
        {photo?.image && (
          <Image
            alt={photo.image.alt || "Image"}
            src={urlFor(photo.image).url()}
            width={300}
            height={300}
          />
        )}
      </div>
      <div>
        {photo.gallery?.images.map((image, index) => (
          <Image
            key={index}
            alt={image.alt || "Gallery Image"}
            src={urlFor(image).url()}
            width={300}
            height={300}
          />
        ))}
      </div>
    </>
  );
}
