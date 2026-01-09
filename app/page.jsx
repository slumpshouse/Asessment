'use client';

import { useState } from 'react';

export default function GeneratePage() {
  const [prompt, setPrompt] = useState('');
  const [generatedImage, setGeneratedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [publishing, setPublishing] = useState(false);

  // Function to call POST /api/generate
  const handleGenerate = async () => {
    if (!prompt || !prompt.trim()) {
      setError('Prompt is required');
      return;
    }
    setError(null);
    setLoading(true);
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data?.error || 'Failed to generate image');
      } else {
        setGeneratedImage({ imageUrl: data.imageUrl, prompt: data.prompt });
      }
    } catch (err) {
      setError(String(err));
    } finally {
      setLoading(false);
    }
  };

  // Function to call POST /api/publish
  const handlePublish = async () => {
    if (!generatedImage) return;
    setPublishing(true);
    setError(null);
    try {
      const res = await fetch('/api/publish', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageUrl: generatedImage.imageUrl, prompt: generatedImage.prompt })
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data?.error || 'Failed to publish image');
      } else {
        alert('Published successfully');
      }
    } catch (err) {
      setError(String(err));
    } finally {
      setPublishing(false);
    }
  };

  return (
    <div>
      <h2>Generate AI Images</h2>
      <div>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe the image you want to generate..."
          rows={4}
          style={{ width: '100%' }}
        />
        <button
          onClick={handleGenerate}
          disabled={loading || !prompt.trim()}
          style={{ marginTop: '8px' }}
        >
          {loading ? 'Generating...' : 'Generate Image'}
        </button>
      </div>

      {error && <div style={{ color: 'red' }}>Error: {error}</div>}

      {generatedImage && (
        <div style={{ marginTop: '16px' }}>
          <h3>Generated Image</h3>
          <img
            src={generatedImage.imageUrl}
            alt={generatedImage.prompt}
            style={{ maxWidth: '512px', maxHeight: '512px' }}
          />
          <p>Prompt: {generatedImage.prompt}</p>
          <button onClick={handlePublish} disabled={publishing}>
            {publishing ? 'Publishing...' : 'Publish to Feed'}
          </button>
        </div>
      )}

      {loading && <div>Generating your image with DALL·E 2...</div>}
    </div>
  );
}
