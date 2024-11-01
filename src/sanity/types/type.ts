import { PortableTextBlock } from "next-sanity";
import { Slug } from "sanity";

// types.ts
export interface Photo {
  _id: string;
  _type: "photo";
  title: string;
  publishedAt: string; // Utilise Date si tu préfères le type natif de JavaScript pour les dates
  description?: PortableTextBlock;
  slug: Slug;
  gallery?: Gallery;
  image: {
    _type: "image";
    asset: {
      _ref: string;
      _type: "reference";
    };
    alt: string;
    hotspot?: {
      x: number;
      y: number;
      height: number;
      width: number;
    };
  };
}

export type PHOTO_QUERYResult = Photo[];

interface Setting {
  _id: string;
  _type: "photo";
  site_title: string;
  site_description?: string;
  site_image: {
    _type: "image";
    asset: {
      _ref: string;
      _type: "reference";
    };
  };
}
export type Settings = Setting[];

interface Image {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
  alt: string;
  hotspot?: {
    x: number;
    y: number;
    height: number;
    width: number;
  };
}

export interface Gallery {
  _type: "gallery";
  images: Image[];
  display: "stacked" | "inline" | "carousel";
  zoom: boolean;
}
