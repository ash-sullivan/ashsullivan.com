import { CarouselSlide } from './CarouselSlide';
import { TRACK_TRANSITION_CLASS } from './constants';

interface CarouselTrackProps {
    images: string[];
    currentIndex: number;
    isMobile: boolean;
    isDragging: boolean;
    trackTransform: string;
    onSelectImage: (index: number) => void;
    pointerHandlers: {
        onPointerDown: (event: React.PointerEvent<HTMLDivElement>) => void;
        onPointerMove: (event: React.PointerEvent<HTMLDivElement>) => void;
        onPointerUp: (event: React.PointerEvent<HTMLDivElement>) => void;
        onPointerCancel: (event: React.PointerEvent<HTMLDivElement>) => void;
    };
}

export function CarouselTrack({
    images,
    currentIndex,
    isMobile,
    isDragging,
    trackTransform,
    onSelectImage,
    pointerHandlers,
}: CarouselTrackProps) {
    return (
        <div
            className="relative touch-none overflow-visible"
            style={{
                width: 'var(--slot)',
                height: isMobile ? 'var(--slot)' : undefined,
            }}
            {...pointerHandlers}
        >
            <div
                className={`flex ${isMobile ? 'flex-col' : 'flex-row'} ${
                    isDragging ? '' : TRACK_TRANSITION_CLASS
                }`}
                style={{ transform: trackTransform }}
            >
                {images.map((src, index) => (
                    <CarouselSlide
                        key={src}
                        src={src}
                        isActive={index === currentIndex}
                        onSelect={() => onSelectImage(index)}
                    />
                ))}
            </div>
        </div>
    );
}
