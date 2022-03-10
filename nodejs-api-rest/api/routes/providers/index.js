const router = require('express').Router()
const TableProviders = require('./TableProviders')

router.use('/', async (request, response) => {
	const result = await TableProviders.list()

	response.send(
		JSON.stringify(result)
	)
})

module.exports = router