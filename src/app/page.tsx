import { getPhotos } from "@/sanity/lib/fetch";
import PhotosList from "./components/PhotosList";
import HeroProd from "./components/HeroProd";

export default async function Home() {
  const photos = await getPhotos(); // Server-side data fetching
  return (
    <div>
      <HeroProd />
      <PhotosList list={photos} />
    </div>
  );
}
