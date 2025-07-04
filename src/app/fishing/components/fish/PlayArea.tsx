import Fish from "./Fish";
import {useState, useEffect, useCallback} from 'react';

// Shamelessly stolen from MDN to get a random integer.
function getRandomInt(min: number, max: number) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
}

type Vector = {
    x: number;
    dx: number;
    y: number;
    dy: number;
}

const DEFAULT_VECTOR: Vector = {x: 0, dx: 0, y: 0, dy: 0};

export default function PlayArea() {

    const [isFishHooked, setIsFishHooked] = useState(false);
    const [reelVector, setReelVector] = useState(DEFAULT_VECTOR);
    const [fishVector, setFishVector] = useState(DEFAULT_VECTOR);

    const updateMovement = useCallback((currentVector: Vector) => {

        const boxWidth = document.getElementById("play-area")?.clientWidth ?? window.innerWidth;
        const boxHeight = document.getElementById("play-area")?.clientHeight ?? window.innerHeight;
    
        const imageElement = document.querySelector("img");
        // use not magic numbers later, these match up with the arbitrary h/w i set in Fish
        const fishWidth = imageElement?.getBoundingClientRect().width ?? 32;
        const fishHeight = imageElement?.getBoundingClientRect().height ?? 32;
    
        const nextVector = {
          x: currentVector.x + currentVector.dx,
          y: currentVector.y + currentVector.dy,
          dx: currentVector.dx,
          dy: currentVector.dy,
        };

        // Check collisions, keep the fish inside of the box. The box is safe. The box can't hurt him
        
        const hasXBorderCollision = nextVector.x <= 0 || nextVector.x >= boxWidth - fishWidth;
        const hasYBorderCollision = nextVector.y <= 0 || nextVector.y >= boxHeight - fishHeight;
    
        if (hasXBorderCollision) {
          nextVector.dx = nextVector.x > 0 ? getRandomInt(-5, 0) : getRandomInt(0, 5);
        }
    
        if (hasYBorderCollision) {
          nextVector.dy = nextVector.y > 0 ? getRandomInt(-5, 0) : getRandomInt(0, 5); // Reverse vertical direction
        }
    
        return nextVector;

      }, []); 

      // Animation, could probably add magnitude math in here if I remembered vectors
      useEffect(() => {
        const interval = setInterval(() => {
          setFishVector(updateMovement);
        }, 32);
    
        return () => clearInterval(interval);
      }, [updateMovement]);


    return (
        <div id="play-area" className="w-100 h-100 border border-black" style={{ position: "relative", overflow: "hidden" }}>
            <div
                style={{
                    transform: `translate(${fishVector.x}px, ${fishVector.y}px)`,
                    transformOrigin: "center",
                    position: "absolute",
                }}
            >
                <div
                    style={{
                        transform: `scaleX(${fishVector.dx < 0 ? -1 : 1})`,
                    }}
                >
                    <Fish />
                </div>
            </div>
        </div>
    )
}