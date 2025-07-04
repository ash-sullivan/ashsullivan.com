'use client';

import PlayArea from './components/fish/PlayArea';
import { useState } from 'react';

export default function FishingGame() {

    const [fishCaught, setFishCaught] = useState(0);
    const [isReelCast, setIsReelCast] = useState(false);
    const [hookPosition, setHookPosition] = useState({x: 0, y: 0});

    async function castReel(coordinates: {x: number, y: number}) {
        const playArea = document.getElementById('play-area');
        if (playArea) {
            // Lock pointer immediately on cast
            setIsReelCast(true);
            await playArea.requestPointerLock();
            setHookPosition({ x: coordinates.x, y: coordinates.y });
        }
    }


    async function reelIn() {
        const playArea = document.getElementById('play-area');
        setIsReelCast(false);
        if (document.pointerLockElement === playArea) {
            document.exitPointerLock();
        }
    }

    return (
        <div id="main" className="min-h-screen min-w-screen p-4 gap-4 items-center font-[family-name:var(--font-geist-sans)]">
            <header>
                <h1 className="text-3xl text-center">Fishing Game</h1>
                <h2 className="text-center">Fish Caught: {fishCaught}</h2>
            </header>
            <main className="grid justify-center">
                <div className="play-area mx-auto">
                    <PlayArea 
                        onClick={(coordinates: {x: number, y: number}) => isReelCast ? reelIn() : castReel(coordinates)}
                        isReelCast={isReelCast}
                        hookPosition={hookPosition}
                    />
                </div>
                <p className="mx-auto m-2 p-2">
                    Cast the reel by clicking on the play area. 
                    <br/>
                    Click again to reel in.
                </p>
            </main>
        </div>
    )
}