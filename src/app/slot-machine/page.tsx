'use client';

import { useState, useEffect } from 'react';

export default function SlotMachine() {

    // Shamelessly stolen from MDN to get a random integer.
    function getRandomInt(min: number, max: number) {
        const minCeiled = Math.ceil(min);
        const maxFloored = Math.floor(max);
        return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
    }

    // UI for representing the spinning/randomness
    const [isSpinning, setIsSpinning] = useState(false);
    const [isSlotLocked, setIsSlotLocked] = useState([true, true, true]);

    // Values of the slots.
    const [slotSelections, setSlotSelections] = useState([1, 1, 1]);

    // each slot waits between 1 and 3 seconds then locks in whatever position it's in
    const spinSlots = async () => {
        setIsSlotLocked([false, false, false]);
        setIsSpinning(true);

        for (let i = 0; i < slotSelections.length; i++) {
            // Wait for each slot before moving to the next
            await new Promise<void>(resolve => {
                setTimeout(() => {
                    setIsSlotLocked(prevSlotLocked => {
                        const newLocked = [...prevSlotLocked];
                        newLocked[i] = true;
                        return newLocked;
                    });
                    resolve();
                }, getRandomInt(1000, 3000));
            });
        }

        setIsSpinning(false);
    }
    
    // Animation for the numbers rotating
    useEffect(() => {
        const interval = setInterval(() => {
            slotSelections.map((_, index) => {
                if (!isSlotLocked[index]) {
                    setSlotSelections(prevSelections => {
                        const newSelection = [...prevSelections];
                        newSelection[index] = getRandomInt(1, 6);
                        return newSelection;
                    })
                }
            })
        }, 32);

        return () => clearInterval(interval);
    }, [spinSlots]);

    return (
        <main className="min-h-screen">
            <h1 className="text-center text-3xl pt-8">Gamba</h1>
            <div className="justify-center flex flex-row flex-wrap gap-4 px-80 pt-8 text-4xl">
                {slotSelections.map((slotSelection, index) => {
                    return (
                        <div key={index} className="relative border border-white rounded p-4">
                            {slotSelection}
                        </div>
                    )
                })}
                <div className="w-full flex justify-center mt-4">
                    <button
                        className="text-white text-center text-2xl hover:text-gray-300 p-2 rounded-full bg-gray-500 hover:bg-gray-600 font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={isSpinning}
                        onClick={spinSlots}
                    >
                        {isSpinning ? 'Spinning...' : 'Spin me!'}
                    </button>
                </div>
            </div>
        </main>
    );


}