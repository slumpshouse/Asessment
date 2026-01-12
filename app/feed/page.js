'use client';

import { useState, useEffect } from 'react';

export default function FeedPage() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [updatingHearts, setUpdatingHearts] = useState({});

  const fetchFeed = async (pageNum = 1) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/feed?page=${pageNum}&limit=12`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch feed');
      }

      setImages(data.images);
      setTotalPages(data.totalPages);
      setPage(data.page);
      setError('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleHeartClick = async (imageId, currentHearts) => {
    setUpdatingHearts(prev => ({ ...prev, [imageId]: true }));
    
    try {
      const newHearts = currentHearts + 1;
      const response = await fetch('/api/feed', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: imageId, hearts: newHearts }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to update hearts');

      setImages(prevImages => prevImages.map(img => img.id === imageId ? { ...img, hearts: newHearts } : img));
    } catch (err) {
      setError(err.message);
    } finally {
      setUpdatingHearts(prev => ({ ...prev, [imageId]: false }));
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  useEffect(() => { fetchFeed(); }, []);

  return (
    <div className="min-h-screen p-6" style={{background:'#000'}}>
      <div className="container-tight flex gap-6">
        <div style={{flex:1}}>
          <header className="mb-6 flex items-center justify-between">
            <h1 className="text-2xl font-semibold username">Community Feed</h1>
            <a href="/" className="btn-blue">Generate</a>
          </header>

        {error && (<div className="mb-4 p-3 card-flat"><p className="text-red-400">Error: {error}</p></div>)}

        {loading ? (
          <div className="flex justify-center items-center h-48"><div className="text-center"><div className="animate-spin text-3xl mb-4">⟳</div><p className="muted">Loading...</p></div></div>
        ) : images.length === 0 ? (
          <div className="text-center py-12 card"><div className="text-6xl mb-4">📷</div><h3 className="text-xl username mb-2">No images yet</h3><p className="muted mb-4">Be the first to generate and publish an image!</p><a href="/" className="btn-blue">Create Your First Image</a></div>
        ) : (
          <>
            <div>
              {images.map((image) => (
                <article key={image.id} className="post card">
                  <div className="post-header flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="story-ring"><div className="story-inner"><img src="/profile-placeholder.png" alt="profile" className="profile-pic"/></div></div>
                      <div>
                          <div className="username">ai_creator</div>
                          <div className="muted">{formatDate(image.createdAt)}</div>
                      </div>
                    </div>
                  </div>

                  <div className="post-media"><img src={image.imageUrl} alt={image.prompt} /></div>

                  <div className="post-body">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <button onClick={() => handleHeartClick(image.id, image.hearts)} disabled={updatingHearts[image.id]} className="icon-btn" aria-label="Like">
                          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 21s-7-4.35-9.5-7.02C-0.3 10.78 2.5 5 6.6 5c1.97 0 3.39 1.01 4.4 2.09C11.99 6.01 13.41 5 15.38 5 19.5 5 22.3 10.78 21.5 13.98 19 16.65 12 21 12 21z" stroke="#e6e6e6" strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        </button>
                        <button className="icon-btn" aria-label="Comment">
                          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="#e6e6e6" strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        </button>
                        <button className="icon-btn" aria-label="Send">
                          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M22 2L11 13" stroke="#e6e6e6" strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round"/><path d="M22 2l-7 20 1-7 7-7-7-6z" stroke="#e6e6e6" strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        </button>
                      </div>
                      <div>
                        <button className="icon-btn" aria-label="Save">
                          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M6 2h12v20l-6-4-6 4V2z" stroke="#e6e6e6" strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        </button>
                      </div>
                    </div>

                    <div className="mt-3">
                      <div className="caption"><span className="username">ai_creator</span> <span className="caption-text">{image.prompt}</span></div>
                      <div className="likes-count">{image.hearts} likes</div>
                      <div className="view-comments">View all comments</div>
                    </div>

                    <div className="post-divider" />

                    <div className="post-footer comment-area">
                      <div className="comment-row">
                        <button className="comment-emoji" aria-label="Emoji">
                          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10" stroke="#9a9a9a" strokeWidth="1.2" fill="none"/><path d="M8 14s1.5 2 4 2 4-2 4-2" stroke="#9a9a9a" strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round"/><path d="M9 9h.01M15 9h.01" stroke="#9a9a9a" strokeWidth="1.2"/></svg>
                        </button>
                        <input className="input-compact" placeholder="Add a comment..." />
                        <button className="post-btn">Post</button>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="flex justify-center gap-4 mt-6">
              <button onClick={() => fetchFeed(page - 1)} disabled={page <= 1 || loading} className="px-4 py-2 border border-gray-800 muted">← Prev</button>
              <div className="flex items-center px-4"><span className="muted">Page {page} of {totalPages}</span></div>
              <button onClick={() => fetchFeed(page + 1)} disabled={page >= totalPages || loading} className="btn-blue">Next →</button>
            </div>
          </>
        )}
        </div>

        <aside className="sidebar sticky-sidebar" style={{width:300}}>
          <div className="card-flat p-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="story-ring"><div className="story-inner"><img src="/profile-placeholder.png" className="profile-pic"/></div></div>
              <div>
                <div className="username">you_user</div>
                <div className="muted">Your profile</div>
              </div>
            </div>
          </div>

          <div className="card-flat p-4 mb-4">
            <div className="username mb-2">Suggestions For You</div>
            <div className="muted">See more people to follow</div>
          </div>

          <div className="muted text-sm mt-6">© Links · About · Help</div>
        </aside>
      </div>
    </div>
  );
}
