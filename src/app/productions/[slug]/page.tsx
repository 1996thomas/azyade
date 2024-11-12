import { components } from "@/app/components/PortableTextComp";
import { getProduction } from "@/sanity/lib/fetch";
import { urlFor } from "@/sanity/lib/image";
import { PortableText } from "next-sanity";
import Image from "next/image";
import React from "react";
type Props = Promise<{ slug: string }>;
export const revalidate = 60; // Actualise toutes les 60 secondes


export default async function page({ params }: { params: Props }) {
  const { slug } = await params;
  const production = await getProduction(slug);
  return (
    <div className="mt-20 w-[90vw] mx-auto">
      <h2 className="text-6xl text-center">{production.title.toUpperCase()}</h2>
      <div className="flex items-center">
        <Image
          src={urlFor(production.poster).url()}
          alt={`Affiche du projet ${production.title}`}
          width={600}
          height={600}
        />
        <div className="flex flex-col text-xl">
          <PortableText
            value={production.presentation}
            components={components}
          />
        </div>
      </div>
      <span className="border-b-2 flex border-black w-full h-5 mb-5 my-20" />

      <div className="grid grid-cols-2 mt-20">
        {production.block_text?.map((block, key) => (
          <div key={key} className="flex gap-5">
            <h3 className="text-3xl max-w-[220px] w-full">{block.title}</h3>
            <PortableText value={block.content} components={components} />
          </div>
        ))}
      </div>
    </div>
  );
}
