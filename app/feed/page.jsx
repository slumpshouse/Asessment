'use client';

import { useState, useEffect } from 'react';

export default function FeedPage() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchFeed = async (pageNum = 1) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/feed?page=${pageNum}&limit=10`);
      const data = await res.json();
      if (!res.ok) {
        setError(data?.error || 'Failed to fetch feed');
      } else {
        if (pageNum === 1) {
          setImages(data.images || []);
        } else {
          setImages((prev) => [...prev, ...(data.images || [])]);
        }
        setPage(data.page || pageNum);
        setTotalPages(data.totalPages || 1);
      }
    } catch (err) {
      setError(String(err));
    } finally {
      setLoading(false);
    }
  };

  const updateHearts = async (imageId, newHearts) => {
    // optimistic update
    const previous = images.slice();
    setImages((imgs) => imgs.map(i => i.id === imageId ? { ...i, hearts: newHearts } : i));
    try {
      const res = await fetch('/api/feed', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: imageId, hearts: newHearts })
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data?.error || 'Failed to update hearts');
        setImages(previous);
      }
    } catch (err) {
      setError(String(err));
      setImages(previous);
    }
  };

  useEffect(() => {
    fetchFeed(1);
  }, []);

  const loadMore = () => {
    if (page < totalPages) {
      const nextPage = page + 1;
      fetchFeed(nextPage);
      setPage(nextPage);
    }
  };

  return (
    <div>
      <h2>Image Feed</h2>
      {error && <div style={{ color: 'red' }}>Error: {error}</div>}
      {loading && <div>Loading feed...</div>}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
        {images.map((image) => (
          <div key={image.id} style={{ border: '1px solid #ccc', padding: '10px' }}>
            <img src={image.imageUrl} alt={image.prompt} style={{ width: '100%', height: 'auto' }} />
            <p><strong>Prompt:</strong> {image.prompt}</p>
            <p><strong>Hearts:</strong> {image.hearts}</p>
            <p><strong>Created:</strong> {new Date(image.createdAt).toLocaleDateString()}</p>
            <button onClick={() => updateHearts(image.id, image.hearts + 1)} style={{ color: 'red', fontSize: '20px' }}>
              ♥ Like ({image.hearts})
            </button>
          </div>
        ))}
      </div>

      {!loading && images.length > 0 && (
        <div>
          <p>Page {page} of {totalPages}</p>
          {page < totalPages && (
            <button onClick={loadMore} disabled={loading}>{loading ? 'Loading...' : 'Load More'}</button>
          )}
          {page >= totalPages && images.length > 0 && <p>No more images to load</p>}
        </div>
      )}

      {!loading && images.length === 0 && (
        <div>
          <p>No images in the feed yet. Generate some images first!</p>
          <a href="/">Go to Generate Page</a>
        </div>
      )}
    </div>
  );
}
