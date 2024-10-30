import { defineQuery } from "next-sanity";

export const PHOTO_QUERY = defineQuery(`*[_type == "photo"]`);

export const PHOTO_BY_SLUG_QUERY = (slug: string) =>
  defineQuery(`*[_type == "photo" && slug.current == "${slug}"][0]`);

