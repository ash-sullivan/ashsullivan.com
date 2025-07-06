import Fish from "../Fish/Fish";
import Hook from "../Hook/Hook";
import {
    useState, 
    useEffect, 
    useCallback, 
    MouseEvent as ReactMouseEvent
} from 'react';

const DEFAULT_VECTOR: Vector = {x: 0, dx: 0, y: 0, dy: 0};
const DEFAULT_ICON_SIZE = 32;

type Vector = {
    x: number;
    dx: number;
    y: number;
    dy: number;
}

type PlayAreaProps = {
    onClick: (coordinates: {x: number, y: number}) => void;
    onFishHooked: () => void;
    isReelCast: boolean;
    isFishHooked: boolean;
    hookPosition: {x: number, y: number};
}

// Shamelessly stolen from MDN to get a random integer.
function getRandomInt(min: number, max: number) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
}

const FishGameplayElement = ({fishVector}: {fishVector: Vector}) => {
    return (
        <div
            id="fishElement"
                style={{
                    transform: `translate(${fishVector.x}px, ${fishVector.y}px)`,
                    transformOrigin: "center",
                    position: "absolute",
                }}
            >
                <div
                    style={{
                        // Rotates the fish to match the direction it's facing.
                        transform: `rotate(${Math.atan2(fishVector.dy, fishVector.dx) * 180 / Math.PI}deg)`,
                        transition: "transform 0.1s linear",
                    }}
                >
                    <Fish />
                </div>
            </div>
    )
}

const HookGameplayElement = ({hookPosition}: {hookPosition: {x: number, y: number}}) => {
    return (
        <div
            id="hookElement"
            style={{
                position: "absolute",
                left: hookPosition.x,
                top: hookPosition.y,
                pointerEvents: "none", // so it doesn't block clicks
            }}
        >
            <Hook />
        </div>
    )
}

function PlayArea(props: PlayAreaProps) {
    const [fishVector, setFishVector] = useState(DEFAULT_VECTOR);

    const onClick = (e: ReactMouseEvent<HTMLDivElement>) => {
        // Some quick translation to put the hook at the "end" of the rod, 
        // where a human would expect it to be, instead of smack dab in the
        // middle where the computer thinks is cool.
        const rect = (e.target as HTMLDivElement).getBoundingClientRect();
        const hookWidth = DEFAULT_ICON_SIZE; 
        const hookHeight = DEFAULT_ICON_SIZE; 
        props.onClick({
            x: e.clientX - rect.left - hookWidth / 2,
            y: e.clientY - rect.top - hookHeight / 2
        });
    }

    const updateFishMovement = useCallback((currentVector: Vector) => {
        const boxWidth = document.getElementById("play-area")?.clientWidth ?? window.innerWidth;
        const boxHeight = document.getElementById("play-area")?.clientHeight ?? window.innerHeight;
    
        const imageElement = document.querySelector("img");
        const fishWidth = imageElement?.getBoundingClientRect().width ?? DEFAULT_ICON_SIZE;
        const fishHeight = imageElement?.getBoundingClientRect().height ?? DEFAULT_ICON_SIZE;
    
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

    const areFishAndHookColliding = (fishRect: DOMRect, hookRect: DOMRect): boolean => {
        // (SLIGHTLY) MORE ACCURATE COLLISION
        // if I am so inclined after mvp, figure out how to check if the "filled in" parts
        // are intersecting because a fish hook isn't exactly rectangular. 

        // Calculate centers of fish and hook
        const fishCenter = {
            x: fishRect.left + fishRect.width / 2,
            y: fishRect.top + fishRect.height / 2,
        };
        const hookCenter = {
            x: hookRect.left + hookRect.width / 2,
            y: hookRect.top + hookRect.height / 2,
        };

        // Calculate distance between centers
        const distance = Math.sqrt(
            Math.pow(fishCenter.x - hookCenter.x, 2) +
            Math.pow(fishCenter.y - hookCenter.y, 2)
        );

        // Use a threshold for collision (e.g., half the average width)
        const collisionThreshold = (fishRect.width + hookRect.width) / 4;

        return distance < collisionThreshold;
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setFishVector(updateFishMovement);
        }, 32);

        return () => clearInterval(interval);
    }, [updateFishMovement]);

    useEffect(() => {
        const fishElement = document.getElementById('fishElement');
        const hookElement = document.getElementById('hookElement');

        if (fishElement && hookElement) {
            // Re-run the collision detection function whenever the fish element changes
            const observer = new MutationObserver(() => {
                const fishRect = fishElement.getBoundingClientRect();
                const hookRect = hookElement.getBoundingClientRect();

                if (areFishAndHookColliding(fishRect, hookRect)) {
                    props.onFishHooked();
                }
            });

            observer.observe(fishElement, {
                attributes: true,
                childList: true,
                subtree: true,
            });

            return () => {
                observer.disconnect();
            };
        }
    }, [fishVector, props.hookPosition, props.isReelCast]);

    return (
        <div 
            id="play-area" 
            className="w-100 h-100 border border-black" 
            style={{ position: "relative", overflow: "hidden" }}
            onClick={(e) => onClick(e)}
        >
            {props.isReelCast && <HookGameplayElement hookPosition={props.hookPosition}/>}
            {!props.isFishHooked && <FishGameplayElement fishVector={fishVector} />}
        </div>
    )
}

export default PlayArea;