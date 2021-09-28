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

var mysqlpool;

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
	initMySql();
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

function executeQuery(query,callback){

    mysqlpool.getConnection(function(error,connection){

        if (error) {
        	console.log(error);
        	callback(true);
        	return;
        }   
        connection.query(query,function(error,rows){

            connection.release();
            if(error) {
							console.log(error);
							callback(true);
							return;
            }  else{
                callback(null, {rows: rows});
            }         
        });
        connection.on('error', function(err) {      
              throw error;
              return;     
        });
    });
}

function initMySql(){
	mysqlpool = mysql.createPool({
	  connectionLimit : 10,
	  host            : process.env.DB_HOST,
	  user            : process.env.DB_USER,
	  password        : process.env.DB_PASS,
	  database        : process.env.DB_NAME
	});
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


async function crudCreate(request, response){
	const buffers = [];
	for await (const chunk of request) {
		buffers.push(chunk);
	}
	const requestData = Buffer.concat(buffers).toString();

	let input;
	try{
		input=JSON.parse(requestData);
	}catch(e){
		console.log(requestData);
		console.log(e);
		response.end(JSON.stringify({success:false, error:"invalid request data 1"}));
		return;
	}

	if(!input.hasOwnProperty('listName')){
		response.end(JSON.stringify({success:false, error:"invalid request data 2"}));
		return;
	}
	if(!input.hasOwnProperty('appList')){
		response.end(JSON.stringify({success:false, error:"invalid request data 3"}));
		return;
	}

	let listData = {
		listName: input.listName,
		listId: makeId(8),
		appList: JSON.stringify(input.appList),
		dateCreated: new Date(),
		dateModified: null
	};

	let insertQuery = mysql.format('INSERT INTO appList (listName,listId,appJson,dateCreated) values (?,?,?,CURRENT_TIMESTAMP()) ',[listData.listName, listData.listId, listData.appList] );
	executeQuery(insertQuery, function (error, results) {
		if (error){
			response.end(JSON.stringify({success:false, error:"database error"}));
			return;
		}
	});

	response.end(JSON.stringify({success:true, data:listData}));
}
async function crudRead(request, response){
	const buffers = [];
	for await (const chunk of request) {
		buffers.push(chunk);
	}
	const requestData = Buffer.concat(buffers).toString();

	let input;
	try{
		input=JSON.parse(requestData);
	}catch(e){
		response.end(JSON.stringify({success:false, error:"invalid request data"}));
		return;
	}

	if(!input.hasOwnProperty('listId') || input.listId.length !== 8 ){
		response.end(JSON.stringify({success:false, error:"invalid request data"}));
		return;
	}
	let selectQuery = mysql.format("select listId,listName,dateCreated,dateModified,appJson from appList where listId=?", [input.listId]);
	executeQuery(selectQuery,function (error, results) {
		if (error){
			response.end(JSON.stringify({success:false, error:"invalid request data"}));
			return;
		}
		if(results.rows.length < 1){
			response.end(JSON.stringify({success:false, error:"invalid request data"}));
			return;
		}
		console.log(results);
		response.end(JSON.stringify({success:true, data:results.rows[0]}));
	});

}
function crudUpdate(request, response){

}
function crudDelete(request, response){

}
const randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
const randomCharsLength = randomChars.length;
function makeId(length) {
	var result   = '';
	for ( var i = 0; i < length; i++ ) {
		result += randomChars.charAt(Math.floor(Math.random() * randomCharsLength));
	}
	return result;
}
  
process.on("SIGINT", function () {
	console.log("\nGracefully shutting down from SIGINT (Ctrl-C)");
	process.exit(-1);
});
