"use client";
import Link from "next/link";
import React from "react";

export default function Header() {
  return (
    <header>
      <h1>Aziyade Portfolio</h1>
      <nav>
        <ul>
          <li>
            <Link href={"/photos"}>Photography</Link>
          </li>
          <li>Video</li>
          <li>About me</li>
          <li>Contact</li>
        </ul>
      </nav>
    </header>
  );
}
