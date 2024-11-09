import { getPhotos } from "@/sanity/lib/fetch";
import HeroProd from "./components/HeroProd";
import PhotoCards from "./components/PhotoCards";
import Link from "next/link";

export default async function Home() {
  const photos = await getPhotos(); // Server-side data fetching
  return (
    <div className="mb-20">
      <HeroProd />
      <h1 className="font-black text-6xl flex justify-center text-nowrap h-[20vw]">
        AZIYADE ABAUZIT
      </h1>
      <div className="flex justify-between items-end mx-auto w-[80vw]">
        <h2 className="text-4xl leading-none">PHOTOGRAPHIE</h2>
        <Link className="underline text-2xl" href={"/photos"}>
          Voir tous les projets
        </Link>
      </div>
      <PhotoCards list={photos} />
    </div>
  );
}
