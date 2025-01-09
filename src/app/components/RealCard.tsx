"use client";
import { Production } from "@/sanity/types/type";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { urlFor } from "@/sanity/lib/image";
import Link from "next/link";

export default function RealCard({ data }: { data: Production }) {
  const [, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <Link
      href={`/realisations/${data.slug.current}`}
      className="flex lg:gap-10 flex-col justify-center items-center"
    >
      <div className="md:max-h-[40vw] w-fit flex justify-center">
        <Image
          src={urlFor(data.poster).url()}
          width={550}
          height={500}
          alt={`poster du film ${data.title}`}
          className="object-contain"
        />
      </div>
      <div className="flex flex-col">
        <div className="uppercase font-black flex justify-between flex-col">
          <h2 className="text-[12vw] md:text-[8vw] leading-none ">{data.title}</h2>
          <p className="text-sm font-light underline self-end">En voir +</p>
        </div>
      </div>
    </Link>
  );
}
