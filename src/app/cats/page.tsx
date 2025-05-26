'use client';

import Image from 'next/image';
import { ImageCarousel } from '../components/ImageCarousel';
import { useState } from 'react';

export default function Cats() {
  const [isCarouselOpen, setIsCarouselOpen] = useState(false);
  const [carouselCat, setCarouselCat] = useState("Tomo");

  // A choice I made to have each carousel be 5 images, with {catname}_[1-5].jpg
  const getCarouselImages = () => {
    return Array.from({ length: 5 }, (_, i) => `/cats/${carouselCat}_${i + 1}.jpg`);
  };

  const openCarousel = (cat: string) => {
    setCarouselCat(cat);
    setIsCarouselOpen(true);
  };

  const CatCard = ({
    name,
    imageSrc,
    altText,
    description,
  }: {
    name: string;
    imageSrc: string;
    altText: string;
    description: string;
  }) => (
    <div className="flex flex-col items-center gap-4">
      <h2 className="text-2xl">{name}</h2>
      <div className="relative group">
        <Image
          src={imageSrc}
          alt={altText}
          width={400}
          height={400}
          className="w-full max-w-md rounded-lg shadow-md transition-opacity group-hover:opacity-70"
        />
        <div className="hidden md:block">
          <LearnMoreOverlay cat={name} />
        </div>
        <div className="md:hidden flex justify-center w-full">
          <LearnMoreButton cat={name} />
        </div>
      </div>
      <p className="text-center">{description}</p>
    </div>
  );

  const LearnMoreOverlay = ({ cat }: { cat: string }) => (
    <button
      onClick={() => openCarousel(cat)}
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-indigo-500 text-white px-4 py-2 rounded-lg"
    >
      Learn more!
    </button>
  );

  const LearnMoreButton = ({ cat }: { cat: string }) => (
    <button
      onClick={() => openCarousel(cat)}
      className="bg-indigo-500 text-white px-4 py-2 rounded-lg"
    >
      Learn more!
    </button>
  );

  return (
    <div className="grid grid-rows-[auto_1fr_auto] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] items-center sm:items-start">
        <h1 className="text-3xl w-full text-center">The Girls</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full">
          <CatCard
            name="Tomo"
            imageSrc="/cats/Tomo.jpg"
            altText="Tomoko, a tortie cat with a look that will melt your heart and captivate millions."
            description="Sweet precious baby angel. Also, her favorite toys are bugs."
          />
          <CatCard
            name="Khali"
            imageSrc="/cats/Khali.jpg"
            altText="Khaleesi, a ragdoll cat who has never had a thought go through her head. Ever. But we love her for that."
            description="In terms of intelligence, she&apos;s very pretty. (She eats bugs.)"
          />
        </div>
        {isCarouselOpen && (
          <ImageCarousel
            images={getCarouselImages()}
            onClose={() => setIsCarouselOpen(false)}
          />
        )}
      </main>
    </div>
  );
}
