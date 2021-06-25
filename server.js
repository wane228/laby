const http = require('http');
const fs = require('fs/promises');

const PORT = process.env.PORT || 8000;
const listFiles = {
  list: [
    'test1.txt',
    'test2.txt',
  ],
};

const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');

  if (req.method === 'GET') {
    res.write(JSON.stringify(listFiles), (err) => {
      if (err) console.log(err);
    });
    res.end();
  }
  if (req.method === 'POST') {
    const data = [];
    req.on('data', (chunk) => {
      data.push(chunk);
    });
    req.on('end', async () => {
      const { filename } = JSON.parse(data.join(''));
      const value = await fs.readFile(filename, 'utf-8');
      res.write(JSON.stringify({ text: value }));
      res.end();
    });
  }
});

server.listen(PORT, 'localhost',  () => {
  console.log('Server started...');
});
