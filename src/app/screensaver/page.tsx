"use client";

import { useState, useEffect } from 'react';
import Image from "next/image";

const IMAGE_COLORS = ["red", "orange", "yellow", "green", "blue", "purple"];

const IMAGE_DIMENSIONS = { HEIGHT: 100, WIDTH: 100 };

// Shamelessly stolen from MDN
function getRandomInt(min: number, max: number) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
}

export default function Screensaver() {

  const [imageOverlayColor, setImageOverlayColor] = useState("blue");
  const [movementVector, setMovementVector] = useState({ x: 0, dx: 10, y: 0, dy: 10 });


  // Animation, could probably add magnitude math in here if I remembered vectors
  useEffect(() => {
    const interval = setInterval(() => {
      setMovementVector((prevVector) => {
        const boxWidth = document.querySelector('main')?.clientWidth ?? window.innerWidth;
        const boxHeight = document.querySelector('main')?.clientHeight ?? window.innerHeight;
        const imageWidth = IMAGE_DIMENSIONS.WIDTH;
        const imageHeight = IMAGE_DIMENSIONS.HEIGHT;

        const nextPosition = {
          x: prevVector.x + prevVector.dx,
          y: prevVector.y + prevVector.dy,
          dx: prevVector.dx,
          dy: prevVector.dy,
        };

        // Kinda sloppy but basically force it to pick a new color that isn't the current one
        function pickANewColor() {
          return IMAGE_COLORS.filter(color => color !== imageOverlayColor)[getRandomInt(0, IMAGE_COLORS.length - 1)];
        }

        // Check horizontal boundaries
        if (nextPosition.x <= 0 || nextPosition.x + imageWidth >= boxWidth) {
          nextPosition.dx = nextPosition.x >= 0 ? getRandomInt(-10, 0) : getRandomInt(0, 10); // Reverse horizontal direction
          setImageOverlayColor(pickANewColor());
        }

        // Check vertical boundaries
        if (nextPosition.y <= 0 || nextPosition.y + imageHeight >= boxHeight) {
          nextPosition.dy = nextPosition.y >= 0 ? getRandomInt(-10, 0) : getRandomInt(0, 10); // Reverse vertical direction
          setImageOverlayColor(pickANewColor());
        }

        return nextPosition;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-rows-[auto_1fr_20px] min-h-screen p-8 pb-4 gap-8 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-3xl text-center">Screensaver Simulator</h1>
      <main className="flex flex-col gap-[32px] items-center sm:items-start border border-black">
        <div style={{ transform: `translate(${movementVector.x}px, ${movementVector.y}px)` }}>
          <div className="relative">
            <div
              className="absolute inset-0"
              style={{
                backgroundColor: imageOverlayColor,
                opacity: 0.5
              }}
            />
            <Image
              src="/cats/Khali_5.jpg"
              alt="The baby"
              width={IMAGE_DIMENSIONS.WIDTH}
              height={IMAGE_DIMENSIONS.HEIGHT}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
