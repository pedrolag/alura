/** the "mergeParams" makes the route able to read the parent's "providerId" param */
const router = require('express').Router({ mergeParams: true })
const TableProducts = require('./TableProducts')
const Product = require('./Product')
const ProductSerializer = require('../../../Serializer').ProductSerializer

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

		response.send(
			JSON.stringify(product)
		)
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

		response.status(201)
		response.send(
			productSerializer.serialize(product)
		)
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

module.exports = router