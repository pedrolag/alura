const router = require('express').Router()

router.get('/', (request, response, next) => {
	response.send(
		JSON.stringify([])
	)
})

module.exports