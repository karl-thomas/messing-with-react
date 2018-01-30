module.exports = function renderHtmlTemplate(html, styles) {
  return `<!DOCTYPE html>
   <html lang="en">
    <head>
      <meta charset=utf-8>
      <meta name=description content="">
      <meta name=viewport content="width=device-width, initial-scale=1">
      <link rel="stylesheet" href="/public/style.css">
      <title>Automatic Blog</title>
      ${styles}
    </head>
    <body>
      <div id="app">${html}</div>
      <script src="/public/bundle.js"></script>
      <!-- Prompt a message in the browser if users disabled JS -->
      <noscript>Your browser does not support JavaScript!</noscript>
    </body>
  </html>`;
};
