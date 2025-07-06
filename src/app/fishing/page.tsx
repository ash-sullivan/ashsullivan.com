'use client';

import PlayArea from './components/fish/PlayArea';
import { useState } from 'react';

export default function FishingGame() {

    const [score, setScore] = useState(0);
    const [isFishCaught, setIsFishCaught] = useState(false);
    const [isReelCast, setIsReelCast] = useState(false);
    const [hookPosition, setHookPosition] = useState({x: 0, y: 0});

    function resetFish() {
        setIsFishCaught(false);
        setHookPosition({x: 0, y: 0});
    }

    function resetGame() {
        setScore(0);
        setIsFishCaught(false);
    }

    async function castReel(coordinates: {x: number, y: number}) {
        const playArea = document.getElementById('play-area');
        if (playArea) {
            // Lock pointer immediately on cast
            setIsReelCast(true);
            await playArea.requestPointerLock();
            setHookPosition({ x: coordinates.x, y: coordinates.y });
        }
    }

    function reelIn() {
        const playArea = document.getElementById('play-area');
        setIsReelCast(false);
        if (document.pointerLockElement === playArea) {
            document.exitPointerLock();
        }
    }

    function handleFishCaught() {
        reelIn();
        setScore(score + 1);
        setIsFishCaught(true);
        setTimeout(() => resetFish(), 2000);
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
                        onClick={(coordinates: {x: number, y: number}) => isReelCast ? reelIn() : castReel(coordinates)}
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
                    I'm aware the game isn't very exciting right now, but stay tuned for more fun!
                </p>
            </main>
        </div>
    )
}