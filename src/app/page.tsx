import { getPhotos } from "@/sanity/lib/fetch";
import HeroProd from "./components/HeroProd";
import PhotosList from "./components/PhotosList";

export default async function Home() {
  const photos = await getPhotos();
  return (
    <div>
      <HeroProd />
      <PhotosList list={photos} />
    </div>
  );
}
