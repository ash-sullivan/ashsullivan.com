"use client";

import { useState } from "react";
import Link from "next/link";

const MENU_LINKS = [
  { href: "/", title: "Home" },
  { href: "/cats", title: "Cats" },
  { href: "/screensaver", title: "Screensaver" },
  { href: "/slot-machine", title: "Slots" },
  { href: "/infinite-grid-demo", title: "Infinite Grid" },
  { href: "/fishing", title: "Fishing" },
] as const;

export default function Menu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function MenuLinks() {
    return (
      <>
        {MENU_LINKS.map(({ href, title }) => (
          <Link
            key={href}
            className="hover:underline"
            href={href}
            onClick={() => setIsMenuOpen(false)}
          >
            {title}
          </Link>
        ))}
      </>
    );
  }

  return (
    <div className="p-4">
      <div className="hidden md:flex gap-4">
        <MenuLinks />
      </div>
      <div className="md:hidden relative">
        <button
          className="flex items-center"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          onTouchEnd={(e) => {
            e.preventDefault();
            setIsMenuOpen(!isMenuOpen);
          }}
        >
          <div className="text-3xl align-middle">☰</div>
        </button>
        <div
          className={`${isMenuOpen ? "" : "hidden"} absolute right-0 top-full mt-2 bg-linear-to-b from-violet-800 to-indigo-800 border rounded-lg shadow-lg p-4`}
        >
          <div className="flex flex-col gap-4">
            <MenuLinks />
          </div>
        </div>
      </div>
    </div>
  );
}
