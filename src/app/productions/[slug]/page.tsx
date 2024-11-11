import { getProduction } from "@/sanity/lib/fetch";
import React from "react";
type Props = Promise<{ slug: string }>;

export default async function page({ params }: { params: Props }) {
  const { slug } = await params;
  const production = await getProduction(slug);
  console.log(production)

  return <div>page</div>;
}
