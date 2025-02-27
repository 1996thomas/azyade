import { createClient, groq } from "next-sanity";
import client from "./client";
import {
  About,
  Photo,
  PHOTO_QUERYResult,
  Production,
  Productions,
  Setting,
  Tag,
} from "../types/type";

export async function getPhotos(): Promise<PHOTO_QUERYResult> {
  return createClient(client).fetch(
    groq`*[_type == "photo"]|order(orderRank){
      _id,
      title,
      slug,
      publishedAt,
      description,
      image {
        _id,
        alt,
        asset->{
          _id,
          url
        }
      },
      gallery {
        _type,
        images[]->{
          _id,
          alt,
          asset->{
            _id,
            url
          }
        }
      },
      tags[]->{
        _id,
        name
      }
    }`
  );
}

export async function getPhoto(slug: string): Promise<Photo> {
  return createClient(client).fetch(
    groq`*[_type == "photo" && slug.current == $slug][0]`,
    { slug }
  );
}

export async function getProductions(): Promise<Productions> {
  return createClient(client).fetch(groq`*[_type == "production"]`);
}
export async function getProduction(slug: string): Promise<Production> {
  return createClient(client).fetch(
    groq`*[_type == "production" && slug.current == $slug][0]`,
    { slug }
  );
}

export async function getSettings(): Promise<Setting> {
  return createClient(client).fetch(
    groq`*[_type == "settings"] | order(_updatedAt desc)[0]`
  );
}

export async function getAbout(): Promise<About> {
  return createClient(client).fetch(
    groq`*[_type == "about"] | order(_updatedAt desc)[0]`
  );
}

export async function getTags(): Promise<Tag[]> {
  return createClient(client).fetch(groq`*[_type == "tag"]`);
}

export async function getPhotoTags(slug: string): Promise<Tag[]> {
  return createClient(client).fetch(
    groq`*[_type == "photo" && slug.current == $slug][0].tags[]->{
      _id,
      name
    }`,
    { slug }
  );
}
