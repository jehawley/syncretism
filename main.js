var https = require('https');
var express = require('express');
var fs = require('fs');

var options = {
  key: fs.readFileSync('certs/key.pem'),
  cert: fs.readFileSync('certs/cert.pem')
};

var port = 3000;

var app = express();

// Static file servers
// TODO(jhawley): Make these truly static

app.get('/json', (req, res) => {
  fs.readFile('moreJson.txt', (err, data) => {
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(data);
  });
});

app.use(express.static('pages'));
app.use(express.static('style'));
app.use(express.static('components/compiled'));

var server = https.createServer(options, app)
    .listen(port);
