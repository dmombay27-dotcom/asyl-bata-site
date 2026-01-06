import Link from "next/link";
import { Button } from "../../components/Button";
import { Card, CardBody, CardHeader } from "../../components/Card";
import { Section } from "../../components/Section";
import { SERVICES } from "../../lib/content";

const PROCESS = [
  {
    title: "1) Диагностика",
    text: "Понимаем задачу, контекст, ограничения и критерии успеха. Фиксируем метрики и ожидаемый результат.",
  },
  {
    title: "2) Решение и план",
    text: "Готовим варианты решения, финансовую и операционную модель, дорожную карту и риски.",
  },
  {
    title: "3) Внедрение",
    text: "Сопровождаем реализацию: управление изменениями, контроль KPI, коммуникации со стейкхолдерами.",
  },
  {
    title: "4) Передача и контроль",
    text: "Документация, регламенты, обучение команды, контрольный период и отчёт по результатам.",
  },
];

export default function ServicesPage() {
  return (
    <div>
      <Section
        title="Консалтинговые услуги"
        subtitle="Ниже — основные направления. Мы можем собрать пакет под вашу задачу: от стратегии и финансов до инженерной части и юридического сопровождения."
      >
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s) => (
            <Card key={s.id} className="h-full">
              <CardHeader title={s.title} subtitle={s.short} />
              <CardBody>
                <ul className="list-disc space-y-2 pl-5 text-sm text-neutral-700">
                  {s.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </CardBody>
            </Card>
          ))}
        </div>
      </Section>

      <Section title="Как мы работаем" subtitle="Прозрачный процесс, понятные артефакты и контроль результата.">
        <div className="grid gap-6 md:grid-cols-2">
          {PROCESS.map((p) => (
            <Card key={p.title}>
              <CardBody>
                <div className="text-sm font-semibold">{p.title}</div>
                <div className="mt-2 text-sm text-neutral-700">{p.text}</div>
              </CardBody>
            </Card>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Link href="/#cooperation">
            <Button variant="primary">Оставить заявку</Button>
          </Link>
          <Link href="/projects">
            <Button variant="ghost">Смотреть проекты</Button>
          </Link>
        </div>
      </Section>
    </div>
  );
}
