import React from "react";

export default function HeroProd() {
  return (
    <div className="flex h-screen items-center">
      <div className="w-full h-[40vw] bg-black">
        <iframe
          width="100%"
          height="100%"
          src="https://www.youtube.com/embed/7w_w10HVa54?si=SOa6pxlnqy4pczPX"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}
