import https from 'https'
import Readable from 'stream'
import {
	createReadStream
} from 'fs'
import {
	writeFile
} from 'fs/promises'

import csv from 'csv-parser'

export default class ApiCsvToJson {
	static apiUrl = ''
	static apiKey = ''
	static webRoot = ''
	static tempCsv = 'temp.csv'

	static async fetchApiData() {

		const options = {
			headers: {
				'Authorization': 'SSWS ' + this.apiKey
			}
		}
		let csvString = await this.asyncHttp(options)

		await writeFile(this.tempCsv, csvString).catch(error => {
			console.log('error writing file', error)
		})

		await this.parseCsv()
	}

	static async parseCsv(csvString) {

		return new Promise((resolve, reject) => {

			let csvRows = []
			createReadStream(this.tempCsv)
				.pipe(csv())
				.on('data', (data) => {
					csvRows.push(Object.values(data))
				})
				.on('end', async () => {

					await writeFile(this.webRoot + 'oin.json', JSON.stringify(csvRows)).catch(error => {
						console.log('error writing file', error)
					})
					await writeFile(this.webRoot + 'lastApiUpdate', (new Date().toLocaleString())).catch(error => {
						console.log('error writing file', error)
					})

					resolve()
				});
		})
	}

	static async asyncHttp(options) {
		return new Promise((resolve, reject) => {
			https.get(this.apiUrl, options, async httpRequest => {
				resolve(await this.getHttpClientBody(httpRequest))
			}).on('error', error => {
				console.log(error)
				reject(error)
			})
		})
	}

	static async getHttpClientBody(httpRequest) {
		const httpRequestBodyBuffer = []
		for await (const chunk of httpRequest) {
			httpRequestBodyBuffer.push(chunk)
		}
		return Buffer.concat(httpRequestBodyBuffer)
	}
}