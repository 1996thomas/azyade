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
  tags?: Tag[];
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

interface SocialLink {
  link: "string";
  image: "image";
}
export interface Setting {
  _id: string;
  _type: "settings"; // Corrigé le type de document pour settings
  site_title: string;
  site_description?: string;
  social_links: SocialLink[];
  site_image: {
    _type: "image";
    asset: {
      _ref: string;
      _type: "reference";
    };
  };
}

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
}

export interface Tag {
  _id: string;
  _type: "tag";
  name: string;
}

export type Tags = Tag[];

export interface Production {
  _id: string;
  _type: "production";
  title: string;
  slug: Slug;
  presentation: PortableTextBlock;
  block_text: [
    {
      title: string;
      content: PortableTextBlock;
    },
  ];
  video: {
    id: string;
    provider: string;
  };
  poster: Image;
}

export type Productions = Production[];

export interface About {
  _id: string;
  _type: "about";
  title: string;
  profile_picture: {
    _type: "image";
    asset: {
      _ref: string;
      _type: "reference";
    };
  };
  content: PortableTextBlock;
}
