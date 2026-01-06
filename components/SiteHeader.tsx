import Link from "next/link";
import { Container } from "./Container";

const LINKS = [
  { href: "/", label: "Главная" },
  { href: "/services", label: "Услуги" },
  { href: "/projects", label: "Проекты" },
  { href: "/#cooperation", label: "Сотрудничество" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-neutral-200 bg-white/80 backdrop-blur">
      <Container>
        <div className="flex h-16 items-center justify-between gap-6">
          <Link href="/" className="flex items-center gap-3">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-red-700 text-white font-semibold">
              AB
            </div>
            <div className="leading-tight">
              <div className="text-sm font-semibold">Asyl Bata</div>
              <div className="text-xs text-neutral-500">
                Консалтинг · проекты · инвестиции
              </div>
            </div>
          </Link>

          <nav className="hidden items-center gap-6 text-sm text-neutral-700 md:flex">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="hover:text-neutral-900"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/#cooperation"
              className="rounded-xl bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-800"
            >
              Оставить заявку
            </Link>
          </div>
        </div>
      </Container>
    </header>
  );
}
