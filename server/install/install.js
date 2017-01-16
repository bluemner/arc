"use strict";
let mysql = require('mysql');
console.log("                                                                ");
console.log("       /\\                                                              ");
console.log("      /  \\    _ __  ___                                                ");
console.log("     / /\\ \\  | '__|/ __|                                               ");
console.log("    / ____ \\ | |  | (__                                                ");
console.log("   /_/    \\_\\|_|   \\___|                                               ");
console.log("    ____         _                                                     ");
console.log("   |  _ \\       | |                                                    ");
console.log("   | |_) |  ___ | |_  __ _   ___  ___   _ __  ___     ___   _ __  __ _ ");
console.log("   |  _ <  / _ \\| __|/ _` | / __|/ _ \\ | '__|/ _ \\   / _ \\ | '__|/ _` |");
console.log("   | |_) ||  __/| |_| (_| || (__| (_) || |  |  __/ _| (_) || |  | (_| |");
console.log("   |____/  \\___| \\__|\\__,_| \\___|\\___/ |_|   \\___|(_)\\___/ |_|   \\__, |");
console.log("                                                                  __/ |");
console.log("                                                                 |___/");

console.log("Database Install script....");
console.log("Creating Tables in database with config file:./settings/settings.config");
//TODO: Implement Crypto
let fs = require('fs');
let settings = JSON.parse(fs.readFileSync('../../settings/settings.json', 'utf8'));


var connection = mysql.createConnection({
	host: settings.database_host,
	port: settings.database_port,
	user: settings.database_username,
	password: settings.database_password,
	database: settings.database_name
});

connection.connect();

let sql_install = fs.readFileSync('./sql/create_process.sql', 'utf8')
console.log(sql_install);
connection.query(sql_install, function (error, results, fields) {
	if (error) {
		console.log(error);
		throw error
	};
	console.log('The solution is: ', results[0].solution);
});

sql_install = fs.readFileSync('./sql/create_state.sql', 'utf8');
console.log(sql_install);
connection.query(sql_install, function (error, results, fields) {
	if (error) {
		console.log(error);
		throw error
	};
	console.log('The solution is: ', results[0].solution);
});

sql_install = fs.readFileSync('./sql/create_task.sql', 'utf8');
console.log(sql_install);
connection.query(sql_install, function (error, results, fields) {
	if (error) {
		console.log(error);
		throw error
	};
	console.log('The solution is: ', results[0].solution);
});