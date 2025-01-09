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
    <div className="min-h-screen">
      <div className="md:mt-28 mt-20 w-[90vw] mx-auto flex flex-col md:gap-5 items-center">
        <h2 className="text-4xl md:text-6xl  text-center">
          {production.title.toUpperCase()}
        </h2>
        <Image
        className="md:max-w-[50vw] w-full md:max-h-[50vh] object-contain"
          src={urlFor(production.poster).url()}
          alt={`Affiche du projet ${production.title}`}
          width={400}
          height={600}
        />
        <div className="md:text-base md:max-w-[50vw]">
          <PortableText
            value={production.presentation}
            components={components}
          />
        </div>
        {production.paragraph_text && (
          <span className="border-b-2 flex border-gray-500 w-full h-5 mb-5 md:my-20" />
        )}
        <div>
          {production.paragraph_text?.map((block, key) => (
            <div
              key={key}
              className="flex text-justify md:gap-5 flex-col  md:max-w-[40vw] mb-4 "
            >
              <h3 className="text-3xl  w-full">{block.title}</h3>

              <PortableText value={block.content} components={components} />
            </div>
          ))}
        </div>
        {production.video.id && production.video.provider === "youtube" && (
          <iframe
          className="w-full md:max-w-[50vw] aspect-video "
            src={`https://www.youtube.com/embed/${production.video.id}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        )}
        {production.block_text && (
          <span className="border-b-2 flex border-gray-500 w-full h-5 mb-5 md:my-20" />
        )}{" "}
        <div className="grid grid-cols-2 md:mt-20 text-sm">
          {production.block_text?.map((block, key) => (
            <div key={key} className="flex md:gap-5 flex-col">
              <h3 className="text-base md:text-3xl w-full">
                {block.title}
              </h3>
              <PortableText value={block.content} components={components} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
