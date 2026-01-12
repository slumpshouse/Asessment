import { describe, it, expect } from 'vitest';

describe('PUT /api/feed', () => {
  it('returns 400 for invalid payload', async () => {
    const res = await fetch('http://localhost:3000/api/feed', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({}),
    });
    expect(res.status).toBe(400);
  });
});
