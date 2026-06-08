export default async (request, context) => {
  const response = await context.next();
  const contentType = response.headers.get('content-type') || '';

  // Nur HTML-Seiten verarbeiten, keine Bilder/CSS/JS
  if (!contentType.includes('text/html')) return response;

  let html = await response.text();

  // Partials laden
  const base = new URL(request.url).origin;
  const [navbar, footer, modal] = await Promise.all([
    fetch(`${base}/navbar.html`).then(r => r.text()),
    fetch(`${base}/footer.html`).then(r => r.text()),
    fetch(`${base}/modal.html`).then(r => r.text()),
  ]);

  // Platzhalter ersetzen
  html = html.replace('<div id="nav-placeholder"></div>', navbar);
  html = html.replace('<div id="footer-placeholder"></div>', footer);
  html = html.replace('<div id="modal-placeholder"></div>', modal);

  return new Response(html, response);
};
