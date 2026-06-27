import { ReactNode } from "react";
import { CONTROL_BUTTON_CLASS } from "./constants";

interface ControlButtonProps {
  onClick: () => void;
  ariaLabel: string;
  className?: string;
  children: ReactNode;
}

/**
 * Circular translucent control button used for carousel navigation and close.
 * Stops pointer propagation so a button press never starts a track drag.
 */
export function ControlButton({
  onClick,
  ariaLabel,
  className = "",
  children,
}: ControlButtonProps) {
  const stopPointerPropagation = (event: React.PointerEvent) => {
    event.stopPropagation();
  };

  return (
    <button
      type="button"
      onClick={onClick}
      onPointerDown={stopPointerPropagation}
      className={`${CONTROL_BUTTON_CLASS} ${className}`}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}
