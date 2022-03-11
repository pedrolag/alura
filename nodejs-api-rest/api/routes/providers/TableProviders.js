const ModelTableProviders = require('./ModelTableProviders')
const NotFound = require('../../errors/NotFound')

module.exports = {
	findAll() {
		return ModelTableProviders.findAll({ raw: true })
	},

	async findOne(id) {
		const result =  await ModelTableProviders.findOne({
			where: {
				id: id
			}
		})

		if (!result) {
			throw new NotFound();
		}

		return result
	},

	create(data) {
		return ModelTableProviders.create(data)
	},

	update(id, data) {
		return ModelTableProviders.update(
			data,
			{
				where: {
					id: id
				}
			}
		)
	},

	destroy(id) {
		return ModelTableProviders.destroy({
			where: {
				id: id
			}
		})
	}
}