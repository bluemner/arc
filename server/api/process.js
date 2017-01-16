"use strict"
let mysql = require('mysql');
/**
 * @desc instance of process that handels all the database connects 
 */
class Process {
	constructor(settings) {
		this.settings = settings;

		this.connection = mysql.createConnection({
			host: settings.database_host,
			port: settings.database_port,
			user: settings.database_username,
			password: settings.database_password,
			database: settings.database_name
		});
		this.connect = this.connection.connect();
	}

	/**
	 * Get an instance of type process
	 * @param {INT} id - process id 
	 * @param {function} after - lambda promiss function (results, fields)
	 */
	getProcess(id, after) {
		id = Number.parseInt(id);
		if (id) {
			let _query = "Select * From Process AS P WHERE P.id ==" + id + ";"
			this.connection.query(_query, function (error, results, fields) {
				if (error) {
					console.log(error);
					throw error
				};
				after(results, fields);
			});

		} else {
			let _query = "Select * From Process;"
			this.connection.query(_query, function (error, results, fields) {
				if (error) {
					console.log(error);
					throw error
				};
				after(results, fields);
			});
		}
	}

	/**
	 * Add an instance of process to the database
	 * @param {object} process - process to add to the database
	 * @param {function} after - lambda promiss function (results, fields)
	 */
	addProcess(process, after) {
		if (!process) {
			throw "Bad Request";
		}

		let _query = "INSERT INTO Process SET ?"
		this.connection.query(_query, process, function (error, results, fields) {
			if (error) {
				console.log(error);
				throw error
			};
			after(results, fields);
		});
	}


	/**
	 * Delete an instance of type process from database
	 * @param {INT} id - process id 
	 * @param {function} after - lambda promiss function (results, fields)
	 */
	deleteProcess(id, after) {
		if (!id) {
			throw "Bad Request";
		}

	}

	/**
	 * Update an instance of process to the database
	 * @param {object} process - process to add to the database
	 * @param {function} after - lambda promiss function (results, fields)
	 */
	updateProcess(process, after) {
		if (!process) {
			throw "Bad Request";
		}
	}
};
module.exports = {
	Process
}