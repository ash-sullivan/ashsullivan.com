'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';

export default function InfiniteScrollGrid() {

    const INITIAL_RENDER_IMAGE_COUNT = 20;

    const infiniteScrollRef = useRef(null);

    const getImages = () => {
        return Array.from({ length: INITIAL_RENDER_IMAGE_COUNT }, () => `/cats/Tomo_3.jpg`);
    };

    const loadImages = useCallback(() => {
        setIsLoading(true);
        // Insert actual network request and handling blah blah here.
        setTimeout(() => {
            setIsLoading(false);
            setGridImageList(prevList => prevList.concat(getImages()));
        }, 1000);
    }, []);

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
    }, [loadImages]);

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