"use client";

import { useBodyScrollLock } from "@/app/hooks/useBodyScrollLock";
import { useIsMobile } from "@/app/hooks/useIsMobile";
import { CarouselControls } from "./CarouselControls";
import { CarouselTrack } from "./CarouselTrack";
import { ControlButton } from "./ControlButton";
import { OVERLAY_CLASS, SLOT_VARS } from "./constants";
import { CloseIcon } from "./icons";
import { useCarousel } from "./useCarousel";

export interface ImageCarouselProps {
  images: string[];
  onClose: () => void;
}

export function ImageCarousel({ images, onClose }: ImageCarouselProps) {
  const isMobile = useIsMobile();
  useBodyScrollLock();

  const {
    currentIndex,
    isDragging,
    trackTransform,
    goPrev,
    goNext,
    handleImageClick,
    pointerHandlers,
  } = useCarousel({ imageCount: images.length, isMobile, onClose });

  return (
    <div className={OVERLAY_CLASS} onClick={onClose}>
      <div
        className="fixed top-4 right-4 z-[60]"
        onClick={(event) => event.stopPropagation()}
      >
        <ControlButton onClick={onClose} ariaLabel="Close carousel">
          <CloseIcon />
        </ControlButton>
      </div>

      <div
        className={`relative flex w-full max-w-6xl items-center justify-center px-12 py-20 ${SLOT_VARS}`}
        onClick={(event) => event.stopPropagation()}
      >
        <CarouselControls onPrev={goPrev} onNext={goNext} />

        <CarouselTrack
          images={images}
          currentIndex={currentIndex}
          isMobile={isMobile}
          isDragging={isDragging}
          trackTransform={trackTransform}
          onSelectImage={handleImageClick}
          pointerHandlers={pointerHandlers}
        />
      </div>
    </div>
  );
}
