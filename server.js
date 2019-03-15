var express = require('express');
var app = express();
var request = require('request');

app.set('port', 3000);

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/getJoke', function(req, res) {
	var url = 'https://official-joke-api.appspot.com/jokes/random';
	request(url, function(err, response, body) {
		if(!err && response.statusCode < 400) {
			res.send(body);
		}
	});
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
