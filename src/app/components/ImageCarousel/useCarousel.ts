'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { DRAG_THRESHOLD, MAX_DRAG_OFFSET, TAP_THRESHOLD } from './constants';

interface UseCarouselOptions {
    imageCount: number;
    isMobile: boolean;
    onClose: () => void;
}

export function useCarousel({ imageCount, isMobile, onClose }: UseCarouselOptions) {
    const [currentIndex, setCurrentIndex] = useState(Math.floor(imageCount / 2));
    const [dragOffset, setDragOffset] = useState(0);
    const [isDragging, setIsDragging] = useState(false);

    const startPosRef = useRef({ x: 0, y: 0 });
    const movedRef = useRef(false);
    const suppressClickRef = useRef(false);
    // Ref mirrors isDragging so pointer handlers read the current value on the
    // first move, before React re-renders after pointerdown.
    const isDraggingRef = useRef(false);

    const goPrev = useCallback(() => {
        setCurrentIndex((prev) => (prev === 0 ? imageCount - 1 : prev - 1));
    }, [imageCount]);

    const goNext = useCallback(() => {
        setCurrentIndex((prev) => (prev === imageCount - 1 ? 0 : prev + 1));
    }, [imageCount]);

    const selectIndex = (index: number) => {
        setCurrentIndex(index);
    };

    useEffect(() => {
        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
                return;
            }

            if (isMobile) {
                if (event.key === 'ArrowUp') goPrev();
                if (event.key === 'ArrowDown') goNext();
            } else {
                if (event.key === 'ArrowLeft') goPrev();
                if (event.key === 'ArrowRight') goNext();
            }
        };

        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, [isMobile, onClose, goPrev, goNext]);

    const getDelta = (clientX: number, clientY: number) =>
        isMobile ? clientY - startPosRef.current.y : clientX - startPosRef.current.x;

    const clampDrag = (delta: number) =>
        Math.max(-MAX_DRAG_OFFSET, Math.min(MAX_DRAG_OFFSET, delta));

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
            // Prevent the subsequent click from also selecting a slide.
            suppressClickRef.current = true;
            if (delta < 0) {
                goNext();
            } else {
                goPrev();
            }
        }

        if (event.currentTarget.hasPointerCapture(event.pointerId)) {
            event.currentTarget.releasePointerCapture(event.pointerId);
        }
    };

    const handleImageClick = (index: number) => {
        // movedRef and suppressClickRef distinguish taps from swipes so a drag
        // past the threshold does not also fire tap-to-select.
        if (movedRef.current || suppressClickRef.current) {
            movedRef.current = false;
            suppressClickRef.current = false;
            return;
        }

        selectIndex(index);
    };

    const axis = isMobile ? 'Y' : 'X';
    const trackTransform = `translate${axis}(calc(-1 * ${currentIndex} * var(--slot) + ${dragOffset}px))`;

    return {
        currentIndex,
        dragOffset,
        isDragging,
        trackTransform,
        goPrev,
        goNext,
        handleImageClick,
        pointerHandlers: {
            onPointerDown,
            onPointerMove,
            onPointerUp,
            onPointerCancel: onPointerUp,
        },
    };
}
