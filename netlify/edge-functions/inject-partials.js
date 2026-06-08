export default async (request, context) => {
  const url = new URL(request.url);

  // Partials selbst NICHT verarbeiten — verhindert Endlosschleife
  const excluded = ['/navbar.html', '/footer.html', '/modal.html'];
  if (excluded.includes(url.pathname)) return context.next();

  const response = await context.next();
  const contentType = response.headers.get('content-type') || '';

  // Nur HTML-Seiten verarbeiten
  if (!contentType.includes('text/html')) return response;

  let html = await response.text();

  // Partials mit absolutem internem URL laden
  // context.next() wird NICHT aufgerufen für diese Requests — kein Loop
  const base = url.origin;
  const [navbar, footer, modal] = await Promise.all([
    fetch(new Request(`${base}/navbar.html`), { headers: { 'x-skip-edge': '1' } }).then(r => r.text()).catch(() => ''),
    fetch(new Request(`${base}/footer.html`), { headers: { 'x-skip-edge': '1' } }).then(r => r.text()).catch(() => ''),
    fetch(new Request(`${base}/modal.html`), { headers: { 'x-skip-edge': '1' } }).then(r => r.text()).catch(() => ''),
  ]);

  html = html.replace('<div id="nav-placeholder"></div>', navbar);
  html = html.replace('<div id="footer-placeholder"></div>', footer);
  html = html.replace('<div id="modal-placeholder"></div>', modal);

  return new Response(html, {
    status: response.status,
    headers: response.headers,
  });
};
