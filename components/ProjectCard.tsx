import Link from "next/link";
import { Card, CardBody, CardHeader } from "./Card";
import { Button } from "./Button";
import type { Project } from "../lib/content";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Card className="h-full">
      <CardHeader
        title={project.title}
        subtitle={project.tagline}
        right={
          <Link href={`/projects/${project.slug}`}>
            <Button variant="primary">Открыть</Button>
          </Link>
        }
      />
      <CardBody>
        <div className="grid gap-2 text-sm text-neutral-700">
          {project.location && (
            <div>
              <span className="text-neutral-500">Локация:</span>{" "}
              {project.location}
            </div>
          )}
          {project.investmentAsk && (
            <div>
              <span className="text-neutral-500">Инвесторам:</span>{" "}
              {project.investmentAsk}
            </div>
          )}
          {project.timeline && (
            <div>
              <span className="text-neutral-500">Сроки:</span> {project.timeline}
            </div>
          )}
        </div>

        <div className="mt-4">
          <div className="text-xs font-semibold text-neutral-500 uppercase tracking-wide">
            Ключевые тезисы
          </div>
          <ul className="mt-2 list-disc space-y-2 pl-5 text-sm text-neutral-700">
            {project.highlights.slice(0, 4).map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>
        </div>
      </CardBody>
    </Card>
  );
}
