import type { PropsWithChildren, ReactNode } from "react";

export function Card({
  children,
  className = "",
}: PropsWithChildren<{ className?: string }>) {
  return (
    <div
      className={[
        "rounded-2xl border border-neutral-200 bg-white shadow-sm",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}

export function CardHeader({
  title,
  subtitle,
  right,
}: {
  title: ReactNode;
  subtitle?: ReactNode;
  right?: ReactNode;
}) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-neutral-200 p-5">
      <div>
        <div className="text-base font-semibold leading-tight">{title}</div>
        {subtitle && (
          <div className="mt-2 text-sm text-neutral-600">{subtitle}</div>
        )}
      </div>
      {right ? <div className="shrink-0">{right}</div> : null}
    </div>
  );
}

export function CardBody({ children }: PropsWithChildren) {
  return <div className="p-5">{children}</div>;
}
