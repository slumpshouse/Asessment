# API Documentation

## Endpoints Overview

### 1. POST /api/generate
Purpose: Generate an image using OpenAI DALL·E 2 API

Request Body:
```
{ "prompt": "string (required, non-empty)" }
```

Success Response (200):
```
{ "imageUrl": "https://...", "prompt": "a cute corgi puppy" }
```

Error Responses:
- 400: Missing or invalid prompt
- 500: OpenAI API error

### 2. POST /api/publish
Purpose: Save generated image to database

Request Body:
```
{ "imageUrl": "string (required, non-empty)", "prompt": "string (required)" }
```

Success Response (201):
```
{ "id": 1, "imageUrl": "https://...", "prompt": "a cute corgi puppy", "hearts": 0, "createdAt": "2026-01-10T10:30:00.000Z" }
```

Error Responses:
- 400: Missing or invalid fields
- 500: Database error

### 3. GET /api/feed
Purpose: Retrieve paginated feed of published images

Query Parameters:
- page: integer (default: 1, min: 1)
- limit: integer (default: 10, max: 50)

Success Response (200):
```
{ "images": [ /* array */ ], "total": 25, "page": 1, "totalPages": 3 }
```

Error Responses:
- 400: Invalid pagination parameters
- 500: Database error

### 4. PUT /api/feed
Purpose: Update hearts count for an image

Request Body:
```
{ "id": number, "hearts": number }
```

Success Response (200): Updated object

Error Responses:
- 400: Missing or invalid fields
- 404: Image not found
- 500: Database error
