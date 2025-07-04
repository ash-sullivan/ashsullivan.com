'use client';

import PlayArea from './components/fish/PlayArea';
import Fish from './components/fish/Fish';
import { useState } from 'react';

export default function FishingGame() {

    const [fishCaught, setFishCaught] = useState(0);
    const [reelVector, setReelVector] = useState({ x: 0, y: 0 });
    const [isReelCast, setIsReelCast] = useState(false);

    const castReel = () => {
        setIsReelCast(true);
    }

    return (
        <div id="main" className="min-h-screen p-4 gap-4 items-center font-[family-name:var(--font-geist-sans)]">
            <header>
                <h1 className="text-3xl text-center">Fishing Game</h1>
                <h2 className="text-center">Fish Caught: {fishCaught}</h2>
            </header>
            <main className="grid justify-center">
                <div className="play-area">
                    <PlayArea />
                </div>
                <div className="mx-auto bg-indigo-500 rounded-lg m-2 p-2">
                    {!isReelCast && <button onClick={(() => castReel())}>Cast Reel</button>}
                </div>
            </main>
        </div>
    )
}