"use client";
import Link from "next/link";
import React from "react";

export default function Header() {
  return (
    <header className="absolute text-m top-0 left-0 w-full z-50">
      <div className="flex lg:w-[82vw] mx-auto justify-between p-5">
        <nav className="">
          <ul className="flex gap-5">
            <li>
              <Link href={"/photos"}>Photography</Link>
            </li>
            <li>Video</li>
            <li>About me</li>
            <li>Contact</li>
          </ul>
        </nav>
        {/* <h1>
          <Link href={"/"}>Aziyade Portfolio</Link>
        </h1> */}
      </div>
    </header>
  );
}
