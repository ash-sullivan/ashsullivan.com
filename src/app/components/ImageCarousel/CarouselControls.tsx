import { ControlButton } from './ControlButton';
import {
    ChevronDownIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    ChevronUpIcon,
} from './icons';

interface CarouselControlsProps {
    onPrev: () => void;
    onNext: () => void;
}

/**
 * Responsive prev/next controls: left/right on desktop, up/down on mobile.
 */
export function CarouselControls({ onPrev, onNext }: CarouselControlsProps) {
    return (
        <>
            <ControlButton
                onClick={onPrev}
                ariaLabel="Previous image"
                className="absolute left-4 top-1/2 z-10 hidden -translate-y-1/2 md:flex"
            >
                <ChevronLeftIcon />
            </ControlButton>

            <ControlButton
                onClick={onPrev}
                ariaLabel="Previous image"
                className="absolute left-1/2 top-4 z-10 flex -translate-x-1/2 md:hidden"
            >
                <ChevronUpIcon />
            </ControlButton>

            <ControlButton
                onClick={onNext}
                ariaLabel="Next image"
                className="absolute right-4 top-1/2 z-10 hidden -translate-y-1/2 md:flex"
            >
                <ChevronRightIcon />
            </ControlButton>

            <ControlButton
                onClick={onNext}
                ariaLabel="Next image"
                className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 md:hidden"
            >
                <ChevronDownIcon />
            </ControlButton>
        </>
    );
}
