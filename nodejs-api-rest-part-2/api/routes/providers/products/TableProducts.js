const ModelTableProducts = require('./ModelTableProducts')
const instance = require('../../../database')

module.exports = {
	findAll(providerId) {
		return ModelTableProducts.findAll({
			where: {
				providerId: providerId
			},
			raw: true
		})
	},

	async findOne(id, providerId) {
		const result = await ModelTableProducts.findOne({
			where: {
				id: id,
				providerId: providerId
			},	
			raw: true
		})

		if (!result) {
			throw new Error('Product was not found')
		}

		return result
	},

	create(data) {
		return ModelTableProducts.create(data)
	},

	update({ id, providerId }, data) {
		return ModelTableProducts.update(
			data,
			{
				where: {
					id: id,
					providerId: providerId
				},
			}
		)
	},

	destroy(id, providerId) {
		return ModelTableProducts.destroy({
			where: {
				id: id,
				providerId: providerId
			}
		})
	},

	decrementFromInventory(id, providerId, field, quantity) {
		instance.transaction(async transaction => {
			const product = await ModelTableProducts.findOne({
				where: {
					id: id,
					providerId: providerId
				}
			})

			product[field] = quantity
			
			await product.save()

			return product
		})
	}
}