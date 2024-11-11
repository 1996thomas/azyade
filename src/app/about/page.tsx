import { getAbout, getSettings } from "@/sanity/lib/fetch";
import { urlFor } from "@/sanity/lib/image";
import { PortableText } from "next-sanity";
import Image from "next/image";
import React from "react";
import { components } from "../components/PortableTextComp";
import Link from "next/link";

export default async function page() {
  const content = await getAbout();
  const settings = await getSettings();
  console.log(content);
  return (
    <div className="mt-32 w-[80vw] mx-auto">
      <div className="flex w-full items-center">
        <div className="flex-1 flex">
          <Image
            className="object-cover"
            src={urlFor(content.profile_picture).url()}
            alt={"Photo de profile de Aziyade Abauzit"}
            width={400}
            height={500}
          />
        </div>
        <div className="flex flex-1 flex-col gap-5">
          <h1 className="text-5xl">{settings.site_title}</h1>
          <div>
            <PortableText components={components} value={content.content} />
          </div>
          <div className="flex gap-10 justify-center">
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
