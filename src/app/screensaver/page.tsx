"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const IMAGE_COLORS = ["red", "orange", "yellow", "green", "blue", "purple"];
const IMAGE_DIMENSIONS = { HEIGHT: 100, WIDTH: 100 };

// Shamelessly stolen from MDN
function getRandomInt(min: number, max: number) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
}
// Utility to pick a new color, avoiding the currently selected one
const pickNewColor = (currentColor: string) => {
  const availableColors = IMAGE_COLORS.filter((color) => color !== currentColor);
  return availableColors[getRandomInt(0, availableColors.length)];
};

export default function Screensaver() {
  const [imageOverlayColor, setImageOverlayColor] = useState("blue");
  const [movementVector, setMovementVector] = useState({ x: 0, dx: 10, y: 0, dy: 10 });
  const [cornerHits, setCornerHits] = useState(0);

  // Handles movement and collision detection
  const updateMovement = (prevVector: typeof movementVector) => {
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
      nextPosition.dx = nextPosition.dx > 0 ? getRandomInt(-10, 0) : getRandomInt(0, 10); // reverse horizontal direction
      collisionDetected = true;
    }

    // Check vertical boundaries
    if (hasYCollision) {
      nextPosition.dy = nextPosition.dy > 0 ? getRandomInt(-10, 0) : getRandomInt(0, 10); // reverse vertical direction
      collisionDetected = true;
    }

    // Update overlay color and corner hits if a collision is detected
    if (collisionDetected) {
      setImageOverlayColor((currentColor) => pickNewColor(currentColor));
    }

    if (hasXCollision && hasYCollision) {
      setCornerHits((hits) => hits + 1);
    }

    return nextPosition;
  };

  // Animation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setMovementVector(updateMovement);
    }, 32);

    return () => clearInterval(interval);
  }, []);

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
