export const metadata = {
  title: 'Generative Instagram with AI',
  description: 'Generate AI images with DALL·E 2 and share them with the world',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header style={{ padding: '16px', borderBottom: '1px solid #eee' }}>
          <h1>Generative Instagram with AI</h1>
          <nav>
            <a href="/">Generate</a> | <a href="/feed">Feed</a>
          </nav>
        </header>
        <main style={{ padding: '24px' }}>
          {children}
        </main>
        <footer style={{ padding: '16px', borderTop: '1px solid #eee' }}>
          <p>Demonstrating TS.3.3 (ORM Configuration) & TS.3.4 (API Architecture)</p>
        </footer>
      </body>
    </html>
  );
}
