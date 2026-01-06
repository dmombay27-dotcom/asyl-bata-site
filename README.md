# Asyl Bata — сайт (Next.js + Tailwind)

Это готовый проект **с нуля**.

## Запуск локально

1) Установите Node.js LTS (18+)
2) В папке проекта выполните:

```bash
npm install
npm run dev
```

Откройте: http://localhost:3000

## Страницы
- `/` — главная
- `/services` — услуги
- `/projects` — проекты
- `/projects/[slug]` — страница проекта

## Где менять тексты
Весь контент в одном файле:
- `lib/content.ts`

## Форма “Сотрудничество”
Форма отправляет данные в `POST /api/leads`.

### Вариант 1 (самый быстрый): webhook
Создайте вебхук (Telegram/CRM/Make/Zapier) и задайте переменную окружения:

- `LEADS_WEBHOOK_URL=...`

### Вариант 2: email через SMTP
Задайте:
- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_USER`
- `SMTP_PASS`
- `LEADS_TO_EMAIL`

## Частые проблемы

### В редакторе “красным”
Сначала запустите `npm install`, потом перезапустите VS Code.

### Ошибка Node version
Нужен Node.js 18+.
