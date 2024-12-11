"use client";
import "../css/plyr.css";
import { Production } from "@/sanity/types/type";
import Image from "next/image";
import { PortableText } from "next-sanity";
import { components } from "./PortableTextComp";

export default function HeroProd({
  selectedProduction,
}: {
  selectedProduction: Production;
}) {
  return (
    <div className="flex">
      <div className="flex-1 flex justify-center items-center">
        <div className="aspect-[3/4] bg-red-400">
          <Image
            src={"/test.png"}
            width={500}
            height={500}
            alt={`poster du film ${selectedProduction.title}`}
            className="object-cover w-full h-full"
          />
        </div>
      </div>
      <div className="flex-1 ">
        <div className=" text-5xl">{selectedProduction.title}</div>
        <PortableText
          value={selectedProduction.presentation}
          components={components}
        />
        <div className="text-5xl">{selectedProduction.title}</div>
      </div>
    </div>
  );
}
