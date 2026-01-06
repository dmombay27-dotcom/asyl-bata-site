import type { PropsWithChildren, ReactNode } from "react";
import { Container } from "./Container";

export function Section({
  title,
  subtitle,
  children,
  id,
}: PropsWithChildren<{ title?: ReactNode; subtitle?: ReactNode; id?: string }>) {
  return (
    <section id={id} className="py-12 sm:py-16">
      <Container>
        {(title || subtitle) && (
          <div className="mb-8">
            {title && (
              <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="mt-2 max-w-3xl text-sm text-neutral-600 sm:text-base">
                {subtitle}
              </p>
            )}
          </div>
        )}
        {children}
      </Container>
    </section>
  );
}
