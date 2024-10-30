import { getPhoto } from "@/sanity/lib/fetch";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props) {
  const { slug } = params;
  const photo = await getPhoto(slug);

  return {
    title: photo?.title || "Default Title",
    description: photo?.description || "Default description",
    openGraph: {
      title: photo?.title,
      description: photo?.description,
      images: [
        {
          url: urlFor(photo?.image).url(),
          width: 800,
          height: 600,
          alt: photo?.image?.alt || "Image",
        },
      ],
    },
  };
}

export default async function Page({ params }: Props) {
  const { slug } = params;
  const photo = await getPhoto(slug);

  return (
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
  );
}
