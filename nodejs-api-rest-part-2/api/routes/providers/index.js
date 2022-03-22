const router = require('express').Router()
const TableProviders = require('./TableProviders')
const Provider = require('./Provider')
const ProviderSerializer = require('../../Serializer').ProviderSerializer
const ProductsRouter = require('./products')

router.get('/', async (request, response) => {
	const result = await TableProviders.findAll()
	
	response.status(200)

	const providerSerializer = new ProviderSerializer(
		response.getHeader('Content-Type')
	)

	response.send(
		providerSerializer.serialize(result)
	)
})

router.get('/:providerId', async (request, response, next) => {
	try {
		const providerId = request.params.providerId
		const provider = new Provider({ providerId: providerId })

		await provider.findOne()

		response.status(200)
		
		const providerSerializer = new ProviderSerializer(
			response.getHeader('Content-Type'),
			['email', 'createdAt', 'updatedAt', 'version']
		)
	
		response.send(
			providerSerializer.serialize(provider)
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

		const providerSerializer = new ProviderSerializer(
			response.getHeader('Content-Type')
		)
	
		response.send(
			providerSerializer.serialize(provider)
		)
	} catch (error) {
		next(error)
	}
})

router.put('/:providerId', async (request, response, next) => {
	try {
		const providerId = request.params.providerId
		const body = request.body
		const data = Object.assign(
			{},
			body,
			{ providerId: providerId }
		)
		const provider = new Provider(data)
	
		await provider.update()
	
		response.status(204)
		response.end()
	} catch (error) {
		next(error)
	}
})

router.delete('/:providerId', async (request, response, next) => {
	try {
		const providerId = request.params.providerId
		const provider = new Provider({ providerId: providerId })
	
		await provider.findOne()
	
		await provider.destroy()
	
		response.status(204)
		response.end()
	} catch (error) {
		next(error)
	}
})

const validateProviderId = async (request, response, next) => {
	try {
		const providerId = request.params.providerId
		const provider = new Provider({ id: providerId })

		await provider.findOne()

		request.provider = provider

		next()
	} catch (error) {
		next(error)
	}
}

router.use('/:providerId/products', validateProviderId, ProductsRouter)

module.exports = router