export default async (request, context) => {
  const response = await context.next();
  const contentType = response.headers.get('content-type') || '';

  // Nur HTML-Seiten verarbeiten, keine Bilder/CSS/JS/Fonts
  if (!contentType.includes('text/html')) return response;

  let html = await response.text();

  // Partials parallel laden
  const base = new URL(request.url).origin;
  const [navbar, footer, modal] = await Promise.all([
    fetch(`${base}/navbar.html`).then(r => r.text()).catch(() => ''),
    fetch(`${base}/footer.html`).then(r => r.text()).catch(() => ''),
    fetch(`${base}/modal.html`).then(r => r.text()).catch(() => ''),
  ]);

  // Platzhalter ersetzen
  html = html.replace('<div id="nav-placeholder"></div>', navbar);
  html = html.replace('<div id="footer-placeholder"></div>', footer);
  html = html.replace('<div id="modal-placeholder"></div>', modal);

  return new Response(html, {
    status: response.status,
    headers: response.headers,
  });
};
