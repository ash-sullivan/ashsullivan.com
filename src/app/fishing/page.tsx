'use client';

import PlayArea from './components/PlayArea/PlayArea';
import { useState } from 'react';

export default function FishingGame() {

    const noop = () => {};

    // TODOS FOR SELF
    /*
        BUGFIXES OR UNDESIRABLE BEHAVIOR
            - Fix first-render bug where hook flashes (research further, maybe inadvertently fixed)
            - don't use manual css manipulation, figure out how to do "switch" hook conditionally
        FEATURES/ENHANCEMENTS
            - Add "reeling in" mechanic where the fish struggles and the user has to counteract it
            - Animations
            - Reset button
            - Fish with variable attributes (speed, size, behavior, etc.)
        OTHER
            - test everything
            - clean up code
            - polish

    */

    const [score, setScore] = useState(0);
    const [isFishCaught, setIsFishCaught] = useState(false);
    const [isReelCast, setIsReelCast] = useState(false);
    const [hookPosition, setHookPosition] = useState({x: 0, y: 0});

    function resetFish() {
        setIsFishCaught(false);
        setHookPosition({x: 0, y: 0});
    }

    /*function resetGame() {
        setScore(0);
        setIsFishCaught(false);
    }*/

    async function castReel(coordinates: {x: number, y: number}) {
        const playArea = document.getElementById('play-area');
        if (playArea) {
            setIsReelCast(true);
            document.body.style.cursor = 'none';
            setHookPosition({ x: coordinates.x, y: coordinates.y });
        }
    }

    function reelIn() {
        setIsReelCast(false);
        document.body.style.cursor = 'default';
    }

    function handleFishCaught() {
        reelIn();
        setScore(score + 1);

        setIsFishCaught(true);
        setTimeout(
            () => {
                resetFish();
                setIsFishCaught(false);
            }
        , 2000);
    }

    return (
        <div id="main" className="min-h-screen min-w-screen p-4 gap-4 items-center font-[family-name:var(--font-geist-sans)]">
            <header>
                <h1 className="text-3xl text-center">Fishing Game</h1>
            </header>
            <main className="grid justify-center">
                <p className="text-center">Fish Caught: {score}</p>
                {isFishCaught ? <p className="text-center">You caught a fish!</p> : <br />}
                <div className="play-area mx-auto">
                    <PlayArea 
                        onClick={isFishCaught ? noop : (coordinates: {x: number, y: number}) => isReelCast ? reelIn() : castReel(coordinates)}
                        onFishHooked={handleFishCaught}
                        isFishHooked={isFishCaught}
                        isReelCast={isReelCast}
                        hookPosition={hookPosition}
                    />
                </div>
                <p className="text-center mx-auto m-2 p-2">
                    Cast the reel by clicking on the play area. 
                    <br/>
                    Click again to reel in.
                    <br/>
                    The game isn&apos;t very exciting right now, but stay tuned for more fun!
                </p>
            </main>
        </div>
    )
}