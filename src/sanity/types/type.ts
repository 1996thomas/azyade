// types.ts
export interface Photo {
  _id: string;
  _type: "photo";
  title: string;
  publishedAt: string; // Utilise Date si tu préfères le type natif de JavaScript pour les dates
  description?: string;
  slug: string;
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
