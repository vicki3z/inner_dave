import type { HTMLAttributes } from "react";

/** A surface container for the design system. Every visual is a semantic token
 *  utility (`bg-surface`, `border-edge`, `rounded-md`, `shadow-soft`, `text-ink`),
 *  so the Card follows the active light/dark theme with no per-instance logic.
 *  Composable: forwards `className` and any div props on top of the base styles. */
export function Card({
  className,
  children,
  ...rest
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`rounded-md border border-edge bg-surface p-6 text-ink shadow-soft${
        className ? ` ${className}` : ""
      }`}
      {...rest}
    >
      {children}
    </div>
  );
}
