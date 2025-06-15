'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

export default function SlotMachine() {

    // Shamelessly stolen from MDN to get a random integer.
    function getRandomInt(min: number, max: number) {
        const minCeiled = Math.ceil(min);
        const maxFloored = Math.floor(max);
        return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
    }

    // UI
    const [isSpinning, setIsSpinning] = useState(false);
    const [isSlotLocked, setIsSlotLocked] = useState([true, true, true]);

    // Data
    const [slotSelections, setSlotSelections] = useState([0, 0, 0]);
    const [hasWon, setHasWon] = useState(false);
    const [numberOfWins, setNumberOfWins] = useState(0);

    // each slot waits between 1 and 3 seconds then locks in whatever position it's in
    const spinSlots = async () => {
        setIsSlotLocked([false, false, false]);
        setIsSpinning(true);
        setHasWon(false);

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
                }, getRandomInt(1000, 2000));
            });
        }
        setIsSpinning(false);
    }

    // "Animation" for the numbers rotating
    const slotSelectionsRef = useRef(slotSelections);
    const isSlotLockedRef = useRef(isSlotLocked);

    // Keep refs in sync with state
    useEffect(() => {
        slotSelectionsRef.current = slotSelections;
    }, [slotSelections]);

    useEffect(() => {
        isSlotLockedRef.current = isSlotLocked;
    }, [isSlotLocked]);

    // Animation effect with useCallback
    const updateSlots = useCallback(() => {
        slotSelectionsRef.current.forEach((_, index) => {
            if (!isSlotLockedRef.current[index]) {
                setSlotSelections(prevSelections => {
                    const newSelection = [...prevSelections];
                    newSelection[index] = getRandomInt(1, 7);
                    return newSelection;
                });
            }
        });
    }, []);

    useEffect(() => {
        const interval = setInterval(updateSlots, 32);
        return () => clearInterval(interval);
    }, [updateSlots]);

    // Check win condition when all slots are locked
    useEffect(() => {
        if (isSlotLocked.every(locked => locked)) {
            if (slotSelections.every(slot => slot > 0 && slot === slotSelections[0])) {
                setHasWon(true);
                setNumberOfWins(prevWins => prevWins + 1);
            }
        }
    }, [isSlotLocked, slotSelections]);

    return (
        <main className="min-h-screen">
            <h1 className="text-center text-3xl pt-8">Slots!</h1>
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
                {hasWon && <p className="text-center text-2xl pt-8">You won! You now have {numberOfWins} {numberOfWins === 1 ? 'win' : 'wins'}.</p>}
            </div>
        </main>
    );


}