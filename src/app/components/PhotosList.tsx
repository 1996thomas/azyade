import { urlFor } from "@/sanity/lib/image";
import { PHOTO_QUERYResult } from "@/sanity/types/type";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function PhotosList({ list }: { list: PHOTO_QUERYResult }) {
  console.log(list);
  return (
    <div className="mt-20 w-full">
      <ul className="flex flex-col">
        {list.map((item) => (
          <li
            key={item._id}
            className="text-5xl border-black border-b-[1px] first:border-t-[1px] "
          >
            <Link
              href={`photos/${item.slug.current}`}
              className="flex justify-between items-center max-w-[80vw] mx-auto p-10"
            >
              <div>
                <p>{item.title}</p>
                <ul className="flex gap-3">
                  <li className="text-xl px-4 py-1 border-black border-[1px] rounded-xl">photography</li>
                  <li className="text-xl px-4 py-1 border-black border-[1px] rounded-xl">
                    {item.category}
                  </li>
                </ul>
              </div>
              <Image
                className="aspect-square object-cover"
                src={urlFor(item.image).url()}
                width={300}
                height={300}
                alt={item.image.alt}
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
