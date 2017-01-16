"use strict"
let express = require('express');
let app = express();
let mysql = require('mysql');
let fs = require('fs');
let path = process.argv[2];
let settings = JSON.parse(fs.readFileSync(path + '/settings/settings.json', 'utf8'));


let Process = require('./api/process');
Process = Process.Process;
app.get('/', (req, res) => {
	res.send('hello word');
});

app.get('/process/', (req, res) => {
	let p = new Process(settings);
	p.getProcess(undefined, (row, fields) => {
		console.log(row);
		console.log(fields);
	});
	res.send();
});
app.listen(8081);