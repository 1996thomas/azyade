"use client";
import { Production } from "@/sanity/types/type";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { urlFor } from "@/sanity/lib/image";
import Link from "next/link";
import { checkProvider } from "../utils/checkProvider";

export default function RealCard({ data }: { data: Production }) {
  const [, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="flex lg:gap-10 lg:flex-row flex-col">
      <div className="flex">
        <div className=" items-start none xl:flex relative lg:w-[32vw]">
          <Link
            className="absolute w-full h-full z-10 md:hidden"
            href={`/realisations/${data.slug.current}`}
          />
          <Image
            src={urlFor(data.poster).url()}
            width={550}
            height={500}
            alt={`poster du film ${data.title}`}
            className="object-contain bg-slate-100 sticky top-10"
          />
        </div>
      </div>
      <div className="flex lg:w-[68vw] flex-col gap-10">
        <div className="uppercase font-black flex justify-between flex-col gap-2">
          <h2 className="text-[12vw] lg:text-6xl leading-none ">
            {data.title}
          </h2>
          <Link
            className="underline text-sm lg:text-xl lg:self-end"
            href={`/realisations/${data.slug.current}`}
          >
            Voir la réalisation
          </Link>
        </div>

        <div className="hidden lg:block">
          <h3 className="xl:text-3xl text-xl uppercase">Bande-annonce</h3>
          {checkProvider(data.video.provider, data.video.id)}
        </div>
      </div>
    </div>
  );
}
