var https = require('https');
var express = require('express');
var fs = require('fs');

// TODO(jhawley): Move this to correct file
var character_generator = require('./character_generator.js');

function main() {
  // Server init
  
  var options = {
    key: fs.readFileSync('certs/key.pem'),
    cert: fs.readFileSync('certs/cert.pem')
  };
  
  var port = 3000;
  
  var app = express();

  app.get('/json', (req, res) => {
    character_generator.loadInitialGeneratorState(req.query.characterId)
    .then(data => {
      res.writeHead(200, {'Content-Type': 'application/json'});
      res.end(JSON.stringify(data));
    })
    .catch(error => {
      // TODO(jhawley): Replace this with a better error
      console.log(error);
      res.writeHead(500);
      res.end('Fail!');
    });
  });

  // TODO(jhawley): remove this
  app.get('/jsonStatic', (req, res) => {
    fs.readFile('moreJson.txt', (err, data) => {
      res.writeHead(200, {'Content-Type': 'application/json'});
      res.end(data);
    });
  });
  
  // Static file servers
  
  app.use(express.static('pages'));
  app.use(express.static('style'));
  app.use(express.static('scripts'));
  app.use(express.static('scripts/components/compiled'));
  
  app.post('/login', (req, res) => {
    console.log('Got a response: ');
    // TODO(jhawley): Extract post request params?
    res.writeHead(200);
    res.end("Woohoo!");
  });
  
  var server = https.createServer(options, app)
      .listen(port);
}

main();
