const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const argv = require('minimist')(process.argv.slice(2)); // Use minimist to parse command line arguments

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;

  // Define the routes
  if (pathname === '/home') {
    // Serve home.html
    const homePath = path.join(__dirname, 'home.html');
    fs.readFile(homePath, 'utf8', (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
      }
    });
  } else if (pathname === '/project') {
    // Serve project.html
    const projectPath = path.join(__dirname, 'project.html');
    fs.readFile(projectPath, 'utf8', (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
      }
    });
  } else if (pathname === '/registration') {
    // Serve registration.html
    const registrationPath = path.join(__dirname, 'registration.html');
    fs.readFile(registrationPath, 'utf8', (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
      }
    });
  } else {
    // Handle unknown routes with a 404 response
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

// Use the supplied port number or default to 3000
const port = argv.port || 3000;
server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
