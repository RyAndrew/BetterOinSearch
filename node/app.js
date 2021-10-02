"use strict";

let config = {
	httpPort: 8080,
	webRoot: './webroot/'
}

import mysql from 'mysql2/promise'
import http from 'http'
import { parse } from 'url'

import StaticFileServer from './lib/StaticFileServer.js'
StaticFileServer.webRoot = config.webRoot

import ApiCsvToJson from './lib/ApiCsvToJson.js'
ApiCsvToJson.apiUrl = process.env.API_URL
ApiCsvToJson.apiKey = process.env.API_KEY

let mysqlpool

log('Starting Server!')
console.log(process.cwd())
initHttpServer()
initMySql()

function initMySql() {
	mysqlpool = mysql.createPool({
		connectionLimit: 10,
		queueLimit: 25,
		waitForConnections: true,
		host: process.env.DB_HOST,
		user: process.env.DB_USER,
		password: process.env.DB_PASS,
		database: process.env.DB_NAME
	})
}
async function updateOinData(httpRequest, httpResponse){
	
	let data = await ApiCsvToJson.fetchApiData().catch(error => {
		httpResponse.end('API Error!' + error)
		return
	})
	httpResponse.end(data);
}
function initHttpServer() {

	const httpServer = http.createServer( async (httpRequest, httpResponse) => {

		const parsedUrl = parse(httpRequest.url)

		switch (parsedUrl.pathname) {
			case '/create':
				crudCreate(httpRequest, httpResponse)
				return
			case '/read':
				crudRead(httpRequest, httpResponse)
				return
			case '/update':
				crudUpdate(httpRequest, httpResponse)
				return
			case '/delete':
				crudDelete(httpRequest, httpResponse)
				return
			case '/updateOinData':
				updateOinData(httpRequest, httpResponse)
				return
		}

		await StaticFileServer.serveFile(httpRequest, httpResponse, parsedUrl).catch(error =>{
			throw new RequestEndedException(error)
		})

	})

	httpServer.listen(config.httpPort).on('error', function() {
		log(`Fatal Error! Failed to listen on port ${config.httpPort}. Is something else using it?`)
		process.exit(1)
	})
}


async function crudCreate(httpRequest, httpResponse) {
	let input = await requestBodyJson(httpRequest, httpResponse)

	if (!input.hasOwnProperty('listName') || !input.hasOwnProperty('appList')) {
		return outputJsonError(httpResponse, "invalid request data")
	}

	let listData = {
		listName: input.listName,
		listId: makeId(),
		appList: JSON.stringify(input.appList),
		dateCreated: new Date(),
		dateModified: null
	};

	const results = await executeQuery(
		'INSERT INTO appList (listName,listId,appList,dateCreated) values (?,?,?,CURRENT_TIMESTAMP()) ', [listData.listName, listData.listId, listData.appList], httpResponse
	);

	outputJson(httpResponse, {
		success: true,
		data: listData
	});
}
async function crudRead(httpRequest, httpResponse) {

	let input = await requestBodyJson(httpRequest, httpResponse)

	if (!input.hasOwnProperty('list') || input.list.length !== 8) {
		return outputJsonError(httpResponse, "invalid request data")
	}

	const [rows, fields] = await executeQuery(
		"select listId,listName,dateCreated,dateModified,appList from appList where listId=?", [input.list], httpResponse
	)

	if (rows.length < 1) {
		return outputJson(httpResponse, {
			success: true,
			data: null
		})
	}
	outputJson(httpResponse, {
		success: true,
		data: rows[0]
	})

}

function crudUpdate(httpRequest, httpResponse) {

}
async function crudDelete(httpRequest, httpResponse) {
	let input = await requestBodyJson(httpRequest, httpResponse)

	if (!input.hasOwnProperty('list') || input.list.length !== 8) {
		return outputJsonError(httpResponse, "invalid request data")
	}
	await executeQuery(
		"delete from appList where listId=?", [input.list], httpResponse
	)

	outputJson(httpResponse, {
		success: true
	})
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
		outputJsonError(httpResponse, "invalid request data")
		throw new RequestEndedException(error)
	}

	return parsed
}

async function executeQuery(query, params, httpResponse) {

	try {
		const connection = await mysqlpool.getConnection()

		return await connection.execute(query, params)
	} catch (error) {
		outputJsonError(httpResponse, "database error")
		throw new RequestEndedException(error)
	}
}

const randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
const randomCharsLength = randomChars.length

function makeId() {
	const idLength = 8
	let result = ''
	for (let i = 0; i < idLength; i++) {
		result += randomChars.charAt(Math.floor(Math.random() * randomCharsLength))
	}
	return result
}

function outputJsonError(httpResponse, errorString) {
	httpResponse.statusCode = 500
	outputJson(httpResponse, {
		success: false,
		error: errorString
	})
}

function outputJson(httpResponse, responseJson) {
	httpResponse.end(JSON.stringify(responseJson))
}

function log(...allArgs) {
	allArgs.forEach(i => {
		console.log(i)
	});
}

class RequestEndedException extends Error {}

function errorHandler(error) {
	if (error instanceof RequestEndedException) {
		log('error but its nbd', error)
	} else {
		log('fatal unhandled error', error)
		process.exit(1)
	}
}
process.on('unhandledRejection', errorHandler)
process.on('uncaughtException', errorHandler)

process.on("SIGINT", function() {
	log("\nGracefully shutting down from SIGINT (Ctrl-C)")
	process.exit(-1)
})