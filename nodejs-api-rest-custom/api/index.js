const express = require('express')
const bodyParser = require('body-parser')
const config = require('config')
const router = require('./routes/router.routes')

// Creates the App
const app = express()

app.use(bodyParser.json())

// Routes
app.use('/api/provider', router.providers)

// Executes the App
app.listen(
	config.get('api.port'),
	() => console.log(`Running at http://localhost:${config.get('api.port')}`)
)