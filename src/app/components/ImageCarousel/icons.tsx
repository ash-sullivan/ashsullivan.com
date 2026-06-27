import { PropsWithChildren } from 'react';

function Icon({ size = 24, children }: PropsWithChildren<{ size?: number }>) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            {children}
        </svg>
    );
}

export function ChevronLeftIcon() {
    return (
        <Icon>
            <path d="M15 18l-6-6 6-6" />
        </Icon>
    );
}

export function ChevronRightIcon() {
    return (
        <Icon>
            <path d="M9 18l6-6-6-6" />
        </Icon>
    );
}

export function ChevronUpIcon() {
    return (
        <Icon>
            <path d="M18 15l-6-6-6 6" />
        </Icon>
    );
}

export function ChevronDownIcon() {
    return (
        <Icon>
            <path d="M6 9l6 6 6-6" />
        </Icon>
    );
}

export function CloseIcon() {
    return (
        <Icon size={20}>
            <path d="M18 6L6 18M6 6l12 12" />
        </Icon>
    );
}
