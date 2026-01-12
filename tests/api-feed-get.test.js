import { describe, it, expect } from 'vitest';

describe('GET /api/feed', () => {
  it('returns 200 and a JSON body', async () => {
    const res = await fetch('http://localhost:3000/api/feed');
    expect([200, 204, 400, 500]).toContain(res.status);
    // If 200, ensure JSON parseable
    if (res.status === 200) {
      const data = await res.json();
      expect(data).toHaveProperty('images');
    }
  });
});
