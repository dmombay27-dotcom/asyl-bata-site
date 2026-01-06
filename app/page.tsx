import Link from "next/link";
import { Button } from "../components/Button";
import { Card, CardBody } from "../components/Card";
import { LeadForm } from "../components/LeadForm";
import { ProjectCard } from "../components/ProjectCard";
import { Section } from "../components/Section";
import { ServiceCard } from "../components/ServiceCard";
import { COMPANY, PROJECTS, SERVICES } from "../lib/content";

export default function HomePage() {
  return (
    <div>
      {/* HERO */}
      <section className="border-b border-neutral-200 bg-white">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 py-14 sm:py-16 lg:grid-cols-2">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 text-xs text-neutral-700">
                Консалтинг · Проекты · Инвесторам
              </div>

              <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
                {COMPANY.name}
              </h1>

              <p className="mt-4 max-w-xl text-base text-neutral-700 sm:text-lg">
                {COMPANY.tagline}
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Link href="/services">
                  <Button variant="primary">Посмотреть услуги</Button>
                </Link>
                <Link href="/projects">
                  <Button variant="ghost">Инвестпроекты</Button>
                </Link>
              </div>

              <div className="mt-6 text-sm text-neutral-500">
                Контактный номер:{" "}
                <a className="text-neutral-900" href={`tel:${COMPANY.primaryPhone}`}>
                  {COMPANY.primaryPhone}
                </a>
              </div>
            </div>

            <Card className="overflow-hidden">
              <CardBody>
                <div className="grid gap-3">
                  <div className="text-sm font-semibold">Наш профиль</div>
                  <div className="text-sm text-neutral-700">{COMPANY.profile}</div>

                  <div className="mt-4 grid gap-3 sm:grid-cols-3">
                    <div className="rounded-2xl bg-neutral-50 p-4">
                      <div className="text-xs font-semibold text-neutral-500">
                        Фокус
                      </div>
                      <div className="mt-1 text-sm font-medium">
                        Стратегия и эффективность
                      </div>
                    </div>
                    <div className="rounded-2xl bg-neutral-50 p-4">
                      <div className="text-xs font-semibold text-neutral-500">
                        Финансы
                      </div>
                      <div className="mt-1 text-sm font-medium">
                        Инвестиции, M&A, оценка
                      </div>
                    </div>
                    <div className="rounded-2xl bg-neutral-50 p-4">
                      <div className="text-xs font-semibold text-neutral-500">
                        Проекты
                      </div>
                      <div className="mt-1 text-sm font-medium">
                        Концепции для инвесторов
                      </div>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <Section
        id="services"
        title="Услуги"
        subtitle="Показываем, как увеличить эффективность бизнеса, привлечь финансирование и провести изменения безопасно и измеримо."
      >
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s) => (
            <ServiceCard key={s.id} service={s} />
          ))}
        </div>

        <div className="mt-8">
          <Link href="/services">
            <Button variant="secondary">Все услуги подробно</Button>
          </Link>
        </div>
      </Section>

      {/* PROJECTS */}
      <Section
        id="projects"
        title="Проекты для инвесторов"
        subtitle="2–3 проекта с готовой концепцией. На страницах проектов — краткая суть, ключевые параметры и форма для связи."
      >
        <div className="grid gap-6 lg:grid-cols-3">
          {PROJECTS.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </Section>

      {/* COOPERATION */}
      <Section
        id="cooperation"
        title="Сотрудничество"
        subtitle="Оставьте контакты — менеджер свяжется с вами и уточнит детали (услуга или инвестиционный проект)."
      >
        <LeadForm projects={PROJECTS} />

        <div className="mt-6 text-xs text-neutral-500">
          Если вы представляете фонд или компанию, укажите профиль, формат участия и
          желаемый срок обратной связи.
        </div>
      </Section>
    </div>
  );
}
