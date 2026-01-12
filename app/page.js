'use client';

import { useState } from 'react';

export default function HomePage() {
  const [prompt, setPrompt] = useState('');
  const [generatedImage, setGeneratedImage] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError('Please enter a prompt');
      return;
    }

    setIsGenerating(true);
    setError('');
    setSuccessMessage('');

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: prompt.trim() }),
      });

      // Safely handle non-JSON responses (e.g. HTML error pages)
      const contentType = response.headers.get('content-type') || '';
      let data;
      if (contentType.includes('application/json')) {
        data = await response.json();
      } else {
        const text = await response.text();
        // throw the raw text (server error HTML) for visibility in UI
        throw new Error(`Server returned non-JSON response (${response.status}): ${text.substring(0, 200)}`);
      }

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate image');
      }

      setGeneratedImage(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePublish = async () => {
    if (!generatedImage) return;

    setIsPublishing(true);
    setError('');
    setSuccessMessage('');

    try {
      const response = await fetch('/api/publish', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageUrl: generatedImage.imageUrl, prompt: generatedImage.prompt }),
      });

      const contentType = response.headers.get('content-type') || '';
      let data;
      if (contentType.includes('application/json')) {
        data = await response.json();
      } else {
        const text = await response.text();
        throw new Error(`Server returned non-JSON response (${response.status}): ${text.substring(0, 200)}`);
      }

      if (!response.ok) {
        throw new Error(data.error || 'Failed to publish image');
      }

      setSuccessMessage('Image published successfully!');
      setGeneratedImage(null);
      setPrompt('');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <div className="min-h-screen p-6" style={{background:'#000'}}>
      <div className="generate-modal">
        <header className="mb-6 text-center">
          <h1 className="text-3xl font-semibold username mb-1">Generative Instagram</h1>
          <p className="muted">Preview and publish AI-generated posts</p>
        </header>

        <main>
          <div className="mb-8">
            <label className="block text-lg font-semibold text-gray-800 mb-3">Enter your creative prompt:</label>
            <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder="Describe the image you want to generate... e.g., 'A cute cat astronaut in space'" className="w-full h-32 p-4 border-2 border-purple-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-300 focus:outline-none resize-none text-gray-700" />
          </div>

          <div className="flex justify-center mb-8">
            <button onClick={handleGenerate} disabled={isGenerating} className="btn-blue">
              {isGenerating ? (<><span className="animate-spin inline-block mr-3">⟳</span>Generating...</>) : ('Generate')}
            </button>
          </div>

          {error && (<div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl"><p className="text-red-700 font-medium">Error: {error}</p></div>)}

          {successMessage && (<div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl"><p className="text-green-700 font-medium">{successMessage}</p></div>)}

          {generatedImage && (
            <div className="mt-6 p-4 card-flat">
              <div className="flex gap-4">
                <div style={{flex:2}}>
                  <div className="post card">
                    <div className="post-header flex items-center gap-3 p-3">
                      <div className="story-ring"><div className="story-inner"><img src="/profile-placeholder.png" className="profile-pic"/></div></div>
                      <div>
                        <div className="username">you_user</div>
                        <div className="muted">Just now</div>
                      </div>
                    </div>
                    <div className="post-media"><img src={generatedImage.imageUrl} alt={generatedImage.prompt} /></div>
                    <div className="post-body">
                      <div><span className="username">you_user</span> <span className="muted">{generatedImage.prompt}</span></div>
                    </div>
                  </div>
                </div>
                <div style={{flex:1}}>
                  <div className="p-3 card-flat">
                    <h3 className="username mb-2">Prompt Used</h3>
                    <p className="muted">"{generatedImage.prompt}"</p>
                    <div className="mt-4">
                      <button onClick={handlePublish} disabled={isPublishing} className="btn-blue w-full">
                        {isPublishing ? (<><span className="animate-spin inline-block mr-2">⟳</span>Publishing...</>) : ('Publish')}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
      <div className="text-center mt-6"><a href="/feed" className="muted">View Community Feed →</a></div>
    </div>
  );
}
