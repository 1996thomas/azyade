import { getPhotos } from "@/sanity/lib/fetch";


export default async function Home() {
  const photo = await getPhotos();
  return (
    <div>
      <p>
        {photo[0].title}
        </p>
    </div>
  );
}
