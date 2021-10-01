"use strict";

let config = {
	httpPort:8080,
	webRoot:'webroot/'
}

const mysql = require('mysql2/promise')
const http = require('http')
const net = require('net')
const url = require('url')
const fs = require('fs')
const path = require('path')

let mysqlpool

log('Starting Server!')
initHttpServer()
initMySql()

function initMySql(){
	mysqlpool = mysql.createPool({
		connectionLimit:10,
		queueLimit:25,
		waitForConnections:true,
		host:process.env.DB_HOST,
		user:process.env.DB_USER,
		password:process.env.DB_PASS,
		database:process.env.DB_NAME
	})
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
	}

	const httpServer = http.createServer(function(httpRequest, httpResponse) {

		const parsedUrl = url.parse(httpRequest.url)
		
		switch(parsedUrl.pathname){
			case '/create': crudCreate(httpRequest, httpResponse) 
				return
			case '/read': crudRead(httpRequest, httpResponse) 
				return
			case '/update': crudUpdate(httpRequest, httpResponse) 
				return
			case '/delete': crudDelete(httpRequest, httpResponse) 
				return
		}

		//static file server stuff:
		const sanitizePath = path.normalize(parsedUrl.pathname).replace(/^(\.\.[\/\\])+/, '')
		let pathname = path.join(__dirname, config.webRoot, sanitizePath)

		fs.exists(pathname, function (exist) {
			if (!exist) {
				// if the file is not found, return 404
				log('404 not found!')
				httpResponse.statusCode = 404
				httpResponse.end(`File ${pathname} not found!`)
				return
			}

			// if is a directory, then look for index.html
			if (fs.statSync(pathname).isDirectory()) {
				pathname += '/index.html'
			}

			// read file from file system
			fs.readFile(pathname, function (err, data) {
				if (err) {
					log('500 file exists but cant read!')
					httpResponse.statusCode = 500
					httpResponse.end(`Error getting the file: ${err}.`)
				} else {
					// based on the URL path, extract the file extention. e.g. .js, .doc, ...
					const ext = path.parse(pathname).ext
					// if the file is found, set Content-type and send data
					httpResponse.setHeader('Content-type', mimeType[ext] || 'text/plain')
					httpResponse.end(data)
				}
			})
		})
	})

	httpServer.listen(config.httpPort).on('error',function(){
		log(`Fatal Error! Failed to listen on port ${config.httpPort}. Is something else using it?`)
		process.exit(1)
	})
}


async function crudCreate(httpRequest, httpResponse){
	let input = await requestBodyJson(httpRequest, httpResponse)

	if(!input.hasOwnProperty('listName') || !input.hasOwnProperty('appList')){
		return outputJsonError(httpResponse,"invalid request data")
	}

	let listData = {
		listName: input.listName,
		listId: makeId(),
		appList: JSON.stringify(input.appList),
		dateCreated: new Date(),
		dateModified: null
	};
	
	const results = await executeQuery(
		'INSERT INTO appList (listName,listId,appList,dateCreated) values (?,?,?,CURRENT_TIMESTAMP()) '
		,[listData.listName, listData.listId, listData.appList]
		,httpResponse
	);

	outputJson(httpResponse,{success:true, data:listData});
}
async function crudRead(httpRequest, httpResponse){

	let input = await requestBodyJson(httpRequest, httpResponse)

	if(!input.hasOwnProperty('list') || input.list.length !== 8 ){
		return outputJsonError(httpResponse,"invalid request data")
	}

	const results = await executeQuery(
		"select listId,listName,dateCreated,dateModified,appList from appList where listId=?"
		,[input.list]
		,httpResponse
	)

	if(results.rows.length < 1){
		return outputJson(httpResponse,{success:true, data:null})
	}
	outputJson(httpResponse,{success:true, data:results.rows[0]})

}
function crudUpdate(httpRequest, httpResponse){

}
async function crudDelete(httpRequest, httphttpResponse){
	let input = await requestBodyJson(httpRequest, httpResponse)

	if(!input.hasOwnProperty('list') || input.list.length !== 8 ){
		return outputJsonError(httpResponse,"invalid request data")
	}
	let [error, results] = await executeQuery(
		"delete from appList where listId=?"
		,[input.list]
		,httpResponse
	)

	outputJson(httpResponse,{success:true})
}

//read entire request body helper
async function requestBodyJson(httpRequest, httpResponse) {
	const httpRequestBodyBuffer = []
	for await (const chunk of httpRequest) {
		httpRequestBodyBuffer.push(chunk)
	}
	const requestData = Buffer.concat(httpRequestBodyBuffer).toString()

	let parsed
	try {
		parsed = JSON.parse(requestData)
	} catch (error) {
		return outputJsonError(httpResponse,"invalid request data")
		throw new RequestEndedException(error)
	}

	return parsed
}

async function executeQuery(query, params, httpResponse){

	try {
		const connection = await mysqlpool.getConnection()

		return await connection.query(query, params)
	} catch (error) {
		outputJsonError(httpResponse, "database error")
		throw new RequestEndedException(error)
	}
}

const randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
const randomCharsLength = randomChars.length
function makeId() {
	const idLength = 8
	let result   = ''
	for ( let i = 0; i < idLength; i++ ) {
		result += randomChars.charAt(Math.floor(Math.random() * randomCharsLength))
	}
	return result
}

function outputJsonError(httpResponse, errorString){
	httpResponse.statusCode = 500
	outputJson(httpResponse, {success:false, error:errorString})
}

function outputJson(httpResponse, responseJson){
	httpResponse.end(JSON.stringify(responseJson))
}

function log(...allArgs){
	allArgs.forEach(i => {console.log(i)});
}

class RequestEndedException extends Error {}

function errorHandler(error){
	if(error instanceof RequestEndedException){
		log('error but its nbd', error)
	}else{
		log('fatal unhandled error', error)
		process.exit(1)
	}
}
process.on('unhandledRejection', errorHandler)
process.on('uncaughtException', errorHandler)

process.on("SIGINT", function () {
	log("\nGracefully shutting down from SIGINT (Ctrl-C)")
	process.exit(-1)
})
