const router = require('express').Router()
const controller = require('./Provider.controller')

router.get('/', async (request, response) => {
	await controller.getAll(response)
})

router.post('/', (request, response) => {
	// await controller.getAll(response)
})

module.exports = router