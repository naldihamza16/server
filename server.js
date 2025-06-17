import http from 'http';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config(); // Load .env variables

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  // Get IP address (behind proxies, check x-forwarded-for header first)
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';

  // Get User-Agent header
  const userAgent = req.headers['user-agent'] || 'unknown';

  // Extract session from cookie header if exists
  let session = 'none';
  const cookieHeader = req.headers.cookie;
  if (cookieHeader) {
    const cookies = cookieHeader.split(';').map(c => c.trim());
    const sessionCookie = cookies.find(c => c.startsWith('session='));
    if (sessionCookie) {
      session = sessionCookie.split('=')[1];
    }
  }

  const logEntry = `${new Date().toISOString()} - URL: ${req.url} - IP: ${ip} - Browser: ${userAgent} - Session: ${session}\n`;

  fs.appendFile('log.txt', logEntry, (err) => {
    if (err) console.error('Error writing log:', err);
  });

  res.end('OK');
});

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});

