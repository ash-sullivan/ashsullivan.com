/** Minimum drag distance (px) before a swipe advances to the next/previous slide. */
export const DRAG_THRESHOLD = 40;

/** Movement below this threshold (px) is treated as a tap, not a drag. */
export const TAP_THRESHOLD = 8;

/** Maximum visual drag offset (px) so a long drag never implies multiple slides. */
export const MAX_DRAG_OFFSET = 200;

export const CONTROL_BUTTON_CLASS =
    'flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm p-3 text-white shadow-lg transition min-w-11 min-h-11';

export const SLIDE_TRANSITION_CLASS =
    'transition duration-300 ease-out motion-reduce:transition-none';

export const TRACK_TRANSITION_CLASS =
    'transition-transform duration-300 ease-out motion-reduce:transition-none';

export const SLOT_VARS = '[--slot:8rem] md:[--slot:14rem]';

export const OVERLAY_CLASS =
    'fixed inset-0 z-50 flex touch-none overscroll-none items-center justify-center bg-black/40 backdrop-blur-sm';
