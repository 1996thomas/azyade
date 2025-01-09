import React from "react";

interface DateComponentProps {
  isoDate: string; // Typage pour la date ISO en tant que chaîne
}

export default function DateComponent({
  isoDate,
}: DateComponentProps): JSX.Element {
  // Transformer la date ISO en MM-YYYYY
  const date = new Date(isoDate);
  const formattedDate: string = `${String(date.getMonth() + 1).padStart(2, "0")}-${date.getFullYear()}`;

  return <p className="text-gray-500 font-semibold md:text-2xl">{formattedDate}</p>;
}
