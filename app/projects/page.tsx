import { Section } from "../../components/Section";
import { ProjectCard } from "../../components/ProjectCard";
import { PROJECTS } from "../../lib/content";

export default function ProjectsPage() {
  return (
    <Section
      title="Проекты для инвесторов"
      subtitle="Выберите проект, чтобы увидеть подробную концепцию, ключевые параметры и форму обратной связи."
    >
      <div className="grid gap-6 lg:grid-cols-3">
        {PROJECTS.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </div>
    </Section>
  );
}
