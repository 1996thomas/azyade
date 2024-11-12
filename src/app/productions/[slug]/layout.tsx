// app/photos/[slug]/layout.tsx
import { getProduction } from "@/sanity/lib/fetch";
import { urlFor } from "@/sanity/lib/image";
type Props = Promise<{ slug: string }>;
export const revalidate = 60; // Actualise toutes les 60 secondes

export async function generateMetadata({ params }: { params: Props }) {
  const { slug } = await params;
  const meta = await getProduction(slug);
  return {
    title: meta?.title || "Default Title",
    description: meta?.presentation || "Default description",
    openGraph: {
      title: meta?.title,
      description: meta?.presentation,
      images: [
        {
          url: urlFor(meta?.poster).url(),
          width: 400,
          height: 400,
          alt: meta?.poster?.alt || "Image",
        },
      ],
    },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
