"use client";

import { useState, useEffect, useCallback } from 'react';
import Image from "next/image";

const IMAGE_COLORS = ["red", "orange", "yellow", "green", "blue", "purple"];

const IMAGE_DIMENSIONS = { HEIGHT: 100, WIDTH: 100 };

// Shamelessly stolen from MDN to get a random integer.
function getRandomInt(min: number, max: number) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
}

// Picks a new color, which shouldn't be the selected one, but for some reason is sometimes undefined. Figure that out.
function pickNewColor(selectedColor: string | undefined) {
    const availableColors = IMAGE_COLORS.filter(color => color !== selectedColor);
    return availableColors[getRandomInt(0, availableColors.length)];
}

export default function Screensaver() {

  const [imageOverlayColor, setImageOverlayColor] = useState("blue");
  const [movementVector, setMovementVector] = useState({ x: 0, dx: 10, y: 0, dy: 10 });
  const [cornerHits, setCornerHits] = useState(0);

  const updateMovement = useCallback((prevVector: typeof movementVector) => {
    const boxWidth = document.querySelector("main")?.clientWidth ?? window.innerWidth;
    const boxHeight = document.querySelector("main")?.clientHeight ?? window.innerHeight;

    const imageElement = document.querySelector("img");
    const actualImageWidth = imageElement?.getBoundingClientRect().width ?? IMAGE_DIMENSIONS.WIDTH;
    const actualImageHeight = imageElement?.getBoundingClientRect().height ?? IMAGE_DIMENSIONS.HEIGHT;

    const nextPosition = {
      x: prevVector.x + prevVector.dx,
      y: prevVector.y + prevVector.dy,
      dx: prevVector.dx,
      dy: prevVector.dy,
    };

    let collisionDetected = false;
    
    const hasXCollision = nextPosition.x <= 0 || nextPosition.x >= boxWidth - actualImageWidth;
    const hasYCollision = nextPosition.y <= 0 || nextPosition.y >= boxHeight - actualImageHeight;

    // Check horizontal boundaries
    if (hasXCollision) {
      nextPosition.dx = nextPosition.x > 0 ? getRandomInt(-10, 0) : getRandomInt(0, 10); // Reverse horizontal direction
      collisionDetected = true;
    }

    // Check vertical boundaries
    if (hasYCollision) {
      nextPosition.dy = nextPosition.y > 0 ? getRandomInt(-10, 0) : getRandomInt(0, 10); // Reverse vertical direction
      collisionDetected = true;
    }

    if (collisionDetected) {
      setImageOverlayColor((imageOverlayColor) => pickNewColor(imageOverlayColor));
    };

    if (hasXCollision && hasYCollision) {
      setCornerHits(cornerHits + 1);
    }

    return nextPosition;
  }, [cornerHits]); 

  // Animation, could probably add magnitude math in here if I remembered vectors
  useEffect(() => {
    const interval = setInterval(() => {
      setMovementVector(updateMovement);
    }, 32);

    return () => clearInterval(interval);
  }, [updateMovement]);

  return (
    <div className="grid grid-rows-[auto_1fr_20px] min-h-screen p-8 pb-4 gap-8 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <header>
        <h1 className="text-3xl text-center">Screensaver Simulator</h1>
        <h2 className="text-center">Number of Corner Hits: {cornerHits}</h2>
      </header>
      <main className="flex flex-col gap-[32px] items-center sm:items-start border border-black">
        <div style={{ transform: `translate(${movementVector.x}px, ${movementVector.y}px)` }}>
          <div className="relative">
            <div
              className="absolute inset-0"
              style={{
                backgroundColor: imageOverlayColor,
                opacity: 0.5,
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
