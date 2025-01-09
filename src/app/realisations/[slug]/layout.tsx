// app/photos/[slug]/layout.tsx
import { getProduction } from "@/sanity/lib/fetch";
import { urlFor } from "@/sanity/lib/image";
type Props = Promise<{ slug: string }>;
export const revalidate = 60; // Actualise toutes les 60 secondes

export async function generateMetadata({ params }: { params: Props }) {
  const { slug } = await params;
  const meta = await getProduction(slug);

  const presentation =
    meta?.presentation
      //@ts-expect-error // Map block portable issue
      ?.map((block: HTMLDivElement) => {
        if (block.children && Array.isArray(block.children)) {
          return block.children.map((child) => child.text).join("");
        }
        return "";
      })
      .join(" ") || "";
  return {
    title: meta?.title || "Réalisation de Aziyadé",
    description: presentation,
    openGraph: {
      title: meta?.title,
      description: presentation,
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
