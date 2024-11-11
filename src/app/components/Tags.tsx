import { Tags as TagsType } from "@/sanity/types/type";
import React from "react";

export default function Tags({ tags }: { tags: TagsType }) {
  return (
    <ul className="flex gap-2">
      {tags &&
        tags.map((tag, key) => (
          <li
            key={key}
            className="text-xl px-3  border-black border-[1px]"
          >
            {tag.name}
          </li>
        ))}
    </ul>
  );
}
