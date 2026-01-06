"use client";

import { useMemo, useState } from "react";
import { Button } from "./Button";
import type { Project } from "../lib/content";

type LeadPayload = {
  name?: string;
  phone: string;
  email?: string;
  company?: string;
  project?: string;
  message?: string;
};

function normalizePhone(value: string) {
  return value.replace(/[^\d+]/g, "").slice(0, 18);
}

export function LeadForm({ projects, initialProject }: { projects: Project[]; initialProject?: string }) {
  const options = useMemo(
    () => [
      { value: "general", label: "Общий запрос / консультация" },
      ...projects.map((p) => ({ value: p.slug, label: p.title })),
    ],
    [projects],
  );

  const [form, setForm] = useState<LeadPayload>({
    phone: "",
    project: initialProject ?? "general",
  });
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const phone = normalizePhone(form.phone ?? "");
    if (!phone || phone.replace(/\D/g, "").length < 10) {
      setStatus("error");
      setError("Введите корректный номер телефона.");
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, phone }),
      });

      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as
          | { error?: string }
          | null;
        throw new Error(data?.error ?? "Ошибка отправки");
      }

      setStatus("success");
      setForm({ phone: "", project: "general" });
    } catch (err: any) {
      setStatus("error");
      setError(err?.message ?? "Не удалось отправить заявку.");
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-sm">
          <span className="font-medium text-neutral-900">Имя</span>
          <input
            className="rounded-xl border border-neutral-300 px-3 py-2 outline-none focus:ring-2 focus:ring-red-200"
            value={form.name ?? ""}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Как к вам обращаться"
          />
        </label>

        <label className="grid gap-2 text-sm">
          <span className="font-medium text-neutral-900">
            Телефон <span className="text-red-700">*</span>
          </span>
          <input
            className="rounded-xl border border-neutral-300 px-3 py-2 outline-none focus:ring-2 focus:ring-red-200"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            placeholder="+7 ..."
            inputMode="tel"
            required
          />
        </label>

        <label className="grid gap-2 text-sm">
          <span className="font-medium text-neutral-900">Email</span>
          <input
            className="rounded-xl border border-neutral-300 px-3 py-2 outline-none focus:ring-2 focus:ring-red-200"
            value={form.email ?? ""}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="name@company.com"
            inputMode="email"
          />
        </label>

        <label className="grid gap-2 text-sm">
          <span className="font-medium text-neutral-900">Компания</span>
          <input
            className="rounded-xl border border-neutral-300 px-3 py-2 outline-none focus:ring-2 focus:ring-red-200"
            value={form.company ?? ""}
            onChange={(e) => setForm({ ...form, company: e.target.value })}
            placeholder="Название компании (опционально)"
          />
        </label>

        <label className="grid gap-2 text-sm sm:col-span-2">
          <span className="font-medium text-neutral-900">Интерес</span>
          <select
            className="rounded-xl border border-neutral-300 bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-red-200"
            value={form.project ?? "general"}
            onChange={(e) => setForm({ ...form, project: e.target.value })}
          >
            {options.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </label>

        <label className="grid gap-2 text-sm sm:col-span-2">
          <span className="font-medium text-neutral-900">Сообщение</span>
          <textarea
            className="min-h-[110px] rounded-xl border border-neutral-300 px-3 py-2 outline-none focus:ring-2 focus:ring-red-200"
            value={form.message ?? ""}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            placeholder="Коротко опишите запрос, бюджет/сроки или вопросы"
          />
        </label>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <Button type="submit" disabled={status === "submitting"}>
          {status === "submitting" ? "Отправка..." : "Отправить заявку"}
        </Button>

        <div className="text-xs text-neutral-500">
          Нажимая «Отправить заявку», вы соглашаетесь на обработку персональных
          данных.
        </div>
      </div>

      {status === "success" && (
        <div className="mt-4 rounded-xl bg-green-50 p-3 text-sm text-green-800">
          Спасибо! Заявка отправлена. Мы свяжемся с вами в ближайшее время.
        </div>
      )}

      {status === "error" && error && (
        <div className="mt-4 rounded-xl bg-red-50 p-3 text-sm text-red-800">
          {error}
        </div>
      )}
    </form>
  );
}
