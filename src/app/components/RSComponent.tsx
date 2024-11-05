import { getSettings } from "@/sanity/lib/fetch";
import { urlFor } from "@/sanity/lib/image";
import { Setting } from "@/sanity/types/type";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default async function RSComponent() {
  const settings = await getSettings();
  const currentYear = new Date().getFullYear();

  return (
    <>
      <div className="flex flex-col items-center p-10">
        <h3>
          ©{settings.site_title} - {currentYear}
        </h3>
      </div>
      <ul className="flex gap-2 justify-center w-full p-5">
        {settings.social_links.map((i, key) => (
          <li key={key}>
            <Link href={i.link}>
              <Image
                src={urlFor(i.image).url()}
                width={30}
                height={30}
                alt=""
              />
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
