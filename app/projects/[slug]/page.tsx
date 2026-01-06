import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "../../../components/Button";
import { Card, CardBody, CardHeader } from "../../../components/Card";
import { LeadForm } from "../../../components/LeadForm";
import { Section } from "../../../components/Section";
import { getProject, PROJECTS } from "../../../lib/content";

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export default function ProjectPage({
  params,
}: {
  params: { slug: string };
}) {
  const project = getProject(params.slug);
  if (!project) return notFound();

  return (
    <div>
      <section className="border-b border-neutral-200 bg-white">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="py-10 sm:py-12">
            <div className="flex flex-wrap items-center gap-3 text-sm text-neutral-600">
              <Link href="/projects" className="hover:text-neutral-900">
                Проекты
              </Link>
              <span className="text-neutral-300">/</span>
              <span className="text-neutral-900">{project.title}</span>
            </div>

            <h1 className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">
              {project.title}
            </h1>
            <p className="mt-3 max-w-3xl text-base text-neutral-700">
              {project.tagline}
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/#cooperation">
                <Button variant="primary">Обсудить сотрудничество</Button>
              </Link>
              <Link href="/projects">
                <Button variant="ghost">Все проекты</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Section title="Ключевые параметры">
        <div className="grid gap-6 lg:grid-cols-3">
          <Card>
            <CardHeader title="Локация" />
            <CardBody>
              <div className="text-sm text-neutral-700">
                {project.location ?? "—"}
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardHeader title="Инвесторам" />
            <CardBody>
              <div className="text-sm text-neutral-700">
                {project.investmentAsk ?? "—"}
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardHeader title="Сроки" />
            <CardBody>
              <div className="text-sm text-neutral-700">
                {project.timeline ?? "—"}
              </div>
            </CardBody>
          </Card>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader title="Ключевые тезисы" />
            <CardBody>
              <ul className="list-disc space-y-2 pl-5 text-sm text-neutral-700">
                {project.highlights.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
            </CardBody>
          </Card>

          <Card>
            <CardHeader title="Описание" />
            <CardBody>
              <div className="grid gap-3 text-sm text-neutral-700">
                {project.description.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </CardBody>
          </Card>
        </div>
      </Section>

      <Section title="Контакты по проекту">
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader title="Ответственные лица" />
            <CardBody>
              <div className="grid gap-4">
                {project.contacts.map((c) => (
                  <div
                    key={c.name + c.phone}
                    className="rounded-2xl bg-neutral-50 p-4"
                  >
                    <div className="text-sm font-semibold">{c.name}</div>
                    {c.role && (
                      <div className="mt-1 text-sm text-neutral-600">
                        {c.role}
                      </div>
                    )}
                    <div className="mt-2 text-sm">
                      <a
                        className="font-medium text-neutral-900 hover:underline"
                        href={`tel:${c.phone.replace(/\s/g, "")}`}
                      >
                        {c.phone}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>

          <div>
            <div className="text-sm font-semibold">Заявка на сотрудничество</div>
            <div className="mt-2 text-sm text-neutral-600">
              Оставьте контакты — мы свяжемся и уточним формат участия (инвестиции,
              партнёрство, консультация).
            </div>
            <div className="mt-4">
              <LeadForm projects={PROJECTS} initialProject={project.slug} />
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
