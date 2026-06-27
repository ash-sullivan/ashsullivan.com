"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";

const IMAGE_COLORS = ["red", "orange", "yellow", "green", "blue", "purple"];

const IMAGE_DIMENSIONS = { HEIGHT: 100, WIDTH: 100 };

// Shamelessly stolen from MDN to get a random integer.
function getRandomInt(min: number, max: number) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
}

function pickNewColor(currentColor: string): string {
  const otherColors = IMAGE_COLORS.filter((color) => color !== currentColor);
  if (otherColors.length === 0) {
    return IMAGE_COLORS[0];
  }
  return otherColors[getRandomInt(0, otherColors.length)];
}

export default function Screensaver() {
  const [imageOverlayColor, setImageOverlayColor] = useState("blue");
  const imageOverlayColorRef = useRef("blue");
  const [movementVector, setMovementVector] = useState({
    x: 0,
    dx: 10,
    y: 0,
    dy: 10,
  });
  const movementVectorRef = useRef(movementVector);
  const [cornerHits, setCornerHits] = useState(0);

  // Pure: given the previous vector, compute the next vector and which edges were hit.
  const computeNextMovement = useCallback(
    (prevVector: typeof movementVector) => {
      const boxWidth =
        document.querySelector("main")?.clientWidth ?? window.innerWidth;
      const boxHeight =
        document.querySelector("main")?.clientHeight ?? window.innerHeight;

      const imageElement = document.querySelector("img");
      const actualImageWidth =
        imageElement?.getBoundingClientRect().width ?? IMAGE_DIMENSIONS.WIDTH;
      const actualImageHeight =
        imageElement?.getBoundingClientRect().height ?? IMAGE_DIMENSIONS.HEIGHT;

      const nextPosition = {
        x: prevVector.x + prevVector.dx,
        y: prevVector.y + prevVector.dy,
        dx: prevVector.dx,
        dy: prevVector.dy,
      };

      const maxX = boxWidth - actualImageWidth;
      const maxY = boxHeight - actualImageHeight;

      const hasXCollision = nextPosition.x <= 0 || nextPosition.x >= maxX;
      const hasYCollision = nextPosition.y <= 0 || nextPosition.y >= maxY;

      // Check horizontal boundaries
      if (hasXCollision) {
        nextPosition.dx =
          nextPosition.x > 0 ? getRandomInt(-10, 0) : getRandomInt(1, 11);
        nextPosition.x = Math.max(0, Math.min(nextPosition.x, maxX));
      }

      // Check vertical boundaries
      if (hasYCollision) {
        nextPosition.dy =
          nextPosition.y > 0 ? getRandomInt(-10, 0) : getRandomInt(1, 11);
        nextPosition.y = Math.max(0, Math.min(nextPosition.y, maxY));
      }

      return { nextPosition, hasXCollision, hasYCollision };
    },
    []
  );

  // Animation, could probably add magnitude math in here if I remembered vectors
  useEffect(() => {
    const interval = setInterval(() => {
      const { nextPosition, hasXCollision, hasYCollision } =
        computeNextMovement(movementVectorRef.current);

      if (hasXCollision || hasYCollision) {
        const nextColor = pickNewColor(imageOverlayColorRef.current);
        imageOverlayColorRef.current = nextColor;
        setImageOverlayColor(nextColor);
      }

      if (hasXCollision && hasYCollision) {
        setCornerHits((hits) => hits + 1);
      }

      movementVectorRef.current = nextPosition;
      setMovementVector(nextPosition);
    }, 32);

    return () => clearInterval(interval);
  }, [computeNextMovement]);

  return (
    <div className="grid grid-rows-[auto_1fr_20px] min-h-screen p-8 pb-4 gap-8 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <header>
        <h1 className="text-3xl text-center">Screensaver Simulator</h1>
        <h2 className="text-center">Number of Corner Hits: {cornerHits}</h2>
      </header>
      <main className="flex flex-col gap-[32px] items-center sm:items-start border border-black">
        <div
          style={{
            transform: `translate(${movementVector.x}px, ${movementVector.y}px)`,
          }}
        >
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
