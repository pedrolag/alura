const router = require('express').Router()
const TableProviders = require('./TableProviders')
const Provider = require('./Provider')

router.get('/', async (request, response) => {
	const result = await TableProviders.findAll()

	response.status(200)
	response.send(
		JSON.stringify(result)
	)
})

router.get('/:id', async (request, response, next) => {
	try {
		const id = request.params.id
		const provider = new Provider({ id: id })

		await provider.findOne()

		response.status(200)
		response.send(
			JSON.stringify(provider)
		)
	} catch (error) {
		next(error)
	}
})

router.post('/', async (request, response, next) => {
	try {
		const body = request.body
		const provider = new Provider(body)
	
		await provider.create()
	
		response.status(201)
		response.send(
			JSON.stringify(provider)
		)
	} catch (error) {
		next(error)
	}
})

router.put('/:id', async (request, response, next) => {
	try {
		const id = request.params.id
		const body = request.body
		const data = Object.assign(
			{},
			body,
			{ id: id }
		)
		const provider = new Provider(data)
	
		await provider.update()
	
		response.status(204)
		response.end()
	} catch (error) {
		next(error)
	}
})

router.delete('/:id', async (request, response, next) => {
	try {
		const id = request.params.id
		const provider = new Provider({ id: id })
	
		await provider.findOne()
	
		await provider.destroy()
	
		response.status(204)
		response.end()
	} catch (error) {
		next(error)
	}
})

module.exports = router