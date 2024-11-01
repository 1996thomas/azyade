"use client";
import Link from "next/link";
import React from "react";

export default function Header() {
  return (
    <header className="absolute top-0 left-0 w-full">
      <div className="flex w-[90vw] mx-auto justify-between">
        <h1>Aziyade Portfolio</h1>
        <nav className="">
          <ul className="flex gap-4">
            <li>
              <Link href={"/photos"}>Photography</Link>
            </li>
            <li>Video</li>
            <li>About me</li>
            <li>Contact</li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
