"use strict"
let express = require('express');
let app = express();

app.get('/', (req, res) => {
	res.send('hello word');
});

app.listen(8081);