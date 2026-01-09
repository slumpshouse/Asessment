# Generative Instagram with AI (Scaffold)

This workspace scaffolds a Next.js app that generates AI images and publishes them to a Neon PostgreSQL database via Prisma.

Next steps:
1. Copy `.env.example` to `.env` and fill in `DATABASE_URL` and `OPENAI_API_KEY`.
2. Run `pnpm install` (after installing pnpm) to install dependencies.
3. Run `pnpm prisma:generate` then `pnpm prisma:migrate`.
4. Start dev server: `pnpm dev`.

Notes:
- API route implementations include TODO comments to wire OpenAI and Prisma.
- Pages and API files use JSX variants as requested.
