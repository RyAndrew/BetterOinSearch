"use strict";

const mysql = require('mysql');
const http = require('http');
const net = require('net');
const url = require('url');
const fs = require('fs');
const path = require('path');
const querystring = require('querystring');

const configFile = 'config.json';

var config = {};
var defaultConfigs = {
	httpPort:8080, //https://stackoverflow.com/a/23281401
	webRoot:'webroot/'
};

showBanner();
init();

function log(logLine){
	console.log(logLine);
}

function showBanner(){
  log('Starting Server!');
}

function init(){
	configRead();
	initHttpServer();
}

function configRead(){
	let configFileData;
	if (!fs.existsSync(configFile)) {
		config=defaultConfigs;
		log(`configs file ${configFile} doesn't exist, defaults loaded`);
		return;
	}
	try{
		configFileData = fs.readFileSync(configFile, 'utf8');//, function (err, data) {
	}catch(e){
		config=defaultConfigs;
		log(`read configs from ${configFile} - Error! Unable to read file! Check permissions! Defaults loaded`);
		return;
	}
	let configFileJson;
	try{
		configFileJson=JSON.parse(configFileData);
	}catch(e){
		config=defaultConfigs;
		log(`read configs from ${configFile} - Error! File contains invalid json! Defaults loaded`);
		console.log(`--------\r\nBad Config:${configFileData}\r\n--------`);
		return;
	}

	if(!configFileJson.hasOwnProperty('httpPort')){
		config=defaultConfigs;
		log(`read configs from ${configFile} - Error! Config missing httpPort, assuming bad! Defaults loaded`);
		console.log(`--------\r\nBad Config:${configFileData}\r\n--------`);
	}else{
		log(`read configs from ${configFile}`);
	}

	config = {
		...defaultConfigs,
		...configFileJson
	};
}

function initHttpServer(){

// maps file extention to MIME types
const mimeType = {
	'.ico': 'image/x-icon',
	'.html': 'text/html',
	'.js': 'text/javascript',
	'.json': 'application/json',
	'.css': 'text/css',
	'.png': 'image/png',
	'.jpg': 'image/jpeg',
	'.wav': 'audio/wav',
	'.mp3': 'audio/mpeg',
	'.svg': 'image/svg+xml',
	'.pdf': 'application/pdf',
	'.doc': 'application/msword',
	'.eot': 'appliaction/vnd.ms-fontobject',
	'.ttf': 'aplication/font-sfnt'
};

const httpServer = http.createServer(function(request, response) {

	const parsedUrl = url.parse(request.url);
	
	switch(parsedUrl.pathname){
		case '/create': crudCreate(request, response); return;
		case '/read': crudRead(request, response); return;
		case '/update': crudUpdate(request, response); return;
		case '/delete': crudDelete(request, response); return;
	}

	const sanitizePath = path.normalize(parsedUrl.pathname).replace(/^(\.\.[\/\\])+/, '');
	let pathname = path.join(__dirname, config.webRoot, sanitizePath);

	fs.exists(pathname, function (exist) {
		if (!exist) {
			// if the file is not found, return 404
			log('404 not found!');
			response.statusCode = 404;
			response.end(`File ${pathname} not found!`);
			return;
		}

		// if is a directory, then look for index.html
		if (fs.statSync(pathname).isDirectory()) {
			pathname += '/index.html';
		}

		// read file from file system
		fs.readFile(pathname, function (err, data) {
			if (err) {
				log('500 file exists but cant read!');
				response.statusCode = 500;
				response.end(`Error getting the file: ${err}.`);
			} else {
				// based on the URL path, extract the file extention. e.g. .js, .doc, ...
				const ext = path.parse(pathname).ext;
				// if the file is found, set Content-type and send data
				response.setHeader('Content-type', mimeType[ext] || 'text/plain');
				response.end(data);
			}
		});
	});
})

	httpServer.listen(config.httpPort).on('error',function(){
		console.error(`Fatal Error! Failed to listen on port ${config.httpPort}. Is something else using it?`);
		process.exit(1);
	})
}

const mysqlcon  = mysql.createPool({
  connectionLimit : 10,
  host            : process.env.DB_HOST,
  user            : process.env.DB_USER,
  password        : process.env.DB_PASS,
  database        : process.env.DB_NAME
});


function crudCreate(request, response){
	try{
			input=JSON.parse(request.body);
	}catch(e){
		response.end(JSON.stringify({success:false, error:"invalid request data"}));
		return;
	}

	if(!input.hasOwnProperty('name')){
		response.end(JSON.stringify({success:false, error:"invalid request data"}));
		return;
	}
	if(!input.hasOwnProperty('apps')){
		response.end(JSON.stringify({success:false, error:"invalid request data"}));
		return;
	}

	let listData = {
		listName: input.name,
		listId: makeId(8),
		apps: input.apps
	};
	let insertQuery = 'INSERT INTO appList (listName,listId,appJson,dateCreated) values (??,?,??,CURRENT_TIMESTAMP()) ';
	mysqlcon.query(insertQuery, [listData.listName, listData.listId, listData.apps] ,function (error, results, fields) {
		if (error){
			response.end(JSON.stringify({success:false, error:"invalid request data"}));
			return;
		}
	});

	response.end(JSON.stringify({success:true, data:listData}));
}
function crudRead(request, response){
	try{
			input=JSON.parse(request.body);
	}catch(e){
		response.end(JSON.stringify({success:false, error:"invalid request data"}));
		return;
	}

	if(!input.hasOwnProperty('listId') || input.listId.length !== 8 ){
		response.end(JSON.stringify({success:false, error:"invalid request data"}));
		return;
	}
	mysqlcon.query("select listId,listName,dateCreated,dateModified,appJson from appList where listId=??", [input.listId] ,function (error, results, fields) {
		if (error){
			response.end(JSON.stringify({success:false, error:"invalid request data"}));
			return;
		}
		if(results.length < 1){
			response.end(JSON.stringify({success:false, error:"invalid request data"}));
			return;
		}
		response.end(JSON.stringify({success:true, data:results[0]}));
	});

}
function crudUpdate(request, response){

}
function crudDelete(request, response){

}
const randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
const charactersLength = randomChars.length;
function makeId(length) {
	var result   = '';
	for ( var i = 0; i < length; i++ ) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return result;
}
  
process.on("SIGINT", function () {
	console.log("\nGracefully shutting down from SIGINT (Ctrl-C)");
	process.exit(-1);
});
