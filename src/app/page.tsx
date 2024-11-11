import { getPhotos } from "@/sanity/lib/fetch";
import HeroProd from "./components/HeroProd";
import PhotoCards from "./components/PhotoCards";
import Link from "next/link";

export default async function Home() {
  const photos = await getPhotos(); // Server-side data fetching
  return (
    <div className="mb-20 w-[90vw] mx-auto">
      <HeroProd />
      <span className="border-b-2 flex border-black w-full h-5 mb-5"></span>
      <div className="flex justify-between items-end mx-auto mb-10 ">
        <h2 className="text-3xl md:text-4xl leading-none">PHOTOGRAPHIE</h2>
        <Link className="underline text-sm md:text-2xl" href={"/photos"}>
          Voir tous les projets
        </Link>
      </div>
      <PhotoCards list={photos} />
    </div>
  );
}
