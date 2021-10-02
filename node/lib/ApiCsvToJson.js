import https from 'https'

export default class ApiCsvToJson {
	apiUrl = ''
	apiKey = ''

	static async fetchApiData() {

		const options = {
			headers: {
				'Authorization': 'SSWS ' + this.apiKey
			}
		}
		return await this.asyncHttp(options)
	}

	static async asyncHttp(options) {
		return new Promise((resolve, reject) => {
			https.get(this.apiUrl, options, async httpRequest => {
				resolve(await this.getHttpClientBody(httpRequest))
			}).on('error', error => {
				reject(error)
			});
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
