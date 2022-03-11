const express = require('express')
const bodyPaser = require('body-parser')
const config = require('config')
const router = require('./routes/providers')
const NotFound = require('./errors/NotFound')
const Invalid = require('./errors/Invalid')
const NotProvided = require('./errors/NotProvided')
const InvalidContentType = require('./errors/InvalidContentType')
const validContentTypes = require('./Serializer').validContentTypes
const ErrorSerializer = require('./Serializer').ErrorSerializer

const app = express()

app.use(bodyPaser.json())

app.use((request, response, next) => {
	let contentType = request.header('Accept')

	/** Converts the default type to json */
	if (contentType === '*/*') {
		contentType = 'application/json'
	}

	/** Checks if the requested type is valid */
	if (validContentTypes.indexOf(contentType) === -1) {
		response.status(406)
		response.end()
		return
	}

	/** Sets the response's content type */
	response.setHeader('Content-Type', contentType)
	next()
})

app.use('/api/providers', router)

app.use((error, request, response, next) => {
	if (error instanceof NotFound) {
		response.status(404)
	} 
	
	if (error instanceof Invalid || error instanceof NotProvided) {
		response.status(400)
	}

	if (error instanceof InvalidContentType) {
		response.status(406)
	} 

	const errorSerializer = new ErrorSerializer(
		response.getHeader('Content-Type')
	)
	response.send(
		errorSerializer.serialize({
			message: error.message,
			id: error.id
		})
	)
})

app.listen(
	config.get('api.port'),
	console.log(`Running app at http://localhost:${config.get('api.port')}`)
)