const http = require('http');
const fs = require('fs');
const url = require('url');
const path = require('path');
const minimist = require('minimist');

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;
    const filePath = path.join(__dirname, pathname);

    if (pathname === '/registration') {
        // Serve registration.html
        fs.readFile(path.join(__dirname, 'registration.html'), 'utf8', (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal Server Error');
                return;
            }
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        });
    } else if (pathname === '/project') {
        // Serve project.html
        fs.readFile(path.join(__dirname, 'project.html'), 'utf8', (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal Server Error');
                return;
            }
            // Add a link to the registration page in project.html
            data = data.replace('</body>', '<a href="/registration">Registration</a></body>');
            
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        });
    } else {
        // Serve other static files (home.html, etc.)
        const extname = path.extname(filePath);
        const contentType = {
            '.html': 'text/html',
            '.css': 'text/css',
            '.js': 'text/javascript',
            '.png': 'image/png',
            '.jpg': 'image/jpg',
            '.gif': 'image/gif',
        }[extname] || 'application/octet-stream';

        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal Server Error');
                return;
            }

            res.writeHead(200, { 'Content-Type': contentType });
            res.end(data);
        });
    }
});

// Accept a port argument from the command line using minimist
const argv = minimist(process.argv.slice(2));
const port = argv.port || 3000; // Default port is 3000

server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
