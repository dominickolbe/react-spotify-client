const express = require('express');
const http = require('http');
const path = require('path');

const app = express();
const port = process.env.PORT || '3002';

app.set('port', port);
app.use(express.static(path.join(__dirname, 'build')));

app.get('/ping', (req, res) => res.send('pong'));
app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'build', 'index.html')));

const server = http.createServer(app);
server.listen(port, () => console.log(`Running on localhost:${port}`));
