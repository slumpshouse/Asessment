# Data Flow

High-level data flow for Generative Instagram with AI:

1. User submits a prompt on the Generate page (`/`).
2. Frontend calls `POST /api/generate` with the prompt.
3. Server calls OpenAI Images API to generate an image and returns an `imageUrl`.
4. User clicks Publish which calls `POST /api/publish` with `imageUrl` and `prompt`.
5. Server persists the record in `published_images` via Prisma.
6. Feed page (`/feed`) calls `GET /api/feed` to fetch paginated records.
7. Users can like an image which calls `PUT /api/feed` to update hearts.
