const http = require('http');
const PORT = 3004;
const fs = require('fs');

const Server = http.createServer((req, res) => {
    let log = `${Math.floor(Math.random() * 100)}:${req.url}\n`;

    res.setHeader('Content-Type', 'text/html');

    fs.appendFile('response-handle.txt', log, (err) => {
        if (err) {
            console.log('Error appending log:', err);
        }
    });

    if (req.url === '/') {
        fs.readFile('index.html', 'utf-8', (err, data) => {
            if (err) {
                res.statusCode = 500;
                res.setHeader('Content-Type', 'text/plain');
                res.end('Server Error');
                return;
            }
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html');
            res.end(data);
        });

    } else if (req.url === '/about') {
        res.statusCode = 200;
        console.log(req.url);
        res.end('<h1>About Us</h1>');

    } else if (req.url === '/contact') {
        res.statusCode = 200;
        console.log(req.url);
        res.end('<h1>Contact Us</h1>');

    } else {
        res.statusCode = 404;
        console.log(req.url);
        res.end('<h1><mark>404 : </mark>Page  Is Not Found</h1>');
    }
});

Server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});