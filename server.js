// require express module
var express = require('express'),
	app = express();

// parse incoming data from body object and populate req.body
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
	extended: true
}));
	var recaptcha = require('express-recaptcha');
	var keys = require('./env.js');
	recaptcha.init('YOUR_PUBLIC_KEY', keys.recaptchaKey);

app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

var db = require('./models');

//load public folder
app.use(express.static('public'));

//HTML endpoints

app.get('/', function homepage(req, res) {
	res.sendFile(__dirname + '/views/index.html');
});

// GET index of all switts
app.get('/api/switts', function(req, res) {
	db.Switt.find({}, function(err, switts) {
		if (err) {
			res.send(404);
			return;
		}
		var limit = Math.floor(req.query.limit);
		var dateQuery = (req.query.date);
		if ((limit !== undefined) && (limit >= 1)) {
			var limitedJson = [];
			for (var i = 0; i < limit; i++) {
				limitedJson.push(switts[i]);
			}
			res.json(limitedJson);
			return;
		}
		res.json(switts);
	});
});

//shows one switt by ID
app.get('/api/switts/:id', function(req, res) {
	db.Switt.findById(req.params.id, function(err, switt) {
		if (err) {
			res.sendStatus(404);
		}
		res.json(switt);
	});
});

//checks reCAPTCHA and if successful posts new Switt
app.post('/api/switts', function(req, res) {
  recaptcha.verify(req, function(error){
    if(!error) {
			var newSwitt = new db.Switt({
				name: req.body.name,
				super_power: req.body.super_power,
			});
			newSwitt.save(function(err, savedSwitt) {
				if (err) {
					res.sendStatus(404);
				}
				res.json(savedSwitt);
			});
		}
    else {
			console.log("Captcha failure");
		}
	});
});

// DELETE switt based on ID parameter
app.delete('/api/switts/:id', function(req, res) {
	var swittId = req.params.id;
	db.Switt.findOneAndRemove({
		_id: swittId
	}, function(err, deletedEntry) {
		if (err) {
			res.sendStatus(404);
		}
		res.json(deletedEntry);
	});
});

// PUT switt based on ID parameter
app.put('/api/switts/:id/', function(req, res) {
	db.Switt.findById(req.params.id, function(err, swittToBeChanged) {
		if (err) {
			res.sendStatus(404);
		}
		swittToBeChanged.name = req.body.name;
		swittToBeChanged.super_power = req.body.super_power;
		swittToBeChanged.save(function(err, updateSwitt) {
			if (err) {
				res.sendStatus(404);
			}
			res.json(updateSwitt);
		});
	});
});

// server listens on port 3000
app.listen(process.env.PORT || 3000, function() {
	console.log('Express server is up and running on http://localhost:3000/');
});
