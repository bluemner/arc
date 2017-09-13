"use strict"
let mysql = require('mysql');
/**
 * @desc instance of process that handles all the database connects 
 */
class Base {
	constructor(settings) {
		this.settings = settings;
	}
	/**
	 * @desc open the database connect
	 * @abstract 
	 */
	open() {
		this.connection = mysql.createConnection({
			host: this.settings.database_host,
			port: this.settings.database_port,
			user: this.settings.database_username,
			password: this.settings.database_password,
			database: this.settings.database_name
		});
		this.connection.connect();
	}
	/**
	 * @desc close the database connect
	 * @abstract 
	 */
	close() {
		this.disconnect = this.connection.end();
	}
	/**
	 * @desc
	 * @un
	 */
	get() {
		throw "Not Implemented";
	}
	add() {
		throw "Not Implemented";
	}
	update() {
		throw "Not Implemented";
	}
	delete() {
		throw "Not Implemented";
	}
}
module.exports = {
	Base
}