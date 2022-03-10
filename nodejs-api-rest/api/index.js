const express = require('express')
const bodyPaser = require('body-parser')
const config = require('config')
const router = require('./routes/providers')

const app = express()

app.use(bodyPaser.json())

app.use('/api/providers', router)

app.listen(
	config.get('api.port'),
	console.log(`Running app at http://localhost:${config.get('api.port')}`)
)