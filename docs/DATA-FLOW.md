# Data Flow Documentation

## Image Generation Flow
1. User enters prompt in frontend (app/page.jsx)
2. Frontend sends POST request to `/api/generate`
3. API validates prompt and calls OpenAI DALL·E 2
4. OpenAI returns image URL
5. API returns image URL to frontend
6. Frontend displays generated image

## Publishing Flow
1. User clicks "Publish" on generated image
2. Frontend sends POST request to `/api/publish` with imageUrl and prompt
3. API validates data and creates record via Prisma
4. Database stores image metadata
5. API returns 201 Created with full object
6. Frontend shows success message

## Feed Retrieval Flow
1. User visits `/feed` page
2. Frontend fetches GET `/api/feed` with pagination params
3. API queries database with Prisma (findMany with skip/take)
4. API calculates total pages with count()
5. API returns paginated response
6. Frontend displays images in grid

## Hearts Update Flow
1. User clicks heart button on feed image
2. Frontend optimistically updates UI
3. Frontend sends PUT `/api/feed` with id and new hearts count
4. API validates and updates database atomically
5. If error, frontend reverts optimistic update
6. If success, UI reflects actual database state
