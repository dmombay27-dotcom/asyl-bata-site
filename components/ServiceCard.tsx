import { Card, CardBody, CardHeader } from "./Card";
import type { Service } from "../lib/content";

export function ServiceCard({ service }: { service: Service }) {
  return (
    <Card className="h-full">
      <CardHeader title={service.title} subtitle={service.short} />
      <CardBody>
        <ul className="list-disc space-y-2 pl-5 text-sm text-neutral-700">
          {service.bullets.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
      </CardBody>
    </Card>
  );
}
