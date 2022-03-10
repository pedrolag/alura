const express = require('express')
const bodyPaser = require('body-parser')
const config = require('config')
const router = require('./routes/providers')
const NotFound = require('./errors/NotFound')
const Invalid = require('./errors/Invalid')
const NotProvided = require('./errors/NotProvided')
const InvalidContentType = require('./errors/InvalidContentType')

const app = express()

app.use(bodyPaser.json())

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

	response.send(
		JSON.stringify({
			message: error.message,
			id: error.id
		})
	)
})

app.listen(
	config.get('api.port'),
	console.log(`Running app at http://localhost:${config.get('api.port')}`)
)