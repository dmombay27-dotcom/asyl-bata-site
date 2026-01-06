import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "../components/SiteHeader";
import { Container } from "../components/Container";

export const metadata: Metadata = {
  title: "Asyl Bata — консалтинговые услуги и инвестиционные проекты",
  description:
    "Asyl Bata: стратегический и операционный консалтинг, корпоративные финансы, доверительное управление, лоббирование, инжиниринг. Проекты для инвесторов.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body className="min-h-dvh bg-neutral-50 text-neutral-900">
        <SiteHeader />
        <main>{children}</main>

        <footer className="border-t border-neutral-200 bg-white py-10">
          <Container>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="text-sm">
                <div className="font-semibold">Asyl Bata</div>
                <div className="text-neutral-500">
                  Консалтинговые услуги · инвестиционные проекты
                </div>
              </div>

              <div className="text-sm text-neutral-500">
                <a className="hover:text-neutral-900" href="/privacy">
                  Политика конфиденциальности
                </a>
              </div>
            </div>
          </Container>
        </footer>
      </body>
    </html>
  );
}
