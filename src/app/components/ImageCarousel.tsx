'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';

interface ImageCarouselProps {
    images: string[];
    onClose: () => void;
}

const DRAG_THRESHOLD = 40;
const TAP_THRESHOLD = 8;
const MAX_DRAG_OFFSET = 200;

function useIsMobile() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const mq = window.matchMedia('(max-width: 767px)');
        setIsMobile(mq.matches);
        const handler = (event: MediaQueryListEvent) => setIsMobile(event.matches);
        mq.addEventListener('change', handler);
        return () => mq.removeEventListener('change', handler);
    }, []);

    return isMobile;
}

function ChevronLeftIcon() {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
                d="M15 18l-6-6 6-6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

function ChevronRightIcon() {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
                d="M9 18l6-6-6-6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

function ChevronUpIcon() {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
                d="M18 15l-6-6-6 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

function ChevronDownIcon() {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
                d="M6 9l6 6 6-6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

function CloseIcon() {
    return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
                d="M18 6L6 18M6 6l12 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

const controlButtonClass =
    'flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm p-3 text-white shadow-lg transition min-w-11 min-h-11';

export function ImageCarousel({ images, onClose }: ImageCarouselProps) {
    const isMobile = useIsMobile();
    const [currentIndex, setCurrentIndex] = useState(Math.floor(images.length / 2));
    const [dragOffset, setDragOffset] = useState(0);
    const [isDragging, setIsDragging] = useState(false);

    const startPosRef = useRef({ x: 0, y: 0 });
    const movedRef = useRef(false);
    const suppressClickRef = useRef(false);
    const isDraggingRef = useRef(false);

    const handlePrev = useCallback(() => {
        setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    }, [images.length]);

    const handleNext = useCallback(() => {
        setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, [images.length]);

    const selectIndex = (index: number) => {
        setCurrentIndex(index);
    };

    useEffect(() => {
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = previousOverflow;
        };
    }, []);

    useEffect(() => {
        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
                return;
            }

            if (isMobile) {
                if (event.key === 'ArrowUp') handlePrev();
                if (event.key === 'ArrowDown') handleNext();
            } else {
                if (event.key === 'ArrowLeft') handlePrev();
                if (event.key === 'ArrowRight') handleNext();
            }
        };

        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, [isMobile, onClose, handlePrev, handleNext]);

    const getDelta = (clientX: number, clientY: number) =>
        isMobile ? clientY - startPosRef.current.y : clientX - startPosRef.current.x;

    const clampDrag = (delta: number) =>
        Math.max(-MAX_DRAG_OFFSET, Math.min(MAX_DRAG_OFFSET, delta));

    const stopControlPointer = (event: React.PointerEvent) => {
        event.stopPropagation();
    };

    const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
        startPosRef.current = { x: event.clientX, y: event.clientY };
        movedRef.current = false;
        suppressClickRef.current = false;
        isDraggingRef.current = true;
        setIsDragging(true);
        event.currentTarget.setPointerCapture(event.pointerId);
    };

    const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
        if (!isDraggingRef.current) return;

        const totalMove =
            Math.abs(event.clientX - startPosRef.current.x) +
            Math.abs(event.clientY - startPosRef.current.y);

        if (totalMove > TAP_THRESHOLD) {
            movedRef.current = true;
            event.preventDefault();
        }

        setDragOffset(clampDrag(getDelta(event.clientX, event.clientY)));
    };

    const onPointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
        if (!isDraggingRef.current) return;

        const delta = getDelta(event.clientX, event.clientY);
        isDraggingRef.current = false;
        setIsDragging(false);
        setDragOffset(0);

        if (Math.abs(delta) > DRAG_THRESHOLD) {
            suppressClickRef.current = true;
            if (delta < 0) {
                handleNext();
            } else {
                handlePrev();
            }
        }

        if (event.currentTarget.hasPointerCapture(event.pointerId)) {
            event.currentTarget.releasePointerCapture(event.pointerId);
        }
    };

    const handleImageClick = (index: number) => {
        if (movedRef.current || suppressClickRef.current) {
            movedRef.current = false;
            suppressClickRef.current = false;
            return;
        }

        selectIndex(index);
    };

    const axis = isMobile ? 'Y' : 'X';
    const trackTransform = `translate${axis}(calc(-1 * ${currentIndex} * var(--slot) + ${dragOffset}px))`;

    return (
        <div
            className="fixed inset-0 z-50 flex touch-none overscroll-none items-center justify-center bg-black/40 backdrop-blur-sm"
            onClick={onClose}
        >
            <button
                type="button"
                onClick={(event) => {
                    event.stopPropagation();
                    onClose();
                }}
                className={`fixed top-4 right-4 z-[60] ${controlButtonClass}`}
                aria-label="Close carousel"
            >
                <CloseIcon />
            </button>

            <div
                className="relative flex w-full max-w-6xl items-center justify-center px-12 py-20 [--slot:8rem] md:[--slot:14rem]"
                onClick={(event) => event.stopPropagation()}
            >
                <button
                    type="button"
                    onClick={handlePrev}
                    onPointerDown={stopControlPointer}
                    className={`absolute left-4 top-1/2 z-10 hidden -translate-y-1/2 md:flex ${controlButtonClass}`}
                    aria-label="Previous image"
                >
                    <ChevronLeftIcon />
                </button>

                <button
                    type="button"
                    onClick={handlePrev}
                    onPointerDown={stopControlPointer}
                    className={`absolute left-1/2 top-4 z-10 flex -translate-x-1/2 md:hidden ${controlButtonClass}`}
                    aria-label="Previous image"
                >
                    <ChevronUpIcon />
                </button>

                <div
                    className="relative touch-none overflow-visible"
                    style={{
                        width: 'var(--slot)',
                        height: isMobile ? 'var(--slot)' : undefined,
                    }}
                    onPointerDown={onPointerDown}
                    onPointerMove={onPointerMove}
                    onPointerUp={onPointerUp}
                    onPointerCancel={onPointerUp}
                >
                    <div
                        className={`flex ${isMobile ? 'flex-col' : 'flex-row'} ${
                            isDragging
                                ? ''
                                : 'transition-transform duration-300 ease-out motion-reduce:transition-none'
                        }`}
                        style={{ transform: trackTransform }}
                    >
                        {images.map((src, index) => (
                            <div
                                key={src}
                                className="flex flex-shrink-0 cursor-pointer items-center justify-center"
                                style={{ width: 'var(--slot)', height: 'var(--slot)' }}
                                onClick={() => handleImageClick(index)}
                            >
                                <div
                                    className={`transition duration-300 ease-out motion-reduce:transition-none ${
                                        index === currentIndex
                                            ? 'scale-100 opacity-100'
                                            : 'scale-50 opacity-50'
                                    }`}
                                >
                                    <Image
                                        src={src}
                                        alt="Carousel image"
                                        width={400}
                                        height={400}
                                        className="rounded-lg object-cover"
                                        style={{ width: 'var(--slot)', height: 'var(--slot)' }}
                                        draggable={false}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <button
                    type="button"
                    onClick={handleNext}
                    onPointerDown={stopControlPointer}
                    className={`absolute right-4 top-1/2 z-10 hidden -translate-y-1/2 md:flex ${controlButtonClass}`}
                    aria-label="Next image"
                >
                    <ChevronRightIcon />
                </button>

                <button
                    type="button"
                    onClick={handleNext}
                    onPointerDown={stopControlPointer}
                    className={`absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 md:hidden ${controlButtonClass}`}
                    aria-label="Next image"
                >
                    <ChevronDownIcon />
                </button>
            </div>
        </div>
    );
}
