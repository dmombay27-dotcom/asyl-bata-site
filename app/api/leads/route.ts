import { NextResponse } from "next/server";

type Payload = {
  name?: string;
  phone: string;
  email?: string;
  company?: string;
  project?: string;
  message?: string;
};

function isValidPhone(phone: string) {
  const digits = phone.replace(/\D/g, "");
  return digits.length >= 10 && digits.length <= 15;
}

export async function POST(req: Request) {
  let body: Payload | null = null;

  try {
    body = (await req.json()) as Payload;
  } catch {
    return NextResponse.json({ error: "Некорректный JSON" }, { status: 400 });
  }

  if (!body?.phone || !isValidPhone(body.phone)) {
    return NextResponse.json(
      { error: "Введите корректный номер телефона" },
      { status: 400 },
    );
  }

  const lead = {
    ...body,
    receivedAt: new Date().toISOString(),
    userAgent: req.headers.get("user-agent") ?? undefined,
    ip: req.headers.get("x-forwarded-for") ?? undefined,
  };

  // 1) Вариант «самый быстрый»: отправка на вебхук (Telegram/CRM/Make/Zapier и т.д.)
  // Укажите переменную окружения LEADS_WEBHOOK_URL
  const webhook = process.env.LEADS_WEBHOOK_URL;
  if (webhook) {
    try {
      await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lead),
      });
      return NextResponse.json({ ok: true });
    } catch {
      // fallthrough
    }
  }

  // 2) Отправка на email через SMTP (нужен nodemailer и переменные окружения):
  // SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, LEADS_TO_EMAIL
  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = process.env.SMTP_PORT;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const toEmail = process.env.LEADS_TO_EMAIL;

  if (smtpHost && smtpPort && smtpUser && smtpPass && toEmail) {
    try {
      const nodemailer = await import("nodemailer");
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: Number(smtpPort),
        secure: Number(smtpPort) === 465,
        auth: { user: smtpUser, pass: smtpPass },
      });

      await transporter.sendMail({
        from: `Asyl Bata <${smtpUser}>`,
        to: toEmail,
        subject: "Новая заявка с сайта Asyl Bata",
        text: [
          "Новая заявка:",
          `Имя: ${lead.name ?? "-"}`,
          `Телефон: ${lead.phone}`,
          `Email: ${lead.email ?? "-"}`,
          `Компания: ${lead.company ?? "-"}`,
          `Интерес: ${lead.project ?? "general"}`,
          `Сообщение: ${lead.message ?? "-"}`,
          `Время: ${lead.receivedAt}`,
          `IP: ${lead.ip ?? "-"}`,
          `UA: ${lead.userAgent ?? "-"}`,
        ].join("\n"),
      });

      return NextResponse.json({ ok: true });
    } catch {
      // fallthrough
    }
  }

  // 3) Фоллбэк: логируем в консоль сервера (на Vercel/Render/PM2 будет видно в логах)
  console.log("[Asyl Bata lead]", lead);

  return NextResponse.json({ ok: true });
}
