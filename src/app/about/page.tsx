import { getAbout, getSettings } from "@/sanity/lib/fetch";
import { urlFor } from "@/sanity/lib/image";
import { PortableText } from "next-sanity";
import Image from "next/image";
import React from "react";
import { components } from "../components/PortableTextComp";
import Link from "next/link";

export const revalidate = 60; // Actualise toutes les 60 secondes

export default async function page() {
  const content = await getAbout();
  const settings = await getSettings();
  return (
    <div className="mt-32 w-[90vw] mx-auto">
      <div className="flex w-full flex-col xl:flex-row items-center">
        <h1 className="text-7xl text-nowrap block xl:hidden">
          {settings.site_title}
        </h1>
        <div className="flex-1 flex justify-center">
          <Image
            className="object-cover"
            src={urlFor(content.profile_picture).url()}
            alt={"Photo de profile de Aziyade Abauzit"}
            width={400}
            height={500}
          />
        </div>
        <div className="flex flex-1 flex-col gap-5">
          <h1 className="text-5xl hidden xl:block">{settings.site_title}</h1>
          <div className="xl:w-[90%]">
            <PortableText components={components} value={content.content} />
          </div>
          <span className="hidden xl:flex border-b-2 border-black h-5 mb-5 my-5 w-full mx-auto" />

          <div className="hidden xl:flex gap-10 justify-center">
            {settings.social_links.map((link) => (
              <Link href={link.link} key={link.link}>
                <Image
                  src={urlFor(link.image).url()}
                  aria-hidden="true"
                  width={50}
                  height={50}
                  alt=""
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
