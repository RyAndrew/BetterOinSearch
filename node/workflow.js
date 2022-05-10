"use strict";

import https from 'https'
import {
	createReadStream
} from 'fs'
import {
	writeFile
} from 'fs/promises'


async function asyncHttp(url, options) {
    return new Promise((resolve, reject) => {
        https.get(url, options, async httpRequest => {
            resolve(await getHttpClientBody(httpRequest))
        }).on('error', error => {
            console.log(error)
            reject(error)
        })
    })
}

async function getHttpClientBody(httpRequest) {
    const httpRequestBodyBuffer = []
    for await (const chunk of httpRequest) {
        httpRequestBodyBuffer.push(chunk)
    }
    return Buffer.concat(httpRequestBodyBuffer)
}

function parseJson(jsonString){
    let parsedData
    try {
        parsedData = JSON.parse(jsonString)
    } catch (error) {
        console.error("invalid json!")
        throw error
    }
    return parsedData
}

async function writeFileOrThrowError(fileName,contents){
    await writeFile(fileName, contents).catch(error => {
        console.log('error writing file named '+fileName, error)
        throw error
    })
}

let config = {
    subdomain: process.env.TENANT,
    authToken: process.env.AUTH_TOKEN
}

config.httpOptions = {
    headers:{
        cookie:'auth_token='+config.authToken
    }
}
async function readTemplates(config){
    let url = `https://${config.subdomain}.workflows.okta.com/app/api/catalog/api/v1/catalog/workflows?query=&limit=200`
    let workflowTemplatesText = await asyncHttp(url)
    console.log(''+workflowTemplatesText)
    
    writeFileOrThrowError('workflow-templates.json', workflowTemplatesText)
}
async function readChannels(config){
    let url = `https://${config.subdomain}.workflows.okta.com/app/api/search/channels?channelKind=channel&methodKind=event&dev=false`

    let workflowChannelsText = await asyncHttp(url,config.httpOptions)
    console.log(''+workflowChannelsText)
    
    writeFileOrThrowError('workflow-channels.json', workflowChannelsText)
    
    let workflowChannels = parseJson(workflowChannelsText)
    
    let output = {}
    for(const el of workflowChannels){
        console.log(el.name)
        
        let channelObj = Object.assign({}, el)

        channelObj.events = await readEvents(config, el.name)
        channelObj.actions = await readActions(config, el.name)

        output[el.name] = channelObj
    }

    writeFileOrThrowError('workflow-all.json', JSON.stringify(output,null,4))
}
async function readEvents(config, channel){
    console.log('reading events for channel '+channel)
    let url = `https://${config.subdomain}.workflows.okta.com/app/api/search/methods?query=&channel=${channel}&methodKind=event&dev=false&sortBy=alpha`
    let eventsText = await asyncHttp(url, config.httpOptions)
    //console.log(''+eventsText)
    //console.log('')
    return parseJson(eventsText)
}
async function readActions(config, channel){
    console.log('reading actions for channel '+channel)
    let url = `https://${config.subdomain}.workflows.okta.com/app/api/search/methods?query=&channel=${channel}&methodKind=action&dev=false&sortBy=alpha`
    let actionsText = await asyncHttp(url, config.httpOptions)
    //console.log(''+actionsText)
    //console.log('')
    return parseJson(actionsText)
}

await readTemplates(config)
await readChannels(config)

