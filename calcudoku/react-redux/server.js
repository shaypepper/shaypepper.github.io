const express = require('express');
const parser = require('body-parser');
// const cors = require('cors');
const path = require('path');

const React = require('react');
const ReactDOMServer = require('react-dom/server');

const app = express();

app.use(parser.json());
// app.use(cors());
app.use(express.static(__dirname));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './index.html'));
})

app.listen(3006);
console.log('Listening on port 3006');
