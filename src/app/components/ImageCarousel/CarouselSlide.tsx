import Image from 'next/image';
import { SLIDE_TRANSITION_CLASS } from './constants';

interface CarouselSlideProps {
    src: string;
    isActive: boolean;
    onSelect: () => void;
}

export function CarouselSlide({ src, isActive, onSelect }: CarouselSlideProps) {
    return (
        <div
            className="flex flex-shrink-0 cursor-pointer items-center justify-center"
            style={{ width: 'var(--slot)', height: 'var(--slot)' }}
            onClick={onSelect}
        >
            <div
                className={`${SLIDE_TRANSITION_CLASS} ${
                    isActive ? 'scale-100 opacity-100' : 'scale-50 opacity-50'
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
    );
}
