import React, { useState } from 'react';
import Image from 'next/image';

interface ImageCarouselProps {
    images: string[];
    onClose: () => void;
}

export function ImageCarousel({ images, onClose }: ImageCarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(Math.floor(images.length / 2));

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };

    const CarouselImage = ({ src, isActive }: { src: string; isActive: boolean }) => (
        <div
            className={`transition-all duration-300 ${
                isActive
                    ? 'md:w-96 w-50 md:h-96 h-50'
                    : 'md:w-48 w-25 md:h-48 h-25 opacity-50'
            }`}
        >
            <Image
                src={src}
                alt="Carousel image"
                width={400}
                height={400}
                className="w-full h-full object-cover rounded-lg"
            />
        </div>
    );

    const CarouselControls = () => (
        <div className="absolute bottom-[-4rem] left-1/2 transform -translate-x-1/2">
            <div className="flex justify-center items-center gap-4">
                <button
                    onClick={handlePrev}
                    className="text-white text-4xl hover:text-gray-300 p-2 rounded-full"
                >
                    ‹
                </button>
                <button
                    onClick={onClose}
                    className="text-white text-2xl hover:text-gray-300 p-2 rounded-full"
                >
                    x
                </button>
                <button
                    onClick={handleNext}
                    className="text-white text-4xl hover:text-gray-300 p-2 rounded-full"
                >
                    ›
                </button>
            </div>
        </div>
    );

    return (
        <div className="fixed inset-0 bg-indigo-900 bg-opacity-75 flex items-center justify-center z-50">
            <div className="relative w-full max-w-6xl px-12">
                <div className="relative flex md:flex-row flex-col items-center justify-center gap-4">
                    <div className="flex md:flex-row flex-col items-center gap-4">
                        {images.map((src, index) => (
                            <CarouselImage key={src} src={src} isActive={index === currentIndex} />
                        ))}
                    </div>
                    <CarouselControls />
                </div>
            </div>
        </div>
    );
}