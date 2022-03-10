const ModelTableProviders = require('./ModelTableProviders')

module.exports = {
	list() {
		return ModelTableProviders.findAll()
	}
}