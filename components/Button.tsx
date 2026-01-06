import type { ButtonHTMLAttributes, PropsWithChildren } from "react";

type Variant = "primary" | "secondary" | "ghost";

const VARIANTS: Record<Variant, string> = {
  primary:
    "bg-red-700 text-white hover:bg-red-800 focus-visible:outline-red-700",
  secondary:
    "bg-neutral-900 text-white hover:bg-neutral-800 focus-visible:outline-neutral-900",
  ghost:
    "bg-transparent text-neutral-900 hover:bg-neutral-100 focus-visible:outline-neutral-300",
};

export function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}: PropsWithChildren<
  ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }
>) {
  return (
    <button
      {...props}
      className={[
        "inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium",
        "transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50 disabled:cursor-not-allowed",
        VARIANTS[variant],
        className,
      ].join(" ")}
    >
      {children}
    </button>
  );
}
