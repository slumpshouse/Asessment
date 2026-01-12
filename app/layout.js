import './globals.css'

export const metadata = {
  title: 'Generative Instagram with AI',
  description: 'Generate AI images with DALL·E 2 and share them with the community',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header className="site-header w-full">
          <div className="container-tight flex items-center justify-between" style={{height:60}}>
            <div className="flex items-center gap-3">
              <div style={{width:36,height:36,background:'#fff',borderRadius:4}} />
              <div className="text-white font-semibold">Generative IG</div>
            </div>
            <nav className="flex items-center gap-3" aria-label="Main navigation">
              <button className="icon-btn" aria-label="Home">🏠</button>
              <button className="icon-btn" aria-label="Create">➕</button>
            </nav>

            <div className="corner-icons" aria-hidden="false">
              <button className="corner-btn" aria-label="Home small">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 10.5L12 4l9 6.5" stroke="#e6e6e6" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/><path d="M5 21V11.5h14V21" stroke="#e6e6e6" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
              <button className="corner-btn" aria-label="Create small">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="3" width="18" height="18" rx="3" stroke="#e6e6e6" strokeWidth="1.6"/><path d="M12 8v8M8 12h8" stroke="#e6e6e6" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
            </div>
          </div>
        </header>
        <main>{children}</main>
        {/* footer removed per request */}
      </body>
    </html>
  )
}
