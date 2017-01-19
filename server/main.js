"use strict"
let express = require('express');
let app = express();
let mysql = require('mysql');
let fs = require('fs');
let bodyParser = require('body-parser');

let path = process.argv[2];

let settings = JSON.parse(fs.readFileSync(path + '/settings/settings.json', 'utf8'));


let Process = require('./api/process');
Process = Process.Process;
let State = require('./api/state');
State = State.State;

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
	extended: true
}));

/**
 * @desc Get Global
 */
app.get('/', (req, res) => {
	res.send('hello word');
});

//Process

/**
 * @desc Get Process
 */
app.get('/api/process/', (req, res) => {
	let _entity = new Process(settings);
	_entity.get(req.params.id, (row, fields) => {
		res.send(row);
	});

});

app.put('/api/process/', (req, res) => {
	let _entity = new Process(settings);
	_entity.update(req.params.id, (row, fields) => {
		res.send(row);
	});

});

app.post('/api/process/', (req, res) => {
	let _entity = new Process(settings);
	if (!req.body) {
		res.send("error");
	}
	_entity.add(req.body, (row, fields) => {
		req.body.id = row.insertId;
		res.send(req.body);
	});

});

app.delete('/api/process/', (req, res) => {
	let _entity = new Process(settings);

	_entity.delete(req.params.id, (row, fields) => {
		res.send(req.body);
	});

});



/**
 * @desc Get State
 */
app.get('/api/state/', (req, res) => {
	let _entity = new State(settings);
	_entity.get(req.params.id, (row, fields) => {
		res.send(row);
	});

});

app.put('/api/state/', (req, res) => {
	let _entity = new State(settings);
	_entity.update(req.params.id, (row, fields) => {
		res.send(row);
	});

});

app.post('/api/state/', (req, res) => {
	let _entity = new State(settings);
	if (!req.body) {
		res.send("error");
	}
	_entity.add(req.body, (row, fields) => {
		req.body.id = row.insertId;
		res.send(req.body);
	});

});

app.delete('/api/state/', (req, res) => {
	let _entity = new State(settings);

	_entity.delete(req.params.id, (row, fields) => {
		res.send(req.body);
	});

});

app.delete
app.listen(settings.api_port);