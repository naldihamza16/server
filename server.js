import http from 'http';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config(); // Load .env variables

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  const log = `${new Date().toISOString()} - ${req.url}\n`;
  fs.appendFile('log.txt', log, (err) => {
    if (err) console.error('Error writing log:', err);
  });
  res.end('OK');
});

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});


