// app/photos/[slug]/layout.tsx
import { getPhoto } from "@/sanity/lib/fetch";
import { urlFor } from "@/sanity/lib/image";
type Props = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Props }) {
  const { slug } = await params;
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
