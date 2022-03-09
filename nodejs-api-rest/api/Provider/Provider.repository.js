const model = require('./Provider.entity')

module.exports = {
	getAll() {
		return model.findAll()
	},

	create(provider) {
		return model.findAll()
	}
}