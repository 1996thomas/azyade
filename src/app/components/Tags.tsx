import { Tags as TagsType } from "@/sanity/types/type";
import React from "react";

export default function Tags({ tags }: { tags: TagsType }) {
  return (
    <ul className="flex gap-2 h-fit">
      {tags &&
        tags.map((tag, key) => (
          <li
            key={key}
            className="md:text-base text-sm px-3 text-gray-500  border-gray-400 border-[1px] h-fit lead text-nowrap"
          >
            {tag.name}
          </li>
        ))}
    </ul>
  );
}
