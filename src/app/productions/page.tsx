import { getProductions } from "@/sanity/lib/fetch";
import React from "react";

import ProductionsList from "../components/ProductionsList";

export default async function page() {
  const productions = await getProductions();
  return (
    <div className="flex justify-between flex-col mt-20  w-[90vw] mx-auto">
      <h2 className="text-4xl leading-none">
        PRODUCTIONS
        <span className="opacity-15 ml-1 md:text-3xl text-2xl">
          ({productions.length})
        </span>
      </h2>

      <ProductionsList list={productions} />
    </div>
  );
}
