# API Documentation

## Overview
This API provides endpoints for generating AI images, publishing them to a feed, and managing user interactions.

## Base URL
All endpoints are relative to: `https://your-domain.com/api`

## Endpoints

### 1. Generate Image
**POST** `/generate`

Generate an AI image using DALL·E 2.

#### Request Body
```json
{
  "prompt": "string (required, non-empty)"
}
```

Success Response (200)
```json
{
  "imageUrl": "https://...",
  "prompt": "the prompt used"
}
```

Error Responses
- 400 Bad Request: Missing or invalid prompt
- 401 Unauthorized: Invalid OpenAI API key
- 429 Too Many Requests: Rate limit exceeded
- 500 Internal Server Error: Server error

### 2. Publish Image
**POST** `/publish`

Publish a generated image to the community feed.

Request Body
```json
{
  "imageUrl": "string (required, valid URL)",
  "prompt": "string (required)"
}
```

Success Response (201 Created)
```json
{
  "id": 1,
  "imageUrl": "https://...",
  "prompt": "A beautiful sunset",
  "hearts": 0,
  "createdAt": "2024-01-01T12:00:00.000Z"
}
```

Error Responses
- 400 Bad Request: Missing or invalid fields
- 500 Internal Server Error: Database error

### 3. Get Feed
**GET** `/feed`

Retrieve paginated feed of published images.

Query Parameters
- `page` (optional, default: 1): Page number
- `limit` (optional, default: 10, max: 50): Items per page

Success Response (200)
```json
{
  "images": [ ... ],
  "total": 50,
  "page": 1,
  "limit": 10,
  "totalPages": 5
}
```

Error Responses
- 400 Bad Request: Invalid pagination parameters
- 500 Internal Server Error: Database error

### 4. Update Hearts
**PUT** `/feed`

Update the hearts (likes) count for an image.

Request Body
```json
{
  "id": "number (required, positive integer)",
  "hearts": "number (required, non-negative integer)"
}
```

Success Response (200)
```json
{
  "id": 1,
  "imageUrl": "https://...",
  "prompt": "A beautiful sunset",
  "hearts": 6,
  "createdAt": "2024-01-01T12:00:00.000Z"
}
```

Error Responses
- 400 Bad Request: Invalid ID or hearts value
- 404 Not Found: Image not found
- 500 Internal Server Error: Database error
