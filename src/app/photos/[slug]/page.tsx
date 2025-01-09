import SwiperCarousel from "@/app/components/SwiperCarousel";
import Tags from "@/app/components/Tags";
import DateComponent from "@/app/utils/ConvertDate";
import { getPhoto, getPhotoTags } from "@/sanity/lib/fetch";

type Props = Promise<{ slug: string }>;
export const revalidate = 60; // Actualise toutes les 60 secondes

export default async function Page({ params }: { params: Props }) {
  const { slug } = await params;
  const photo = await getPhoto(slug);
  const tags = await getPhotoTags(slug);
  console.log(photo);

  return (
    <>
      <div className="w-[90vw] mx-auto md:mt-36 mt-20">
        <DateComponent isoDate={photo.publishedAt} />
        <div className="flex justify-between md:items-end mb-5 flex-col md:flex-row gap-5 md:gap-8">
          <h2 className="text-3xl md:text-6xl font-black leading-[.8]">
            {photo.title}{" "}
            <span className="opacity-15 ml-1 md:text-3xl text-xl">
              ({photo.gallery?.images.length})
            </span>
          </h2>
          <Tags tags={tags} />
        </div>
      </div>

      <div className="w-[90vw] mx-auto overflow-hidden h-[50vh] md:h-fit">
        {photo.gallery !== undefined && (
          <SwiperCarousel gallery={photo.gallery} />
        )}
      </div>
    </>
  );
}
