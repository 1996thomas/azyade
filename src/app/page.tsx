import { getPhotos, getProductions } from "@/sanity/lib/fetch";
import HeroProd from "./components/HeroProd";
import PhotoCards from "./components/PhotoCards";
import Link from "next/link";

export const revalidate = 60; // Actualise toutes les 60 secondes

export default async function Home() {
  const photos = await getPhotos(); // Server-side data fetching
  const productions = await getProductions();
  return (
    <div className="mb-20 w-[90vw] mx-auto">
      <span className="border-b-2 flex border-black w-full h-5 mb-5 my-20" />
      <div className="flex justify-between items-end mx-auto mb-10">
        <h2 className="text-3xl md:text-4xl leading-none">
          RÉALISATIONS
          <span className="opacity-15 ml-1 md:text-3xl text-2xl">
            ({productions.length})
          </span>
        </h2>
        <Link className="underline text-sm md:text-2xl" href={"/realisation"}>
          Voir tous les projets
        </Link>
      </div>
      <HeroProd selectedProduction={productions[0]} />
      <span className="border-b-2 flex border-black w-full h-5 mb-5 my-20" />
      <div className="flex justify-between items-end">
        <h2 className="text-3xl md:text-4xl leading-none">
          PHOTOGRAPHIES
          <span className="opacity-15 ml-1 md:text-3xl text-2xl">
            ({photos.length})
          </span>
        </h2>
        <Link className="underline text-sm md:text-2xl" href={"/photos"}>
          Voir tous les projets
        </Link>
      </div>
      <PhotoCards list={photos} />
    </div>
  );
}
