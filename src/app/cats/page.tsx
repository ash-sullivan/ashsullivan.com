'use client';

import Image from 'next/image';
import { ImageCarousel } from '../components/ImageCarousel';
import { useState } from 'react';

export default function Cats() {
  const [isCarouselOpen, setIsCarouselOpen] = useState(false);
  const [carouselCat, setCarouselCat] = useState("Tomo");

  const getCarouselImages = () => {
    return [
      `/cats/${carouselCat}_1.jpg`,
      `/cats/${carouselCat}_2.jpg`,
      `/cats/${carouselCat}_3.jpg`,
      `/cats/${carouselCat}_4.jpg`,
      `/cats/${carouselCat}_5.jpg`,
    ]
  }

  const openCarousel = (cat: string) => {
    setCarouselCat(cat);
    setIsCarouselOpen(true);
  }

  function OverlayButton({ cat }: { cat: string }) {
    return (
      <button
        onClick={() => openCarousel(cat)}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-indigo-500 text-white px-4 py-2 rounded-lg"
      >
        Learn more!
      </button>
    )
  }

  function LearnMoreButton({ cat }: { cat: string }) {
    return (
      <button
        onClick={() => openCarousel("Tomo")}
        className="bg-indigo-500 text-white px-4 py-2 rounded-lg"
      >
        Learn more!
      </button>
    )
  }

  return (
    <div className="grid grid-rows-[auto_1fr_auto] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] items-center sm:items-start">
        <h1 className="text-3xl w-full text-center">The Girls</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full">
          <div className="flex flex-col items-center gap-4">
            <h2 className="text-2xl">Tomoko (Tomo)</h2>
            <div className="relative group">
              <Image
                src="/cats/Tomo.jpg"
                alt="Tomoko, a tortoiseshell (tortie) cat with a look that will melt your heart."
                width={400}
                height={400}
                className="w-full max-w-md rounded-lg shadow-md transition-opacity group-hover:opacity-70"
              />
              <div className="hidden md:block">
                <OverlayButton cat="Tomo" />
              </div>
              <div className="md:hidden flex justify-center w-full">
                <LearnMoreButton cat="Tomo" />
              </div>
            </div>
            <p className="text-center">
              Sweet precious baby angel. Also, her favorite toys are bugs.
            </p>
            {isCarouselOpen && (
              <ImageCarousel
                images={getCarouselImages()}
                onClose={() => setIsCarouselOpen(false)}
              />
            )}
          </div>
          <div className="flex flex-col items-center gap-4">
            <h2 className="text-2xl">Khaleesi (Khali)</h2>
            <div className="relative group">
              <Image
                src="/cats/Khali.jpg"
                alt="Khaleesi, a ragdoll cat who has never had a thought go through her head at any point in time."
                width={400}
                height={400}
                className="w-full max-w-md rounded-lg shadow-md transition-opacity group-hover:opacity-70"
              />
              <div className="hidden md:block">
                <OverlayButton cat="Khali" />
              </div>
              <div className="md:hidden flex justify-center w-full">
                <LearnMoreButton cat="Khali" />
              </div>
            </div>
            <p className="text-center">
              In terms of intelligence, she&apos;s very pretty. (She eats bugs.)
            </p>
            {isCarouselOpen && (
              <ImageCarousel
                images={getCarouselImages()}
                onClose={() => setIsCarouselOpen(false)}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
