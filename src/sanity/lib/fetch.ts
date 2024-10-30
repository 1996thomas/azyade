import { createClient, groq } from "next-sanity";
import client from "./client";
import { create } from "domain";
import { Photo } from "../types/type";

export async function getPhotos() {
  return createClient(client).fetch(groq`*[_type == "photo"]`);
}

export async function getPhoto(slug: string): Promise<Photo> {
  return createClient(client).fetch(
    groq`*[_type == "photo" && slug.current == $slug][0]`,
    { slug }
  );
}
