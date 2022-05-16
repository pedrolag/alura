/** the "mergeParams" makes the route able to read the parent's "providerId" param */
const router = require('express').Router({ mergeParams: true })
const TableProducts = require('./TableProducts')
const Product = require('./Product')
const ProductSerializer = require('../../../Serializer').ProductSerializer

router.options('/', (request, response) => {
	response.set('Access-Control-Allow-Methods', 'GET, POST')
	response.set('Access-Control-Allow-Headers', 'Content-Type')
	response.status(204)
	response.end()
})

router.options('/:id', (request, response) => {
	response.set('Access-Control-Allow-Methods', 'HEAD, GET, PUT, DELETE')
	response.set('Access-Control-Allow-Headers', 'Content-Type')
	response.status(204)
	response.end()
})

router.options('/:providerId/decrement-from-inventory', (request, response) => {
	response.set('Access-Control-Allow-Methods', 'POST')
	response.set('Access-Control-Allow-Headers', 'Content-Type')
	response.status(204)
	response.end()
})

router.get('/', async (request, response, next) => {
	const result = await TableProducts.findAll(request.provider.id)
	const productSerializer = new ProductSerializer(
		response.getHeader('Content-Type')
	)
	response.send(
		productSerializer.serialize(result)
	)
})

router.get('/:id', async (request, response, next) => {
	try {

		const data = {
			id: request.params.id,
			providerId: request.provider.id
		}

		const product = new Product(data)

		await product.findOne()

		const productSerializer = new ProductSerializer(
			response.getHeader('Content-Type'),
			[
				'price',
				'inventory',
				'providerId',
				'createdAt',
				'updatedAt',
				'version'
			]
		)

		const timestamp = (new Date(product.updatedAt)).getTime()

		response.set('ETag', product.version)
		response.set('Last-Modified', timestamp)
		
		response.send(
			JSON.stringify(product)
		)
	} catch (error) {
		next(error)
	}
})

router.head('/:id', async (request, response, next) => {
	try {
		const data = {
			id: request.params.id,
			providerId: request.provider.id
		}

		const product = new Product(data)

		await product.findOne()

		const timestamp = (new Date(product.updatedAt)).getTime()

		response.set('ETag', product.version)
		response.set('Last-Modified', timestamp)

		response.status(200)
		response.end()
	} catch (error) {
		next(error)
	}
})

router.post('/', async (request, response, next) => {
	try {
		const providerId = request.provider.id
		const body = request.body
		const data = Object.assign(
			{},
			body,
			{ providerId: providerId }
		)
		const product = new Product(data)

		await product.create(data)

		const productSerializer = new ProductSerializer(
			response.getHeader('Content-Type')
		)

		const timestamp = (new Date(product.updatedAt)).getTime()

		response.set('ETag', product.version)
		response.set('Last-Modified', timestamp)
		response.set('Location', `/api/providers/${product.providerId}/products/${product.id}`)

		response.status(201)
		response.send(
			productSerializer.serialize(product)
		)
	} catch (error) {
		next(error)
	}
})

router.put('/:id', async (request, response, next) => {
	try {
		const data = Object.assign(
			{},
			request.body,
			{
				id: request.params.id,
				providerId: request.provider.id
			}
		)

		const product = new Product(data)

		await product.update()
		await product.findOne()

		const timestamp = (new Date(product.updatedAt)).getTime()

		response.set('ETag', product.version)
		response.set('Last-Modified', timestamp)
		response.set('Location', `/api/providers/${product.providerId}/products/${product.id}`)

		response.status(204)
		response.end()
	} catch (error) {
		next(error)
	}
})

router.delete('/:id', async (request, response, next) => {
	const data = {
		id: request.params.id,
		providerId: request.provider.id
	}

	const product = new Product(data)

	await product.destroy()

	response.status(204)
	response.end()
})

router.post('/:id/decrement-from-inventory', async (request, response, next) => {
	try {
		const product = new Product({
			id: request.params.id,
			providerId: request.provider.id
		})
	
		// Checks if the product exists
		await product.findOne()

		// Decrements quantity from inventory
		product.inventory -= request.body.quantity
		await product.decrementFromInventory()

		// Updates the state
		await product.findOne()

		const timestamp = (new Date(product.updatedAt)).getTime()

		// Increments headers
		response.set('ETag', product.version)
		response.set('Last-Modified', timestamp)
		response.set('Location', `/api/providers/${product.providerId}/products/${product.id}`)

		// Returns response
		response.status(204)
		response.end()
	} catch (error) {
		next(error)
	}
})

module.exports = router