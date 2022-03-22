const ModelTableProducts = require('./ModelTableProducts')

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

	destroy(id, providerId) {
		return ModelTableProducts.destroy({
			where: {
				id: id,
				providerId: providerId
			}
		})
	}
}