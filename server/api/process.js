"use strict"
let mysql = require('mysql');
let Base = require('./base');
Base = Base.Base;

/**
 * @desc instance of process that handles all the database connects 
 * @extends Base
 */
class Process extends Base {
	constructor(settings) {
		super(settings);
	}

	/**
	 * Get an instance of type process
	 * @param {INT} id - process id 
	 * @param {function} after - lambda promise function (results, fields)
	 * @override 
	 */
	get(id, after) {
		id = Number.parseInt(id);
		this.open();
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
			let _query = "Select * From Process"
			this.connection.query(_query, function (error, results, fields) {
				if (error) {
					console.log(error);
					throw error
				};
				after(results, fields);
			});
		}
		this.close();
	}

	/**
	 * Add an instance of process to the database
	 * @param {object} process - process to add to the database
	 * @param {function} after - lambda promise function (results, fields)
	 * @override 
	 */
	add(process, after) {
		if (!process) {
			throw "Bad Request";
		}
		this.open();
		let _query = "INSERT Process SET name = ?,current_state = ?,owner = ?,created = ?,completed = ?,active = ?";
		let _values = [process.name, process.current_state, process.owner, process.created, process.completed, process.active];
		this.connection.query(_query, _values, function (error, results, fields) {
			if (error) {
				console.log(error);

				throw error
			};
			after(results, fields);

		});
		this.close();
	}
	/**
	 * Delete an instance of type process from database
	 * @param {INT} id - process id 
	 * @param {function} after - lambda promise function (results, fields)
	 * @override 
	 */
	delete(id, after) {
		if (!id) {
			throw "Bad Request";
		}

	}

	/**
	 * Update an instance of process to the database
	 * @param {object} process - process to add to the database
	 * @param {function} after - lambda promise function (results, fields)
	 * @override
	 */
	update(process, after) {
		if (!process) {
			throw "Bad Request";
		}

		let _query = "UPDATE Process SET name = ?,current_state = ?,owner = ?,created = ?,completed = ?,active = ? WHERE id=" + process.id + ";"
		let _values = [process.name, process.current_state, process.owner, process.created, process.completed, process.active];
		this.connection.query(_query, _values, function (error, results, fields) {
			if (error) {
				console.log(error);
				throw error
			};
			after(results, fields);
		});
	}
};
module.exports = {
	Process
}