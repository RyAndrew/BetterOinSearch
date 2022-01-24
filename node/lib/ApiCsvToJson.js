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
	static tempCsv1 = 'temp1.csv'

	static part2ApiUrl = 'https://www.okta.com/oktaapi/integration/search?limit=100000'
	static tempCsv2 = 'temp2.csv'

	static config = {
		webRoot: '',
		part1ApiUrl: '',
		part1ApiKey: ''
	}

	static blankCapabilitiesObject = {}

	static accessColumns = [
		'SAML',
		'SWA',
		'Provisioning',
		'OIDC',
		'Workflows Compatible',
		'WS-Federation'
	]
	static provisioningColumns = [
		'Create',
		'Update',
		'Deactivate',
		'Sync Password',
		'Group Push',
		'Group Linking',
		'Attribute Sourcing',
		'Attribute Writeback',
		'Schema Discovery'
	]

	static async fetchAllApiData(){

		this.createBlankCapabilitiesObject()

		await this.fetchApiDataPart1()

		let dataPart1 = await this.parsePart1Csv()

		let dataPart2 = await this.fetchApiDataPart2()

		this.mergeData2IntoData1(dataPart1, dataPart2)

		let allDataArray = this.convertObjectToArray(dataPart1)

		await writeFile(this.config.webRoot + 'oin.json', JSON.stringify(allDataArray)).catch(error => {
			console.log('error writing file', error)
		})
		await writeFile(this.config.webRoot + 'lastApiUpdate', (new Date().toLocaleString('en-US',{timeZone:this.config.timeZone}))).catch(error => {
			console.log('error writing file', error)
		})
	}
	static convertObjectToArray(objectData){

		let output = []
		for (const item in objectData) {
			output.push(Object.values(objectData[item]))
		}

		return output
	}
	static mergeData2IntoData1(data1, data2){
		//let found = []
		//let missing = []
		for (const item in data1) {
			let name = data1[item].DisplayName.trim()

			//does the data1 name exist in data2?
			if(data2[name]){
				data1[item] = Object.assign(data1[item], data2[name].capabilities)
				data1[item].path = data2[name].path
				//found.push(data1[item])
			}else{
				data1[item] = Object.assign(data1[item], this.blankCapabilitiesObject)
				data1[item].path = ''
				//missing.push(data1[item])
			}
		}
		//console.log(`found=${found.length} missing=${missing.length}`)
	}
	static async fetchApiDataPart1() {

		const options = {
			headers: {
				'Authorization': 'SSWS ' + this.config.part1ApiKey
			}
		}
		let csvString = await this.asyncHttp(this.config.part1ApiUrl, options)

		await writeFile(this.tempCsv1, csvString).catch(error => {
			console.log('error writing file', error)
		})

		return csvString
	}

	static async fetchApiDataPart2() {

		let apiDataJsonString = await this.asyncHttp(this.part2ApiUrl, {})

		await writeFile(this.tempCsv2, apiDataJsonString).catch(error => {
			console.log('error writing file', error)
		})

		let apiData
		try {
			apiData = JSON.parse(apiDataJsonString)
		} catch (error) {
			console.error("api part 2 returned invalid json")
			throw error
		}
		apiData = apiData.results

		let uniqueAccess = {}
		let uniqueProvisioning = {}

		//create hash mapped by integration name
		let apiDataHash = {}
		Object.values(apiData).forEach(app => {

			//standardize format of capabilities for later merging
			app.capabilities = this.processCapabilitiesCommaSeparate(app)

			apiDataHash[app.integration] = app
		})

		return apiDataHash
	}
	static processCapabilitiesCommaSeparate(app){

		/////////////
		// 1. process access property
		let access = app.access.split(",").map(element => {
			return element.trim()
		})

		let accessHash = {}
		for(let i in access){
			if(access[i] == ''){ 
				continue
			}
			accessHash[access[i]] = true
		}

		/////////////
		// 2. process provisioning property
		let provisioning = app.provisioning.split(",").map(element => {
			return element.trim()
		})
		let provisioningHash = {}
		for(let i in provisioning){
			if(provisioning[i] == ''){ 
				continue
			}
			provisioningHash[provisioning[i]] = true
		}

		/////////////
		// 3. combine results
		let allCapabilities = {}
		this.accessColumns.forEach(attr => {
			allCapabilities['access-'+attr] = accessHash[attr] ? 1 : 0
		})
		this.provisioningColumns.forEach(attr => {
			allCapabilities['provisioning-'+attr] = provisioningHash[attr] ? 1 : 0
		})


		return allCapabilities
	}
	static async parsePart1Csv() {

		return new Promise((resolve, reject) => {

			let csvRows = {}
			createReadStream(this.tempCsv1)
				.pipe(csv())
				.on('data', (data) => {
					csvRows[data.DisplayName.trim()] = data
				})
				.on('end', async () => {
					resolve(csvRows)
				})
		})
	}

	static createBlankCapabilitiesObject(){

		this.accessColumns.forEach(attr => {
			this.blankCapabilitiesObject['access-'+attr] = 0
		})
		this.provisioningColumns.forEach(attr => {
			this.blankCapabilitiesObject['provisioning-'+attr] = 0
		})

	}

	static async asyncHttp(url, options) {
		return new Promise((resolve, reject) => {
			https.get(url, options, async httpRequest => {
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