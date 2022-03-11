const TableProviders = require('./TableProviders')
const Invalid = require('../../errors/Invalid')
const NotProvided = require('../../errors/NotProvided')

class Provider {
	constructor({
		id,
		company,
		email,
		category,
		createdAt,
		updatedAt,
		version
	}) {
		this.id = id
		this.company = company
		this.email = email
		this.category = category
		this.createdAt = createdAt
		this.updatedAt = updatedAt
		this.version = version
	}

	async findOne() {
		/** Searches for the specific provider */
		const result = await TableProviders.findOne(this.id)

		/** Updates the state of the provider instance */
		this.company = result.company
		this.email = result.email
		this.category = result.category
		this.createdAt = result.createdAt
		this.updatedAt = result.updatedAt
		this.version = result.version
	}

	async create() {
		/** Validates the current instance's state */
		this.validate()

		/** Creates a new provider */
		const result = await TableProviders.create({
			company: this.company,
			email: this.email,
			category: this.category
		})

		/** Updates the state of the provider instance */
		this.id = result.id
		this.createdAt = result.createdAt
		this.updatedAt = result.updatedAt
		this.version = result.version
	}

	async update() {
		/** Checks if provider exists */
		await TableProviders.findOne(this.id)

		/** Fields that have to be cheked */
		const fields = [
			'company',
			'email',
			'category'
		]

		/** Data that will be used to update */
		const data = {}

		/** Validates and aplies the data into the update object */
		fields.forEach(field => {
			const value = this[field]

			if (typeof value === 'string' && value.length) {
				data[field] = value
			}
		})

		/** Validates if data was provided for the update */
		if (Object.keys(data).length === 0) {
			throw new NotProvided()
		}

		/** Updates the provider */
		await TableProviders.update(this.id, data)
	}

	destroy() {
		return TableProviders.destroy(this.id)
	}

	validate() {
		const fields = [
			'company',
			'email',
			'category'
		]

		fields.forEach(field => {
			const value = this[field]

			if (typeof value !== 'string' || value.length === 0) {
				throw new Invalid(field)
			}
		})
	}
}

module.exports = Provider