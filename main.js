// TODO(jhawley): Name variables consistently somehow :(
var https = require('https');
var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser');

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

  app.post('/saveCharacter', bodyParser.json(), (req, res) => {
    character_generator.saveGeneratorState(req.body.characterId,
                                           req.body.characterInfo,
                                           req.body.purchasedHeaders, 
                                           req.body.purchasedSkills)
    .then(success => {
      if (success) {
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({success: true}));
      } else {
        res.writeHead(500, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({success: false}));
      }
    })
    .catch(error => {
      console.log(error);
      res.writeHead(500, {'Content-Type': 'application/json'});
      res.end(JSON.stringify({success: false, unexpected: true}));
    });
  }); 
  
  app.post('/login', (req, res) => {
    // TODO(jhawley): Extract post request params?
    res.writeHead(200);
    res.end("Woohoo!");
  });
  
  var server = https.createServer(options, app)
      .listen(port);
}

main();
