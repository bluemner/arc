"use strict"
let mysql = require('mysql');
let Base = require('./base');
Base = Base.Base;

/**
 * @desc instance of state that handels all the database connects 
 * @extends Base
 */
class State extends Base {
	constructor(settings) {
		super(settings);
	}

	/**
	 * Get an instance of type state
	 * @param {INT} id - state id 
	 * @param {function} after - lambda promise function (results, fields)
	 * @override 
	 */
	get(id, after) {
		id = Number.parseInt(id);
		this.open();
		if (id) {
			let _query = "Select * From State AS P WHERE P.id ==" + id + ";"
			this.connection.query(_query, function (error, results, fields) {
				if (error) {
					console.log(error);
					throw error
				};
				after(results, fields);
			});

		} else {
			let _query = "Select * From State"
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
	 * Add an instance of state to the database
	 * @param {object} state - state to add to the database
	 * @param {function} after - lambda promise function (results, fields)
	 * @override
	 */
	add(state, after) {
		if (!state) {
			throw "Bad Request";
		}
		this.open();
		let _query = "INSERT State SET name = ?,process = ?,owner = ?,created = ?,completed = ?,active = ?";
		let _values = [state.name, state.process, state.owner, state.created, state.completed, state.active];
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
	 * Delete an instance of type state from database
	 * @param {INT} id - state id 
	 * @param {function} after - lambda promise function (results, fields)
	 * @override
	 */
	delete(id, after) {
		if (!id) {
			throw "Bad Request";
		}
	}

	/**
	 * Update an instance of state to the database
	 * @param {object} state - state to add to the database
	 * @param {function} after - lambda promise function (results, fields)
	 * @override
	 */
	update(state, after) {
		if (!state) {
			throw "Bad Request";
		}

		let _query = "UPDATE State SET name = ?,process = ?,owner = ?,created = ?,completed = ?,active = ? WHERE id=" + state.id + ";"
		let _values = [state.name, state.process, state.owner, state.created, state.completed, state.active];
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
	State
}