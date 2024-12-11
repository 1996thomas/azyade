// app/photos/[slug]/layout.tsx
import { getPhoto } from "@/sanity/lib/fetch";
import { urlFor } from "@/sanity/lib/image";
type Props = Promise<{ slug: string }>;
export const revalidate = 60; // Actualise toutes les 60 secondes

export async function generateMetadata({ params }: { params: Props }) {
  const { slug } = await params;
  const photo = await getPhoto(slug);
  const description =
    photo?.description
      //@ts-expect-error //mapping on description without portable
      ?.map((block: HTMLDivElement) => {
        if (block.children && Array.isArray(block.children)) {
          return block.children.map((child) => child.text).join("");
        }
        return "";
      })
      .join(" ") || "Default description";

  return {
    title: photo?.title || "Default Title",
    description: description || "Default description",
    openGraph: {
      title: photo?.title,
      description: description,
      images: [
        {
          url: urlFor(photo?.image).url(),
          width: 400,
          height: 400,
          alt: photo?.image?.alt || "Image",
        },
      ],
    },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
