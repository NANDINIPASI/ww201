const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const argv = require('minimist')(process.argv.slice(2));

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;

  if (pathname === '/home.html') {
    const homePath = path.join(__dirname, 'home.html');
    serveFile(res, homePath);
  } else if (pathname === '/project.html') {
    const projectPath = path.join(__dirname, 'project.html');
    serveFile(res, projectPath);
  } else if (pathname === '/registration.html') {
    const registrationPath = path.join(__dirname, 'registration.html');
    serveFile(res, registrationPath);
  } else if (pathname === '/favicon.ico') {
    // Ignore requests for favicon.ico
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

function serveFile(res, filePath) {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error(`Error reading file at path: ${filePath}`);
      console.error(err);  // Log the detailed error
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Internal Server Error');
    } else {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(data);
    }
  });
}

const port = argv.port || 5000;

server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
