import Link from "next/link";
import Image from "next/image";

export const revalidate = 60;

export default async function Home() {
  return (
    <div>
      <div className="flex h-screen items-center justify-between flex-col text-white">
        <Image src={'/bg-2.jpg'} width={1920} height={1080} alt="" className="absolute object-cover top-0 left-0 z-[50] h-screen w-screen brightness-75 overflow-hidden"/>
        <div className="flex flex-col justify-center items-center flex-1 z-[51]">
          <h1 className="md:text-6xl text-[2.3rem] font-black drop-shadow-xl">AZIYADÉ ABAUZIT</h1>
          <ul className="flex gap-10 text-lg md:text-2xl ">
            <li>
              <Link href={"/photos"}>Photographies</Link>
            </li>
            <li>
              <Link href={"/realisations"}>Réalisations</Link>
            </li>
            <li>
              <Link href={"/about"}>À propos</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );

}
