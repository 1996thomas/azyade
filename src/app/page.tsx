import { getPhotos } from "@/sanity/lib/fetch";
import HeroProd from "./components/HeroProd";
import PhotoCards from "./components/PhotoCards";
import Link from "next/link";

export default async function Home() {
  const photos = await getPhotos(); // Server-side data fetching
  return (
    <div className="mb-20 w-[90vw] md:w-[80vw] mx-auto">
      <HeroProd />
      {/* <h1 className="font-black text-5xl md:text-6xl flex lg:justify-center pl-[5vw] py-5 text-nowrap lg:h-[20vw]">
        AZIYADE ABAUZIT
      </h1> */}
      <span className="border-b-2 flex border-black w-full h-5 mb-5"></span>
      <div className="flex justify-between items-end mx-auto ">
        <h2 className="text-3xl md:text-4xl leading-none">PHOTOGRAPHIE</h2>
        <Link className="underline text-sm md:text-2xl" href={"/photos"}>
          Voir tous les projets
        </Link>
      </div>
      <PhotoCards list={photos} />
    </div>
  );
}
