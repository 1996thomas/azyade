import { createClient, groq } from "next-sanity";
import client from "./client";
import { Photo, PHOTO_QUERYResult, Setting } from "../types/type";

export async function getPhotos(): Promise<PHOTO_QUERYResult> {
  return createClient(client).fetch(groq`*[_type == "photo"]`);
}

export async function getPhoto(slug: string): Promise<Photo> {
  return createClient(client).fetch(
    groq`*[_type == "photo" && slug.current == $slug][0]`,
    { slug }
  );
}

export async function getSettings(): Promise<Setting> {
  return createClient(client).fetch(
    groq`*[_type == "settings"] | order(_updatedAt desc)[0]`
  );
}
