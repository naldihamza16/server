import http from 'http';
import fs from 'fs';

const server = http.createServer((req, res) => {
  const log = `${new Date().toISOString()} - ${req.url}\n`;
  fs.appendFile('log.txt', log, (err) => {
    if (err) console.error('Error writing log:', err);
  });
  res.end('OK');
});

server.listen(8080, () => {
  console.log("Listening on port 8080...");
});



