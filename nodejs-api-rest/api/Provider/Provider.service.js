const repository = require('./Provider.repository')
const Provider = require('./Provider.model')

module.exports = {
	getAll() {
		return repository.getAll()
	},

	create(request) {
		const provider = new Provider(request.body)
		return repository.create(provider)
	}
}