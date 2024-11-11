"use client";
import Link from "next/link";
import React, { useState } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="absolute text-2xl top-0 left-0 w-full z-50">
      <div className="flex  w-[90vw] mx-auto justify-between items-center py-5">
        {/* Logo and site title */}
        <h1>
          <Link onClick={() => setIsMenuOpen(false)} href={"/"}>
            Aziyadé Abauzit
          </Link>
        </h1>

        {/* Desktop navigation */}
        <nav className="hidden lg:flex">
          <ul className="flex gap-5">
            <li>
              <Link href={"/photos"}>Photographies</Link>
            </li>
            <li>
              <Link href={"/productions"}>Productions</Link>
            </li>
            <li>À propos</li>
            <li>Contact</li>
          </ul>
        </nav>

        {/* Burger icon for mobile */}
        <button
          className="lg:hidden flex flex-col gap-1"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span className="w-6 h-0.5 bg-black"></span>
          <span className="w-6 h-0.5 bg-black"></span>
          <span className="w-6 h-0.5 bg-black"></span>
        </button>
      </div>
      {/* Mobile navigation */}
      {isMenuOpen && (
        <nav className="lg:hidden bg-white w-full absolute top-full left-0 z-40 shadow-md">
          <ul className="flex flex-col items-center gap-5 p-5">
            <li>
              <Link href={"/photos"} onClick={() => setIsMenuOpen(false)}>
                Photographies
              </Link>
            </li>
            <li onClick={() => setIsMenuOpen(false)}>Productions</li>
            <li onClick={() => setIsMenuOpen(false)}>À Propos</li>
            <li onClick={() => setIsMenuOpen(false)}>Contact</li>
          </ul>
        </nav>
      )}
    </header>
  );
}
