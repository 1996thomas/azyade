import { getPhotos } from "@/sanity/lib/fetch";
import Scene from "./Scene";

export default async function page() {
  const photos = await getPhotos();

  return <Scene photos={photos} />;
}
