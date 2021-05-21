export default (src: string) => `
  <!DOCTYPE HTML>
  <html lang="eng">
    <head>
      <meta charset="utf-8">
      <title>Exercise - Family</title>
    </head>
    <body bgcolor="101010">
      <div id="root"></div>
      ${src}
    </body>
  </html>
`