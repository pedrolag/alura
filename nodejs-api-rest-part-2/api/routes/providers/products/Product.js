const TableProducts = require('./TableProducts')

class Product {
	constructor({
		id,
		name,
		price,
		inventory,
		providerId,
		createdAt,
		updatedAt,
		version
	}) {
		this.id = id
		this.name = name
		this.price = price
		this.inventory = inventory
		this.providerId = providerId
		this.createdAt = createdAt
		this.updatedAt = updatedAt
		this.version = version
	}

	async findOne() {
		const result = await TableProducts.findOne(this.id, this.providerId)

		this.name = result.name
		this.price = result.price
		this.inventory = result.inventory
		this.createdAt = result.createdAt
		this.updatedAt = result.updatedAt
		this.version = result.version
	}

	async create() {
		this.validate()

		const result = await TableProducts.create({
			name: this.name,
			price: this.price,
			inventory: this.inventory,
			providerId: this.providerId
		});

		this.id = result.id
		this.createdAt = result.createdAt
		this.updatedAt = result.updatedAt
		this.version = result.version

		return result;
	}

	async update() {
		const validatedData = {}

		if (typeof this.name === 'string' && this.name.length > 0) {
			validatedData.name = this.name
		}

		if (typeof this.price === 'number' && this.price > 0) {
			validatedData.price = this.price
		}

		if (typeof this.inventory === 'number') {
			validatedData.inventory = this.inventory
		}

		if (Object.keys(validatedData).length === 0) {
			throw new Error('Data was not provided')
		}

		return TableProducts.update(
			{
				id: this.id,
				providerId: this.providerId,
			},
			validatedData
		)
	}

	destroy() {
		return TableProducts.destroy(this.id, this.providerId)
	}

	validate() {
		if (typeof this.name !== 'string' || this.name.length === 0) {
			throw new Error('Invalid field "name"')
		}

		if (typeof this.price !== 'number' || this.price.length === 0) {
			throw new Error('Invalid field "price"')
		}
	}
}

module.exports = Product