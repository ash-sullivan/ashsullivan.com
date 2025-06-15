'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

export default function InfiniteScrollGrid() {

    const INITIAL_RENDER_IMAGE_COUNT = 20;

    const infiniteScrollRef = useRef(null);

    const getImages = () => {
        return Array.from({ length: INITIAL_RENDER_IMAGE_COUNT }, () => `/cats/Tomo_3.jpg`);
    };

/*************  ✨ Windsurf Command ⭐  *************/
    /**
     * Triggers the infinite scroll by setting isLoading to true, performing a setTimeout to simulate a network request, and then setting isLoading to false and adding more images to the list.
     */
/*******  23f616f9-5ab2-48f9-ad3d-224dee085aa8  *******/
    const loadImages = () => {
        setIsLoading(true);
        // Insert actual network request and handling blah blah here.
        setTimeout(() => {
            setIsLoading(false);
            setGridImageList(prevList => prevList.concat(getImages()));
        }, 1000);
    }

    const [gridImageList, setGridImageList] = useState(getImages());
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const node = infiniteScrollRef.current;
        if (!node) return;

        const observer = new IntersectionObserver(
            (entries) => {
                const entry = entries[0];
                if (entry.isIntersecting) {
                    loadImages();
                }
            },
            {
                threshold: 1.0,
            }
        );
        observer.observe(node);

        return () => {
            observer.unobserve(node); // Use the local variable, not infiniteScrollRef.current
        };
    }, []);

    return (
        <main>
            <h1 className="text-center text-3xl pt-8"> Infinite Wall Of Tomos</h1>
            <div className="items-center flex flex-row flex-wrap gap-4 px-80 pt-8">
                <>
                    {gridImageList.map((imageSrc, index) => {
                        return (
                            <div key={index} className="relative">
                                <Image
                                    src={imageSrc}
                                    height={200}
                                    width={200}
                                    alt="real alt text"
                                    aria-description="An image of the bestest cat in the world" 
                                />
                            </div>
                        )
                    })}
                </>
            </div>
            {isLoading && <div className="text-center text-2xl">Loading...</div>}
            {/* ref for knowing when we've hit the bottom of the page and should scroll more */}
            <div ref={infiniteScrollRef} />
        </main>
    );
}