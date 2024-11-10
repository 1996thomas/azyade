"use client";
import React from "react";
//@ts-expect-error/need to check this
export default function Interface({ showInteractionMessage }) {
  console.log(showInteractionMessage);
  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center">
      {showInteractionMessage && <div>Appuyer sur E pour interagir</div>}
    </div>
  );
}
