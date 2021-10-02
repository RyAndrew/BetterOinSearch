import {
	fileURLToPath
} from 'url'
import {
	access,
	stat,
	readFile
} from 'fs/promises'
import path from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default class StaticFileServer {
	webRoot = ''

	// maps file extention to MIME types
	static mimeTypes = {
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

	static async serveFile(httpRequest, httpResponse, parsedUrl) {

		const sanitizePath = path.normalize(parsedUrl.pathname).replace(/^(\.\.[\/\\])+/, '')
		let pathname = path.join(this.webRoot, sanitizePath)

		await access(pathname).catch(error => {
			httpResponse.statusCode = 404
			httpResponse.end('File not found')
			throw new Error(error)
		})

		let fileStat = await stat(pathname).catch(error => {
			httpResponse.statusCode = 500
			httpResponse.end('Error reading file')
			throw new Error(error)
		})
		if (fileStat.isDirectory()) {
			pathname += '/index.html'
		}

		const fileContents = await readFile(pathname).catch(error => {
			httpResponse.statusCode = 500
			httpResponse.end('Error reading file')
			throw new Error(error)
		})

		const ext = path.parse(pathname).ext
		httpResponse.setHeader('Content-type', this.mimeTypes[ext] || 'text/plain')
		httpResponse.end(fileContents)
	}
}